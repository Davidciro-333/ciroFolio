import type { Localized } from '../i18n/config';

/**
 * Servicios de la home.
 *
 * NOTA DE FASE: esta lista es la heredada. En la Fase 2 se sustituye por
 * MODALIDADES DE CONTRATACIÓN (proyecto cerrado / retainer mensual / refuerzo
 * por horas), que es el idioma que habla una agencia. Se migra tal cual ahora
 * para no mezclar el refactor con el cambio de contenido.
 */

export interface Service {
  num: string;
  title: Localized;
  description: Localized;
  tags: string[];
}

export const services: Service[] = [
  {
    num: '01',
    title: {
      en: 'Web Development',
      es: 'Desarrollo Web',
    },
    description: {
      en: 'Fast sites and applications with React, Astro and Next.js. From setup all the way to the production deploy.',
      es: 'Sitios y aplicaciones rápidas con React, Astro y Next.js. Desde el setup hasta el deploy en producción.',
    },
    tags: ['React', 'Astro', 'Next.js', 'TypeScript'],
  },
  {
    num: '02',
    title: {
      en: 'UI/UX Design',
      es: 'Diseño UI/UX',
    },
    description: {
      en: 'Clean interfaces and design systems in Figma. From the wireframe to the finished component, with an editorial eye.',
      es: 'Interfaces limpias y sistemas de diseño en Figma. Del wireframe al componente final con criterio editorial.',
    },
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    num: '03',
    title: {
      en: 'Automation',
      es: 'Automatización',
    },
    description: {
      en: 'Workflows that do the work for you: n8n integrations, webhooks, notifications and pipelines without repetitive code.',
      es: 'Flujos que trabajan por ti: integraciones con n8n, webhooks, notificaciones y pipelines sin código repetitivo.',
    },
    tags: ['n8n', 'Webhooks', 'APIs', 'Node.js'],
  },
  {
    num: '04',
    title: {
      en: 'Tech Consulting',
      es: 'Consultoría Tech',
    },
    description: {
      en: 'Stack, architecture and digital strategy reviews. I help you make technical decisions on solid ground.',
      es: 'Revisión de stack, arquitectura y estrategia digital. Te ayudo a tomar decisiones técnicas con fundamento.',
    },
    tags: ['Stack Review', 'Architecture', 'Strategy'],
  },
];
