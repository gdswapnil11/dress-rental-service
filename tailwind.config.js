module.exports = {
  content: ['./src/**/*.{html,ts,css}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8f6ff',
          100: '#f0ebff',
          200: '#dcd0ff',
          300: '#bfa1ff',
          400: '#9d6bff',
          500: '#7f3eff',
          600: '#6b30e6',
          700: '#5726b8',
          800: '#432085',
          900: '#33185f'
        }
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};
