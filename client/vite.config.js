// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    __DEFINES__: JSON.stringify({}),
    global: 'globalThis',
    'process.env': {},
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
})