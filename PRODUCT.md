# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Agencias y empresas de EE.UU. y Europa que subcontratan talento en LatAm** para un entregable concreto de automatización con IA. Confirmado por David el 2026-10-05.

- Pagan en USD y trabajan de forma asíncrona (Slack, Notion, pull requests): texto escrito antes que llamadas.
- Dentro de la agencia leen dos perfiles: alguien de negocio que filtra en diagonal (qué problema resuelve, si es fiable) y alguien técnico que valida (arquitectura, decisiones, código).
- Mercado secundario: LatAm hispanohablante, servido por la versión `/es/` y por referidos. No se optimiza para él.

## Product Purpose

ciroFolio es el portafolio profesional de David Ciro, servido en `www.itsciro.com/cirofolio`. **No es un ejercicio de diseño: es una herramienta comercial con una sola conversión**: que una agencia o empresa escriba para contratar un entregable freelance.

Éxito = mensajes entrantes por el formulario o el correo con un encargo concreto.

## Positioning

**Operador de sistemas vivos.** El argumento no es "a quién le facturé", sino "qué corre en producción ahora mismo sin nadie encima": sistemas propios con su fecha de puesta en marcha, que siguen funcionando y se pueden comprobar.

Narrativa central: *construyo pilotos que después convierto en plataformas configurables, y sé dónde está la frontera*, es decir, qué se vuelve configuración y qué no se abstrae nunca (salvaguardas de venta, validación de pagos o de cifras).

## Operating Context

- Sitio estático bilingüe: inglés canónico en `/`, español en `/es/`, sin redirección automática por idioma.
- El tráfico llega sobre todo desde LinkedIn; las tarjetas de Open Graph forman parte del producto.
- El primer contacto es asíncrono y por escrito: formulario corto (Web3Forms) más correo y LinkedIn. La llamada la ofrece David en su respuesta, ya con contexto.
- David trabaja async-first en UTC-5 (Medellín, Colombia), con solape completo con la jornada de EE.UU.

## Capabilities and Constraints

- **Stack existente:** Astro 6 + Tailwind 3 + MDX, desplegado en Vercel (proyecto `ciro-folio`) y servido mediante un rewrite desde el proyecto BioLink (`itsciro.com/cirofolio/*` → `ciro-folio.vercel.app/*`). Toda ruta interna pasa por la base `/cirofolio`; nada la hardcodea.
- **Contenido centralizado:** el copy vive en `src/data/` y `src/i18n/ui.ts` con el tipo `Localized<T>`, que rompe el build si falta un idioma. Los casos de estudio son MDX en `src/content/work/` y un caso publicado debe existir en los dos idiomas.
- **Datos vivos:** los días en producción se calculan en el cliente desde `liveSince` (`src/data/projects.ts`), nunca en el build.
- **Gates de build:** `pnpm build` (incluye `astro check`), `pnpm check:contrast` y `pnpm check:og`.
- **Analytics:** Vercel Web Analytics, cargado con la base `/cirofolio` para que las visitas cuenten en este proyecto y no en BioLink.
- **Sin precios públicos** (confirmado 2026-10-05): la tarifa se da en el primer correo. Un número en la web ancla: bajo encierra, alto descarta.
- **Sin "book a call"** (confirmado 2026-10-05): ningún CTA lleva a agendar una llamada.
- **Abierto:** el anonimato del caso Taxi Dispatch Platform (sin nombre, ciudad ni tamaño de flota, a petición del socio) y la regla de "escala honesta" no se confirmaron como obligatorios el 2026-10-05. El copy actual sigue respetando ambos; cambiarlo requiere decisión explícita de David.

## Brand Commitments

- **Nombre y firma:** David Ciro ("Ciro" como marca personal). El contacto va a su nombre, no a una empresa.
- **Galactic AIMA** (empresa de la que es co-fundador) aparece una sola vez, como respaldo en la trayectoria, nunca como identidad.
- **Voz:** primera persona técnica ("diseño, construyo y opero"), frases concretas, una etiqueta por intención. Async-first se declara como forma de trabajo, nunca como nivel de idioma.
- **Foto:** el retrato actual se mantiene por ahora (decisión del 2026-10-05).
- Dirección visual vigente en `DESIGN.md`.

## Evidence on Hand

- **Sistemas con fecha de producción** (`src/data/projects.ts`, iguales a producción): galacticBills (2025-09-24), beBetterStudio (2026-04-18), Conversational Commerce Engine (2026-07-16), LinkedIn Publisher (2026-07-30).
- **Casos de estudio publicados** (`src/content/work/`): galacticBills, beBetterStudio y Taxi Dispatch Platform, cada uno con métricas propias en su frontmatter.
- **Prueba pública:** cuenta `bebetter.path` y el carrusel enlazado en el caso de beBetterStudio.
- **Ausencias que no se deben fabricar:** no hay ningún caso de cliente cerrado y facturado; no hay testimonios, logos de clientes ni precios. Ningún trabajo futuro debe inventarlos.

## Product Principles

1. **Una sola conversión.** Cada sección empuja hacia que una agencia escriba; lo que no ayuda a eso no entra.
2. **Probar, no afirmar.** Sistemas en producción, fechas, métricas y diagramas valen más que adjetivos.
3. **Primero la prueba, después la oferta.** Quien llega ve qué corre antes de ver cómo contratar.
4. **Asíncrono por diseño.** El canal de contacto es escrito; el sitio nunca empuja a una llamada.
5. **Paridad bilingüe.** Lo que dice un idioma lo dice el otro; el build lo garantiza.

## Accessibility & Inclusion

**WCAG 2.1 AA** como requisito (confirmado 2026-10-05). El contraste de todos los tokens se verifica en cada build con `pnpm check:contrast`, en tema claro y oscuro. El movimiento respeta `prefers-reduced-motion` y ningún gráfico comunica solo con color.
