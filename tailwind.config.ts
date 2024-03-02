import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#ff3533",
                "primary-content": "#ffffff",
                "primary-dark": "#cc0200",

                secondary: "#3533ff",
                "secondary-content": "#ffffff",
                "secondary-dark": "#0200cc",

                background: "#1a1a1a",
                foreground: "#262626",
                border: "#404040",

                copy: "#fbfbfb",
                "copy-light": "#d9d9d9",
                "copy-lighter": "#a6a6a6",

                success: "#00ff00",
                warning: "#ffff00",
                error: "#ff0000",

                "success-content": "#000000",
                "warning-content": "#000000",
                "error-content": "#ffffff",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config