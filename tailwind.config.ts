import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0a0a0a',
        'surface-dim': '#1a1a1a',
        'surface-bright': '#1f1f1f',
        'surface-container': '#141414',
        'surface-container-high': '#1a1a1a',
        'on-surface': '#f0f0f0',
        'on-surface-variant': '#a0a0a0',
        primary: '#ff3e00',
        'on-primary': '#0a0a0a',
        secondary: '#f0f0f0',
        'on-secondary': '#0a0a0a',
        error: '#ff4b4b',
        background: '#0a0a0a',
        'on-background': '#f0f0f0',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['DM Sans', 'sans-serif'],
      },
      spacing: {
        gutter: '2px',
        section: '80px',
      },
      maxWidth: {
        '1440': '1440px',
      },
    },
  },
  plugins: [],
}

export default config