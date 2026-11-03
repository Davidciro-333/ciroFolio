import type { Localized } from '../i18n/config';

/**
 * Modalidades de contratación.
 *
 * Sustituye a la lista de servicios genéricos ("Desarrollo Web", "Diseño
 * UI/UX"). Una agencia no compra un chatbot: compra capacidad, en un formato
 * concreto. Esto responde a "¿cómo te contrato?", no a "¿qué sabes hacer?".
 *
 * Sin precios públicos: la tarifa se decide por dentro y se responde en el
 * primer correo. Un número en la web ancla — bajo encierra, alto descarta.
 *
 * Desde el 2026-11-02 también se ofrece tiempo completo en remoto: el lector
 * puede ser una empresa que contrata empleado, no solo una agencia que
 * subcontrata un entregable. Va como franja ancha (`wide`) bajo las cuatro.
 */

export interface Engagement {
  num: string;
  title: Localized;
  description: Localized;
  /** Formato y condiciones, no tecnologías. */
  tags: Localized<string[]>;
  /** Ocupa toda la fila, debajo de las modalidades por proyecto. */
  wide?: boolean;
}

export const engagements: Engagement[] = [
  {
    num: '01',
    title: {
      en: 'Fixed-scope project',
      es: 'Proyecto cerrado',
    },
    description: {
      en: 'You have a system in mind and want it delivered. I scope it, build it, deploy it and hand it over documented, with the automation, the integrations and the infrastructure it needs to run without me.',
      es: 'Tienes un sistema en mente y quieres que quede entregado. Lo dimensiono, lo construyo, lo despliego y lo entrego documentado, con la automatización, las integraciones y la infraestructura que necesita para funcionar sin mí.',
    },
    tags: {
      en: ['Defined scope', 'End-to-end delivery', 'Documented handover'],
      es: ['Alcance definido', 'Entrega end-to-end', 'Traspaso documentado'],
    },
  },
  {
    num: '02',
    title: {
      en: 'Monthly retainer',
      es: 'Retainer mensual',
    },
    description: {
      en: 'Ongoing capacity for teams running automation in production: new workflows, integrations, incident triage and the maintenance nobody has time for: expiring tokens, provider API changes, silent failures.',
      es: 'Capacidad continua para equipos con automatización en producción: workflows nuevos, integraciones, diagnóstico de incidentes y el mantenimiento que nadie tiene tiempo de hacer: tokens que caducan, APIs de proveedores que cambian, fallos silenciosos.',
    },
    tags: {
      en: ['Monthly hours', 'Operations included', 'Async communication'],
      es: ['Horas mensuales', 'Operación incluida', 'Comunicación asíncrona'],
    },
  },
  {
    num: '03',
    title: {
      en: 'Team augmentation',
      es: 'Refuerzo a tu equipo',
    },
    description: {
      en: 'I join your team for a sprint or a quarter and work inside your process: your repo, your board, your review flow. Useful when the automation or AI-integration work is real but doesn’t justify a full-time hire yet.',
      es: 'Me sumo a tu equipo por un sprint o un trimestre y trabajo dentro de tu proceso: tu repo, tu tablero, tu flujo de revisión. Útil cuando el trabajo de automatización o integración de IA es real pero todavía no justifica una contratación a tiempo completo.',
    },
    tags: {
      en: ['Your process', 'UTC-5 overlap', 'Weekly or sprint-based'],
      es: ['Tu proceso', 'Solape UTC-5', 'Por semana o por sprint'],
    },
  },
  {
    num: '04',
    title: {
      en: 'Technical audit',
      es: 'Auditoría técnica',
    },
    description: {
      en: 'A review of automation you already have running, with findings backed by evidence: what breaks silently, what has no error path, what will not survive a second client. You get a prioritised report, not a sales pitch.',
      es: 'Revisión de la automatización que ya tienes corriendo, con hallazgos respaldados por evidencia: qué falla en silencio, qué no tiene ruta de error, qué no sobrevive a un segundo cliente. Recibes un informe priorizado, no una propuesta comercial.',
    },
    tags: {
      en: ['Evidence-backed', 'Prioritised report', 'Short turnaround'],
      es: ['Con evidencia', 'Informe priorizado', 'Entrega corta'],
    },
  },
  {
    num: '05',
    title: {
      en: 'Full-time, remote',
      es: 'Tiempo completo, en remoto',
    },
    description: {
      en: 'When automation is a role on your team and not a project, I can take it on full time: find where the manual hours go across your departments, build the workflows that connect your internal tools, measure the models against your team’s own judgement, and document every flow so anyone can maintain it.',
      es: 'Cuando la automatización es un rol en tu equipo y no un proyecto, puedo asumirlo a tiempo completo: encontrar dónde se van las horas manuales en cada área, construir los flujos que conectan tus herramientas internas, medir los modelos contra el criterio de tu propio equipo y documentar cada flujo para que cualquiera pueda mantenerlo.',
    },
    tags: {
      en: ['Full-time', '100% remote', 'Native Spanish'],
      es: ['Tiempo completo', '100% remoto', 'Español nativo'],
    },
    wide: true,
  },
];
