/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        raleway: ['"Raleway"', "sans-serif"],
        sansita: ['"Sansita"', "sans-serif"],
        cormorant: ['"Cormorant"', "serif"],
      },
    },
  },
  plugins: [],
};
