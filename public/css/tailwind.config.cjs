// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  darkMode: 'media',
  purge: [
    './public/*.html',
  ],
  theme: {
    fontFamily: {
     'noto': ['noto-sans', 'sans-serif',],
    },
    extend: {
      borderRadius: {
        'inherit': 'inherit',
      },
      colors: {
        rd: 'red',
        'wbdiv-color1': 'var(--wbdiv-color1)',
        'wbdiv-color1-dim': 'var(--wbdiv-color1-dim)',
        'wbdiv-color1-dim-text': 'var(--wbdiv-color1-dim-text)',
        'wbdiv-color2': 'var(--wbdiv-color2)',
        'wbdiv-color2-dim': 'var(--wbdiv-color2-dim)',
        'wbdiv-color2-dim2': 'var(--wbdiv-color2-dim2)',
        'wbdiv-color2-dim-text': 'var(--wbdiv-color2-dim-text)',
        'wbdiv-color3': 'var(--wbdiv-color3)',
        'wbdiv-color3-dim': 'var(--wbdiv-color3-dim)',
        'wbdiv-color3-dim-text': 'var(--wbdiv-color3-dim-text)',
        gray: {
          950: '#0f0f0f',
          850: '#1f1f1f',
        }
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
       }
    },
  },
  plugins: [
    plugin(function({ addVariant, e }) {
      addVariant('active2', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`active2${separator}${className}`)}.active`
        })
      });
      addVariant('focus2', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`focus2${separator}${className}`)}.focus`
        })
      });
    })
  ]
}
