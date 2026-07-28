/**
 * Configuración de idiomas del sitio.
 *
 * El inglés es el idioma canónico y vive en la raíz (`/`), porque el mercado
 * primario son agencias y empresas de EE.UU./Europa. El español vive en `/es/`.
 */

export const LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'en' satisfies Lang;

export type Lang = (typeof LOCALES)[number];

/**
 * Un valor que DEBE existir en todos los idiomas.
 *
 * Esta es la pieza clave del bilingüe: si se añade un texto en inglés y se
 * olvida el español, TypeScript falla en `astro check` y el fallo se ve antes
 * de desplegar. No depende de que alguien se acuerde de traducir.
 */
export type Localized<T = string> = Record<Lang, T>;

/** Etiquetas del conmutador de idioma, en su propio idioma. */
export const LOCALE_LABELS: Localized<string> = {
  en: 'EN',
  es: 'ES',
};

/** Códigos para `og:locale` y `hreflang`. */
export const LOCALE_TAGS: Localized<string> = {
  en: 'en',
  es: 'es',
};

export const OG_LOCALES: Localized<string> = {
  en: 'en_US',
  es: 'es_CO',
};
