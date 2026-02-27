/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#05070d",
          surface: "#0a0b10",
          card: "#12141d",
          border: "#2b3244",
          cyan: "#4ea1ff",
          teal: "#74f2ce",
          purple: "#a855f7",
          pink: "#ec4899",
        },
      },
      keyframes: {
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "scroll-hint": {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "50%": { opacity: "1", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(4px)" },
        },
        "pulse-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
      },
      animation: {
        aurora: "aurora 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
