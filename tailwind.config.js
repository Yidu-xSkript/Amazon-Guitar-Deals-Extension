module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'habesha-yellow': '#C09A59'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
