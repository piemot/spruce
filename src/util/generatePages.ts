import type { CollectionEntry } from "astro:content";

export function createSlug(title: string): string {
  return (
    title
      // remove leading & trailing whitespace
      .trim()
      // remove special characters
      .replace(/[^A-Za-z0-9 ]/g, "")
      // replace spaces
      .replace(/\s+/g, "-")
      // remove leading & trailing separtors
      .replace(/^-+|-+$/g, "")
      // output lowercase
      .toLowerCase()
  );
}

export function getCategoryUrl(categoryName: string): string {
  return `/${createSlug(categoryName)}`;
}

export function getPostUrl(categoryName: string, postName: string): string {
  return `/${createSlug(categoryName)}/${createSlug(postName)}`;
}

export function sortProjects(a: CollectionEntry<"posts">, b: CollectionEntry<"posts">): number {
  if (a.data.sortOrder && b.data.sortOrder) {
    return b.data.sortOrder - a.data.sortOrder;
  }
  return a.data.title.localeCompare(b.data.title);
}
