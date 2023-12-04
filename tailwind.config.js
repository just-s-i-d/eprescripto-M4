/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      "sm": "375px",
      "md": "640px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1375px"
    },
    extend: {
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
  important: "#root"
}