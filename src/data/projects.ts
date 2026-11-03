import type { Localized } from '../i18n/config';
import { savings, hoursOf } from './savings';

/**
 * Los proyectos que se listan en la home.
 *
 * Sustituyen a los placeholders "Proyecto Dos / Tres / Cuatro" por los
 * sistemas reales del sitio. La descripción larga de cada uno
 * vive en `src/content/work/<slug>.<lang>.md`.
 *
 * `hasCase` controla si la tarjeta enlaza a su caso de estudio: se pone en
 * true cuando el markdown correspondiente deja de ser borrador.
 */

export interface Project {
  num: string;
  slug: string;
  name: string;
  year: string;
  description: Localized;
  tags: string[];
  hasCase: boolean;
  /** Enlace externo verificable, si lo hay. */
  externalUrl?: string;
  /**
   * Fecha ISO desde la que el sistema corre en producción. Presente solo en
   * los que de verdad siguen corriendo: enciende el indicador de estado.
   *
   * Cada fecha sale de la creación del workflow que hoy está activo en n8n,
   * comprobada por su API el 2026-09-29 — es exactamente el tipo de dato que
   * un cliente comprueba. Si de alguno no hay fecha fiable, no lleva estado.
   */
  liveSince?: string;
  /** Categoría que se muestra cuando el sistema no está en vivo ni tiene caso. */
  category?: Localized;
  /** Versión corta de la descripción, para el tile de la home (una o dos frases). */
  short: Localized;
  /**
   * La cifra protagonista del tile (DESIGN.md §1). Siempre un dato real:
   *   · days       → días en producción, calculados en el cliente desde liveSince
   *   · value      → un número con su contexto
   *   · statement  → una frase en vez de un número, cuando la cifra no existe
   */
  figure:
    | { kind: 'days' }
    | { kind: 'value'; value: string; label: Localized }
    | { kind: 'statement'; text: Localized; label: Localized };
}

const radar = savings.find((s) => s.slug === 'ad-library-radar');
const radarHours = radar ? Math.round(hoursOf(radar)) : 0;

export const projects: Project[] = [
  {
    // Anónimo por decisión de David (2026-11-02): herramienta interna de
    // Galactic AIMA, se describe sin su nombre de producto.
    num: '01',
    slug: 'publishing-studio',
    name: 'Video Publishing Studio',
    year: '2026',
    description: {
      en: 'A web app for a creative team: upload finished videos or drop them in a shared Drive folder, write the copy with AI help, place them on a calendar, and they publish themselves to Instagram and Facebook. Scheduling is approving; any post can still be cancelled from Telegram.',
      es: 'App web para un equipo creativo: sube videos terminados o los deja en una carpeta de Drive, escribe el copy con ayuda de IA, los ubica en un calendario y se publican solos en Instagram y Facebook. Programar es aprobar; cualquier post se puede cancelar desde Telegram.',
    },
    tags: ['TypeScript', 'React', 'Express', 'PostgreSQL', 'Cloudflare R2', 'n8n', 'Meta Graph API', 'AWS'],
    hasCase: true,
    // Despliegue en el servidor de producción y primer reel publicado solo en
    // IG y FB. Los workflows [Sched]/[Pub] galactic existen desde el 10-29,
    // pero entonces publicaban desde la app en local.
    liveSince: '2026-10-31',
    short: {
      en: 'Upload the videos, put them on a calendar and they publish themselves to Instagram and Facebook.',
      es: 'Subes los videos, los pones en un calendario y se publican solos en Instagram y Facebook.',
    },
    figure: { kind: 'value', value: '4', label: { en: 'days from written spec to production', es: 'días de la especificación escrita a producción' } },
  },
  {
    // Anónimo por decisión de David (2026-11-02).
    num: '02',
    slug: 'ad-library-radar',
    name: 'Ad Library Radar',
    year: '2026',
    description: {
      en: "Reads Meta's public Ad Library every day across four Latin American markets and keeps a dated observation of every ad, so an offer that keeps running for weeks, or an advertiser that is scaling, stands out on its own. Cheap filters first, an LLM only for the few dozen that survive, and a morning digest on Telegram.",
      es: 'Lee cada día la Biblioteca de Anuncios de Meta en cuatro mercados de Latinoamérica y guarda una observación fechada de cada anuncio, para que una oferta que lleva semanas corriendo, o un anunciante que está escalando, salte a la vista sola. Primero filtros baratos, un LLM solo para las decenas que sobreviven, y un resumen cada mañana en Telegram.',
    },
    tags: ['Python', 'Playwright', 'PostgreSQL', 'Claude', 'Docker', 'AWS EC2', 'Telegram'],
    hasCase: false,
    // Arranque de la instancia en la nube. Sigue archivando barridos a diario
    // en S3, comprobado el 2026-11-02 (último, del 2026-10-31).
    liveSince: '2026-08-06',
    category: { en: 'Market intelligence', es: 'Inteligencia de mercado' },
    short: {
      en: "Reads Meta's Ad Library every day and remembers it, so the offers that keep running and the advertisers that scale stand out on their own.",
      es: 'Lee la Biblioteca de Anuncios de Meta cada día y la recuerda, para que las ofertas que siguen corriendo y los anunciantes que escalan salten a la vista.',
    },
    // Días con barridos × 2 h de revisión a mano; se actualiza con savings.json.
    figure: { kind: 'value', value: `${radarHours} h`, label: { en: 'of manual ad research saved since August', es: 'de investigación manual de anuncios ahorradas desde agosto' } },
  },
  {
    num: '03',
    slug: 'galactic-bills',
    name: 'galacticBills',
    year: '2026',
    description: {
      en: 'Invoice capture and bookkeeping for small businesses. Send a photo or PDF over a messaging channel and an LLM extracts the tax fields, validates the totals and files them. No manual data entry.',
      es: 'Captura y contabilización de facturas para negocios pequeños. El cliente manda una foto o un PDF por mensajería y un LLM extrae los campos fiscales, valida el cuadre y los archiva. Sin digitación manual.',
    },
    tags: ['n8n', 'Gemini', 'Document AI', 'Telegram', 'Google Cloud'],
    hasCase: true,
    liveSince: '2025-09-24', // [Bills] Lector facturas
    short: {
      en: 'Send a photo or PDF of an invoice over a messaging channel. An LLM extracts the tax fields, validates the totals and files them. No manual data entry.',
      es: 'Mandas una foto o un PDF de una factura por mensajería. Un LLM extrae los campos fiscales, valida el cuadre y la archiva. Sin digitación manual.',
    },
    figure: { kind: 'days' },
  },
  {
    num: '04',
    slug: 'conversational-commerce',
    name: 'Conversational Commerce Engine',
    year: '2026',
    description: {
      en: 'A sales engine running on WhatsApp through an official BSP: conversational AI, voice transcription, payment-receipt validation and follow-up windows. Two digital products have run on it; the second replaced the first in place, in a day.',
      es: 'Motor de ventas sobre WhatsApp vía BSP oficial: IA conversacional, transcripción de voz, validación de comprobantes de pago y ventanas de seguimiento. Han corrido dos productos digitales sobre él; el segundo reemplazó al primero en sitio, en un día.',
    },
    tags: ['n8n', 'LLM APIs', 'WhatsApp API', 'Redis', 'AWS EC2'],
    hasCase: true,
    // Creado como [Devocional] Agent Volver al Altar; desde el 2026-09-30 es
    // [Palabra] Agent, con el mismo id. Activo comprobado el 2026-11-02.
    liveSince: '2026-07-16',
    short: {
      en: 'A sales engine over an official WhatsApp BSP. It delivers first, validates the payment receipt, and never auto-approves one.',
      es: 'Motor de ventas sobre WhatsApp vía BSP oficial. Entrega primero, valida el comprobante de pago y nunca aprueba uno solo.',
    },
    figure: {
      kind: 'statement',
      text: { en: 'Safeguards in code, not in the prompt.', es: 'Salvaguardas en código, no en el prompt.' },
      label: { en: 'The rule every workflow follows', es: 'La regla que sigue cada workflow' },
    },
  },
  {
    num: '05',
    slug: 'bebetter-studio',
    name: 'beBetterStudio',
    year: '2026',
    description: {
      en: 'A content pipeline that generates short-form video and carousels, publishes them to four networks on a schedule, and measures what actually worked, with its own analytics panel built on top of the platform APIs.',
      es: 'Pipeline de contenido que genera video corto y carruseles, los publica programados en cuatro redes y mide qué funcionó de verdad, con panel de analítica propio sobre las APIs de las plataformas.',
    },
    tags: ['Node.js', 'TypeScript', 'FFmpeg', 'Gemini', 'n8n', 'PostgreSQL', 'AWS EC2'],
    hasCase: true,
    liveSince: '2026-04-18', // bebetter contentPublisher v0, antecesor directo de [Pub] bebetter
    short: {
      en: 'A content pipeline with its own analytics. It publishes on a schedule and measures which decisions actually worked.',
      es: 'Un pipeline de contenido con analítica propia. Publica en calendario y mide qué decisiones funcionaron de verdad.',
    },
    // Dato del caso (bebetter-studio.*.mdx), consultado en la VM el 2026-11-02.
    figure: { kind: 'value', value: '847K', label: { en: 'views across 148 pieces', es: 'vistas en 148 piezas' } },
  },
  {
    num: '06',
    slug: 'linkedin-publisher',
    name: 'LinkedIn Publisher',
    year: '2026',
    description: {
      en: 'The editorial pipeline behind my own LinkedIn: curates AI news from 14 sources, drafts the post in a defined voice, adds an illustration only when it earns its place, and waits for my approval on Telegram before publishing through the official API. Adapted from a team template; the deploy tooling is mine.',
      es: 'El pipeline editorial detrás de mi propio LinkedIn: cura noticias de IA de 14 fuentes, redacta el post con una voz definida, añade ilustración solo cuando aporta y espera mi aprobación en Telegram antes de publicar por la API oficial. Adaptado de una plantilla del equipo; las herramientas de despliegue son mías.',
    },
    tags: ['n8n', 'LLM APIs', 'Redis', 'Telegram', 'LinkedIn API'],
    hasCase: false,
    liveSince: '2026-07-30', // [ciro] LinkedIn Curador y Borrador
    short: {
      en: 'Curates AI news, drafts the post and waits for my approval on Telegram before publishing.',
      es: 'Cura noticias de IA, redacta el post y espera mi aprobación en Telegram antes de publicar.',
    },
    figure: { kind: 'value', value: '14', label: { en: 'sources curated', es: 'fuentes curadas' } },
  },
  {
    // Anónimo a petición del socio (Camilo, 2026-09-29): sin nombre, sin
    // ciudad y sin tamaño de flota, porque juntos identifican el proyecto. El
    // nombre es marca del cliente y se pedirá después del piloto.
    num: '07',
    slug: 'dispatch-platform-qa',
    name: 'Taxi Dispatch Platform',
    year: '2026',
    description: {
      en: 'QA and fixes for a taxi dispatch platform in production in Colombia, within Galactic AIMA. Seven test circuits, an automated SQL and browser test harness, and every issue filed with its cause, its fix and how to verify it.',
      es: 'QA y arreglos de una plataforma de despacho de taxis en producción en Colombia, dentro de Galactic AIMA. Siete circuitos de prueba, un arnés automatizado de pruebas SQL y de navegador, y cada issue con su causa, su arreglo y cómo verificarlo.',
    },
    tags: ['PostgreSQL', 'Supabase', 'Playwright', 'PWA', 'QA'],
    hasCase: true,
    short: {
      en: 'QA and fixes for a dispatch platform in production in Colombia. Every issue filed with its cause, its fix and how to verify it.',
      es: 'QA y arreglos de una plataforma de despacho en producción en Colombia. Cada issue con su causa, su arreglo y cómo verificarlo.',
    },
    figure: { kind: 'value', value: '7', label: { en: 'test circuits, automated SQL and browser harness', es: 'circuitos de prueba, arnés automatizado de SQL y navegador' } },
  },
  {
    num: '08',
    slug: 'ai-video-ads',
    name: 'AI Video Ads',
    year: '2026',
    description: {
      en: "A production pipeline for 30-second ads for local businesses: it researches the business from its public listings, generates shots from the business's own photos with Nano Banana Pro and Veo 3.1 on Vertex AI, and cuts them to the beat of the music. In progress: the first ads are made, the first client is not signed yet.",
      es: 'Pipeline de producción de anuncios de 30 segundos para negocios locales: investiga el negocio en sus perfiles públicos, genera planos a partir de sus propias fotos con Nano Banana Pro y Veo 3.1 en Vertex AI, y los monta al compás de la música. En proceso: los primeros anuncios están hechos, el primer cliente aún no está firmado.',
    },
    tags: ['Vertex AI', 'Veo 3.1', 'Nano Banana Pro', 'Python', 'FFmpeg', 'Apify', 'HyperFrames'],
    hasCase: false,
    category: { en: 'In progress', es: 'En proceso' },
    short: {
      en: 'Researches a local business, generates shots from its own photos and cuts a 30-second ad to the beat.',
      es: 'Investiga un negocio local, genera planos a partir de sus propias fotos y monta un anuncio de 30 segundos al compás.',
    },
    figure: { kind: 'value', value: '~$7', label: { en: 'in model credits per 30-second ad', es: 'en créditos de modelos por anuncio de 30 s' } },
  },
  {
    num: '09',
    slug: 'signal-factory',
    name: 'SignalFactory',
    year: '2026',
    description: {
      en: 'A programmatic video factory: renders vertical videos from a database with Remotion and headless Chrome, sources footage and audio from public APIs, and publishes to two YouTube channels in two languages.',
      es: 'Fábrica de video programático: renderiza videos verticales desde base de datos con Remotion y Chrome headless, toma metraje y audio de APIs públicas, y publica en dos canales de YouTube en dos idiomas.',
    },
    tags: ['Next.js', 'Remotion', 'SQLite', 'n8n', 'Cloudflare R2'],
    hasCase: false,
    category: { en: 'Programmatic video', es: 'Video programático' },
    short: {
      en: 'Renders vertical videos from a database with Remotion and headless Chrome.',
      es: 'Renderiza videos verticales desde base de datos con Remotion y Chrome headless.',
    },
    figure: { kind: 'value', value: '2', label: { en: 'YouTube channels, in two languages', es: 'canales de YouTube, en dos idiomas' } },
  },
  {
    num: '10',
    slug: 'ciro-finanzas',
    name: 'ciro_finanzas',
    year: '2026',
    description: {
      en: 'A local-first personal finance app that answers one question: how much money will I have on a given date. Cash-flow projection engine with credit cards, recurring rules and goals. Pure Dart domain, 182 tests green.',
      es: 'App de finanzas personales local-first que responde una sola pregunta: cuánto dinero tendré en la fecha X. Motor de proyección de flujo de caja con tarjetas, recurrentes y metas. Dominio en Dart puro, 182 tests en verde.',
    },
    tags: ['Flutter', 'Dart', 'Drift', 'Riverpod', 'SQLite'],
    hasCase: false,
    category: { en: 'Local-first app', es: 'App local-first' },
    short: {
      en: 'How much money will I have on a given date. Pure Dart domain.',
      es: 'Cuánto dinero tendré en una fecha dada. Dominio en Dart puro.',
    },
    figure: { kind: 'value', value: '182', label: { en: 'tests green', es: 'tests en verde' } },
  },
];
