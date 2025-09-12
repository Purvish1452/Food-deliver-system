/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        bodyBg: '#fcfcfc',
        hrGray: '#a9a9a9',
      },
      gap: {
        2.5: '10px',
      },
    },
  },
  plugins: [],
}
