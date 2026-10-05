import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // toggled by adding/removing `dark` on <html>
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["\"Times New Roman\"", "Times", "serif"],
        display: ["Raleway", "Poppins", "sans-serif"],
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { DEFAULT: "#FF8A00", dark: "#E67C00" },
        ink: { DEFAULT: "#2B1A0E", soft: "#4A3626" },
        field: { DEFAULT: "#FAFAF9", dark: "#241D18" },
        link: "#0085FF",
        leaf: "#3BA935",
        mint: "#ECF9F0",
        cream: "#FFFCF5",
        cocoa: "#311F09",
        night: "#15110E",
      },
    },
  },
  plugins: [],
} satisfies Config;
