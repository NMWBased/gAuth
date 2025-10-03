/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mono: {
          950: '#0b0b0b',
          900: '#0f1724',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#d1d5db',
          200: '#e5e7eb',
          100: '#f3f4f6',
          50:  '#fafafa'
        }
      },
      boxShadow: {
        subtle: '0 4px 12px rgba(15,23,42,0.06)'
      }
    },
  },
  plugins: [],
};
