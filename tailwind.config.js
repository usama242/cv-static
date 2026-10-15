/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        apple: {
          dark: '#050508',
          card: '#0f1016',
          blue: '#2997ff',
          indigo: '#6366f1',
          violet: '#a855f7',
          rose: '#f43f5e',
          emerald: '#10b981',
          amber: '#f59e0b'
        }
      }
    }
  },
  plugins: []
};
