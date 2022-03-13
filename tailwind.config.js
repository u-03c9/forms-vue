module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "Helvetica", "Aria", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-dark": "#673ab7",
        "primary-light": "#f0ebf8",
        "secondary-dark": "#1a73e8",
        "secondary-light": "#4285f4",
      },
    },
  },
  plugins: [],
};
