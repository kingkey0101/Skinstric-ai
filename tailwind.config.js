/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      letterSpacing: {
        "0_5": "0.03125em", // that's 0.5px at a 16px font-size
      },
    },
  },
  plugins: [],
};
