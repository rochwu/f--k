import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  base: '/f--k',
  plugins: [solidPlugin()],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
