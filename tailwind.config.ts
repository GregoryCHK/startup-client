import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#006D77",
        secondary: "#83C5BE",
        background: "#EDF6F9",
      },
      fontFamily: {
        sans: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
