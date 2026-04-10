import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: /github.com/koleshchatov/newReal/my-react-app,
  plugins: [react()],
})
