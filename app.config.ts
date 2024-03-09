import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    appRoot: "./src",
    ssr: true,
    server: {
        preset: "vercel",
    },
});
