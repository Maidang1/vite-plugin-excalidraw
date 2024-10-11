import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePluginExcalidraw from "vite-plugin-excalidraw"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginExcalidraw()],
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
})
