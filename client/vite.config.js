import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createFilter } from 'vite-plugin-utils';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx',
    },
  },
});
