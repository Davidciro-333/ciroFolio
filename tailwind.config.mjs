/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      // ── Color tokens ──────────────────────────────────────
      // Apuntan a las variables de global.css en vez de repetir los hex:
      // tenerlos en dos sitios garantizaba que algún día divergieran, y con
      // la corrección de contraste ya habría pasado.
      colors: {
        // Backgrounds
        'base':       'var(--color-base)',
        'surface':    'var(--color-surface)',
        'surface-2':  'var(--color-surface-2)',

        // Acento único
        'neon':       'var(--color-neon)',
        'neon-dim':   'var(--color-neon-dim)',

        // Texto sobre superficie oscura
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted':     'var(--color-text-muted)',
        'text-faint':     'var(--color-text-faint)',

        // Texto sobre superficie clara
        'on-light-primary':   'var(--color-on-light-primary)',
        'on-light-secondary': 'var(--color-on-light-secondary)',
        'on-light-muted':     'var(--color-on-light-muted)',

        // Bordes
        'border-dark':  'var(--color-border-dark)',
        'border-light': 'var(--color-border-light)',
      },

      // ── Tipografía ────────────────────────────────────────
      fontFamily: {
        // Nohemi: display para headlines
        // Inter: body, UI, labels
        display: ['Nohemi', 'Arial Black', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala display (Nohemi)
        'display-2xl': ['clamp(64px, 10vw, 120px)', { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(48px, 7vw,  90px)',  { lineHeight: '0.90', letterSpacing: '-0.03em' }],
        'display-lg':  ['clamp(36px, 5vw,  64px)',  { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(24px, 3vw,  42px)',  { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-sm':  ['clamp(18px, 2vw,  28px)',  { lineHeight: '1.0',  letterSpacing: '-0.01em' }],

        // Escala body (Inter)
        'label':  ['11px', { lineHeight: '1',    letterSpacing: '0.07em' }],
        'body-sm':['12px', { lineHeight: '1.65', letterSpacing: '0' }],
        'body':   ['14px', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-lg':['16px', { lineHeight: '1.7',  letterSpacing: '0' }],
        'ui':     ['13px', { lineHeight: '1',    letterSpacing: '0' }],
      },
      fontWeight: {
        // Nohemi pesos clave
        thin:       '100',
        light:      '300',
        regular:    '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
        black:      '900',
      },

      // ── Spacing system ────────────────────────────────────
      // Usa los de Tailwind por defecto (4px base) — no necesitamos override

      // ── Border radius ────────────────────────────────────
      borderRadius: {
        'card':   '20px',
        'card-sm':'14px',
        'btn':    '99px',
        'tag':    '6px',
      },

      // ── Shadows ───────────────────────────────────────────
      boxShadow: {
        'neon-glow': '0 0 24px rgba(200, 241, 53, 0.25)',
        'card-dark': '0 8px 32px rgba(0,0,0,0.4)',
      },

      // ── Transitions ───────────────────────────────────────
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};
