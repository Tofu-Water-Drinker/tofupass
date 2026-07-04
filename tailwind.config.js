/** @type {import('tailwindcss').Config} */
// Replaces the old cdn.tailwindcss.com Play CDN (same darkMode setting).
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.njk',
    './assets/js/**/*.js',
    './cheater/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
