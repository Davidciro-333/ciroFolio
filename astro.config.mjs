import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Dominio y ruta base del sitio.
// Hoy el portafolio se sirve en itsciro.com/cirofolio mediante un rewrite de
// Vercel desde el proyecto del bio-link. Cuando se mude a su dominio dedicado
// se cambian estas dos constantes (o las variables de entorno) y nada más:
// ningún enlace interno hardcodea la base — todos pasan por `withBase()`.
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://itsciro.com';
const BASE = process.env.PUBLIC_BASE_PATH ?? '/cirofolio';

export default defineConfig({
  integrations: [tailwind()],
  site: SITE,
  base: BASE,

  // Inglés canónico en la raíz (mercado primario: agencias US/EU),
  // español bajo /es/. Sin redirección automática: el visitante elige
  // con el conmutador del nav y los enlaces compartidos no cambian de idioma.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
