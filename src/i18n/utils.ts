import { getRelativeLocaleUrl } from 'astro:i18n';
import { DEFAULT_LOCALE, LOCALES, type Lang, type Localized } from './config';

/**
 * Devuelve un traductor para el idioma dado.
 *
 *   const t = useTranslations(lang);
 *   t(ui.nav.contact)  →  'Contact' | 'Contacto'
 */
export function useTranslations(lang: Lang) {
  return function t<T>(entry: Localized<T>): T {
    return entry[lang];
  };
}

/**
 * Quita la base del sitio y el prefijo de idioma de un pathname.
 * `/cirofolio/es/work/foo` → `/work/foo`
 */
export function stripLocale(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;

  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      path = path.slice(locale.length + 1);
      break;
    }
  }

  return path || '/';
}

/**
 * La misma página en cada idioma. Alimenta el conmutador del nav y las
 * etiquetas `hreflang`.
 */
export function getAlternates(pathname: string): Localized<string> {
  const path = stripLocale(pathname);
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, getRelativeLocaleUrl(locale, path)]),
  ) as Localized<string>;
}

/** Ruta interna localizada. `localePath('en', '/work/foo')` → `/cirofolio/work/foo` */
export function localePath(lang: Lang, path = '/'): string {
  return getRelativeLocaleUrl(lang, path);
}
