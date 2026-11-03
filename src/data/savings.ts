import type { Localized } from '../i18n/config';
import counts from './savings.json';

/**
 * Horas de trabajo manual ahorradas, y su valor.
 *
 * horas = unidades contadas en producción × minutos que toma a mano.
 * Las unidades viven en `savings.json`, que reescribe cada mes un workflow de
 * n8n con datos de producción (no se edita a mano salvo para corregir). Su
 * forma es fija: { asOf, units: { slug: n }, pace: { slug: { posts, days } } }.
 *
 * Los minutos son estimaciones de punto medio, ni conservadoras ni infladas,
 * decididas con David. El valor usa una tarifa intermedia: por encima de un
 * asistente en LatAm y por debajo de uno en EE.UU.
 *
 * Solo entran sistemas con un conteo comprobable. galacticBills queda fuera
 * hasta tener el número de facturas de su hoja (otra cuenta de Google).
 */

export const HOURLY_RATE_USD = 20;
export const SAVINGS_AS_OF = counts.asOf;

type CountedSlug = keyof typeof counts.units;

export interface Saving {
  slug: CountedSlug;
  units: number;
  /** Qué se contó, con los minutos por unidad. */
  unit: Localized;
  /** Minutos que tomaría a mano cada unidad. */
  minutesEach: number;
}

const counted: Omit<Saving, 'units'>[] = [
  {
    // Días distintos con barridos archivados en S3 (sherlock-historico-mvp).
    slug: 'ad-library-radar',
    unit: { en: 'days of Ad Library review, 2 h each', es: 'días de revisión de la Biblioteca, 2 h cada uno' },
    minutesEach: 120,
  },
  {
    // Piezas con métricas en media_insights, en la VM.
    slug: 'bebetter-studio',
    unit: { en: 'pieces published across four networks, 30 min each', es: 'piezas publicadas en cuatro redes, 30 min cada una' },
    minutesEach: 30,
  },
  {
    // Filas de la hoja de interesados desde el 2026-09-30, sin las de prueba.
    slug: 'conversational-commerce',
    unit: { en: 'sales conversations handled, 10 min each', es: 'conversaciones de venta atendidas, 10 min cada una' },
    minutesEach: 10,
  },
];

export const savings: Saving[] = counted.map((s) => ({ ...s, units: counts.units[s.slug] }));

export const hoursOf = (s: Saving) => (s.units * s.minutesEach) / 60;

export const totalHours = savings.reduce((sum, s) => sum + hoursOf(s), 0);
export const totalValueUsd = totalHours * HOURLY_RATE_USD;

/**
 * El publicador es demasiado nuevo para sumar horas acumuladas: lleva días en
 * producción. Se muestra aparte, como proyección mensual a su ritmo real
 * (posts publicados o programados en la ventana), y NO entra en el total.
 */
const PUBLISHER_MINUTES_EACH = 20; // subir a IG y FB, escribir el copy y programar
const pace = counts.pace['publishing-studio'];

export const publisherPace = {
  posts: pace.posts,
  days: pace.days,
  postsPerMonth: (pace.posts / pace.days) * 30,
  hoursPerMonth: ((pace.posts / pace.days) * 30 * PUBLISHER_MINUTES_EACH) / 60,
  minutesEach: PUBLISHER_MINUTES_EACH,
};
