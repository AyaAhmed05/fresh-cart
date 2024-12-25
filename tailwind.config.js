/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container:{
      center:true
    },
    extend: {
      colors:{
        primary:"#0aad0a"
      },
      screens:{
        "2xl":"1320px"
      }
    },
  },
  plugins: [],
}

