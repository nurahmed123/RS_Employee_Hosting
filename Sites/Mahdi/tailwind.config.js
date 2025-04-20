const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "// Or if using src directory:\\\\\\\\n    ./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|button|dropdown|input|modal|divider|ripple|spinner|menu|popover).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui(), require('tailwindcss-motion')],
  darkMode: "class"
}

