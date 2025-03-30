import fluid, { extract, screens } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    extract, 
  ],
  theme: {

    /** @type {import('fluid-tailwind').FluidThemeConfig} */
    fluid: ({ theme }) => ({
      defaultScreens: [theme('screens.sm'), theme('screens.xl')] 
    }),
    screens: { // for IPhone and PC
      sm: "27.5rem", // Custom small screen (440px)
      md: "42.8125rem", // (685px)
      lg: "66.25rem", // (1060px)
      l:"78.125rem", // (1250px)
      xl: "90rem",   // Custom large screen (1440px)
    },
    extend: {
      backgroundImage: { // Gradients
        "green-gradient": "linear-gradient(to right, #7BC74D 10%, #82CA77 90%)",
        "page-gradient": "linear-gradient(to right, #222831 55%, #1B3A2F 100%)",
        "header-gradient": "linear-gradient(90deg, rgba(55,60,67,1) 35%, rgba(37,40,45,1) 80%)",
        "footer-gradient": "linear-gradient(90deg, rgba(123, 199, 77, 0.2) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(122, 199, 77, 0.2) 100%)",
        "form-gradient": "linear-gradient(180deg, rgba(43,47,53,1) 58%, rgba(37,40,45,1) 100%)"
      },
      fontFamily: { // it`s used by default for body
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: { // all font-sizes
        subtext: "0.75rem",       // 12px
        text: "0.875rem",         // 14px
        button: "1rem",           // 16px
        bigButton: "1.125rem",    // 18px
        highlightedText: "1.25rem", // 20px
        title: "1.5rem",          // 24px
        formTitle:"2.25rem",      // 36px
        header: "3rem",           // 48px
      },
      
      colors: { //overrided colors 
        green: {
          DEFAULT: "#7BC74D",
          lighter: "#9FE277"
        },
        gray: {
          DEFAULT: "#222831",
          light: "#393E46",
          lighterInput:"#4E5258",
          formInput:"#60697666",
          footer:"rgb(55, 60, 67)",
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
