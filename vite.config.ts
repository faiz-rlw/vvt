import path from 'path'
import { defineConfig } from 'vite'
import plugins from './plugin/index'
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [plugins()],
  server: {
    host: '0.0.0.0'
  },
  base: process.env.NODE_ENV === 'development' ? '/':"./"
})
