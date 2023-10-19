/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          300: "#CDC9EA",
          400: "#8B85B1",
          500: "#817BA4",
          700: "#413C5F",
        },
      },
      backgroundImage: {
        "simple-test-form-bg": "url('/assets/images/bg.svg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
