import type { Localized } from '../i18n/config';

/**
 * Textos de metadatos: lo que se ve en Google, en LinkedIn y en WhatsApp.
 *
 * Vivían dentro de `Layout.astro`, pero las tarjetas de Open Graph los
 * necesitan también en `src/pages/og/` — al generarse en build, ese endpoint
 * no puede leer el frontmatter de un componente. Centralizados aquí, hay una
 * sola versión de cada frase.
 */

/** `og:site_name`. LinkedIn lo muestra como origen de la tarjeta. */
export const SITE_NAME = 'David Ciro';

/** Título y descripción por defecto de la home. */
export const meta = {
  title: {
    en: 'David Ciro — AI Automation Engineer',
    es: 'David Ciro — Ingeniero de Automatización con IA',
  },
  description: {
    en: 'I build AI automation systems that run in production: conversational commerce, document extraction and content pipelines. Available for freelance work. Based in Colombia, UTC-5.',
    es: 'Construyo sistemas de automatización con IA que corren en producción: comercio conversacional, extracción de documentos y pipelines de contenido. Disponible para trabajo freelance. Colombia, UTC-5.',
  },
} satisfies Record<string, Localized<string>>;

/**
 * Textos de la tarjeta de Open Graph.
 *
 * Son más cortos que las metas: la tarjeta tiene 1200×630 px y el texto se
 * recorta si no cabe. La descripción de la home, por ejemplo, mide 200
 * caracteres y ahí se leería truncada.
 */
export const ogCard = {
  /** Home. */
  homeKicker: {
    en: 'AI Automation Engineer',
    es: 'Ingeniero de Automatización con IA',
  },
  homeTitle: {
    en: 'David Ciro',
    es: 'David Ciro',
  },
  homeSummary: {
    en: 'AI automation systems that run in production — conversational commerce, document extraction and content pipelines.',
    es: 'Sistemas de automatización con IA que corren en producción: comercio conversacional, extracción de documentos y pipelines de contenido.',
  },
  homeSignature: {
    en: 'itsciro.com · Colombia, UTC−5 · Available for freelance work',
    es: 'itsciro.com · Colombia, UTC−5 · Disponible para trabajo freelance',
  },

  /** Casos de estudio. */
  caseKicker: {
    en: 'Case study',
    es: 'Caso de estudio',
  },
  signature: {
    en: 'David Ciro · AI Automation Engineer',
    es: 'David Ciro · Ingeniero de Automatización con IA',
  },

  /** Página 404. */
  notFoundKicker: { en: 'Error 404', es: 'Error 404' },
  notFoundTitle: { en: 'Process not found', es: 'Proceso no encontrado' },
  notFoundSummary: {
    en: 'Nothing is bound to this path. It was moved, renamed, or it never ran here.',
    es: 'No hay nada escuchando en esta ruta. La movieron, la renombraron, o nunca corrió aquí.',
  },
  // Obliga a que cada entrada tenga los dos idiomas: si falta uno, no compila.
} satisfies Record<string, Localized<string>>;

/**
 * `og:image:alt` — describe la tarjeta para quien no la ve.
 *
 * Describe la imagen, no repite el título: los lectores de pantalla ya leen el
 * `og:title` por separado.
 */
export const ogImageAlt: Localized<(heading: string) => string> = {
  en: (heading) => `Dark card with a lime accent bar reading “${heading}”, signed David Ciro`,
  es: (heading) => `Tarjeta oscura con una franja lima que dice «${heading}», firmada David Ciro`,
};
