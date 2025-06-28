// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    // Common Vite defines
    __DEFINES__: '{}',
    __HMR_CONFIG_NAME__: '"default"',
    __HMR_TIMEOUT__: '30000',
    __HMR_ENABLE_OVERLAY__: 'true',
    __VERSION__: '"1.0.0"',
    __DEV__: 'false',
    __PROD__: 'true',
    
    // Environment and globals
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env': {},
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})