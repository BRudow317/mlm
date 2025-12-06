/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- Important for your toggle requirement
  theme: {
    extend: {
      colors: {
        'miller-yellow': '#F59E0B', // Construction yellow
        'miller-dark': '#111827',   // Deep gray/black
      }
    },
  },
  plugins: [],
}