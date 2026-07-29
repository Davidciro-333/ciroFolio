/**
 * Endpoint que genera las tarjetas de Open Graph.
 *
 * En build Astro recorre `getStaticPaths` y escribe un PNG por entrada, así que
 * en producción son archivos estáticos: los scrapers de LinkedIn, WhatsApp y
 * Slack no ejecutan nada, solo descargan.
 *
 * Hay una tarjeta por página Y por idioma, porque el título y el resumen que
 * llevan impresos están traducidos.
 */

import type { APIRoute } from 'astro';
import { LOCALES, type Lang } from '../../i18n/config';
import { getPublishedWork } from '../../lib/work';
import { ogRoute } from '../../lib/og-routes';
import { ogCard } from '../../data/seo';
import { renderOgImage, type OgCard } from '../../lib/og';

// Sin anotar con `GetStaticPaths` a propósito: ese tipo exige que `props` tenga
// index signature, y `OgCard` es una interfaz cerrada. Astro valida igual la
// forma del valor devuelto, y aquí se conserva el tipado real de las props.
export async function getStaticPaths() {
  const paths: Array<{ params: { route: string }; props: OgCard }> = [];

  for (const lang of LOCALES) {
    // Home.
    paths.push({
      params: { route: ogRoute.home(lang) },
      props: {
        kicker: ogCard.homeKicker[lang],
        title: ogCard.homeTitle[lang],
        summary: ogCard.homeSummary[lang],
        footer: ogCard.homeSignature[lang],
      },
    });

    // 404.
    paths.push({
      params: { route: ogRoute.notFound(lang) },
      props: {
        kicker: ogCard.notFoundKicker[lang],
        title: ogCard.notFoundTitle[lang],
        summary: ogCard.notFoundSummary[lang],
        footer: ogCard.signature[lang],
      },
    });

    // Un caso de estudio, una tarjeta: es lo que hace que compartir un caso
    // concreto se anuncie por su propio título y no por el del sitio.
    const entries = await getPublishedWork(lang as Lang);
    for (const entry of entries) {
      paths.push({
        params: { route: ogRoute.work(lang, entry.data.slug) },
        props: {
          kicker: ogCard.caseKicker[lang],
          title: entry.data.title,
          summary: entry.data.summary,
          footer: ogCard.signature[lang],
        },
      });
    }
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as OgCard);

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      // Las tarjetas solo cambian si cambia el contenido, y entonces cambia el
      // build. Cachearlas un año es seguro y evita que los scrapers repitan.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
