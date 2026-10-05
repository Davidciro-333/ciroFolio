/**
 * Generación de las imágenes de Open Graph.
 *
 * Cada página del sitio tiene su propia tarjeta 1200×630, compuesta en build:
 * satori convierte una descripción tipo flexbox en SVG (con los glifos ya
 * vectorizados, no como <text>) y sharp lo rasteriza a PNG.
 *
 * Que satori vectorice el texto es lo que permite usar `sharp` en vez de añadir
 * un rasterizador aparte: el SVG resultante no depende de ninguna fuente
 * instalada en la máquina que lo convierte.
 *
 * Lenguaje "Galería" (DESIGN.md): fondo claro, Plus Jakarta Sans, el azul como
 * único acento y el retrato a la derecha, para que la tarjeta que se ve en
 * LinkedIn y el sitio al que lleva sean reconociblemente lo mismo.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { OG_WIDTH, OG_HEIGHT } from './og-routes';

/** Tokens de `global.css` (tema claro). Duplicados a propósito: satori no lee CSS. */
const COLOR = {
  bg: '#ffffff',
  parch: '#f5f5f7',
  ink: '#1d1d1f',
  ink2: '#424245',
  ink3: '#6e6e73',
  line: '#e0e0e3',
  blue: '#0066cc',
} as const;

const PHOTO = { width: 380, height: 494, radius: 36 } as const;

export interface OgCard {
  /** Línea corta sobre el título: el tipo de página o el rol. */
  kicker: string;
  title: string;
  /** Una o dos frases. Se recorta si excede lo que cabe sin desbordar. */
  summary: string;
  /** Pie de la tarjeta: quién firma. */
  footer: string;
}

// Fuentes y retrato se leen del disco una vez por build, no por imagen.
let fontCache: Awaited<ReturnType<typeof loadFonts>> | undefined;
let photoCache: string | undefined;

async function loadFonts() {
  // Desde la raíz del proyecto, NO relativo a `import.meta.url`: en build este
  // módulo acaba empaquetado en `dist/.prerender/chunks/`, y desde ahí una ruta
  // relativa apunta a una carpeta que no existe. `astro build` siempre corre con
  // el cwd en la raíz del proyecto, tanto en local como en Vercel.
  const dir = join(process.cwd(), 'node_modules', '@fontsource', 'plus-jakarta-sans', 'files');

  // satori acepta ttf, otf y woff, NO woff2. El subconjunto latin cubre las
  // tildes y la ñ del español (Latin-1).
  const [bold, regular] = await Promise.all([
    readFile(join(dir, 'plus-jakarta-sans-latin-700-normal.woff')),
    readFile(join(dir, 'plus-jakarta-sans-latin-400-normal.woff')),
  ]);

  return [
    { name: 'Plus Jakarta Sans', data: bold, weight: 700 as const, style: 'normal' as const },
    { name: 'Plus Jakarta Sans', data: regular, weight: 400 as const, style: 'normal' as const },
  ];
}

/**
 * El retrato, recortado a la medida de la tarjeta y como data URI. El original
 * es un PNG de 4096 px: meterlo tal cual en cada SVG multiplicaría el build.
 */
async function loadPhoto(): Promise<string> {
  if (photoCache) return photoCache;
  const source = join(process.cwd(), 'src', 'assets', 'photoProfile.png');
  const jpeg = await sharp(source)
    .resize(PHOTO.width * 2, PHOTO.height * 2, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  photoCache = `data:image/jpeg;base64,${jpeg.toString('base64')}`;
  return photoCache;
}

/**
 * Recorta en el último espacio antes del límite, para no cortar una palabra
 * por la mitad. El límite está calibrado para cuatro líneas al tamaño usado.
 */
function clamp(text: string, max = 150): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

function card({ kicker, title, summary, footer }: OgCard, photo: string) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 56,
        padding: '68px 68px 68px 76px',
        backgroundColor: COLOR.parch,
        fontFamily: 'Plus Jakarta Sans',
      },
      children: [
        // Columna de texto
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontSize: 26, fontWeight: 700, color: COLOR.ink3 },
                  children: kicker,
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontSize: 76,
                          fontWeight: 700,
                          lineHeight: 1.04,
                          letterSpacing: -3,
                          color: COLOR.ink,
                        },
                        children: title,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          marginTop: 24,
                          fontSize: 27,
                          fontWeight: 400,
                          lineHeight: 1.42,
                          color: COLOR.ink2,
                        },
                        children: clamp(summary),
                      },
                    },
                  ],
                },
              },
              // Firma, con el azul como único acento
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    fontSize: 22,
                    fontWeight: 400,
                    color: COLOR.ink3,
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', width: 12, height: 12, borderRadius: 6, backgroundColor: COLOR.blue },
                      },
                    },
                    footer,
                  ],
                },
              },
            ],
          },
        },
        // Retrato
        {
          type: 'img',
          props: {
            src: photo,
            width: PHOTO.width,
            height: PHOTO.height,
            style: { borderRadius: PHOTO.radius, objectFit: 'cover' },
          },
        },
      ],
    },
  };
}

/** Compone la tarjeta y devuelve el PNG listo para servir. */
export async function renderOgImage(input: OgCard): Promise<Buffer> {
  fontCache ??= await loadFonts();
  const photo = await loadPhoto();

  const svg = await satori(card(input, photo) as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: fontCache,
  });

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
