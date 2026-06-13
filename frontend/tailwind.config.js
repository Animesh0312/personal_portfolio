/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0C0C0C",
        surface: "#111111",
        "surface-2": "#171717",
        border: "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        sans: ["Kanit", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, #7C3AED 0%, #D946EF 45%, #F97316 100%)",
        "chrome-gradient":
          "linear-gradient(180deg, #646973 0%, #BBCCD7 100%)",
      },
    },
  },
  plugins: [],
};
