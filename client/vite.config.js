// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    __DEFINES__: '{}',
    __HMR_CONFIG_NAME__: '"default"',
    __HMR_TIMEOUT__: '30000',
    __HMR_ENABLE_OVERLAY__: 'true',
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
})