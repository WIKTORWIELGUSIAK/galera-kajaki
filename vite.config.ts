/** @format */

import { defineConfig } from "vite";
// @ts-ignore
import { dependencies } from "./package.json";

function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-router-dom", "react-dom"],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
