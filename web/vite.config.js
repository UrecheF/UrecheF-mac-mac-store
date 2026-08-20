import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/UrecheF-mac-mac-store/" : "/",
  plugins: [react(), tailwindcss()],
});
