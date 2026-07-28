# Cirofolio v2

Portfolio personal de David Ciro — construido con Astro + Tailwind CSS.

**Stack:** Astro 4 · Tailwind CSS 3 · Motion (animaciones) · Nohemi + Inter

---

## Setup inicial

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Build para producción
npm run build
```

---

## Fuentes

### Nohemi (display — headlines)
1. Ir a → https://www.fontshare.com/fonts/nohemi
2. Descargar todos los pesos en formato `.woff2`
3. Copiar los archivos a `public/fonts/`
4. Descomentar los `@font-face` en `src/styles/global.css`

Los pesos que se usan:
| Peso | Uso |
|------|-----|
| 800 ExtraBold | Headlines principales, hero, CTA |
| 700 Bold | Service names, project titles |
| 300 Light | Subtítulos de contraste (opcional) |

### Inter (body — UI)
Cargada automáticamente desde Google Fonts en el `<head>` del Layout.

---

## Estructura del proyecto

```
cirofolio/
├── public/
│   ├── fonts/           ← Nohemi .woff2 van aquí
│   ├── favicon.svg
│   └── og-image.jpg
│
├── src/
│   ├── assets/
│   │   └── fonts/       ← alternativa local a public/fonts
│   │
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro         ← próximo
│   │   ├── Servicios.astro    ← próximo
│   │   ├── SobreMi.astro      ← próximo
│   │   ├── Proyectos.astro    ← próximo
│   │   ├── Experiencia.astro  ← próximo
│   │   └── Contacto.astro     ← próximo
│   │
│   ├── layouts/
│   │   └── Layout.astro       ← wrapper HTML base
│   │
│   ├── pages/
│   │   └── index.astro        ← página principal
│   │
│   └── styles/
│       └── global.css         ← tokens, tipografía, componentes
│
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Sistema de diseño

### Colores
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-base` | `#0a0a0c` | Fondo de página |
| `--color-surface` | `#111115` | Cards oscuras |
| `--color-neon` | `#c8f135` | Acento único — verde ácido |
| `--color-text-muted` | `#555560` | Texto descriptivo |

### Tipografía
| Clase | Font | Uso |
|-------|------|-----|
| `.type-hero` | Nohemi 800 | Nombre en hero (`clamp(64px, 10vw, 120px)`) |
| `.type-section` | Nohemi 800 | Títulos de sección (`SERVICIOS`, `PROYECTOS`) |
| `.type-project` | Nohemi 800 | Nombres de proyectos |
| `.type-service` | Nohemi 700 | Nombres de servicios (en neon) |
| `.type-label` | Inter 700 | Labels en mayúscula (`/ sección`) |
| `.type-body` | Inter 400 | Texto descriptivo |

### Componentes base
- `.card-dark` — card oscura (#111115), radius 20px
- `.card-light` — card blanca, radius 20px
- `.btn-primary` — botón neon negro
- `.btn-ghost` — botón outline sutil
- `.btn-circle` — CTA circular neon (↗)
- `.btn-nav-circle` — botón (+) del nav
- `.text-neon` — texto en #c8f135
- `.tag` — etiqueta con borde neon

### Animaciones disponibles
- `.animate-fade-up` — entra desde abajo
- `.animate-fade-in` — fade simple
- `.animate-slide-left` — entra desde izquierda
- `.animate-neon-pulse` — pulso suave
- `.delay-{100..800}` — delays encadenables

---

## Orden de construcción

- [x] Estructura base + sistema de diseño
- [ ] Hero
- [ ] Servicios
- [ ] Sobre mí
- [ ] Proyectos
- [ ] Experiencia
- [ ] Contacto
- [ ] Animaciones de scroll
- [ ] Responsive mobile
- [ ] Deploy

---

## Deploy

El proyecto está configurado para `itsciro.com/cirofolio` en `astro.config.mjs`.
Si cambias el dominio o la ruta base, actualiza `site` y `base` en ese archivo.
