// tailwind.config.js
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aqui está a mágica: definimos a cor 'primary'
        // como a paleta de cores 'blue' do próprio Tailwind.
        primary: colors.blue,
      },
    },
  },
  plugins: [],
}