import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders"; // Not available with legacy API

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = { posts };
