import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Generate dynamic version based on current date and time
const generateVersion = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')
  
  return `v${year}.${month}.${day}.${hour}${minute}`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/non-pro-traveller/' : '/',
  define: {
    __APP_VERSION__: JSON.stringify(generateVersion())
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
})