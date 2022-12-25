/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.html",
    './index.html',
    './ui.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      mono: ['Inconsolata', 'monospace'],
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0ea5e9',
          darker: '#0284c7',
          lighter: '#7dd3fc',
          subtle: '#e0f2fe'
        },
        typo: {
          DEFAULT: '#171717',
        },
        muted: {
          DEFAULT: '#64748b',
        },
        github: {
          DEFAULT: '#161b22',
          darker: '#0d1117'
        }
      },
    },
  },
  plugins: [],
}
