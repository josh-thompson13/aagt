/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          200: '#b3cce6',
          300: '#8db3d9',
          400: '#6799cc',
          500: '#7a99b8', // primary-500 from old theme
          600: '#4b6a88', // primary-600
          700: '#345075', // primary-700 - main primary color
          800: '#223354', // primary-800
          900: '#102542', // primary-900
        },
        accent: {
          500: '#f3f4f6', // off white
          600: '#d1d5db', // light silver
          700: '#b0b7bd', // silver gray
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b', // secondary main
          600: '#d97706', // secondary dark
        },
        slate: {
          100: '#f8fafc',
          600: '#6b7280',
          700: '#374151',
          800: '#23272b',
          900: '#181c20',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'primary': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}