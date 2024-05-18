
import plugin from "tailwindcss";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: 'selector',
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [
    require("daisyui"),
    ],
};



export default config;
