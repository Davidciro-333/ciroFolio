import type { Localized } from '../i18n/config';

/**
 * Los proyectos que se listan en la home.
 *
 * Sustituyen a los placeholders "Proyecto Dos / Tres / Cuatro" por los cinco
 * sistemas reales decididos para el sitio. La descripción larga de cada uno
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
}

export const projects: Project[] = [
  {
    num: '01',
    slug: 'galactic-bills',
    name: 'galacticBills',
    year: '2026',
    description: {
      en: 'Invoice capture and bookkeeping for small businesses. Send a photo or PDF over a messaging channel and an LLM extracts the tax fields, validates the totals and files them — no manual data entry.',
      es: 'Captura y contabilización de facturas para negocios pequeños. El cliente manda una foto o un PDF por mensajería y un LLM extrae los campos fiscales, valida el cuadre y los archiva — sin digitación manual.',
    },
    tags: ['n8n', 'Gemini', 'Document AI', 'Telegram', 'Google Cloud'],
    hasCase: true,
  },
  {
    num: '02',
    slug: 'bebetter-studio',
    name: 'beBetterStudio',
    year: '2026',
    description: {
      en: 'A content pipeline that generates short-form video and carousels, publishes them to four networks on a schedule, and measures what actually worked — with its own analytics panel built on top of the platform APIs.',
      es: 'Pipeline de contenido que genera video corto y carruseles, los publica programados en cuatro redes y mide qué funcionó de verdad — con panel de analítica propio sobre las APIs de las plataformas.',
    },
    tags: ['Node.js', 'TypeScript', 'FFmpeg', 'Gemini', 'n8n', 'SQLite'],
    hasCase: true,
  },
  {
    num: '03',
    slug: 'conversational-commerce',
    name: 'Conversational Commerce Engine',
    year: '2026',
    description: {
      en: 'A multi-product sales engine running on WhatsApp through an official BSP: conversational AI, voice transcription, payment-receipt validation and follow-up windows. Launching a new product is configuration, not a rewrite.',
      es: 'Motor de ventas multi-producto sobre WhatsApp vía BSP oficial: IA conversacional, transcripción de voz, validación de comprobantes de pago y ventanas de seguimiento. Lanzar un producto nuevo es configuración, no reescritura.',
    },
    tags: ['n8n', 'Claude', 'WhatsApp API', 'Redis', 'AWS EC2'],
    hasCase: false,
  },
  {
    num: '04',
    slug: 'signal-factory',
    name: 'SignalFactory',
    year: '2026',
    description: {
      en: 'A programmatic video factory: renders vertical videos from a database with Remotion and headless Chrome, sources footage and audio from public APIs, and publishes to two YouTube channels in two languages.',
      es: 'Fábrica de video programático: renderiza videos verticales desde base de datos con Remotion y Chrome headless, toma metraje y audio de APIs públicas, y publica en dos canales de YouTube en dos idiomas.',
    },
    tags: ['Next.js', 'Remotion', 'SQLite', 'n8n', 'Cloudflare R2'],
    hasCase: false,
  },
  {
    num: '05',
    slug: 'ciro-finanzas',
    name: 'ciro_finanzas',
    year: '2026',
    description: {
      en: 'A local-first personal finance app that answers one question: how much money will I have on a given date. Cash-flow projection engine with credit cards, recurring rules and goals — pure Dart domain, 91 tests green.',
      es: 'App de finanzas personales local-first que responde una sola pregunta: cuánto dinero tendré en la fecha X. Motor de proyección de flujo de caja con tarjetas, recurrentes y metas — dominio en Dart puro, 91 tests en verde.',
    },
    tags: ['Flutter', 'Dart', 'Drift', 'Riverpod', 'SQLite'],
    hasCase: false,
  },
];
