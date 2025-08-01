/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('postcss-import/index.js'),
    require('tailwindcss/nesting/index.js'),
    require('tailwindcss'),
    require('postcss-preset-env'),
  ],
};
