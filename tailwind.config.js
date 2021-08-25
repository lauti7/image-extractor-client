module.exports = {
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
