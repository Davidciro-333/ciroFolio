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

  /** Bio corta del hero. Tiene que dejar claro el diferencial en 5 segundos. */
  heroBio: {
    en: 'I build AI automation systems that run in production — conversational commerce, document extraction and content pipelines. I design them, deploy them on my own infrastructure, and keep them running.',
    es: 'Construyo sistemas de automatización con IA que corren en producción — comercio conversacional, extracción de documentos y pipelines de contenido. Los diseño, los despliego en infraestructura propia y los mantengo funcionando.',
  } as Localized,

  /** Párrafos de la sección "Sobre mí". */
  aboutParagraphs: [
    {
      en: 'I design, build and operate AI automation systems. Not prototypes — systems that run on their own: bots handling conversations over an official WhatsApp provider, pipelines publishing to four networks on a schedule, workflows reading invoices and filing them every day.',
      es: 'Diseño, construyo y opero sistemas de automatización con IA. No prototipos — sistemas que funcionan solos: bots atendiendo conversaciones vía un proveedor oficial de WhatsApp, pipelines publicando programados en cuatro redes, workflows que leen facturas y las archivan a diario.',
    },
    {
      en: 'Most of what I’ve built started as a pilot for one case and became a configurable platform. That transition is where the interesting decisions are — what becomes configuration and what stays put. Sales safeguards and payment validation don’t belong in a config file, and knowing where that line sits is the part nobody can improvise.',
      es: 'Casi todo lo que he construido empezó como un piloto para un solo caso y terminó siendo una plataforma configurable. Esa transición es donde están las decisiones interesantes — qué pasa a ser configuración y qué se queda quieto. Las salvaguardas de venta y la validación de pagos no van en un archivo de config, y saber dónde está esa frontera es lo que no se improvisa.',
    },
    {
      en: 'I work async-first: Slack, Notion, pull requests and written documentation. I’m on UTC-5, which overlaps the entire US working day. And I run my own infrastructure — AWS EC2 behind nginx, Docker, self-hosted n8n — so I don’t need anyone else to deploy what I build.',
      es: 'Trabajo async-first: Slack, Notion, pull requests y documentación escrita. Estoy en UTC-5, con solape completo con la jornada laboral de EE.UU. Y gestiono mi propia infraestructura — AWS EC2 detrás de nginx, Docker, n8n self-hosted — así que no dependo de nadie para desplegar lo que construyo.',
    },
  ] as Localized[],

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
