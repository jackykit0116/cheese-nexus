const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: "#00f2ff",
          pink: "#ff00ea",
          purple: "#7000ff",
          black: "#050505",
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
