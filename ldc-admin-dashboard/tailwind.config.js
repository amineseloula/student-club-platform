/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#203F52',
          dark: '#183140',
          light: '#2A4E64',
        },
        cream: {
          DEFAULT: '#F7F3E9',
          soft: '#FBF8F2',
          active: '#F4ECDD',
        },
        gold: {
          DEFAULT: '#F5B400',
          hover: '#E0A300',
        },
        ldcBlue: {
          DEFAULT: '#4A9BD5',
          soft: '#E6F2FA',
        },
        ldcGreen: {
          DEFAULT: '#3D9563',
          soft: '#E6F4EC',
        },
        ldcRed: {
          DEFAULT: '#E74732',
          soft: '#FDECE9',
        },
        ldcOrange: {
          DEFAULT: '#D47635',
          soft: '#FAEBE0',
        },
        beige: {
          border: '#E6D9C4',
        },
        muted: '#6D818E',
      },
      fontFamily: {
        serif: ['"Bitter"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(32, 63, 82, 0.04)',
        elevated: '0 8px 24px rgba(32, 63, 82, 0.08)',
      },
    },
  },
  plugins: [],
};
