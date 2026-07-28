import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LOCALES } from './i18n/config';

/**
 * Casos de estudio.
 *
 * Un archivo por idioma, con el mismo `slug`, en la misma carpeta:
 *
 *   src/content/work/galactic-bills.en.md
 *   src/content/work/galactic-bills.es.md
 *
 * Los pares se validan en `src/lib/work.ts`: si a un caso publicado le falta
 * un idioma, el build falla. Un caso a medio traducir nunca llega a producción.
 */
const work = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/work',
    // OBLIGATORIO: por defecto el loader toma el `slug` del frontmatter como
    // id de la entrada, y aquí los dos idiomas comparten slug — se pisarían
    // el uno al otro y solo se cargaría uno. El id sale del nombre de archivo,
    // que sí es único: "galactic-bills.en".
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: z.object({
    slug: z.string(),
    lang: z.enum(LOCALES),
    title: z.string(),
    /** Una frase. Se usa en la tarjeta, en el <title> y en la meta description. */
    summary: z.string(),
    role: z.string(),
    year: z.string(),
    stack: z.array(z.string()),
    /** Métricas de sistema, verificables. Nada de cifras infladas. */
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    /** Artefactos públicos que cualquiera puede comprobar por su cuenta. */
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    /** Mientras sea true no se genera la página en producción. */
    draft: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

export const collections = { work };
