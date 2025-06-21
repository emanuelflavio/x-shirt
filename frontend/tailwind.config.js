/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js" // Adicione esta linha para o Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Adicione esta linha para o plugin Flowbite
  ],
}
