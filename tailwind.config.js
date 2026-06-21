/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#101814', dark: '#070909', light: '#1b261f' },
        ink: { DEFAULT: '#101814' },
        cream: { DEFAULT: '#F5F1EA', dark: '#EDE8DF', deep: '#DDD6C8' },
        gold: { DEFAULT: '#C79C53', light: '#E8C57F', dark: '#9B7338' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
}
