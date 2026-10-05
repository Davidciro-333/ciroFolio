# DESIGN.md — ciroFolio · "Galería"

Dirección visual del sitio. Aprobada el 2026-10-04: base **D2 · Galería**, más el **diagrama vivo** de D3 y el **subrayador** de D4.
Registro de la decisión: [`propuestas/direction-approved.md`](propuestas/direction-approved.md) · contrato: [`propuestas/design-contract.md`](propuestas/design-contract.md) · traspaso: [`propuestas/implementation-handoff.md`](propuestas/implementation-handoff.md).
Mockup de referencia: [`propuestas/d2-galeria.html`](propuestas/d2-galeria.html) (claro y oscuro).

---

## 1. Visual Theme & Atmosphere

**Una galería luminosa de sistemas que siguen funcionando.** Mucho aire, una sola idea por sección y cada sistema expuesto como pieza de museo con **una cifra real como protagonista**. La foto de David abre la página y ancla el lado humano.

- **Sensación objetivo** (del brief): fiable y sobrio, una persona que disfruta su trabajo y lo hace bien.
- **Dos lectores a la vez**: negocio lee titulares y cifras en diagonal; técnico baja a los casos y al diagrama.
- **Tres momentos firma** (y solo tres):
  1. **La cifra protagonista**: cada sistema se resume en un número verificable (días en producción, tests, fuentes).
  2. **El diagrama vivo** (de D3): la arquitectura de un caso, con la **frontera entre lo configurable y lo fijo por diseño** dibujada.
  3. **El subrayador** (de D4): barre una o dos frases clave del texto cuando se leen.
- **Tema**: claro por defecto. Oscuro automático vía `prefers-color-scheme` + conmutador manual recordado.
- **Diales** (taste-skill): `DESIGN_VARIANCE 6 · MOTION_INTENSITY 5 · VISUAL_DENSITY 3`.

## 2. Color

Un solo acento: **azul de acción**. Todo lo demás es escala de grises neutra. Contrastes calculados (WCAG 2.x) contra su fondo real.

| Token | Claro | Oscuro | Uso | Contraste (claro / oscuro) |
|---|---|---|---|---|
| `--bg` | `#ffffff` | `#0a0a0b` | Lienzo | — |
| `--parch` | `#f5f5f7` | `#1c1c1e` | Tiles, banda de contacto, pie | — |
| `--ink` | `#1d1d1f` | `#f5f5f7` | Titulares, texto principal | 16.8:1 / 18.2:1 |
| `--ink-2` | `#424245` | `#c7c7cc` | Texto de lectura secundario | 9.2:1 / 10.1:1 (sobre `--parch`) |
| `--ink-3` | `#6e6e73` | `#98989d` | Pies, etiquetas, **líneas del diagrama** | 4.7:1 / 5.9:1 (sobre `--parch`) |
| `--line` | `#e0e0e3` | `#2c2c2e` | Hairlines decorativas (nunca portan significado) | — |
| `--blue` | `#0066cc` | `#2997ff` | Enlaces, foco, paquetes del diagrama | 5.6:1 / 6.6:1 |
| `--pill-bg` | `#0066cc` | `#0071e3` | Fondo del botón primario (texto blanco) | 5.6:1 / 4.7:1 |
| `--mark` | `#cfe3fa` | `#173a63` | Subrayador (fondo bajo texto) | `--ink` encima 12.8:1 / 10.6:1 |
| `--live` | `#1f9d55` | `#30d158` | **Solo** el punto de estado "Live" | 3.2:1 / 8.4:1 (gráfico, no texto) |
| `--nav-bg` | `rgba(255,255,255,.72)` | `rgba(10,10,11,.72)` | Nav translúcida | — |
| `--tint` | `#e8f1fb` | `#10223a` | Único degradado permitido: esquina del tile principal | — |
| `--inv-*` | tile oscuro `#1d1d1f` | tile claro `#f5f5f7` | **Tile invertido**: siempre el polo opuesto de la página | 15.5:1 |

Reglas:
- **Color lock**: el azul es el único color con intención. Ningún otro acento en ninguna sección, incluidos 404, OG y casos.
- `--live` es semántico: siempre acompañado de la palabra "Live"; nunca comunica solo con color.
- El botón primario en oscuro usa `#0071e3`, **no** `#2997ff` (blanco sobre `#2997ff` = 3.0:1, falla).
- `#ffffff` puro como lienzo claro es deliberado (lenguaje galería); el negro puro no se usa nunca.
- En oscuro la foto baja a `brightness(.88)` para no deslumbrar.
- `pnpm check:contrast` debe actualizarse con estos pares y seguir siendo un gate de build.

## 3. Typography

**Una sola familia: Plus Jakarta Sans** (variable, 400–700), autoalojada. Sin monoespaciada: las cifras usan `font-variant-numeric: tabular-nums`.

| Rol | Tamaño | Peso | Interlineado | Tracking |
|---|---|---|---|---|
| Display hero | `clamp(44px, 6.4vw, 80px)` | 700 | 1.04 | −0.045em |
| Título de sección | `clamp(36px, 4.6vw, 56px)` | 700 | 1.06 | −0.04em |
| Cifra protagonista | `clamp(48px, 6vw, 80px)` | 700 | 1.0 | −0.05em, tabular |
| Frase de "Sobre mí" | `clamp(30px, 3.8vw, 46px)` | 600 | 1.15 | −0.035em |
| Título de tile | 28px | 700 | 1.1 | −0.03em |
| Lede | 21px | 400 | 1.45 | −0.01em |
| Cuerpo | 17px | 400 | 1.5 | −0.01em |
| Secundario | 15–16px | 400 | 1.5 | −0.01em |
| Pie / etiqueta | 14px (mínimo 13px) | 400–600 | 1.4 | 0 |

Reglas:
- **Tracking según tamaño**: negativo en display, ~0 en texto pequeño. Nunca un valor fijo para todo.
- **Sin mayúsculas sostenidas ni eyebrows con barra** (`/ WHO I AM`). El kicker del hero va en sentence case, 19px/600, en `--ink-3`.
- Énfasis con peso o color (`--ink-3` para la segunda mitad de una frase), nunca mezclando familias.
- Los títulos tienen que caber en **español**, que es entre un 20 y un 30 % más largo: probar ambos idiomas.

## 4. Spacing & Grid

- Contenedor `max-width: 1120px`; márgenes laterales 24px (≥ 860px) y 16px (móvil). Sin scroll horizontal.
- Espaciado de sección: **120px** arriba en escritorio y **80px** en móvil.
- Bento: CSS Grid de **6 columnas**, `gap: 16px`. Una columna por debajo de 860px.
- Escala de 4px para el espaciado interno (padding de tile 36px escritorio, 28px móvil).
- **Shape lock** (regla documentada):
  - Tiles: `28px`.
  - Foto: `32px`.
  - Botones primarios: pill completo (`980px`).
  - Inputs y chips: `8px`.
  - Nada más.
- Altura de nav: 52px.

## 5. Layout & Composition

**Orden de la home** (cambia respecto al sitio actual: la prueba va antes de la oferta):

1. **Hero centrado**, la única sección centrada por ser un manifiesto. Máximo 4 elementos de texto:
   - kicker;
   - titular de 2 líneas como máximo;
   - lede de 20 palabras como máximo;
   - CTA primaria y enlace secundario.
2. **Retrato** de 3:2 con pie de foto fuera de la imagen (nombre, ciudad, UTC-5).
3. **Sistemas** en un bento con **exactamente 7 celdas** (spans 4+2 / 3+3 / 2+2+2).
   - Cada tile tiene etiqueta de estado, nombre, una frase y la cifra protagonista.
   - Un tile, el del motor conversacional, va **invertido**.
   - El tile principal lleva el único degradado (`--tint`).
4. **Trabajar juntos**: 4 columnas separadas por hairlines, **sin tarjetas**, y debajo la nota "No public rates…".
5. **Sobre mí**:
   - una frase grande con **subrayador**;
   - 3 columnas cortas;
   - 3 cifras en fila.
6. **Experiencia**: lista de 4 filas centrada a 820px.
7. **Contacto**: banda `--parch` a todo el ancho con CTA y LinkedIn. El formulario existente se mantiene y se reestiliza.

**Página de caso de estudio:**
- Cabecera con nombre y cifra protagonista.
- **Diagrama vivo** a partir de 860px.
- El texto MDX existente.
- `Pipeline` (la lista `<ol>`), que sigue siendo la versión accesible y la de móvil.

Reglas:
- Ninguna familia de layout se repite en dos secciones.
- El zigzag de imagen y texto está prohibido.

**404** (mockup `propuestas/d2-404.html`): redibujada en este lenguaje, sin pixel art. Cifra "404" como protagonista y copy actual de `ui.notFound`. A la derecha, un tile "Status" con 5 bahías: los 4 sistemas reales en producción (Live con sus días) y la ruta pedida como bahía caída ("Not responding", contorno de 2px en `--ink`). Conserva la idea de `PixelServer`, que se retira.

## 6. Components

- **Nav**:
  - translúcida (`backdrop-filter: saturate(180%) blur(20px)`) y en una sola línea;
  - marca a la izquierda y enlaces centrados (Systems · Work with me · About · Experience);
  - a la derecha: conmutador de tema ◐, ES/EN y el enlace "Start a conversation ›".
- **Botón primario (`Pill`)**: `--pill-bg` y texto blanco 17px/500, padding 12×24. En `:active`, `scale(.97)`.
- **Enlace de texto**: `--blue` con " ›" al final. El subrayado aparece en hover.
- **Tile**: fondo `--parch`, radio 28 y `min-height` 360 (320 en los pequeños). La cifra va abajo (`margin-top: auto`).
  - Variante `inverted`: usa los tokens `--inv-*`.
- **Figure (cifra protagonista)**: número tabular más una línea de contexto en `--ink-3`. Cifras de la home: galacticBills = días en producción · beBetterStudio = **4** redes publicadas en calendario (se descartó 3.840 → 385 por no ayudar en la home) · Taxi = 7 circuitos · Commerce = "Configuration, not a rewrite." · LinkedIn = 14 fuentes · SignalFactory = 2×2 · ciro_finanzas = 182 tests.
  - Las cifras de días en producción se calculan desde `liveSince`.
- **LiveDot**: punto de 8px en `--live`, siempre seguido del texto "Live".
- **Highlight (subrayador)**: `<mark>` con `background: linear-gradient(var(--mark),var(--mark)) no-repeat 0 85% / 0% 62%`. Anima a `100% 62%`.
  - **Máximo 2 por página.**
- **SystemDiagram (diagrama vivo)**:
  - Es un SVG generado a partir de los **mismos `steps` de `Pipeline`**, con un flag nuevo `fixed: true` en los pasos que nunca son configuración.
  - Nodos: rectángulos de radio 8, borde `--ink-3` (contraste ≥ 3:1) y texto de 13px/500. El nodo central va relleno de `--ink`.
  - Frontera de lo fijo: contorno discontinuo en `--ink-3` y **etiqueta escrita**: "Fixed by design. Never in a config file." No se comunica solo con color.
  - Los paquetes son puntos de 3,5px en `--blue`.
  - Lleva `aria-hidden="true"`. La versión accesible es la `<ol>` de `Pipeline`, que se renderiza siempre (en escritorio se puede plegar bajo el SVG, pero sigue presente para el lector de pantalla).
  - Por debajo de 860px no se muestra el SVG, solo `Pipeline`.
- **ThemeToggle**:
  - Alterna respecto al tema que se ve en ese momento y escribe `data-theme` en `<html>`.
  - Persiste en `localStorage` dentro de `try/catch`.
  - Un script inline en `<head>` lo aplica antes de pintar para que no haya parpadeo.
- **Formulario**: el `ContactForm` actual con sus campos y su orden intactos (por la analítica de Web3Forms).
  - Etiquetas encima, inputs de 16px y radio 8, foco con outline de 2px en `--blue`.
  - Los `<select>` declaran `color-scheme` para que el desplegable nativo no salga blanco sobre blanco (bug ya visto en la v1).

## 7. Motion & Interaction

**Con intención: pocas animaciones, cada una explica algo.** Curva única `--spring: cubic-bezier(0.32, 0.72, 0, 1)`, críticamente amortiguada y sin rebote.

| Animación | Qué comunica | Especificación |
|---|---|---|
| Entrada de bloques | Jerarquía y lectura en orden | `opacity 0→1`, `translateY 32px→0`, 900ms `--spring`, escalonado 70ms (máx. 5), una vez, IntersectionObserver al 12 % |
| Foto que crece | Presencia de la persona | CSS scroll-driven `animation-timeline: view()`, `scale .88→1`, radio 48→32. Sin soporte: estática |
| Cifras que cuentan | El tiempo en producción se acumula | Cuenta de 0 al valor real en 1400ms, ease-out cuártica, una vez, al 50 % visible. **Solo** para días en producción |
| Subrayador | Cuál es la frase que importa | `background-size 0→100%`, 1000ms `--spring`, 250ms de retardo, una vez |
| Diagrama vivo | El sistema está encendido y la frontera existe | Conexiones que se trazan 1,4s, una vez. Después, un mensaje recorre la ruta cada ~6s **solo mientras es visible** (se pausa fuera de pantalla) |
| Hover de tile | Que se puede abrir | `translateY(-4px)`, 500ms |
| Pulsación | Respuesta inmediata | `scale(.97)` en `:active`, 100–200ms |
| Cambio de tema | Sin fogonazo de brillo | `background-color`/`color` 400ms |

Reglas:
- Solo se anima `transform`, `opacity` y `background-size`, nunca propiedades de layout.
- Nada de `window.addEventListener('scroll')`. El nav actual usa uno y hay que migrarlo.
- **`prefers-reduced-motion: reduce`**:
  - todo pasa a estático;
  - las cifras muestran el valor final;
  - el subrayador aparece ya pintado;
  - el diagrama se muestra completo, sin paquetes en movimiento.
- Herramienta: CSS, IntersectionObserver y WAAPI. El diagrama puede usar `offset-path` con WAAPI; si hace falta una timeline, GSAP se carga solo en las páginas de caso. No se mezcla GSAP y Motion en el mismo componente.

## 8. Voice & Brand

- **Primera persona técnica**: "I design, deploy and operate…". Verbos concretos, frases cortas, tono tranquilo.
- **Una etiqueta por intención**, en toda la página:
  - contacto: **"Start a conversation"**;
  - sistemas: **"See the systems"**;
  - casos: **"Read the case"**;
  - en español, sus equivalentes fijos.
- **Cero rayas largas (—) y cero rayas medias (–) en el copy visible**:
  - se sustituyen por puntos, dos puntos o comas;
  - los rangos de años se escriben con guion ("2020-2024") o como "Since 2025".
- **Solo cifras reales**, cada una con su fuente en `src/data/` y sin escala inventada. Los datos de referencia son los que están en producción.
- **Async-first** se declara como forma de trabajo, nunca como nivel de idioma. Sin "book a call".
- Paridad bilingüe: todo el copy nuevo nace en EN y ES a la vez (`Localized<T>` rompe el build si falta uno).

## 9. Anti-patterns

Prohibido, sin excepciones salvo que se diga:

- **Paleta y adornos de la versión anterior**: el verde lima `#c8f135`, los orbes con `blur(80px)`, el pulso neón y el grano de ruido.
- **Color**:
  - un segundo acento (ni amarillo, ni naranja, ni morado);
  - degradados aparte del `--tint` del tile principal;
  - glows de cualquier tipo.
- **Nombre gigante en mayúsculas con foto circular en línea y "(20/26)"**: la plantilla de hero que se retira.
- **Etiquetas y numeración**:
  - microetiquetas con barra en mayúsculas (`/ RUNNING IN PRODUCTION`);
  - numeración `01/02` como adorno;
  - más de un eyebrow cada tres secciones.
- **Chips de tecnología dentro de los tiles de la home.** El stack va en el caso de estudio o en una línea de texto.
- **Datos y pruebas**:
  - capturas de producto falsas hechas con `div`;
  - terminales simuladas;
  - números sin fuente.
- **Tarjetas sin función**: tarjetas dentro de tarjetas, o tarjetas para las modalidades (van separadas por hairlines).
- **Texto**:
  - menos de 13px;
  - menos de 4.5:1 de contraste;
  - un placeholder usado como etiqueta.
- **Diagrama**:
  - de ancho fijo con scroll horizontal en el móvil;
  - que comunique solo con color;
  - que se reproduzca fuera de pantalla.
- **Cifras**: animar algo que no sea los días en producción, como contadores de stats estáticos ("5", "2020") o porcentajes.
- **Subrayador**: más de dos en una página o en un titular.
- **Rayas en el copy**: rayas largas (—) o medias (–) en cualquier texto visible, incluidos `alt`, botones y metadatos.
- **CTAs duplicadas** con la misma intención y distinto texto ("Contact" + "Start a conversation" + "Hablemos").
