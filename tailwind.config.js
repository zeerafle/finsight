/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#7286D3",
          "secondary": "#8EA7E9",
          "accent": "#E5E0FF",
          "neutral": "#FFF2F2",
          "base-100": "#ffffff",
          "info": "#51829B",
          "success": "#A5DD9B",
          "warning": "#A5DD9B",
          "error": "#D37676",
        }
      }
    ]
  }
}

