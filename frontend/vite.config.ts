import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],

  server: {
    host: "0.0.0.0",
    // allowedHosts: true,
    // OR:
    allowedHosts: ["daylong-angrily-wiring.ngrok-free.dev"],
   
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});