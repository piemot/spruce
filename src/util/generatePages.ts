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

export type MarkdownHeading = {
  text: string;
  slug: string;
  subheadings: MarkdownHeading[];
};

/** A recursive function to construct a nested list of headings from a flat list of depths */
function constructHeadingList(headings: { text: string; slug: string; depth: number }[]): MarkdownHeading[] {
  if (headings.length === 0) return [];

  const result: MarkdownHeading[] = [];
  let i = 0;
  while (i < headings.length) {
    const current = headings[i];
    // Find where the next heading of the same depth starts
    let j = i + 1;
    while (j < headings.length && headings[j].depth > current.depth) {
      j++;
    }
    // Recursively build subheadings
    result.push({
      text: current.text,
      slug: current.slug,
      subheadings: constructHeadingList(headings.slice(i + 1, j)),
    });
    i = j;
  }

  return result;
}

/**
 * Converts a flat array of headings into a nested tree structure.
 * Excludes the top heading and ignores headings deeper than depthLimit.
 */
export function treeifyHeadings(
  rawHeadings: { text: string; slug: string; depth: number }[],
  depthLimit = 4,
): MarkdownHeading[] {
  const headings = rawHeadings.filter((h) => h.depth > 1 && h.depth <= depthLimit);
  return constructHeadingList(headings);
}

function path(file: string) {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl.endsWith("/") ? `${baseUrl}${file}` : `${baseUrl}/${file}`;
}

export function getCategoryUrl(categoryName: string): string {
  return path(`${createSlug(categoryName)}`);
}

export function getPostUrl(categoryName: string, postName: string): string {
  return path(`${createSlug(categoryName)}/${createSlug(postName)}`);
}

export function sortProjects(a: CollectionEntry<"posts">, b: CollectionEntry<"posts">): number {
  if (a.data.sortOrder && b.data.sortOrder) {
    return b.data.sortOrder - a.data.sortOrder;
  }
  return a.data.title.localeCompare(b.data.title);
}
