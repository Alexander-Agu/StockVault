/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables dark mode via class="dark"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "logo": "url('/logo.png')"
      },
      fontFamily: {
      },
      colors: {
        mainBackground: "#faf3f3",
        primaryRed: "#FF2D2D"
      },
    },
  },
  plugins: [],
};