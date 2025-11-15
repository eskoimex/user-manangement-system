
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//     server: {
//       port: 3000,
//       open: true,
//     },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  define: {
    "process.env": {},
  },
});