import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${r('src/styles/_variables.scss')}";`
      }
    },
  },
})