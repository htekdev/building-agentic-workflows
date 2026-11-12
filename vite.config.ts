import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/building-agentic-workflows/',
  build: {
    rollupOptions: {
      input: { deck: resolve('index.html'), handout: resolve('handout.html') },
    },
  },
});
