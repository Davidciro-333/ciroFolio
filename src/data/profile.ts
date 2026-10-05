import type { Localized } from '../i18n/config';

/**
 * Datos de perfil y contacto.
 *
 * El copy sigue el posicionamiento decidido: ingeniero de automatización con
 * IA, encuadre de "operador de sistemas vivos", async-first declarado como
 * forma de trabajo (nunca un nivel de idioma) y cero cifras infladas.
 */

export const profile = {
  name: 'David Ciro',
  email: 'davidcirortiz06@gmail.com',
  location: { en: 'Medellín, Colombia', es: 'Medellín, Colombia' } as Localized,
  timezone: 'UTC-5',

  /**
   * Las tres columnas de "Sobre mí", bajo la frase grande (ui.about.statement*).
   * Antes eran tres párrafos largos; la frontera entre lo configurable y lo
   * fijo ahora la cuenta la frase y, con detalle, el diagrama de cada caso.
   */
  aboutColumns: [
    {
      title: { en: 'Systems, not prototypes', es: 'Sistemas, no prototipos' },
      body: {
        en: 'Bots handling conversations over an official WhatsApp provider, pipelines publishing on a schedule, workflows filing invoices every day.',
        es: 'Bots que atienden conversaciones vía un proveedor oficial de WhatsApp, pipelines que publican en calendario, workflows que archivan facturas a diario.',
      },
    },
    {
      title: { en: 'Async-first', es: 'Async-first' },
      body: {
        en: 'Slack, Notion, pull requests and written documentation. UTC-5 overlaps the entire US working day.',
        es: 'Slack, Notion, pull requests y documentación escrita. UTC-5 se solapa con toda la jornada laboral de EE.UU.',
      },
    },
    {
      title: { en: 'My own infrastructure', es: 'Infraestructura propia' },
      body: {
        en: 'AWS EC2 behind nginx, Docker and self-hosted n8n. I don’t need anyone else to deploy what I build.',
        es: 'AWS EC2 detrás de nginx, Docker y n8n self-hosted. No dependo de nadie para desplegar lo que construyo.',
      },
    },
  ] as { title: Localized; body: Localized }[],

  /**
   * Cifras de la sección "Sobre mí".
   * Solo datos verificables: la decisión de métricas prohíbe cifras infladas.
   */
  stats: [
    {
      value: '5',
      label: { en: 'Systems shipped to production', es: 'Sistemas en producción' },
    },
    {
      value: '2020',
      label: { en: 'Building since', es: 'Construyendo desde' },
    },
    {
      value: 'UTC-5',
      label: { en: 'Full overlap with US hours', es: 'Solape completo con EE.UU.' },
    },
  ] as { value: string; label: Localized }[],

  stack: [
    'React', 'TypeScript', 'Astro', 'Node.js',
    'Tailwind CSS', 'Flutter', 'n8n', 'Redis',
    'Remotion', 'AWS', 'Figma', 'Git',
  ],

  social: [
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/david-ciro' },
    { label: 'GitHub',    href: 'https://github.com/Davidciro-333' },
    { label: 'Instagram', href: 'https://instagram.com/itsciro_' },
  ],
};
