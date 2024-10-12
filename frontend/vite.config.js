import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel(),
    // babel({
    //   babelConfig: './.babelrc', // Optional: kann weggelassen werden, wenn die Babel-Konfiguration in der Standarddatei vorhanden ist
    // }),
  ],
});
