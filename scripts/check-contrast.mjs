/**
 * Verifica el contraste WCAG de los tokens de color del sitio.
 *
 *   pnpm build && pnpm check:contrast
 *
 * Lee los valores del CSS YA COMPILADO, no del código fuente: así comprueba
 * lo que de verdad llega al navegador, incluso si algún token se sobreescribe
 * por el camino.
 *
 * Umbrales (WCAG 2.1 AA):
 *   4.5:1  texto normal
 *   3.0:1  texto grande (>=24px), elementos de interfaz y decorativos
 *
 * Sale con código 1 si algún token baja de su umbral, para poder enchufarlo
 * a CI cuando haga falta.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('No hay carpeta dist/. Ejecuta `pnpm build` primero.');
  process.exit(1);
}

const cssDir = join(DIST, '_astro');
const sources = [
  ...(existsSync(cssDir) ? readdirSync(cssDir).filter((f) => f.endsWith('.css')).map((f) => join(cssDir, f)) : []),
  join(DIST, 'index.html'),
].filter(existsSync);

const css = sources.map((f) => readFileSync(f, 'utf8')).join('\n');

// El CSS compilado trae los tokens dos veces (claro en `:root`, oscuro en
// `[data-theme=dark]`), así que se leen por bloque. El minificador puede acortar
// #ffffff a #fff: se expande antes de comparar.
const expand = (hex) =>
  hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join('')}` : hex.toLowerCase();

const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*--bg:[^{}]*)\}/g)].map(([, selector, body]) => ({
  selector: selector.trim(),
  body,
}));
const light = blocks.find((b) => /(^|[\s,]):root$/.test(b.selector));
const dark = blocks.find((b) => /data-theme=["']?dark/.test(b.selector));

if (!light || !dark) {
  console.error('No se encontraron los bloques de tokens claro y oscuro en el CSS compilado.');
  process.exit(1);
}

const tokenIn = (block, name) => {
  const match = block.body.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,6})\\b`));
  if (!match) {
    console.error(`Token --${name} no encontrado en ${block.selector}.`);
    process.exit(1);
  }
  return expand(match[1]);
};

const srgbToLinear = (channel) => {
  const v = channel / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * srgbToLinear((n >> 16) & 255) +
    0.7152 * srgbToLinear((n >> 8) & 255) +
    0.0722 * srgbToLinear(n & 255)
  );
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const WHITE = '#ffffff';

// [nombre, texto, fondo, mínimo, uso] por tema. Los pares salen de DESIGN.md §2.
const pairs = (block) => {
  const t = (name) => tokenIn(block, name);
  return [
    ['ink / bg',            t('ink'),     t('bg'),     4.5, 'titulares y texto principal'],
    ['ink-2 / parch',       t('ink-2'),   t('parch'),  4.5, 'texto de lectura secundario'],
    ['ink-3 / parch',       t('ink-3'),   t('parch'),  4.5, 'pies, etiquetas'],
    ['ink-3 / bg',          t('ink-3'),   t('bg'),     4.5, 'pies, etiquetas, bordes de campo'],
    ['blue / bg',           t('blue'),    t('bg'),     4.5, 'enlaces'],
    ['blue / parch',        t('blue'),    t('parch'),  4.5, 'enlaces dentro de tiles'],
    ['blanco / pill-bg',    WHITE,        t('pill-bg'), 4.5, 'texto del botón primario'],
    ['ink / mark',          t('ink'),     t('mark'),   4.5, 'texto con subrayador'],
    ['inv-ink / inv-bg',    t('inv-ink'), t('inv-bg'), 4.5, 'tile invertido'],
    ['inv-link / inv-bg',   t('inv-link'), t('inv-bg'), 4.5, 'enlace en el tile invertido'],
    ['live / parch',        t('live'),    t('parch'),  3.0, 'punto de estado (gráfico, no texto)'],
  ];
};

const checks = [
  ...pairs(light).map((c) => ['claro  ' + c[0], ...c.slice(1)]),
  ...pairs(dark).map((c) => ['oscuro ' + c[0], ...c.slice(1)]),
];

let failed = 0;
for (const [name, hex, bg, min, use] of checks) {
  const r = ratio(hex, bg);
  const ok = r >= min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'OK   ' : 'FALLA'} ${name.padEnd(30)} ${hex}  ${r.toFixed(2).padStart(6)}:1  (mín ${min})  ${use}`,
  );
}

if (failed > 0) {
  console.error(`\n${failed} token(s) por debajo de su umbral de contraste.`);
  process.exit(1);
}

console.log('\nTodos los tokens cumplen su umbral.');
