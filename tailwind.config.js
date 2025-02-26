/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "base-100": "#EFEFEF",
          "neutral": "white",
          "accent": "#f3f4f6",
        },
        dracula: {
          ...require("daisyui/src/theming/themes")["dracula"],
          primary: "#4a00ff",
          "accent": "#1d232a",
        }
      },
    ], 
    darkMode: ['selector', '[data-theme="dracula"]'], 
    base: true, 
    styled: true, 
    utils: true, 
    prefix: "", 
    logs: true, 
    themeRoot: ":root", 
  },
}