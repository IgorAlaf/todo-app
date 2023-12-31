/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1090px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }
      hr: { max: '564px' },
      sm: { max: '639px' },
      tr: { max: '425px' },
      // => @media (max-width: 639px) { ... }
      xs: { max: '375px' }
    },
    extend: {}
  },
  plugins: []
}
