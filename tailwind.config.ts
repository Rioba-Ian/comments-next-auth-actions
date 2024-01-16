import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
 content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   colors: {
    "moderate-blue": "hsl(238, 40%, 52%)",
    "soft-red": "hsl(358, 79%, 66%)",
    "light-grayish-blue": "hsl(239, 57%, 85%)",
    "pale-red": "hsl(349, 71%, 52%)",
    "dark-blue": "hsl(212, 24%, 26%)",
    "grayish-blue": "hsl(211, 10%, 45%)",
    "light-gray": "hsl(223, 19%, 93%)",
    "very-light-gray": "hsl(228, 33%, 97%)",
   },
  },
 },
 plugins: [daisyui],
 daisyui: {
  themes: ["light"],
 },
};
export default config;
