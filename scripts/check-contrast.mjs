/**
 * Verifica el contraste WCAG de los tokens de color del sitio.
 *
 *   pnpm build && pnpm check:contrast
 *
 * Lee los valores del CSS YA COMPILADO, no del código fuente: así comprueba
 * lo que de verdad llega al navegador, incluso si algún token se sobreescribe
 * por el camino.
 *
 * Umbrales (WCAG 2.1 AA):
 *   4.5:1  texto normal
 *   3.0:1  texto grande (>=24px), elementos de interfaz y decorativos
 *
 * Sale con código 1 si algún token baja de su umbral, para poder enchufarlo
 * a CI cuando haga falta.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('No hay carpeta dist/. Ejecuta `pnpm build` primero.');
  process.exit(1);
}

const cssDir = join(DIST, '_astro');
const sources = [
  ...(existsSync(cssDir) ? readdirSync(cssDir).filter((f) => f.endsWith('.css')).map((f) => join(cssDir, f)) : []),
  join(DIST, 'index.html'),
].filter(existsSync);

const css = sources.map((f) => readFileSync(f, 'utf8')).join('\n');

const token = (name) => {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) {
    console.error(`Token --color-${name} no encontrado en el CSS compilado.`);
    process.exit(1);
  }
  return match[1];
};

const srgbToLinear = (channel) => {
  const v = channel / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * srgbToLinear((n >> 16) & 255) +
    0.7152 * srgbToLinear((n >> 8) & 255) +
    0.0722 * srgbToLinear(n & 255)
  );
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const WHITE = '#ffffff';
const surface = token('surface');

const checks = [
  ['text-primary',       token('text-primary'),       surface, 4.5, 'texto sobre superficie oscura'],
  ['text-secondary',     token('text-secondary'),     surface, 4.5, 'texto sobre superficie oscura'],
  ['text-muted',         token('text-muted'),         surface, 4.5, 'texto sobre superficie oscura'],
  ['text-faint',         token('text-faint'),         surface, 3.0, 'SOLO decorativo grande / UI'],
  ['neon',               token('neon'),               surface, 4.5, 'acento sobre superficie oscura'],
  ['on-light-primary',   token('on-light-primary'),   WHITE,   4.5, 'texto sobre tarjeta blanca'],
  ['on-light-secondary', token('on-light-secondary'), WHITE,   4.5, 'texto sobre tarjeta blanca'],
  ['on-light-muted',     token('on-light-muted'),     WHITE,   4.5, 'texto sobre tarjeta blanca'],
];

console.log(`Superficie oscura: ${surface}\n`);

let failed = 0;
for (const [name, hex, bg, min, use] of checks) {
  const r = ratio(hex, bg);
  const ok = r >= min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'OK   ' : 'FALLA'} ${name.padEnd(19)} ${hex}  ${r.toFixed(2).padStart(6)}:1  (mín ${min})  ${use}`,
  );
}

if (failed > 0) {
  console.error(`\n${failed} token(s) por debajo de su umbral de contraste.`);
  process.exit(1);
}

console.log('\nTodos los tokens cumplen su umbral.');
