import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { BASE_REQUEST_URL } from "./src/common/request/static";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    proxy: {
      "^/api": {
        target: BASE_REQUEST_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
