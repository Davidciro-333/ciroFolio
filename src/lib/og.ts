/**
 * Generación de las imágenes de Open Graph.
 *
 * Cada página del sitio tiene su propia tarjeta 1200×630, compuesta en build:
 * satori convierte una descripción tipo flexbox en SVG —con los glifos ya
 * vectorizados, no como <text>— y sharp lo rasteriza a PNG.
 *
 * Que satori vectorice el texto es lo que permite usar `sharp` en vez de añadir
 * un rasterizador aparte: el SVG resultante no depende de ninguna fuente
 * instalada en la máquina que lo convierte.
 *
 * La tipografía es Nohemi, la misma del sitio, para que la tarjeta que se ve en
 * LinkedIn y el sitio al que lleva sean reconociblemente lo mismo.
 *
 * El fondo es PROVISIONAL: un degradado con los tokens de marca. Está aislado
 * en `backgroundLayer()` para poder sustituirlo por una textura generada sin
 * tocar la composición del texto.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { OG_WIDTH, OG_HEIGHT } from './og-routes';

/** Tokens de `global.css`. Duplicados a propósito: satori no lee CSS. */
const COLOR = {
  base: '#0a0a0c',
  surface: '#111115',
  neon: '#c8f135',
  white: '#ffffff',
  secondary: '#9999a8',
  muted: '#7c7c92',
} as const;

export interface OgCard {
  /** Línea corta sobre el título: el tipo de página o el rol. */
  kicker: string;
  title: string;
  /** Una o dos frases. Se recorta si excede lo que cabe sin desbordar. */
  summary: string;
  /** Pie de la tarjeta: quién firma. */
  footer: string;
}

// Fuentes y fondo se leen del disco una vez por build, no por imagen.
let fontCache: Awaited<ReturnType<typeof loadFonts>> | undefined;
let backgroundCache: string | null | undefined;

/**
 * Textura de fondo como data URI, o `null` si no está en el repo.
 *
 * La genera `scripts/generate-og-background.mjs` con Nano Banana Pro y se
 * versiona en `src/assets/`. Si falta, las tarjetas caen al degradado plano de
 * abajo: el build nunca depende de que exista ni de un servicio externo.
 */
async function loadBackground(): Promise<string | null> {
  if (backgroundCache !== undefined) return backgroundCache;

  try {
    const file = join(process.cwd(), 'src', 'assets', 'og-background.jpg');
    const bytes = await readFile(file);
    backgroundCache = `data:image/jpeg;base64,${bytes.toString('base64')}`;
  } catch {
    console.warn('[og] Sin src/assets/og-background.jpg — se usa el degradado plano.');
    backgroundCache = null;
  }

  return backgroundCache;
}

async function loadFonts() {
  // Desde la raíz del proyecto, NO relativo a `import.meta.url`: en build este
  // módulo acaba empaquetado en `dist/.prerender/chunks/`, y desde ahí una ruta
  // relativa apunta a una carpeta que no existe. `astro build` siempre corre con
  // el cwd en la raíz del proyecto, tanto en local como en Vercel.
  const dir = join(process.cwd(), 'src', 'assets', 'fonts');

  // satori acepta ttf, otf y woff — NO woff2. Aquí se usan los .woff.
  const [extraBold, regular] = await Promise.all([
    readFile(join(dir, 'Nohemi-ExtraBold.woff')),
    readFile(join(dir, 'Nohemi-Regular.woff')),
  ]);

  return [
    { name: 'Nohemi', data: extraBold, weight: 800 as const, style: 'normal' as const },
    { name: 'Nohemi', data: regular, weight: 400 as const, style: 'normal' as const },
  ];
}

/**
 * Recorta en el último espacio antes del límite, para no cortar una palabra
 * por la mitad. El límite está calibrado para tres líneas al tamaño usado.
 */
function clamp(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

/**
 * Fondo de la tarjeta, en dos capas.
 *
 * La textura vive a la derecha del encuadre y deja vacíos los dos tercios
 * izquierdos, que es donde va el texto. Encima lleva un velo con degradado
 * horizontal: opaco sobre la columna de texto, transparente en el extremo
 * derecho. Eso es lo que mantiene el contraste del texto por debajo de nuestro
 * control y no a merced de lo que salga del generador.
 */
function backgroundLayer(background: string | null) {
  const cover = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: OG_WIDTH,
    height: OG_HEIGHT,
  } as const;

  if (!background) {
    // Sin textura: degradado plano con los tokens de marca.
    return [
      {
        type: 'div',
        props: {
          style: {
            ...cover,
            display: 'flex',
            backgroundColor: COLOR.base,
            backgroundImage: `radial-gradient(circle at 18% 12%, ${COLOR.surface} 0%, ${COLOR.base} 62%)`,
          },
        },
      },
    ];
  }

  return [
    { type: 'img', props: { src: background, ...cover, style: cover } },
    {
      type: 'div',
      props: {
        style: {
          ...cover,
          display: 'flex',
          backgroundImage:
            'linear-gradient(90deg,' +
            ` ${COLOR.base}e6 0%,` +
            ` ${COLOR.base}cc 58%,` +
            ` ${COLOR.base}00 100%)`,
        },
      },
    },
  ];
}

function card({ kicker, title, summary, footer }: OgCard, background: string | null) {
  return {
    type: 'div',
    props: {
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '68px 72px',
        backgroundColor: COLOR.base,
        fontFamily: 'Nohemi',
      },
      children: [
        ...backgroundLayer(background),

        // Franja de acento en el borde izquierdo.
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: 10,
              height: '100%',
              display: 'flex',
              backgroundColor: COLOR.neon,
            },
          },
        },

        // Cabecera: el kicker.
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: COLOR.neon,
            },
            children: kicker,
          },
        },

        // Cuerpo: título y resumen.
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
                    fontSize: 74,
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: -2,
                    color: COLOR.white,
                    textTransform: 'uppercase',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    marginTop: 26,
                    maxWidth: 880,
                    fontSize: 27,
                    fontWeight: 400,
                    lineHeight: 1.45,
                    color: COLOR.secondary,
                  },
                  children: clamp(summary),
                },
              },
            ],
          },
        },

        // Pie: la firma, separada por una regla.
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              paddingTop: 26,
              borderTop: `1px solid rgba(255, 255, 255, 0.12)`,
              fontSize: 24,
              fontWeight: 400,
              color: COLOR.muted,
            },
            children: footer,
          },
        },
      ],
    },
  };
}

/** Compone la tarjeta y devuelve el PNG listo para servir. */
export async function renderOgImage(input: OgCard): Promise<Buffer> {
  fontCache ??= await loadFonts();
  const background = await loadBackground();

  const svg = await satori(card(input, background) as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: fontCache,
  });

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
