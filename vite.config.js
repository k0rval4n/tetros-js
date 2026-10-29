import { defineConfig } from 'vite';
import { resolve } from 'path';

// Default = "/"
const REPO_PATH = "/tetros-js/";

export default defineConfig({
  base: REPO_PATH,
  resolve: {
    alias: {
      '~': resolve(import.meta.dirname, './src'),
    },
  },
});
