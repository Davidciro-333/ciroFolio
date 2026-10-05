# Design contract — ciroFolio "Galería"

## Objetivo y artefacto
Rediseño visual del sitio Astro (home EN/ES, páginas de caso, 404, tarjetas OG). Conversión única: que una agencia o empresa de EE.UU./Europa escriba para contratar un entregable.
Audiencia: lector de negocio y lector técnico por igual.

## Evidencia
| Fuente | Qué aporta | Confianza |
|---|---|---|
| Brief del 2026-10-04 (5 respuestas) | Sensación, lectores, familias, movimiento, conservar solo la foto | provided |
| `direction-approved.md` | D2 de base + diagrama de D3 + subrayador de D4, claro por defecto + oscuro automático | provided |
| Mockups `propuestas/d2`, `d3`, `d4` | Tokens, composición, motion probados en navegador | observed |
| `awesome-design-md/apple`, `stripe`, `notion` | Lenguaje de referencia | observed |
| `src/data/*`, vault `Posicionamiento y mensaje` | Copy, cifras y reglas de mensaje | provided |
| `Pipeline.astro` + nota del vault del 2026-07-28 | El diagrama accesible debe seguir siendo una `<ol>` | observed |
| Script de contraste (scratchpad) | Todos los pares de color de DESIGN.md §2 | observed |

## Keep / Change / Do not copy
| Referencia | Keep | Change | Do not copy |
|---|---|---|---|
| Apple (D2) | Lienzo blanco/pergamino, un azul de acción, tiles tipo museo, foto protagonista, tracking por tamaño, nav translúcida | Tipografía (Plus Jakarta Sans en vez de SF), copy, cifras propias | Logos, iconografía, fotos de producto, frases de marketing de Apple |
| Stripe (D3) | Idea del diagrama de arquitectura como prueba, cifras tabulares | Paleta (navy/naranja → grises + azul), forma del diagrama | Mesh gradient, ilustraciones, UI de dashboard |
| Notion (D4) | Subrayador como gesto humano, primera persona | Color (amarillo → `--mark` azul, para un solo acento) | Iconos, emojis, layout de documento |
| Sitio actual | Contenido, i18n, IA de datos, `Pipeline`, formulario, foto | Todo lo visual | Lima, orbes, hero en mayúsculas, eyebrows con barra |

## Postura final
Galería luminosa, sobria y humana: blanco y grises, un solo azul, una familia tipográfica, mucho aire. Cada sistema se expone con una cifra real; el criterio senior se demuestra con un diagrama que dibuja la frontera entre configuración y lo fijo; una o dos frases llevan subrayador. El movimiento es escaso y explica algo.

## Riesgos y desconocidos
- **Subrayador azul en vez de amarillo** (inferred): decidido para no romper el acento único. Si David prefiere el amarillo de D4, hay que aceptarlo como segundo acento explícito.
- **Tarjetas OG** usan Nohemi en `src/lib/og.ts`: hay que pasarlas a Plus Jakarta Sans (satori necesita el archivo de fuente).
- ~~404 con pixel art~~ **Resuelto (2026-10-05):** se redibuja en lenguaje Galería, mockup `d2-404.html`. `PixelServer` se retira.
- ~~`liveSince`~~ **Resuelto (2026-10-05):** David confirma que los datos reales son los de producción; producción sirve 2025-09-24, 2026-04-18, 2026-07-16 y 2026-07-30, iguales a `projects.ts`.
- ~~3.840 → 385~~ **Resuelto (2026-10-05):** David la descarta como protagonista de la home ("no ayuda mucho"). beBetterStudio pasa a "4 networks, published on a schedule". Revisar también si se mantiene dentro del caso de estudio.
- **Diagrama del motor conversacional**: ese sistema no tiene caso todavía; los primeros diagramas vivos van en galacticBills y beBetterStudio.
- **Foto**: se mantiene el selfie actual por ahora (decisión de David, 2026-10-05).

## Quality gate
- [ ] Todos los pares de §2 pasan en `pnpm check:contrast` (claro y oscuro)
- [ ] Cero `—` y `–` en copy visible (grep en `src/data`, `src/i18n`, MDX)
- [ ] Home EN y ES sin desbordes a 375, 768, 1440
- [ ] Hero cabe en el primer viewport a 1440×900
- [ ] Bento con exactamente 7 celdas
- [ ] Reduced motion: todo estático y legible
- [ ] Diagrama: `<ol>` de `Pipeline` presente siempre; SVG solo ≥860px y `aria-hidden`
- [ ] Tema: sin parpadeo al cargar en oscuro; conmutador persiste
- [ ] `pnpm build` y `pnpm check:og` en verde
