/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farmer-green': '#228B22',
        'earth-brown': '#8B4513',
        'wheat-yellow': '#F5DEB3',
        'soil-dark': '#654321',
      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'sans-serif'],
        'punjabi': ['Noto Sans Gurmukhi', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
