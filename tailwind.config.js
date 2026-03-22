/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50:  '#fdf6f0',
          100: '#fae8d4',
          200: '#f5c9a0',
          300: '#eda46c',
          400: '#e07d3c',
          500: '#c85f20',
          600: '#a04718',
          700: '#7a3312',
          800: '#52210c',
          900: '#2c1106',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}