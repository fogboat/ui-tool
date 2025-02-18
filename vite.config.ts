import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ tsconfigPath:"./tsconfig.lib.json",rollupTypes:true})],
  resolve: {
    alias: {
      '$': resolve(__dirname, './src/lib')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/lib/main.ts'),
      name: 'uiTool',
      formats: ['es', "umd"],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', "react/jsx-runtime"],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': "jsx"
        }
      }
    }
  },
})
