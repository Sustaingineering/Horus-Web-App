// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        global: "Roboto, Arial, ui-sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
