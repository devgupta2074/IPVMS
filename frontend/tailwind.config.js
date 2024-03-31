/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./", "./views/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      sunsetorange: {
        50: "#fff3f1",
        100: "#ffe4e0",
        200: "#ffcec7",
        300: "#ffaca0",
        400: "#ff7c69",
        500: "#f95d47",
        600: "#e6351c",
        700: "#c22913",
        800: "#a02514",
        900: "#842518",
        950: "#480f07",
      },
    },
  },
  plugins: [],
};
