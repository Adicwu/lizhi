import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { BASE_REQUEST_URL } from "./src/common/request/static";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
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
