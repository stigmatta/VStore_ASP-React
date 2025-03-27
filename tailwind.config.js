import fluid, { extract, screens } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    extract, 
  ],
  theme: {
    screens: { // for IPhone and PC
      sm: "27.5rem", // Custom small screen (440px)
      xl: "90rem",   // Custom large screen (1440px)
      ...screens
    },
    extend: {
      backgroundImage: { // Gradients
        "green-gradient": "linear-gradient(to right, #7BC74D 10%, #82CA77 90%)",
        "page-gradient": "linear-gradient(to right, #222831 55%, #1B3A2F 100%)",
        "footer-gradient": "linear-gradient(90deg, rgba(27,58,47,1) 0%, rgba(34,40,49,1) 55%, rgba(27,58,47,1) 100%)",
        "header-gradient": "linear-gradient(90deg, rgba(55,60,67,1) 70%, rgba(37,40,45,1) 80%);"
      },
      fontFamily: { // it`s used by default for body
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: { // all font-sizes
        subtext: "0.75rem",
        text: "0.875rem",
        button: "1rem",
        bigButton: "1.125rem",
        highlightedText: "1.25rem",
        title: "1.5rem",
        header: "3rem",
      },
      colors: { //overrided colors 
        green: {
          DEFAULT: "#7BC74D",
        },
        gray: {
          DEFAULT: "#222831",
          light: "#393E46",
          lighterInput:"#4E5258",
          lighter: "#606976",
          lightest: "#EEEEEE",
        },
        red: {
          DEFAULT: "#C74D4D",
        },
      },
    },
  },
  plugins: [fluid], 
};
