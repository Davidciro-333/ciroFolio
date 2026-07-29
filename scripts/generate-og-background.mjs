/**
 * Genera la textura de fondo de las tarjetas de Open Graph con Nano Banana Pro,
 * vía KIE AI, y la deja recortada en `src/assets/og-background.jpg`.
 *
 *   $env:KIE_API_KEY = "..."        # PowerShell
 *   node scripts/generate-og-background.mjs
 *
 * SE EJECUTA A MANO, no en el build. La imagen resultante se versiona en el
 * repo, así que `pnpm build` nunca llama a un servicio externo: si KIE AI está
 * caído o la clave caduca, el sitio sigue compilando igual.
 *
 * La key se lee del entorno a propósito — no se escribe en ningún archivo del
 * repositorio.
 *
 * Flujo de la API (docs.kie.ai):
 *   POST /api/v1/jobs/createTask  → data.taskId
 *   GET  /api/v1/jobs/recordInfo?taskId=…  → data.state, data.resultJson
 */

import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'assets', 'og-background.jpg');

const API = 'https://api.kie.ai/api/v1/jobs';
const KEY = process.env.KIE_API_KEY;

if (!KEY) {
  console.error('Falta KIE_API_KEY en el entorno.');
  console.error('PowerShell:  $env:KIE_API_KEY = "tu-clave"');
  process.exit(1);
}

// Medidas finales de la tarjeta (ratio 1.91:1 de Open Graph).
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/**
 * El prompt es deliberadamente restrictivo en dos cosas:
 *
 * 1. NADA de texto. Los títulos los compone satori con Nohemi; cualquier letra
 *    que dibuje el modelo sería basura visual bajo el texto real.
 * 2. Los dos tercios IZQUIERDOS casi vacíos, porque ahí van el kicker, el
 *    título y el resumen. La textura vive a la derecha, donde no compite.
 *
 * La lista de exclusiones evita la estética genérica de imagen generativa
 * —gradiente morado, orbes con glow, render 3D— que abarataría la tarjeta.
 */
const PROMPT = [
  'Abstract dark technical texture for a website social card background.',
  'Deep near-black charcoal field, almost pure #0a0a0c.',
  'A sparse, precise wireframe topology of thin connected lines and small nodes,',
  'like the schematic of a data pipeline, concentrated in the RIGHT THIRD of the frame',
  'and dissolving into empty darkness across the left two thirds.',
  'Only a few nodes carry a faint acid-lime #c8f135 highlight; everything else is cool desaturated grey.',
  'Very fine film grain. Flat, restrained, editorial — the look of an engineering diagram.',
  'Negative space is the point: the left side must stay almost entirely empty and dark.',
  'No text, no letters, no numbers, no logos, no watermarks.',
  'No glowing orbs, no purple, no blue neon gradient, no 3D render, no lens flare, no sci-fi HUD.',
].join(' ');

async function api(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  const body = await res.json().catch(() => null);
  if (!res.ok || !body) {
    throw new Error(`HTTP ${res.status} en ${path}: ${JSON.stringify(body)}`);
  }
  if (body.code !== 200) {
    throw new Error(`API ${body.code} en ${path}: ${body.msg}`);
  }
  return body.data;
}

async function createTask() {
  const data = await api('/createTask', {
    method: 'POST',
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt: PROMPT,
        image_input: [], // vacío = texto a imagen
        aspect_ratio: '16:9',
        resolution: '2K', // se recorta a 1200×630, así que sobra resolución
        output_format: 'png',
      },
    }),
  });

  if (!data?.taskId) throw new Error(`Sin taskId: ${JSON.stringify(data)}`);
  return data.taskId;
}

async function waitForResult(taskId, { intervalMs = 4000, timeoutMs = 300000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let last = '';

  while (Date.now() < deadline) {
    const data = await api(`/recordInfo?taskId=${encodeURIComponent(taskId)}`);
    const state = data.state;

    if (state !== last) {
      console.log(`  estado: ${state}${data.progress ? ` (${data.progress}%)` : ''}`);
      last = state;
    }

    if (state === 'success') {
      const result = JSON.parse(data.resultJson ?? '{}');
      const url = result.resultUrls?.[0];
      if (!url) throw new Error(`success sin resultUrls: ${data.resultJson}`);
      console.log(`  créditos consumidos: ${data.creditsConsumed ?? '?'}`);
      return url;
    }

    if (state === 'fail') {
      throw new Error(`La generación falló [${data.failCode}]: ${data.failMsg}`);
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }

  throw new Error(`Sin resultado tras ${timeoutMs / 1000}s (taskId ${taskId})`);
}

console.log('1. Creando la tarea…');
const taskId = await createTask();
console.log(`   taskId: ${taskId}`);

console.log('2. Esperando la generación…');
const imageUrl = await waitForResult(taskId);
console.log(`   listo: ${imageUrl}`);

console.log('3. Descargando…');
const res = await fetch(imageUrl);
if (!res.ok) throw new Error(`No se pudo descargar la imagen: HTTP ${res.status}`);
const original = Buffer.from(await res.arrayBuffer());
const meta = await sharp(original).metadata();
console.log(`   original: ${meta.width}×${meta.height}, ${Math.round(original.length / 1024)} kB`);

console.log('4. Recortando a 1200×630…');
// `cover` recorta el sobrante de altura al pasar de 16:9 (1.78) a 1.91:1,
// conservando el ancho completo: la composición horizontal es la que importa.
const cropped = await sharp(original)
  .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();

await writeFile(OUT, cropped);
console.log(`   guardado: src/assets/og-background.jpg (${Math.round(cropped.length / 1024)} kB)`);
console.log('\nListo. Ahora `pnpm build` y las tarjetas saldrán con la textura.');
