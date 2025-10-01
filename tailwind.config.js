/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      lg: { max: "2000px" },
      md: { max: "1535px" },
      sm: { max: "1279px" },
    },

    extend: {
      keyframes: {
        slowspin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "slow-spin": "slowspin 30s linear infinite",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      letterSpacing: {
        "0_5": "0.03125em", // that's 0.5px at a 16px font-size
      },
    },
  },
  variants: {
    extend: {
      display: ["max-lg", "max-md", "max-sm"],
      flexDirection: ["max-lg", "max-md", "max-sm"],
      width: ["max-lg", "max-md", "max-sm"],
      padding: ["max-lg", "max-md", "max-sm"],
      textAlign: ["max-lg", "max-md", "max-sm"],
    },
  },

  plugins: [],
};
