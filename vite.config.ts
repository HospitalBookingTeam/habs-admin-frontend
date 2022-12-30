import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [{ find: '@', replacement: '/src' }],
	},
	plugins: [react()],
	esbuild: {
		logOverride: { 'this-is-undefined-in-esm': 'silent' },
	},
})
