/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "100px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#222222",
          hover: "#2f2f2f",
        },
        accent: {
          DEFAULT: "#ed1d24",
          hover: "#d6001c",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin", "tailwind-scrollbar")],
};
