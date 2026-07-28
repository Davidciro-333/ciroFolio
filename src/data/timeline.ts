import type { Localized } from '../i18n/config';

/**
 * Trayectoria y áreas de habilidad.
 *
 * Galactic AIMA aparece UNA sola vez y como respaldo, no como identidad:
 * justifica de dónde salen la infraestructura propia y los sistemas en
 * producción, sin que el visitante crea que habla con un intermediario.
 */

export interface TimelineEntry {
  /** Año de inicio. */
  start: string;
  /** Año de fin, o `null` si sigue en curso (se renderiza como "hoy"/"now"). */
  end: string | null;
  role: Localized;
  org: Localized;
  kind: Localized;
  description: Localized;
  tags: string[];
  active: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    // Galactic AIMA se fundó el 2025-08-12.
    start: '2025',
    end: null,
    role: { en: 'Co-founder · Product & Infrastructure', es: 'Co-fundador · Producto e Infraestructura' },
    org: { en: 'Galactic AIMA', es: 'Galactic AIMA' },
    kind: { en: 'Own company', es: 'Empresa propia' },
    description: {
      en: 'I lead product development and run the infrastructure: self-hosted n8n on AWS EC2 behind nginx, messaging integrations, and the AI systems the agency sells.',
      es: 'A cargo del desarrollo de productos y de la infraestructura: n8n self-hosted en AWS EC2 detrás de nginx, integraciones de mensajería y los sistemas de IA que vende la agencia.',
    },
    tags: ['AWS EC2', 'Docker', 'n8n', 'LLM APIs', 'nginx'],
    active: true,
  },
  {
    start: '2022',
    end: null,
    role: { en: 'Freelance Developer & UI Designer', es: 'Desarrollador Web & Diseñador UI' },
    org: { en: 'Independent', es: 'Freelance' },
    kind: { en: 'Independent work', es: 'Trabajo independiente' },
    description: {
      en: 'Design and development of digital products for clients across Latin America and Spain. Full-stack work with React, Astro and Next.js; interface design in Figma; workflow automation with n8n.',
      es: 'Diseño y desarrollo de productos digitales para clientes en Latinoamérica y España. Proyectos full-stack con React, Astro y Next.js; diseño de interfaces en Figma; automatización de flujos con n8n.',
    },
    tags: ['React', 'Astro', 'Figma', 'n8n', 'TypeScript'],
    active: true,
  },
  {
    start: '2020',
    end: null,
    role: { en: 'Visual & Motion Designer', es: 'Diseñador Visual & Motion' },
    org: { en: 'Own projects and collaborations', es: 'Proyectos propios y colaboraciones' },
    kind: { en: 'Design & Motion', es: 'Diseño & Motion' },
    description: {
      en: 'Visual identities, social media assets and motion graphics. The foundation behind the design judgement I bring to every product.',
      es: 'Identidades visuales, piezas para redes sociales y motion graphics. Base que alimenta el criterio estético en cada proyecto de producto.',
    },
    tags: ['Visual Identity', 'Motion Graphics', 'Branding'],
    active: true,
  },
  {
    start: '2020',
    end: '2024',
    role: { en: 'Software Development Degree', es: 'Tecnólogo en Desarrollo de Software' },
    org: {
      en: 'Institución Universitaria Pascual Bravo',
      es: 'Institución Universitaria Pascual Bravo',
    },
    kind: { en: 'Education', es: 'Formación' },
    description: {
      en: 'Software engineering fundamentals, databases, networking and systems architecture — plus continuous self-teaching in modern web development and automation.',
      es: 'Fundamentos de ingeniería de software, bases de datos, redes y arquitectura de sistemas. Complementado con aprendizaje autodidacta continuo en desarrollo web moderno y automatización.',
    },
    tags: ['Software Engineering', 'Databases', 'Networking'],
    active: false,
  },
];

export interface SkillGroup {
  category: Localized;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: { en: 'Automation & AI', es: 'Automatización & IA' },
    items: ['n8n', 'LLM APIs', 'Embeddings', 'Redis', 'Webhooks'],
  },
  {
    category: { en: 'Development', es: 'Desarrollo' },
    items: ['React', 'Astro', 'TypeScript', 'Node.js', 'Flutter'],
  },
  {
    category: { en: 'Infrastructure', es: 'Infraestructura' },
    items: ['AWS EC2', 'Docker', 'Vercel', 'SQLite', 'Git'],
  },
];
