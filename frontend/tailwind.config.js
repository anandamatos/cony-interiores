/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          light: '#4CAF50',
          dark: '#1B5E20',
          hover: '#388E3C',
        },
        secondary: {
          DEFAULT: '#F57C00',
          light: '#FFB74D',
          dark: '#E65100',
        },
        background: '#FAFAFA',
        surface: '#FFFFFF',
        'text-primary': '#212121',
        'text-secondary': '#757575',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        border: '#E0E0E0',
        'warning-dark': '#E65100',
        'primary-hover': '#388E3C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        dropdown: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}