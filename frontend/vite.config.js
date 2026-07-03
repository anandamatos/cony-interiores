import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const fallbackProxyTarget = 'http://127.0.0.1:8000'

function resolveApiProxyTarget() {
  const configuredTarget = process.env.VITE_API_PROXY || fallbackProxyTarget

  try {
    const parsed = new URL(configuredTarget)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.origin
    }
  } catch {
    return fallbackProxyTarget
  }

  return fallbackProxyTarget
}

const apiProxyTarget = resolveApiProxyTarget()

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'same-origin',
    },
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
})
