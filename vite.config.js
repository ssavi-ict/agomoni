import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base so assets load correctly on GitHub Pages under any repository path
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
