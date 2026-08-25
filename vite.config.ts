import path from 'node:path';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/dir': 'http://localhost:2000',
      '/thumb': 'http://localhost:2000',
      '/download': 'http://localhost:2000',
      '/auth': 'http://localhost:2000',
      '/view': 'http://localhost:2000',
    },
  },
  preview: {
    port: 3000,
  },
});
