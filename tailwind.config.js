/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,hbs}"],
    theme: {
      extend: {
        boxShadow: {
          'outline-black': '0 0 4px #0008',
        },
        backgroundImage: {
          "mountain": "url('/img/footer-bg.jpg')",
        },
        animation: {
          'show-comment': 'show-comment 0.5s ease-in-out',
        },
        keyframes: {
          'show-comment': {
            '0%': { opacity: '0', transform: 'translateY(50px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          }
        }
      },
    },
    plugins: [
      function({addUtilities}) {
        const newUtilities = {
          '.no-scrollbar': {
            'scrollbar-width': 'none',
            '-ms-overflow-style': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
          '.custom-scrollbar::-webkit-scrollbar': {
            width: '4px',
          },
          '.custom-scrollbar::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }
        addUtilities(newUtilities, ['responsive', 'hover'])
      }
    ],
  }