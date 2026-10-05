# Implementation handoff — ciroFolio "Galería"

**Leer primero:** `DESIGN.md` (raíz) → `propuestas/d2-galeria.html` (referencia viva) → `propuestas/d3-plano.html` (diagrama) → `propuestas/d4-taller.html` (subrayador) → `src/components/Pipeline.astro`.

**Restricciones vinculantes**
- Tokens de `DESIGN.md §2` como variables CSS en `global.css` (claro en `:root`, oscuro en `[data-theme="dark"]` y en `prefers-color-scheme` con `:root:not([data-theme="light"])`). Tailwind apunta a las variables, sin hex duplicados.
- Plus Jakarta Sans autoalojada (paquete `@fontsource-variable/plus-jakarta-sans` o woff2 en `src/assets/fonts`); quitar Nohemi, Inter y el `<link>` a Google Fonts.
- Escala tipográfica, radios y espaciado exactamente como `DESIGN.md §3-4`.
- Contenido solo desde `src/data/` e `src/i18n/`; no hardcodear copy en componentes. Limpiar rayas (—, –) del copy existente en ambos idiomas.
- Formulario: mismos campos y orden.

**Assets**
- Foto: `src/assets/photoProfile.png` vía `astro:assets` (no la versión de `propuestas/`).
- Ningún logo, icono ni imagen de Apple, Stripe o Notion.

**Responsive**
- 375 / 768 / 1440. Bento y modalidades a una columna <860px. Diagrama SVG oculto <860px; `Pipeline` siempre.

**Orden sugerido (un commit por paso)**
1. Tokens + fuente + tema (sin parpadeo) + nav.
2. Hero + retrato.
3. Bento de sistemas (7 celdas, cifras desde `liveSince`).
4. Modalidades, Sobre mí (con subrayador), Experiencia, Contacto.
5. Caso de estudio + `SystemDiagram` desde los `steps` de `Pipeline` (flag `fixed`).
6. OG con la fuente nueva, 404, `check:contrast` actualizado.
7. Pulido con `impeccable` y `emil-design-eng`; motion con `animate` (GSAP solo si el diagrama lo exige).

**El primer artefacto debe probar:** que la home en claro y oscuro, EN y ES, se ve como `d2-galeria.html` con contenido real, pasa los gates de `design-contract.md` y compila con `pnpm build`.
