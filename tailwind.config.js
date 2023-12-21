/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      play: ["Playfair Display", "serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-bg":
          "url('https://i.ibb.co/4sNKg6r/task-banner.jpg')",
      },
      colors: {
        special: "#F7931E",
        head: "#61C0BF",
        "sub-head": "#333333",
        details: "#888888",
      },
    },
  },
  plugins: [require("daisyui")],
};
