import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Optional: set VITE_API_URL=/api and proxy to your backend to avoid CORS in dev:
  // server: { proxy: { "/api": "http://localhost:8000" } },
});
