/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}", // Добавляем поддержку TypeScript и TSX
  ],
  theme: {
    extend: {
      colors: {
        myColors: {
          50: '#FFCC00',
          100: '#1F2228',
          150: '#FF5102'
        }
      },
      backgroundImage: {
        'silver-gradient': 'linear-gradient(90deg, #747474 0%, #BCBCBC 100%)',
        'gold-gradient': 'linear-gradient(25.91deg, #FFCC01 -37.09%, #FFEDA4 113.57%)',
        'diamond-gradient': 'linear-gradient(46.6deg, #FF0101 -51.41%, #FFD300 110.24%)',
        'trans-gradient': 'linear-gradient(16.03deg, rgba(0, 0, 0, 0) 0%, #FFCC00 179.79%)',
        'trans1-gradient': 'linear-gradient(26.44deg, rgba(0, 0, 0, 0) 17.73%, #FF5C01 161.54%)'
      },
    },
  },
  plugins: [],
};
