import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
     include: "**/*.svg",
    })],
  base: "/typography-sandbox/"
})
