/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F4F7F1',
          soft: '#FAFCF8',
          dark: '#E6EDE2',
          deep: '#D4DDD0',
        },
        forest: {
          DEFAULT: '#143024',
          deep: '#0C1F17',
          soft: '#2F5A42',
          mist: '#4F7A5E',
        },
        gold: {
          DEFAULT: '#C9A24A',
          light: '#E0BF6A',
          dark: '#A07E2E',
        },
        fennette: { DEFAULT: '#2E6B3A', soft: '#E4F0E4' },
        serenette: { DEFAULT: '#6B5B9A', soft: '#EDE8F6' },
        rosette: { DEFAULT: '#A33D5C', soft: '#F8E6EC' },
        nightfall: { DEFAULT: '#2A3F6E', soft: '#E6EAF4' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
        widest3: '0.42em',
      },
    },
  },
  plugins: [],
}
