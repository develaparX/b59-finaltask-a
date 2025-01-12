/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.hbs"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A21C0", // Primary Blue (Button utama)
          700: "#1D4ED8", // Warna biru tua
          800: "#1E40AF",
          300: "#93C5FD",
          900: "#1E3A8A",
        },
        secondary: {
          darkBlue: "#050A44", // Navy Blue (Navbar dan Button sekunder)
          darkGray: "#2C2E3A", // Dark Gray (Background)
        },
        neutral: {
          lightGray: "#B3B4BD", // Light Gray (Card dan teks elemen)
        },
      },
    },
  },
  plugins: [],
};
