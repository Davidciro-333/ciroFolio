import type { Localized } from './config';

/**
 * Textos de interfaz: navegación, encabezados de sección y botones.
 *
 * El contenido con sustancia (proyectos, trayectoria, servicios) NO vive aquí
 * — está en `src/data/`. Esto es solo el andamiaje de la interfaz.
 */
export const ui = {
  nav: {
    services:   { en: 'Services',   es: 'Servicios' },
    about:      { en: 'About',      es: 'Sobre mí' },
    work:       { en: 'Work',       es: 'Proyectos' },
    experience: { en: 'Experience', es: 'Experiencia' },
    contact:    { en: 'Contact',    es: 'Contacto' },
    openMenu:   { en: 'Open menu',  es: 'Abrir menú' },
    mainNav:    { en: 'Main navigation', es: 'Navegación principal' },
    switchLang: { en: 'Ver en español',  es: 'View in English' },
  },

  hero: {
    role: { en: '/ Developer & Designer', es: '/ Desarrollador & Diseñador' },
    ctaWork:    { en: 'Work',    es: 'Proyectos' },
    ctaContact: { en: 'Contact', es: 'Contacto' },
  },

  services: {
    eyebrow: { en: '/ What I do', es: '/ Lo que hago' },
    title:   { en: 'Services',    es: 'Servicios' },
    cta:     { en: "Let's work",  es: 'Trabajemos' },
  },

  about: {
    eyebrow:   { en: '/ Who I am',      es: '/ Quién soy' },
    title:     { en: 'About',           es: 'Sobre mí' },
    stack:     { en: 'Usual stack',     es: 'Stack habitual' },
    ctaTalk:   { en: "Let's talk",      es: 'Hablemos' },
  },

  work: {
    eyebrow:  { en: '/ Selected work',  es: '/ Trabajo selecto' },
    title:    { en: 'Work',             es: 'Proyectos' },
    viewCase: { en: 'View case study',  es: 'Ver caso de estudio' },
    outro:    {
      en: 'Got a project in mind? Let’s talk.',
      es: '¿Tienes un proyecto en mente? Hablemos.',
    },
    ctaContact: { en: 'Contact', es: 'Contacto' },
  },

  experience: {
    eyebrow:  { en: '/ Background',    es: '/ Trayectoria' },
    title:    { en: 'Experience',      es: 'Experiencia' },
    now:      { en: 'now',             es: 'hoy' },
    skills:   { en: 'Skill areas',     es: 'Áreas de habilidad' },
    active:   { en: 'Active',          es: 'Activo' },
    linkedin: { en: 'View LinkedIn profile', es: 'Ver perfil en LinkedIn' },
  },

  contact: {
    eyebrow: { en: '/ Get in touch', es: '/ Hablemos' },
    titleLine1: { en: 'Got a',       es: '¿Tienes un' },
    titleHighlight: { en: 'project', es: 'proyecto' },
    titleLine3: { en: 'in mind?',    es: 'en mente?' },
    available: { en: 'Available for new projects', es: 'Disponible para nuevos proyectos' },
    emailLabel: { en: 'Email', es: 'Email' },
    emailAria: { en: 'Email David Ciro', es: 'Enviar correo a David Ciro' },
    social: { en: 'Social links', es: 'Redes sociales' },
  },

  caseStudy: {
    back:    { en: 'All work',   es: 'Todos los proyectos' },
    role:    { en: 'Role',       es: 'Rol' },
    year:    { en: 'Year',       es: 'Año' },
    stack:   { en: 'Stack',      es: 'Stack' },
    links:   { en: 'Links',      es: 'Enlaces' },
    draft:   { en: 'Draft — not published yet', es: 'Borrador — sin publicar' },
  },
} satisfies Record<string, Record<string, Localized>>;
