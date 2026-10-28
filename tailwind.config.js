/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F9E7C4',
          soft: '#FBF3E3',
          dark: '#EFD9A8',
          deep: '#E4C88A',
        },
        leaf: {
          DEFAULT: '#2F6B45',
          soft: '#3D8156',
          deep: '#1E4A30',
        },
        forest: {
          DEFAULT: '#0F2A1E',
          deep: '#081A12',
          soft: '#1A3D2A',
          mist: '#3D6B52',
        },
        gold: {
          DEFAULT: '#C4A15A',
          light: '#D9BC7A',
          dark: '#9A7A34',
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
