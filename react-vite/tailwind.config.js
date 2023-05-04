/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    animation: {
      'hover-slow': 'hover 1s linear',
    },
    keyframes: {
      spin: {

      }
    }
  },
  plugins: [],
}

