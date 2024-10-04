import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        monkey({
            entry: "src/main.ts",
            userscript: {
                icon: "https://www.wikidot.com/local--favicon/favicon.gif",
                namespace: "npm/vite-plugin-monkey",
                author: "hoah2333",
                website: "https://www.wikidot.com",
                match: ["http://www.wikidot.com/*", "https://www.wikidot.com/*"],
            },
        }),
    ],
});
