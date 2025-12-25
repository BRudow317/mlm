import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist', // This should match the directory in the maven-resources-plugin
    emptyOutDir: true,
  }
})
