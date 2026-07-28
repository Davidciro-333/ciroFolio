# Cirofolio v2 — Contexto del proyecto

Este documento resume todas las decisiones de diseño y desarrollo tomadas
durante la fase de prototipado. Úsalo como referencia para continuar el
proyecto sin perder contexto.

---

## El proyecto

Portfolio personal de **David Ciro** (`itsciro.com/cirofolio`).
Rediseño completo desde cero — nuevo sistema visual, nuevas secciones,
nuevas animaciones.

**Stack definido:**
- Astro 4
- Tailwind CSS 3 (con tokens personalizados ya configurados)
- Motion (`motion` package) para animaciones
- Fuente display: **Nohemi** (descarga en fontshare.com/fonts/nohemi)
- Fuente body: **Inter** (Google Fonts)

---

## Referencia visual principal

El portafolio **inspiro-db.webflow.io** es la referencia directa de diseño.
Sus características clave que hay que replicar:

- Tipografía masiva como elemento visual (nombre ocupa 60-70% del hero)
- Un solo color de acento muy saturado sobre fondo casi negro
- Secciones como "tarjetas flotantes" que alternan dark/white
- Proyectos presentados como showcase editorial full-width con browser mockup
- El botón `+` circular en el nav (estilo minimal)
- Separadores horizontales sutiles entre items (0.5px, baja opacidad)

---

## Sistema de diseño

### Paleta de color

| Token CSS                | Valor       | Uso                          |
|--------------------------|-------------|------------------------------|
| `--color-base`           | `#0a0a0c`   | Fondo de página              |
| `--color-surface`        | `#111115`   | Cards oscuras                |
| `--color-surface-2`      | `#181820`   | Cards oscuras secundarias    |
| `--color-neon`           | `#c8f135`   | **Acento único** — acid green|
| `--color-neon-dim`       | `#a0c020`   | Hover del acento             |
| `--color-text-primary`   | `#ffffff`   | Texto principal              |
| `--color-text-secondary` | `#9999a8`   | Texto secundario             |
| `--color-text-muted`     | `#555560`   | Descripciones, body          |
| `--color-text-faint`     | `#33333e`   | Texto muy apagado, footers   |
| `--color-border-dark`    | `rgba(255,255,255,0.07)` | Bordes en dark  |
| `--color-border-light`   | `rgba(0,0,0,0.08)`      | Bordes en white |

**Regla de oro:** el verde `#c8f135` es el ÚNICO color de acento.
No usar gradientes, no mezclar con otros colores vivos.

### Tipografía

**Nohemi** — solo para display/headlines, siempre uppercase, weight 800.
**Inter** — todo lo demás (body, UI, labels).

| Clase CSS        | Font    | Size (clamp)              | Uso                        |
|------------------|---------|---------------------------|----------------------------|
| `.type-hero`     | Nohemi  | clamp(64px, 10vw, 120px)  | Nombre en hero             |
| `.type-section`  | Nohemi  | clamp(36px, 5vw, 56px)    | Títulos de sección         |
| `.type-project`  | Nohemi  | clamp(28px, 4vw, 48px)    | Nombres de proyectos       |
| `.type-service`  | Nohemi  | clamp(18px, 2.5vw, 26px)  | Nombres de servicios       |
| `.type-cta`      | Nohemi  | clamp(40px, 6vw, 72px)    | CTA de contacto            |
| `.type-year`     | Nohemi  | clamp(32px, 5vw, 52px)    | El decorativo `(20/25)`    |
| `.type-label`    | Inter   | 10px                      | Labels `/ sección`         |
| `.type-body`     | Inter   | 13px                      | Texto descriptivo          |
| `.type-body-strong` | Inter | 14px                     | Párrafos con peso          |
| `.type-ui`       | Inter   | 12px                      | Nav links, metadata        |

### Componentes base (ya definidos en `global.css`)

```
.card-dark      → bg #111115, radius 20px
.card-light     → bg #ffffff, radius 20px
.btn-primary    → fondo neon, texto negro, radius 99px
.btn-ghost      → borde sutil, texto muted, radius 99px
.btn-circle     → círculo neon 36px con ↗ (CTA de contacto)
.btn-nav-circle → círculo con borde, símbolo + (nav)
.tag            → etiqueta con borde neon sutil
.text-neon      → color #c8f135
.sep-dark       → línea 0.5px rgba(255,255,255,0.07)
.sep-light      → línea 0.5px rgba(0,0,0,0.08)
.browser-frame  → wrapper del mockup de browser
.orb            → círculo de luz ambiental decorativo
```

### Animaciones disponibles (keyframes en `global.css`)

```
.animate-fade-up    → entra desde abajo (y: 24px → 0)
.animate-fade-in    → fade simple
.animate-slide-left → entra desde izquierda
.animate-neon-pulse → pulso suave infinito
.delay-{100..800}   → delays encadenables en 100ms steps
```

Para animaciones de scroll usar **Motion** (`motion` package):
```js
import { inView, animate } from 'motion';
```

---

## Estructura de secciones

El layout alterna cards dark y white — esto es fundamental para el ritmo visual:

```
NAV          → fixed, blur backdrop, fondo #0a0a0c/75%
HERO         → dark  — nombre masivo, año decorativo, foto, CTAs
SERVICIOS    → dark  — filas con nombre en neon + descripción
SOBRE MÍ     → white — foto + bio + stack
PROYECTOS    → dark  — cada proyecto: nombre grande + browser mockup
EXPERIENCIA  → white — tabla de 3 columnas: empresa / rol+desc / año
CONTACTO     → dark  — CTA tipográfico grande "GOT A PROJECT? LET'S TALK!"
```

Todas las secciones son `<section>` dentro de un `<main>` con
`gap: var(--section-gap)` (12px) y `padding-x: var(--section-pad-x)`.

---

## Secciones en detalle

### HERO
```
Layout: dos columnas en desktop, una en mobile
Izquierda:
  - Año decorativo: (20/25) en .type-year color neon, alineado a la derecha
  - Nombre: "DAVID" / "CIRO" en .type-hero blanco
  - Foto circular (~80px) inline con el apellido, borde sutil
Derecha (o abajo del nombre):
  - Párrafo intro: "Soy David Ciro, desarrollador & diseñador..."
  - Separador sep-dark
  - Fila de botones: btn-primary "Proyectos" + btn-ghost "Descargar CV"

Fondo: 2 orbs de luz ambiental decorativos (filter: blur(80px), opacidad baja)
Animaciones: fade-up escalonado con delays (100ms, 200ms, 300ms...)
```

### SERVICIOS
```
Header: .type-section "SERVICIOS" + btn-nav-circle "+" a la derecha
Filas (service-row): grid 2 cols — nombre en .type-service.text-neon | descripción en .type-body
Separador sep-dark entre filas
Servicios:
  1. Desarrollo Web    — React, Next.js, Astro
  2. UI / UX Design    — Figma, sistemas de componentes
  3. Automatización    — n8n, APIs, OpenAI
  4. Motion Design     — Framer Motion, GSAP
```

### SOBRE MÍ (card-light)
```
Header: .type-section "SOBRE MÍ" en #111
Layout: 2 cols — foto (placeholder o imagen real) | bio
Bio: párrafo en font-bold + separador + lista de stack
Stack: React · TypeScript · Astro · Figma · n8n · Node.js · Tailwind · Framer Motion
```

### PROYECTOS
```
Cada proyecto es su propia card-dark con:
  - .type-project "NOMBRE DEL PROYECTO" en blanco
  - metadata en .type-label color neon: "CATEGORÍA / DESCRIPCIÓN / AÑO"
  - Browser mockup (.browser-frame) con simulación de la UI del proyecto

Proyectos a incluir (David los confirmará/ajustará):
  1. Cirofolio v2 — este mismo portfolio
  2. Sistema de automatización n8n — publicación multi-plataforma con AI
  (agregar los reales que David defina)
```

### EXPERIENCIA (card-light)
```
Header: .type-section "EXPERIENCIA" en #111, opacidad 0.85 (efecto sutil)
Tabla de 3 columnas con sep-light entre filas:
  Empresa (.type-service color #111) | Rol + descripción | Año (Inter, color muted)

Items:
  - Freelance        | Desarrollador Web & Diseñador UI  | 2022 / Hoy
  - Pascual Bravo    | Técnico en Sistemas               | 2021 / 2023
  - Proyectos propios| Diseñador Visual & Motion          | 2020 / Hoy
```

### CONTACTO
```
Layout: flex row, space-between
Izquierda: CTA tipográfico en .type-cta alternando colores:
  "GOT A"     → neon
  "PROJECT?"  → blanco
  "LET'S"     → neon
  "TALK!"     → blanco

Derecha:
  - Label "Email" en .type-label
  - Email en Inter, color neon
  - btn-circle con ↗

Footer dentro de la card:
  sep-dark
  Links sociales (GitHub, LinkedIn, Instagram) en .type-ui color faint
  Copyright "© 2025 David Ciro" alineado a la derecha
```

---

## Archivos del proyecto

```
cirofolio/
├── public/
│   ├── fonts/           ← Nohemi .woff2 van aquí (descargar de Fontshare)
│   ├── favicon.svg
│   └── og-image.jpg
│
├── src/
│   ├── components/
│   │   ├── Nav.astro          ✅ listo
│   │   ├── Hero.astro         ← siguiente
│   │   ├── Servicios.astro    ← pendiente
│   │   ├── SobreMi.astro      ← pendiente
│   │   ├── Proyectos.astro    ← pendiente
│   │   ├── Experiencia.astro  ← pendiente
│   │   └── Contacto.astro     ← pendiente
│   │
│   ├── layouts/
│   │   └── Layout.astro       ✅ listo
│   │
│   ├── pages/
│   │   └── index.astro        ✅ listo (con placeholders)
│   │
│   └── styles/
│       └── global.css         ✅ listo (tokens + componentes + animaciones)
│
├── astro.config.mjs           ✅ listo
├── tailwind.config.mjs        ✅ listo
└── package.json               ✅ listo
```

---

## Próximo paso sugerido

Construir `Hero.astro` siguiendo la especificación de arriba.
Luego continuar en orden: Servicios → Sobre mí → Proyectos → Experiencia → Contacto.

Al final: animaciones de scroll con Motion + responsive mobile.

---

## Notas importantes

- El año decorativo en el hero es **(20/25)** — estilo editorial inspirado en inspiro-db
- La foto de perfil va en el hero, inline con el apellido "CIRO", forma circular
- **No usar glassmorphism** — ese fue el primer prototipo que se descartó
- **No mezclar colores de acento** — solo `#c8f135`, nada más
- Las cards no tienen sombras dramáticas — solo el contraste de color hace el trabajo
- Todos los títulos de sección en Nohemi 800 uppercase, tracking -0.02em o -0.03em
- El body text siempre en Inter, nunca en Nohemi
