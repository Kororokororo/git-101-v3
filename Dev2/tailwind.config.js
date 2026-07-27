/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          purple: '#E9D5FF',
          pink: '#FBCFE8',
          blue: '#BAE6FD',
          emerald: '#A7F3D0',
          yellow: '#FEF08A'
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          cardHover: '#334155',
          border: '#334155'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.6))' }
        }
      }
    },
  },
  plugins: [],
}
