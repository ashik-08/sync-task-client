const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      play: ["Playfair Display", "serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-bg": "url('https://i.ibb.co/4sNKg6r/task-banner.jpg')",
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
});
