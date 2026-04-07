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
        background: "#050505",
        neon: {
          green: "#00ff41",
          cyan: "#00f0ff",
          red: "#ff003c",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "neon-pulse": "neon-pulse 1.5s infinite ease-in-out",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.3" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;