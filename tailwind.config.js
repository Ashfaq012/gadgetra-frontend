/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Gadgetra.lk brand palette — see brand kit README for usage rules.
        ink: '#1A1A1A',
        charcoal: '#2E2E2E',
        paper: '#F7F6F3',
        hairline: '#E3E0D9',
        muted: '#6B6B6B',
        gold: {
          DEFAULT: '#E5AC2F',
          deep: '#C08F1E',
          tint: '#FBF1D9',
        },
      },
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
