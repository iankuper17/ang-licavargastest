/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F5",
        "bg-card": "#FFFFFF",
        "text-primary": "#2A2520",
        "text-secondary": "#7A7067",
        "text-muted": "#A89E94",
        border: "#E8E2DB",
        "border-hover": "#D4CCC3",
        accent: "#C45B4A",
        espejo: "#C45B4A",
        niebla: "#6B8FA3",
        peso: "#8B7355",
        laberinto: "#7B6B8A",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
      },
    },
  },
  plugins: [],
};
