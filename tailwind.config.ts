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
          50: "#EEFDF3",
          100: "#D6F5E0",
          200: "#B5EAC8",
          300: "#8ADDAC",
          400: "#4FC587",
          500: "#22A563",
          600: "#16854F",
          700: "#146A42",
          800: "#135438",
          900: "#11452F",
        },
        surface: {
          bg: "#F7F9F8",
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#111827",
          secondary: "#667085",
          muted: "#98A2B3",
        },
        line: "#E5E7EB",
        danger: "#EF4444",
        warning: "#F59E0B",
        success: "#16A34A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        card: "16px",
        lg: "20px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(17 24 39 / 0.05)",
        card: "0 1px 3px 0 rgb(17 24 39 / 0.06), 0 1px 2px -1px rgb(17 24 39 / 0.04)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
