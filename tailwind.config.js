/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{html,js}",
    './index.html',
    './ui.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5A51B8',
          // lighter: '#ADA9DB',
          dark: '#918BD0'
        },
        secondary: {
          DEFAULT: '#1e293b',
          dark: '#7791BB'
        },
        muted: {
          DEFAULT: '#6b7280',
          dark: '#364245',
        },
        gray: {
          1: '#f1f5f9',
          2: '#e2e8f0',
          3: '#cbd5e1',
          
          dark1: '#26262C',
          dark2: '#1C1C21',
          dark3: '#131316'
        }
      },
    },
  },
  plugins: [],
}
