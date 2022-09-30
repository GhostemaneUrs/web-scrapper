import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [react(), basicSsl()],
    server: {
      port: 8050,
      https: true,
      hmr: {
        overlay: false,
      },
    },
  }
})
