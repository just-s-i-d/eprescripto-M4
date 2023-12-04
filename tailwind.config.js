/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      "mobile": "375px",
      "tablet": "640px",
      "laptop": "1024px",
      "desktop": "1280px",
      "largeScreen": "1375px"
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