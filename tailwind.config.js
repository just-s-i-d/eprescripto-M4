/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      "xs": "375px",
      "sm": "575px",
      "md": "787px",
      "lg": "1024px",
      "xl": "1150px",
      "xxl": "1280px",
      "2xl": "1380px",
    },
    extend: {
      colors: {
        infoCardColors: {
          color1: "#02c39a",
          color2: "#c8b6ff",
          color3: "#5fa8d3",
          color4: "#fe6d73"
        }
      },
      animation: {
        loading: "loading 0.8s infinite alternate linear"
      },
      keyframes: {
        loading: {
          "from": { transform: "rotate(-10deg)" },
          "to": { transform: "rotate(90deg)" }
        }
      }
    },
  },
  plugins: [],
  important: true
}