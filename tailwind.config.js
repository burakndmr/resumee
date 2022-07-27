/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      montSerrat: ["Montserrat", "sans-serif"],
    },
    colors: {
      primary: "#FB5012",
      primaryClick: "#FF6E39",
      primaryActive: "#DD3B00",
      sectionBg: "#FFF3EE",
      white: "#fff",
      cardGray: "#F9F9F9",
      yellow: "#FFE600",
      textGray: "#676767",
      clearPurple: "#FF9D9E",
      titleBlack: "#2E2E2E",
    },
    extend: {
      spacing: {
        73: "18.75rem",
      },
    },
  },
  plugins: [],
};
