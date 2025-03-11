import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), TanStackRouterVite(), react()],
	build: { chunkSizeWarningLimit: 550 },
	server: {
		host: host || false,
		port: 5173,
		strictPort: true,
		hmr:
			host ?
				{
					protocol: 'ws',
					host: host,
					port: 5173,
				}
			:	undefined,
	},
})
