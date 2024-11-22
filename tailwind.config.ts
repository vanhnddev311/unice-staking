/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textUnderlineOffset: {
        12: '12px',
      },
      colors: {
        primary: {
          light: 'var(--color-primary-light)',
          main: 'var(--color-primary-main)',
          dark: 'var(--color-primary-dark)',
        },
        neutral: {
          main: 'var(--color-title-home)',
        },
        paper: {
          gray: 'var(--color-bg-box-currency)',
          main: 'var(--color-bg-card)',
        },
        grey: {
          100: 'rgb(var(--hip-text-grey-100) / <alpha-value>)',
          300: 'rgb(var(--hip-text-grey-300) / <alpha-value>)',
          500: 'rgb(var(--hip-text-grey-500) / <alpha-value>)',
          700: 'rgb(var(--hip-text-grey-700) / <alpha-value>)',
          900: 'rgb(var(--hip-text-grey-900) / <alpha-value>)',
        },
        blue: {
          500: '#0090F9',
        },
        prime: {
          100: '#0090F9',
          300: '#0090F9',
          400: '#0090F9',
          500: '#0090F9',
          700: '#0090F9',
          800: '#0090F9',
          900: '#0090F9',
        },
        success: {
          500: '#82CB7C',
        },
        error: {
          500: '#EB6A5D',
        },
        info: {
          500: '#5B6CFE',
        },
        warn: {
          500: '#FFA24E',
        },
        up: '#29C995',
        down: '#E96A5C',
      },
      boxShadow: {
        base: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        primeLight: 'linear-gradient(0deg, #F7F5FD 0%, #FDFDFF 100%)',
        homeCard: 'var(--hip-bg-home-card)',
        'btn-gradient': 'var(--hip-bg-btn-gradient)',
        'select-border': 'var(--hip-bg-select-border)',
      },
      borderRadius: {
        none: '0',
        DEFAULT: '4px',
        lg: '8px',
        xl: '10px',
        xxl: '20px',
        full: '9999px',
      },
      fontFamily: {
        Urbanist: ['Urbanist', 'sans-serif'],
      },
    },
    screens: {
      sm: '800px',
      md: '1200px',
      lg: '1440px',
      xl: '1535px',
      desktop: '99999px', // desktop first
      laptop: '1535px',
      tablet: '1025px',
      mobile: '767px',
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: any) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.text-gradient-primary': {
          background: 'linear-gradient(90.74deg, #5687F8 -17.79%, #7743E6 120.43%)',
          '-webkit-background-clip': 'text',
        },
        '.text-gradient-secondary': {
          background: 'linear-gradient(273.38deg, #8032FF 19.81%, #472394 87.9%)',
          '-webkit-background-clip': 'text',
        },
      });
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
