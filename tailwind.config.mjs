/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue,mdx}'],
  theme: {
    extend: {
      // Apuntan a las variables de global.css: un solo sitio para cada color,
      // y el modo oscuro cambia solo con cambiar las variables.
      colors: {
        bg:      'var(--bg)',
        parch:   'var(--parch)',
        ink:     'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        line:    'var(--line)',
        blue:    'var(--blue)',
        live:    'var(--live)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      borderRadius: {
        tile:  '28px',
        photo: '32px',
        field: '8px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      screens: {
        // El corte de DESIGN.md: por debajo, todo a una columna.
        lg: '860px',
      },
    },
  },
  plugins: [],
};
