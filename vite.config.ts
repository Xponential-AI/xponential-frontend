import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/_variables.scss";`
      }
    },
  },
})