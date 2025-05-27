/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b5998',
        secondary: '#4c669f',
        dark: '#192f6a',
      },
    },
  },
  plugins: [],
};
