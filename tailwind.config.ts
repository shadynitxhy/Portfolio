import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#090909",
          50: "#0f0f0f",
          100: "#1a1a1a",
          200: "#222222",
          300: "#333333",
        },
        accent: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
          dark: "#5b21b6",
        },
        muted: "#737373",
      },
      maxWidth: {
        container: "1280px",
      },
      animation: {
        "grid-line": "grid-line 4s linear infinite",
        "grain": "grain 0.3s steps(4) infinite",
      },
      keyframes: {
        "grid-line": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "grain": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -2%)" },
          "20%": { transform: "translate(2%, 1%)" },
          "30%": { transform: "translate(-1%, 3%)" },
          "40%": { transform: "translate(3%, -2%)" },
          "50%": { transform: "translate(-3%, 1%)" },
          "60%": { transform: "translate(2%, -1%)" },
          "70%": { transform: "translate(-2%, 2%)" },
          "80%": { transform: "translate(1%, -3%)" },
          "90%": { transform: "translate(-1%, -1%)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
