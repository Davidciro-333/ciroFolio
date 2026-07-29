/**
 * Verifica los metadatos de Open Graph del sitio YA COMPILADO.
 *
 *   pnpm build && pnpm check:og
 *
 * Comprueba lo que se puede comprobar sin internet, que es casi todo lo que
 * puede salir mal:
 *
 *   · cada página emite las metas obligatorias
 *   · `og:image` es una URL absoluta y el archivo EXISTE en dist/
 *   · las dimensiones declaradas coinciden con los píxeles reales del PNG
 *   · `og:url` coincide con el canonical
 *   · `og:type` es `article` en los casos de estudio y `website` en el resto
 *   · `twitter:card` es summary_large_image cuando hay imagen
 *   · `og:locale` y `og:locale:alternate` existen y son distintos
 *
 * Lo único que NO puede comprobar es el render de LinkedIn o WhatsApp: eso
 * necesita una URL pública. Ver el README de verificación en la nota de sesión.
 *
 * Sale con código 1 si algo falla, para poder enchufarlo a CI.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('No hay carpeta dist/. Ejecuta `pnpm build` primero.');
  process.exit(1);
}

/** Todos los .html de dist/, recursivamente. */
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

/** Contenido de una meta por property (og:) o name (twitter:). */
function meta(html, key) {
  const attr = key.startsWith('og:') ? 'property' : 'name';
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${key.replace(/:/g, ':')}["'][^>]*>`,
    'gi',
  );
  const tags = html.match(re) ?? [];
  return tags
    .map((tag) => tag.match(/content=["']([^"']*)["']/i)?.[1])
    .filter((v) => v !== undefined);
}

function canonicalOf(html) {
  const tag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0];
  return tag?.match(/href=["']([^"']+)["']/i)?.[1];
}

/**
 * Dimensiones reales de un PNG leyendo su cabecera IHDR (bytes 16-23).
 * Evita cargar sharp solo para esto.
 */
function pngSize(file) {
  const buf = readFileSync(file);
  const isPng = buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47;
  if (!isPng) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const problems = [];
const rows = [];

for (const file of htmlFiles(DIST)) {
  const page = relative(DIST, file).replace(/\\/g, '/');
  const html = readFileSync(file, 'utf8');
  const fail = (msg) => problems.push(`${page}: ${msg}`);

  const canonical = canonicalOf(html);
  const [ogUrl] = meta(html, 'og:url');
  const [ogTitle] = meta(html, 'og:title');
  const [ogDesc] = meta(html, 'og:description');
  const [ogType] = meta(html, 'og:type');
  const [ogSite] = meta(html, 'og:site_name');
  const [ogImage] = meta(html, 'og:image');
  const [ogWidth] = meta(html, 'og:image:width');
  const [ogHeight] = meta(html, 'og:image:height');
  const [ogAlt] = meta(html, 'og:image:alt');
  const [ogLocale] = meta(html, 'og:locale');
  const alternates = meta(html, 'og:locale:alternate');
  const [twCard] = meta(html, 'twitter:card');
  const [twImage] = meta(html, 'twitter:image');

  // --- Metas obligatorias ---
  for (const [key, value] of Object.entries({
    canonical,
    'og:url': ogUrl,
    'og:title': ogTitle,
    'og:description': ogDesc,
    'og:type': ogType,
    'og:site_name': ogSite,
    'og:image': ogImage,
    'og:image:width': ogWidth,
    'og:image:height': ogHeight,
    'og:image:alt': ogAlt,
    'og:locale': ogLocale,
    'twitter:card': twCard,
    'twitter:image': twImage,
  })) {
    if (!value) fail(`falta ${key}`);
  }

  if (!ogImage) {
    rows.push([page, ogType ?? '—', 'SIN IMAGEN', '—']);
    continue;
  }

  // --- La imagen debe ser absoluta y existir en dist/ ---
  let imagePath;
  try {
    imagePath = new URL(ogImage).pathname;
  } catch {
    fail(`og:image no es una URL absoluta: ${ogImage}`);
    continue;
  }

  // La URL pública incluye el base del sitio; en dist/ los archivos están sin él.
  const base = (process.env.PUBLIC_BASE_PATH ?? '/cirofolio').replace(/\/$/, '');
  const withoutBase = imagePath.startsWith(base) ? imagePath.slice(base.length) : imagePath;
  const onDisk = join(DIST, withoutBase);

  if (!existsSync(onDisk) || !statSync(onDisk).isFile()) {
    fail(`og:image apunta a un archivo que no existe: ${withoutBase}`);
    rows.push([page, ogType, '404', '—']);
    continue;
  }

  // --- Las dimensiones declaradas deben ser las reales ---
  const size = pngSize(onDisk);
  if (!size) {
    fail(`og:image no es un PNG válido: ${withoutBase}`);
  } else {
    if (String(size.width) !== ogWidth || String(size.height) !== ogHeight) {
      fail(
        `dimensiones declaradas ${ogWidth}×${ogHeight} ≠ reales ${size.width}×${size.height}`,
      );
    }
    // Open Graph pide ratio 1.91:1; fuera de rango algunas plataformas recortan.
    const ratio = size.width / size.height;
    if (ratio < 1.85 || ratio > 1.95) {
      fail(`ratio ${ratio.toFixed(2)}:1 fuera del 1.91:1 esperado`);
    }
  }

  // --- Coherencia ---
  if (ogUrl !== canonical) fail(`og:url (${ogUrl}) ≠ canonical (${canonical})`);
  if (twImage !== ogImage) fail('twitter:image ≠ og:image');
  if (twCard !== 'summary_large_image') {
    fail(`twitter:card es "${twCard}" habiendo imagen; debería ser summary_large_image`);
  }
  if (ogAlt && ogAlt.trim().length < 10) fail('og:image:alt demasiado corto');

  const isCase = page.includes('work/');
  const expectedType = isCase ? 'article' : 'website';
  if (ogType !== expectedType) fail(`og:type es "${ogType}", se esperaba "${expectedType}"`);

  if (alternates.length === 0) fail('falta og:locale:alternate');
  if (alternates.includes(ogLocale)) fail(`og:locale:alternate repite el propio locale (${ogLocale})`);

  rows.push([page, ogType, `${size?.width}×${size?.height}`, withoutBase]);
}

// --- Informe ---
const width = rows.reduce((max, r) => Math.max(max, r[0].length), 8);
console.log(`${'PÁGINA'.padEnd(width)}  TIPO      TARJETA    IMAGEN`);
for (const [page, type, size, img] of rows.sort()) {
  console.log(`${page.padEnd(width)}  ${type.padEnd(8)}  ${size.padEnd(9)}  ${img}`);
}

console.log(`\n${rows.length} página(s) revisada(s).`);

if (problems.length > 0) {
  console.error(`\n${problems.length} problema(s):`);
  for (const p of problems) console.error(`  · ${p}`);
  process.exit(1);
}

console.log('Todas las metas de Open Graph son coherentes y sus imágenes existen.');
console.log('\nEl render real de LinkedIn/WhatsApp necesita URL pública — esto no lo cubre.');
