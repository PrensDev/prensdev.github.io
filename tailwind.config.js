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
      mono: ['Consolas'],
    },
    extend: {
      colors: {
        body: {
          darkmode: {
            DEFAULT: '#1a1b1e',
            darker: '#141517'
          }
        },
        brand: {
          DEFAULT: '#0ea5e9',
          darker: '#0284c7',
          lighter: '#7dd3fc',
          subtle: '#e0f2fe',
          darkmode: {
            subtle: '#1a2c3f'
          }
        },
        typo: {
          DEFAULT: '#171717',
          darkmode: '#a6a7ab'
        },
        muted: {
          DEFAULT: '#64748b',
          darkmode: '#94a3b8'
        },
        github: {
          DEFAULT: '#21262d',
          darker: '#161b22',
          darkmode: {
            DEFAULT: '#21262d',
            darker: '#161b22'
          }
        }
      },
    },
  },
  plugins: [],
}
