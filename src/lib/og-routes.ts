import type { Lang } from '../i18n/config';

/**
 * Rutas y medidas de las imágenes de Open Graph.
 *
 * Vive aparte de `og.ts` a propósito: ese módulo importa satori y sharp, que
 * solo pueden correr en Node durante el build. Los componentes `.astro`
 * necesitan la RUTA y las MEDIDAS de su tarjeta, no el generador — si
 * importaran `og.ts` arrastrarían el rasterizador al bundle.
 *
 * El endpoint `src/pages/og/[...route].png.ts` y los componentes usan estas
 * mismas funciones, así que una ruta no puede desincronizarse de la otra.
 */

/**
 * Medidas que espera Open Graph (ratio 1.91:1).
 *
 * Se usan en dos sitios que deben coincidir: al rasterizar la tarjeta y en las
 * metas `og:image:width` / `og:image:height`. Si no coincidieran, LinkedIn
 * reservaría un hueco del tamaño equivocado.
 */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Identificador de una tarjeta. Es también el parámetro del endpoint. */
export type OgRoute = string;

export const ogRoute = {
  home: (lang: Lang): OgRoute => lang,
  work: (lang: Lang, slug: string): OgRoute => `work/${lang}/${slug}`,
  notFound: (lang: Lang): OgRoute => `404/${lang}`,
} as const;

/**
 * Ruta pública de la imagen, **sin** el `base` del sitio: el Layout la pasa
 * por `withBase()` antes de emitirla.
 */
export function ogImagePath(route: OgRoute): string {
  return `/og/${route}.png`;
}
