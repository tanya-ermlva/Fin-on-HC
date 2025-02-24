/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'type-in': {
          '0%': { width: '0', borderRight: '2px solid #9CA3AF' },
          '100%': { width: '100%', borderRight: '2px solid transparent' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'type-in': 'type-in 2s steps(40, end)'
      },
      boxShadow: {
        'composer': '0 8px 30px -12px rgba(0, 0, 0, 0.22), 0 4px 10px -8px rgba(0, 0, 0, 0.16)',
      },
      colors: {
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
      },
    }
  },
  plugins: [],
}