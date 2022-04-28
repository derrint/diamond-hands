module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: "'Nunito', sans-serif",
        g8: "'G8321', sans-serif",
      },
      textColor: {
        'secondary-blue-75': '#0C353B',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
