import type { Localized } from './config';

/**
 * Textos de interfaz: navegación, encabezados de sección y botones.
 *
 * El contenido con sustancia (proyectos, trayectoria, modalidades) NO vive
 * aquí: está en `src/data/`. Esto es solo el andamiaje de la interfaz.
 *
 * Reglas de voz (DESIGN.md §8): una etiqueta por intención en todo el sitio,
 * sin rayas largas ni medias en el copy visible, sentence case.
 *   · contacto  → "Start a conversation" / "Hablemos"
 *   · sistemas  → "See the systems" / "Ver los sistemas"
 *   · casos     → "Read the case" / "Leer el caso"
 */
export const ui = {
  nav: {
    services:   { en: 'Work with me', es: 'Trabajar juntos' },
    about:      { en: 'About',        es: 'Sobre mí' },
    work:       { en: 'Systems',      es: 'Sistemas' },
    experience: { en: 'Experience',   es: 'Experiencia' },
    contact:    { en: 'Start a conversation', es: 'Hablemos' },
    mainNav:    { en: 'Main navigation', es: 'Navegación principal' },
    switchLang: { en: 'Ver en español',  es: 'View in English' },
    theme:      { en: 'Switch between light and dark mode', es: 'Cambiar entre modo claro y oscuro' },
  },

  hero: {
    kicker: { en: 'AI automation engineer', es: 'Ingeniero de automatización con IA' },
    title:  { en: 'Systems that keep running. On their own.', es: 'Sistemas que siguen funcionando. Solos.' },
    // La segunda frase va con subrayador: es la promesa central.
    lede: {
      en: 'I design, deploy and operate AI automation on my own infrastructure.',
      es: 'Diseño, despliego y opero automatización con IA en infraestructura propia.',
    },
    ledeMark: { en: 'Then I keep it running.', es: 'Y la mantengo funcionando.' },
    ctaWork:    { en: 'See the systems', es: 'Ver los sistemas' },
    ctaContact: { en: 'Start a conversation', es: 'Hablemos' },
    photoAlt:   { en: 'Portrait of David Ciro', es: 'Retrato de David Ciro' },
    caption: {
      en: 'David Ciro. Medellín, Colombia. UTC-5, full overlap with US hours.',
      es: 'David Ciro. Medellín, Colombia. UTC-5, solape completo con EE.UU.',
    },
  },

  work: {
    // "Seven systems. Four running right now." se arma con los números reales.
    titleSystems: { en: 'systems.', es: 'sistemas.' },
    titleRunning: { en: 'running right now.', es: 'corriendo ahora mismo.' },
    sub: {
      en: 'Built, deployed and operated by me. No one watching them overnight.',
      es: 'Construidos, desplegados y operados por mí. Nadie los vigila de noche.',
    },
    caseStudy: { en: 'Case study', es: 'Caso de estudio' },
    viewCase:  { en: 'Read the case', es: 'Leer el caso' },
  },

  services: {
    title: { en: 'Four ways to work together.', es: 'Cuatro formas de trabajar juntos.' },
    note: {
      en: 'No public rates. You get a number in my first reply.',
      es: 'Sin tarifas públicas. Te doy un número en mi primera respuesta.',
    },
  },

  about: {
    // Frase grande con el segundo (y último) subrayador de la página.
    statementStart: {
      en: 'Most of what I build starts as a pilot and becomes a platform.',
      es: 'Casi todo lo que construyo empieza como piloto y termina como plataforma.',
    },
    statementMark: {
      en: 'Knowing what not to make configurable',
      es: 'Saber qué no hacer configurable',
    },
    statementEnd: {
      en: 'is the part nobody can improvise.',
      es: 'es lo que nadie puede improvisar.',
    },
    stack: { en: 'Usual stack', es: 'Stack habitual' },
  },

  experience: {
    title:    { en: 'Experience', es: 'Experiencia' },
    since:    { en: 'Since', es: 'Desde' },
    skills:   { en: 'Skill areas', es: 'Áreas de habilidad' },
    linkedin: { en: 'Full profile on LinkedIn', es: 'Perfil completo en LinkedIn' },
  },

  contact: {
    title: { en: 'Let’s build the next one.', es: 'Construyamos el siguiente.' },
    body: {
      en: 'Tell me what you need running. I reply in writing, with questions, a rough plan and a number.',
      es: 'Cuéntame qué necesitas que funcione. Te respondo por escrito, con preguntas, un plan aproximado y un número.',
    },
    async: {
      en: 'Async-first. UTC-5, full overlap with US hours.',
      es: 'Async-first. UTC-5, solape completo con EE.UU.',
    },
    emailLabel: { en: 'Or write directly', es: 'O escríbeme directamente' },
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
      en: ['Under 2k USD', '2k-5k USD', '5k-15k USD', 'Over 15k USD', 'Not defined yet'],
      es: ['Menos de 2k USD', '2k-5k USD', '5k-15k USD', 'Más de 15k USD', 'Sin definir'],
    } as Localized<string[]>,
    select:          { en: 'Select an option', es: 'Elige una opción' },
    required:        { en: 'required', es: 'obligatorio' },
    submit:          { en: 'Send', es: 'Enviar' },
    sending:         { en: 'Sending…', es: 'Enviando…' },
    success: {
      en: 'Got it. I’ll reply within one business day.',
      es: 'Recibido. Te respondo en un día hábil.',
    },
    error: {
      en: 'Something went wrong. Email me directly and it’ll reach me.',
      es: 'Algo falló. Escríbeme directamente por correo y me llega igual.',
    },
  },

  caseStudy: {
    back:  { en: 'All systems', es: 'Todos los sistemas' },
    role:  { en: 'Role',        es: 'Rol' },
    year:  { en: 'Year',        es: 'Año' },
    stack: { en: 'Stack',       es: 'Stack' },
    links: { en: 'See it for yourself', es: 'Compruébalo tú mismo' },
    draft: { en: 'Draft. Not published yet.', es: 'Borrador. Sin publicar.' },
    ctaTitle: { en: 'Need something like this running?', es: '¿Necesitas algo así funcionando?' },
  },

  /** Diagrama vivo de los casos (Pipeline). */
  diagram: {
    flagged:  { en: 'Fixed by design. Never per-client configuration.', es: 'Fijo por diseño. Nunca configuración por cliente.' },
    planned:  { en: 'Planned configuration', es: 'Configuración planeada' },
    packet:   { en: 'An item moving through the system', es: 'Un elemento recorriendo el sistema' },
    steps:    { en: 'The pipeline, step by step', es: 'El pipeline, paso a paso' },
  },

  /** Indicador de estado de los sistemas que siguen corriendo. */
  status: {
    live: { en: 'Live', es: 'Activo' },
    // Fallback sin JavaScript: la fecha en crudo, que siempre es cierta.
    since: { en: 'in production since', es: 'en producción desde' },
    // Con JavaScript se sustituye por el conteo, que nunca envejece.
    days: { en: 'days in production', es: 'días en producción' },
  },

  notFound: {
    title:   { en: 'Process not found', es: 'Proceso no encontrado' },
    body: {
      en: 'Nothing is bound to this path. It was moved, renamed, or it never ran here in the first place.',
      es: 'No hay nada escuchando en esta ruta. La movieron, la renombraron, o nunca corrió aquí.',
    },
    rack:     { en: 'Status', es: 'Estado' },
    rackNow:  { en: 'right now', es: 'ahora mismo' },
    down:     { en: 'Not responding', es: 'No responde' },
    days:     { en: 'days', es: 'días' },
    back:     { en: 'Back to the systems', es: 'Volver a los sistemas' },
    contact:  { en: 'Report it to me', es: 'Repórtamelo' },
  },
  // Obliga a que cada entrada tenga los dos idiomas: si falta uno, no compila.
} satisfies Record<string, Record<string, Localized<string> | Localized<string[]>>>;
