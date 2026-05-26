import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/', // تظبيط مسارات الـ CSS والـ JS عشان النيجينكس يشوفها صح
  server: {
    allowedHosts: ['azkararafa.online'] // عشان حظر الـ Vite ميرجعش يضايقك تاني
  }
})