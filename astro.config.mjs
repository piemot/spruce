// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import expressiveCode from "astro-expressive-code";
import ec from "rehype-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://piemot.github.io",
  base: "/spruce",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    expressiveCode({
      themes: ["catppuccin-latte", "catppuccin-mocha"],
    }),
    mdx({
      // smartypants: false,
      remarkPlugins: [remarkMath],
      rehypePlugins: [[ec, { themes: ["catppuccin-latte", "catppuccin-mocha"] }], rehypeKatex],
    }),
  ],
});
