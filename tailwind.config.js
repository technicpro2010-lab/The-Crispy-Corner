/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FFB800',
          goldHover: '#e6a600',
          red: '#FF3B30',
          redHover: '#e0281d',
          dark: '#121212',
          darker: '#0a0a0a',
          card: '#1E1E1E',
          surface: '#292929',
          border: 'rgba(255, 255, 255, 0.1)',
          lightBg: '#F8F9FA'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(255, 184, 0, 0.25)',
        'glow-red': '0 0 25px rgba(255, 59, 48, 0.25)',
      }
    },
  },
  plugins: [],
}

