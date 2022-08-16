const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {},
  },

  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
