import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ignoredDirs = [
  'bin','lib','logs','node_modules','.git','build'
]

const ignoredWatch = ignoredDirs.map((dir) => `**/${dir}/**`)
const externalRoots = ignoredDirs.map((dir) =>
  path.resolve(__dirname, dir).replace(/\\/g, '/')
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ignoredWatch,
    },
  },
  build: {
    outDir: './dist', 
    emptyOutDir: true,
    rollupOptions: {
      external: (id) => {
        const normalized = id.split('?')[0].replace(/\\/g, '/')
        return externalRoots.some(
          (root) => normalized === root || normalized.startsWith(`${root}/`)
        )
      },
    },
  }
})