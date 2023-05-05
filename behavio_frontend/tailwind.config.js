/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E1E1E",
          light: "#2E2E2E",
          dark: "#0E0E0E",
        },
        secondary: {
          DEFAULT: "#F2F2F2",
          light: "#F5F5F5",
          dark: "#E2E2E2",
        },
        accent: {
          DEFAULT: "#FFC107",
          light: "#FFCA28",
          dark: "#FFB300",
        },
        error: {
          DEFAULT: "#F44336",
          light: "#EF5350",
          dark: "#E53935",
        },
        success: {
          DEFAULT: "#4CAF50",
          light: "#66BB6A",
          dark: "#43A047",
        },
        warning: {
          DEFAULT: "#FF9800",
          light: "#FFB74D",
          dark: "#FB8C00",
        },
      },
    },
  },
  plugins: [],
}