import type { Localized } from './config';

/**
 * Textos de interfaz: navegación, encabezados de sección y botones.
 *
 * El contenido con sustancia (proyectos, trayectoria, modalidades) NO vive
 * aquí — está en `src/data/`. Esto es solo el andamiaje de la interfaz.
 */
export const ui = {
  nav: {
    services:   { en: 'Work with me', es: 'Trabajar juntos' },
    about:      { en: 'About',        es: 'Sobre mí' },
    work:       { en: 'Systems',      es: 'Sistemas' },
    experience: { en: 'Experience',   es: 'Experiencia' },
    contact:    { en: 'Contact',      es: 'Contacto' },
    openMenu:   { en: 'Open menu',    es: 'Abrir menú' },
    mainNav:    { en: 'Main navigation', es: 'Navegación principal' },
    switchLang: { en: 'Ver en español',  es: 'View in English' },
  },

  hero: {
    role: { en: '/ AI Automation Engineer', es: '/ Ingeniero de Automatización con IA' },
    ctaWork:    { en: 'See the systems', es: 'Ver los sistemas' },
    ctaContact: { en: 'Contact',          es: 'Contacto' },
  },

  services: {
    eyebrow: { en: '/ How we work together', es: '/ Cómo trabajamos juntos' },
    title:   { en: 'Engagements',            es: 'Modalidades' },
    cta:     { en: 'Start a conversation',   es: 'Hablemos' },
  },

  about: {
    eyebrow: { en: '/ Who I am',    es: '/ Quién soy' },
    title:   { en: 'About',         es: 'Sobre mí' },
    stack:   { en: 'Usual stack',   es: 'Stack habitual' },
    ctaTalk: { en: 'Start a conversation', es: 'Hablemos' },
  },

  work: {
    eyebrow:  { en: '/ Running in production', es: '/ Corriendo en producción' },
    title:    { en: 'Systems',                 es: 'Sistemas' },
    viewCase: { en: 'View case study',         es: 'Ver caso de estudio' },
    outro: {
      en: 'Every one of these I designed, deployed and still operate.',
      es: 'Todos estos los diseñé, los desplegué y los sigo operando.',
    },
    ctaContact: { en: 'Contact', es: 'Contacto' },
  },

  experience: {
    eyebrow:  { en: '/ Background',  es: '/ Trayectoria' },
    title:    { en: 'Experience',    es: 'Experiencia' },
    now:      { en: 'now',           es: 'hoy' },
    skills:   { en: 'Skill areas',   es: 'Áreas de habilidad' },
    active:   { en: 'Active',        es: 'Activo' },
    linkedin: { en: 'View LinkedIn profile', es: 'Ver perfil en LinkedIn' },
  },

  contact: {
    eyebrow:        { en: '/ Get in touch',  es: '/ Hablemos' },
    titleLine1:     { en: 'Need a system',   es: '¿Necesitas un sistema' },
    titleHighlight: { en: 'that runs',       es: 'que funcione' },
    titleLine3:     { en: 'on its own?',     es: 'solo?' },
    available:      { en: 'Available for new projects', es: 'Disponible para nuevos proyectos' },
    async: {
      en: 'Async-first · UTC-5, full overlap with US hours',
      es: 'Async-first · UTC-5, solape completo con EE.UU.',
    },
    emailLabel: { en: 'Or email me directly', es: 'O escríbeme directamente' },
    emailAria:  { en: 'Email David Ciro', es: 'Enviar correo a David Ciro' },
    social:     { en: 'Social links', es: 'Redes sociales' },
  },

  form: {
    name:            { en: 'Name',    es: 'Nombre' },
    company:         { en: 'Company', es: 'Empresa' },
    email:           { en: 'Email',   es: 'Email' },
    project:         { en: 'What do you need built?', es: '¿Qué necesitas construir?' },
    projectHint: {
      en: 'A couple of lines is enough. What the system should do, and what’s blocking you today.',
      es: 'Con dos líneas basta. Qué debería hacer el sistema y qué te está frenando hoy.',
    },
    timeline:        { en: 'Timeline', es: 'Plazo' },
    timelineOptions: {
      en: ['As soon as possible', 'Within a month', 'This quarter', 'Just exploring'],
      es: ['Lo antes posible', 'En un mes', 'Este trimestre', 'Solo explorando'],
    } as Localized<string[]>,
    budget:          { en: 'Budget range', es: 'Presupuesto' },
    budgetOptions: {
      en: ['Under 2k USD', '2k – 5k USD', '5k – 15k USD', 'Over 15k USD', 'Not defined yet'],
      es: ['Menos de 2k USD', '2k – 5k USD', '5k – 15k USD', 'Más de 15k USD', 'Sin definir'],
    } as Localized<string[]>,
    select:          { en: 'Select an option', es: 'Elige una opción' },
    submit:          { en: 'Send',    es: 'Enviar' },
    sending:         { en: 'Sending…', es: 'Enviando…' },
    success: {
      en: 'Got it. I’ll reply within one business day.',
      es: 'Recibido. Te respondo en un día hábil.',
    },
    error: {
      en: 'Something went wrong. Email me directly and it’ll reach me.',
      es: 'Algo falló. Escríbeme directamente por correo y me llega igual.',
    },
    required: { en: 'Required', es: 'Obligatorio' },
  },

  caseStudy: {
    back:  { en: 'All systems', es: 'Todos los sistemas' },
    role:  { en: 'Role',        es: 'Rol' },
    year:  { en: 'Year',        es: 'Año' },
    stack: { en: 'Stack',       es: 'Stack' },
    links: { en: 'Links',       es: 'Enlaces' },
    draft: { en: 'Draft — not published yet', es: 'Borrador — sin publicar' },
  },
  // Obliga a que cada entrada tenga los dos idiomas: si falta uno, no compila.
} satisfies Record<string, Record<string, Localized<string> | Localized<string[]>>>;
