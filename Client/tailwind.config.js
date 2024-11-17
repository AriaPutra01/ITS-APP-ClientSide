const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "1fr": "auto",
        "2fr": "auto 1fr",
        "3fr": "auto 1fr auto",
        "4fr": "auto 1fr auto auto",
      },
      gridTemplateColumns: {
        "1fr": "auto",
        "2fr": "auto 1fr",
        "3fr": "auto 1fr auto",
        "4fr": "auto 1fr auto auto",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [
    flowbite.plugin(),
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
    require("flowbite/plugin")({
      charts: true,
    }),
    require("tailwindcss-animate"),
  ],
};
