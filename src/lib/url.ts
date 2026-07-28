/**
 * Resuelve una ruta de asset respetando el `base` configurado en astro.config.
 *
 * Nada en el sitio debe hardcodear `/cirofolio`: cuando el portafolio se mude
 * a su dominio dedicado basta con cambiar `base` en la config y todo sigue
 * resolviendo bien.
 *
 *   withBase('/favicon.svg')  →  '/cirofolio/favicon.svg'
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
