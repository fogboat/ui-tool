import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import autoArgs from "./src/autoArgs/Plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [autoArgs(),react(), dts({ tsconfigPath:"./tsconfig.lib.json",rollupTypes:true})],
  resolve: {
    alias: {
      '@fogboat/ui-tool': resolve(__dirname, './src/lib'),
      '@': resolve(__dirname, './src'),
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/lib/index.ts'),
      name: 'uiTool',
      formats: ['es', "umd"],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', "react-dom","react/jsx-runtime"],
      output: {
        globals: {
          react: 'React',
          "react-dom": 'ReactDOM',
          'react/jsx-runtime': "jsx"
        }
      }
    }
  },
})



