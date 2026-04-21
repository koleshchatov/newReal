import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  base: `/newReal/`,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["src"],
      },
    },
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:4]",
      localsConvention: "camelCaseOnly",
    },
  },
});
