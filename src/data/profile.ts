import type { Localized } from '../i18n/config';

/**
 * Datos de perfil y contacto.
 *
 * NOTA DE FASE: el copy de la bio conserva el tono de la versión anterior.
 * El reposicionamiento (automatización con IA, operador de sistemas vivos,
 * async-first) entra en la Fase 2 — al estar centralizado aquí, será editar
 * este archivo y no tocar ningún componente.
 */

export const profile = {
  name: 'David Ciro',
  email: 'davidcirortiz06@gmail.com',
  location: { en: 'Medellín, Colombia', es: 'Medellín, Colombia' } as Localized,
  timezone: 'UTC-5',

  /** Bio corta del hero. */
  heroBio: {
    en: 'I’m David Ciro, a developer and UI designer based in Medellín. I build fast, well-crafted interfaces — from the design in Figma to the production deploy.',
    es: 'Soy David Ciro, desarrollador web y diseñador UI basado en Medellín. Construyo interfaces rápidas, bonitas y funcionales — desde el diseño en Figma hasta el deploy en producción.',
  } as Localized,

  /** Párrafos de la sección "Sobre mí". */
  aboutParagraphs: [
    {
      en: 'I’m a developer and UI designer based in Medellín, Colombia. I’ve worked freelance since 2022, building digital products that pair solid engineering with design that actually matters.',
      es: 'Soy desarrollador web y diseñador UI basado en Medellín, Colombia. Trabajo como freelance desde 2022, construyendo productos digitales que combinan código sólido con diseño que realmente importa.',
    },
    {
      en: 'I started in visual design and motion back in 2020 — that gives me a different angle: I understand both the designer’s intent and the developer’s constraints. I specialise in React, Astro and automation with n8n.',
      es: 'Empecé en diseño visual y motion en 2020 — eso me da una perspectiva diferente: entiendo tanto la intención del diseñador como las restricciones del desarrollador. Me especializo en React, Astro y automatización con n8n.',
    },
    {
      en: 'I hold a Software Development degree from Institución Universitaria Pascual Bravo (2020–2024). The rest I learned by shipping real things.',
      es: 'Soy Tecnólogo en Desarrollo de Software por la Institución Universitaria Pascual Bravo (2020–2024). El resto lo aprendí construyendo cosas reales.',
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
