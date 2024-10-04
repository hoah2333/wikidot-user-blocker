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
                icon: "https://backrooms-wiki-cn.wikidot.com/local--favicon/favicon.gif",
                namespace: "npm/vite-plugin-monkey",
                author: "hoah2333",
                website: "https://backrooms-wiki-cn.wikidot.com",
                match: [
                    "https://*.wikidot.com/*",
                ],
            },
        }),
    ],
});
