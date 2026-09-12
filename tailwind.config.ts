import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#101A2C",
          teal: "#006B70",
          offwhite: "#F7F5EF",
        },
        india: {
          primary: "#3F7D4A",
          secondary: "#D99A2B",
        },
        global: {
          primary: "#C99A3E",
          secondary: "#D9B15A",
        },
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        accent: ["Caveat", "cursive"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        brutalist: "4px 4px 0px 0px #101A2C",
        "brutalist-md": "6px 6px 0px 0px #101A2C",
        "brutalist-lg": "8px 8px 0px 0px #101A2C",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
export default config;
