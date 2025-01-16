/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors:{
        warning_low:"#047857",
        warning_high:'#e11d48',
        warning_moderate:"#b45309",
        bgLow:'#d1fae5',
        bgModerate:'#fef3c7',
        bgHigh:'#ffe4e6',
      },
    }
    
  },
  plugins: [],
}

