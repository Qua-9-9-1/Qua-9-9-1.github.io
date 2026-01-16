/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        foreground: 'var(--text-color)',
        surface: 'var(--surface-color)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        border: 'var(--border-color)',
      },
    },
  },
  plugins: [],
}