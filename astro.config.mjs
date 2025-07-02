// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    solidJs(),
    mdx({
      // resets Astro's default mdx config
      extendMarkdownConfig: false,
      // Github-Flavoured Markdown is supported automatically
      gfm: true,
      shikiConfig: {
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
});
