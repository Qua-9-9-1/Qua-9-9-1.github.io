import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
  };

  if (command !== "serve") {
    config.base = "/Qua-9-9-1.github.io/";
  }
  return config;
});
