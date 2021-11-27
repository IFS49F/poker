module.exports = {
  mode: 'jit',
  purge: ['apps/*/{pages,components}/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        landing: 'url(/bram-naus-200967.78ce1a0d.jpg)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
