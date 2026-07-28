import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, type Lang } from '../i18n/config';

export type WorkEntry = CollectionEntry<'work'>;

/**
 * Casos de estudio publicables en un idioma.
 *
 * Aplica dos reglas:
 *
 * 1. En producción los borradores no se generan.
 * 2. Un caso publicado DEBE existir en todos los idiomas. Si falta uno, el
 *    build se detiene con un mensaje claro — es lo que impide que el sitio
 *    diga cosas distintas según el idioma, que es el riesgo real del bilingüe.
 */
export async function getPublishedWork(lang: Lang): Promise<WorkEntry[]> {
  const all = await getCollection('work');
  const published = all.filter((entry) => import.meta.env.DEV || !entry.data.draft);

  assertCompleteTranslations(published);

  return published
    .filter((entry) => entry.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order);
}

/** Un caso concreto en un idioma, o `undefined` si no existe. */
export async function getWorkEntry(slug: string, lang: Lang): Promise<WorkEntry | undefined> {
  const entries = await getPublishedWork(lang);
  return entries.find((entry) => entry.data.slug === slug);
}

function assertCompleteTranslations(entries: WorkEntry[]): void {
  const bySlug = new Map<string, Set<string>>();

  for (const entry of entries) {
    const langs = bySlug.get(entry.data.slug) ?? new Set<string>();
    langs.add(entry.data.lang);
    bySlug.set(entry.data.slug, langs);
  }

  const incomplete: string[] = [];
  for (const [slug, langs] of bySlug) {
    const missing = LOCALES.filter((locale) => !langs.has(locale));
    if (missing.length > 0) {
      incomplete.push(`  · "${slug}" — falta: ${missing.join(', ')}`);
    }
  }

  if (incomplete.length > 0) {
    throw new Error(
      `Casos de estudio sin traducir por completo:\n${incomplete.join('\n')}\n\n` +
        'Cada caso necesita un archivo por idioma en src/content/work/ ' +
        '(<slug>.en.md y <slug>.es.md), o marcarse como draft: true.',
    );
  }
}
