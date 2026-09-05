import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf3",
          100: "#d6f5e0",
          200: "#aeebc4",
          300: "#7bdaa3",
          400: "#45c17f",
          500: "#22a563",
          600: "#16854f",
          700: "#146a42",
          800: "#135438",
          900: "#11452f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
