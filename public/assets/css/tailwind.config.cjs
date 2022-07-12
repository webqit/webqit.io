// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
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
        'wqdiv-color1': 'var(--wqdiv-color1)',
        'wqdiv-color1-dim': 'var(--wqdiv-color1-dim)',
        'wqdiv-color1-dim-text': 'var(--wqdiv-color1-dim-text)',
        'wqdiv-color2': 'var(--wqdiv-color2)',
        'wqdiv-color2-dim': 'var(--wqdiv-color2-dim)',
        'wqdiv-color2-dim2': 'var(--wqdiv-color2-dim2)',
        'wqdiv-color2-dim-text': 'var(--wqdiv-color2-dim-text)',
        'wqdiv-color3': 'var(--wqdiv-color3)',
        'wqdiv-color3-dim': 'var(--wqdiv-color3-dim)',
        'wqdiv-color3-dim-text': 'var(--wqdiv-color3-dim-text)',
        gray: {
          150: '#eeeeee',
          950: '#0f0f0f',
          '900.0': '#171717',
          850: '#1f1f1f',
        }
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
       },
       fontSize: {
        '4.5xl': '2.75rem',
        '8.1xl': '6.25rem',
       },
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
      addVariant('group-active2', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.group.active .${e(`group-active2${separator}${className}`)}`
        })
      });
      addVariant('group-focus2', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.group.focus .${e(`group-focus2${separator}${className}`)}`
        })
      });
    }),
    require('tailwind-scrollbar')
  ]
}
