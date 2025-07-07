/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#2A2B3C",
        card: "#373748",
        accent: "#0079BF",
      },
    },
  },
  plugins: [],
};
