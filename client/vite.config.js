import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    __DEFINES__: JSON.stringify({
      API_URL: process.env.VITE_API_URL || 'https://default-api.com'
    }),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});