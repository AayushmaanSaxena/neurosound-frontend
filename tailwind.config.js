/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NeuroSound custom colors
        // These become available as classes like bg-ns-black, text-ns-green etc
        'ns-black': '#121212',
        'ns-dark': '#181818',
        'ns-card': '#282828',
        'ns-hover': '#2a2a2a',
        'ns-green': '#1DB954',
        'ns-green-dark': '#1aa34a',
        'ns-white': '#FFFFFF',
        'ns-gray': '#B3B3B3',
        'ns-light-gray': '#535353',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}