import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    base: "/saurabhcricketx/", // Repository base path
  },
  nitro: {
    preset: "static", // Forces Nitro to produce a static site export
  },
});
