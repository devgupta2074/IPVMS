/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./",
    "./views/**/*.{html,js}",
    "./dist/src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        design: "url('/assets/images/gradient.png')",
      },
    },
    colors: {
      ...colors,
      "link-water": {
        50: "#eff5ff",
        100: "#dbe9ff",
        200: "#bdd8ff",
        300: "#90c1ff",
        400: "#5c9ffe",
        500: "#3679fb",
        600: "#1f59f1",
        700: "#1843dd",
        800: "#1a38b3",
        900: "#1b348d",
        950: "#152156",
      },

      mineshaft: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#333333",
        950: "#262626",
      },
      chicago: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#555555",
        800: "#454545",
        900: "#3d3d3d",
        950: "#262626",
      },

      astronaut: {
        50: "#f3f5fb",
        100: "#e3e8f6",
        200: "#ced7ef",
        300: "#adbde3",
        400: "#859bd5",
        500: "#687cc9",
        600: "#5563bb",
        700: "#4a52ab",
        800: "#41468c",
        900: "#3b4076",
        950: "#262845",
      },

      zircon: {
        50: "#f4f7fd",
        100: "#e0e8f9",
        200: "#c9d8f4",
        300: "#a3beed",
        400: "#789ce2",
        500: "#587cd9",
        600: "#4360cd",
        700: "#3a4fbb",
        800: "#344199",
        900: "#2f3a79",
        950: "#20264b",
      },

      "ship-cove": {
        50: "#f1f7fc",
        100: "#e6eff9",
        200: "#dbe9ff",
        300: "#b5ccec",
        400: "#919EAB",
        500: "#718bd3",
        600: "#6376c8",
        700: "#5362af",
        800: "#45528e",
        900: "#1F2DE3",
        950: "#242942",
      },
      "deep-cove": {
        50: "#ebf3ff",
        100: "#dbe9ff",
        200: "#bed5ff",
        300: "#96b9ff",
        400: "#6d90ff",
        500: "#4b69ff",
        600: "#2b3eff",
        700: "#1f2de3",
        800: "#1c29b7",
        900: "#202c8f",
        950: "#0e123e",
      },
      gallery: {
        50: "#f8f8f8",
        100: "#efefef",
        200: "#dcdcdc",
        300: "#bdbdbd",
        400: "#989898",
        500: "#7c7c7c",
        600: "#656565",
        700: "#525252",
        800: "#464646",
        900: "#3d3d3d",
        950: "#292929",
      },

      "sunset-orange": {
        50: "#fff3f1",
        100: "#ffe5e1",
        200: "#ffcec7",
        300: "#ffaca1",
        400: "#ff7c6a",
        500: "#f85c47",
        600: "#e5351d",
        700: "#c12914",
        800: "#9f2515",
        900: "#842518",
        950: "#480f07",
      },
      boulder: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#7c7c7c",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#3d3d3d",
        950: "#262626",
      },

      "gulf-blue": {
        50: "#BDD0ED",
        100: "#ceebff",
        200: "#a7ddff",
        300: "#6bccff",
        400: "#26acff",
        500: "#0080ff",
        600: "#0056ff",
        700: "#003bff",
        800: "#0031e6",
        900: "#0031b3",
        950: "#001853",
      },

      aluminium: {
        50: "#f6f6f7",
        100: "#eef0f1",
        200: "#e0e2e5",
        300: "#ccd0d5",
        400: "#b7bac2",
        500: "#abaeb8",
        600: "#8e919d",
        700: "#7a7c88",
        800: "#64666f",
        900: "#53545c",
        950: "#313235",
      },
      selago: {
        50: "#eaeeff",
        100: "#e0e6ff",
        200: "#c7d0fe",
        300: "#a5b0fc",
        400: "#8187f8",
        500: "#6663f1",
        600: "#5646e5",
        700: "#4a38ca",
        800: "#3c30a3",
        900: "#352e81",
        950: "#201b4b",
      },
      "steel-gray": {
        50: "#F0F0F0",
        100: "#DFDFDF ",
        200: "#d5daf0",
        300: "#bcc1e5",
        400: "#a0a2d9",
        500: "#8a88cc",
        600: "#786fbc",
        700: "#665ea4",
        800: "#544e85",
        900: "#47446b",
        950: "#211f31",
      },
      "dodger-blue": {
        50: "#eff7ff",
        100: "#dbecfe",
        200: "#bfdefe",
        300: "#93cbfd",
        400: "#61adf9",
        500: "#3689f5",
        600: "#266eea",
        700: "#1e58d7",
        800: "#1f48ae",
        900: "#1e408a",
        950: "#172854",
      },
    },
    fontFamily: {
      sfprodisplay: ["SF Pro Display"],
      axiforma: ["Axiforma"],
      roboto: ["Roboto"],
    },
  },
  plugins: [],
};
