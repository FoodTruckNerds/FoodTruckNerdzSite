/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
        sriracha: ['Sriracha', 'cursive'],
      },
      colors: {
        primary: '#ff0000',
      },
    },
  },
  plugins: [],
}
