import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx'], // Make sure both .js and .jsx are resolved
  },
  plugins: [react()],
});
