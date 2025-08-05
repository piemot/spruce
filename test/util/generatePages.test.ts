import { expect, test, describe } from "vitest";
import {
  createSlug,
  getCategoryUrl,
  getPostUrl,
  sortProjects,
  treeifyHeadings,
  type MarkdownHeading,
} from "../../src/util/generatePages";

describe("createSlug", () => {
  test("trims whitespace and lowercases", () => {
    expect(createSlug("  My Post Title  ")).toBe("my-post-title");
  });

  test("removes special characters", () => {
    expect(createSlug("Hello! @World* (Test)")).toBe("hello-world-test");
    expect(createSlug("A&B C/D")).toBe("ab-cd");
  });

  test("replaces spaces with hyphens", () => {
    expect(createSlug("Hello  World")).toBe("hello-world");
    expect(createSlug("Multiple   Spaces")).toBe("multiple-spaces");
  });

  test("removes leading/trailing separators", () => {
    expect(createSlug("   ---Hello World---   ")).toBe("hello-world");
  });

  test("empty string returns empty slug", () => {
    expect(createSlug("")).toBe("");
    expect(createSlug("   ")).toBe("");
    expect(createSlug("!!!")).toBe("");
  });
});

describe("getCategoryUrl", () => {
  test("returns slugified category url", () => {
    expect(getCategoryUrl("My Category")).toBe("/my-category");
    expect(getCategoryUrl("  Special & Chars! ")).toBe("/special-chars");
    expect(getCategoryUrl("___")).toBe("/");
  });
});

describe("getPostUrl", () => {
  test("returns url composed of slugified category and post", () => {
    expect(getPostUrl("News", "First Post")).toBe("/news/first-post");
    expect(getPostUrl(" Tech ", "  What's New? ")).toBe("/tech/whats-new");
    expect(getPostUrl("---", "!!!")).toBe("//");
  });
});

describe("sortProjects", () => {
  const makeEntry = (title: string, sortOrder?: number) =>
    ({
      data: { title, sortOrder },
    }) as any;

  test("sorts by descending sortOrder when both present", () => {
    const a = makeEntry("A", 10);
    const b = makeEntry("B", 20);
    expect(sortProjects(a, b)).toBe(10);
    expect(sortProjects(b, a)).toBe(-10);
  });

  test("falls back to title sort when sortOrder is missing", () => {
    const a = makeEntry("Alpha");
    const b = makeEntry("Beta");
    expect(sortProjects(a, b)).toBeLessThan(0);
    expect(sortProjects(b, a)).toBeGreaterThan(0);
  });

  test("mix of titles and sortOrder", () => {
    const a = makeEntry("Alpha", 5);
    const b = makeEntry("Beta");
    expect(sortProjects(a, b)).toBeLessThan(0); // "alpha" < "beta"
    expect(sortProjects(b, a)).toBeGreaterThan(0);
  });

  test("identical titles and sortOrder", () => {
    const a = makeEntry("Same", 2);
    const b = makeEntry("Same", 2);
    expect(sortProjects(a, b)).toBe(0);
  });
});

describe("treeifyHeadings", () => {
  test("returns empty array for empty input", () => {
    expect(treeifyHeadings([])).toStrictEqual([]);
  });

  test("treeifyHeadings returns empty array if all headings are filtered out by depthLimit", () => {
    const input = [
      { text: "a", slug: "a", depth: 1 },
      { text: "b", slug: "b", depth: 5 },
      { text: "c", slug: "c", depth: 6 },
    ];
    expect(treeifyHeadings(input, 4)).toStrictEqual([]);
  });

  test("returns single heading tree", () => {
    const input = [{ text: "single", slug: "single", depth: 2 }];
    const output: MarkdownHeading[] = [{ text: "single", slug: "single", subheadings: [] }];
    expect(treeifyHeadings(input)).toStrictEqual(output);
  });

  test("returns flat structure for same depth", () => {
    const input = [
      { text: "a", slug: "a", depth: 2 },
      { text: "b", slug: "b", depth: 2 },
      { text: "c", slug: "c", depth: 2 },
    ];
    const output: MarkdownHeading[] = [
      { text: "a", slug: "a", subheadings: [] },
      { text: "b", slug: "b", subheadings: [] },
      { text: "c", slug: "c", subheadings: [] },
    ];
    expect(treeifyHeadings(input)).toStrictEqual(output);
  });

  test("nests headings by depth", () => {
    const input = [
      { text: "a", slug: "a", depth: 2 },
      { text: "b", slug: "b", depth: 3 },
      { text: "c", slug: "c", depth: 4 },
      { text: "d", slug: "d", depth: 2 },
    ];
    const output: MarkdownHeading[] = [
      {
        text: "a",
        slug: "a",
        subheadings: [
          {
            text: "b",
            slug: "b",
            subheadings: [{ text: "c", slug: "c", subheadings: [] }],
          },
        ],
      },
      { text: "d", slug: "d", subheadings: [] },
    ];
    expect(treeifyHeadings(input)).toStrictEqual(output);
  });

  test("handles complex nested headings", () => {
    const input = [
      { text: "a", slug: "a", depth: 2 },
      { text: "b", slug: "b", depth: 3 },
      { text: "c", slug: "c", depth: 4 },
      { text: "d", slug: "d", depth: 3 },
      { text: "e", slug: "e", depth: 2 },
    ];
    const output: MarkdownHeading[] = [
      {
        text: "a",
        slug: "a",
        subheadings: [
          {
            text: "b",
            slug: "b",
            subheadings: [{ text: "c", slug: "c", subheadings: [] }],
          },
          { text: "d", slug: "d", subheadings: [] },
        ],
      },
      { text: "e", slug: "e", subheadings: [] },
    ];
    expect(treeifyHeadings(input)).toStrictEqual(output);
  });

  test("skips headings with depth > depthLimit", () => {
    const input = [
      { text: "a", slug: "a", depth: 2 },
      { text: "b", slug: "b", depth: 4 },
      { text: "c", slug: "c", depth: 5 },
      { text: "d", slug: "d", depth: 6 },
      { text: "e", slug: "e", depth: 100 },
    ];
    expect(treeifyHeadings(input, 3)).toStrictEqual([{ text: "a", slug: "a", subheadings: [] }]);
    expect(treeifyHeadings(input, 4)).toStrictEqual([
      { text: "a", slug: "a", subheadings: [{ text: "b", slug: "b", subheadings: [] }] },
    ]);
  });

  test("handles non-consecutive depth jumps", () => {
    const input = [
      { text: "a", slug: "a", depth: 2 },
      { text: "b", slug: "b", depth: 4 },
      { text: "c", slug: "c", depth: 2 },
    ];
    const output: MarkdownHeading[] = [
      {
        text: "a",
        slug: "a",
        subheadings: [{ text: "b", slug: "b", subheadings: [] }],
      },
      { text: "c", slug: "c", subheadings: [] },
    ];
    expect(treeifyHeadings(input)).toStrictEqual(output);
  });

  test("does not mutate the input array", () => {
    const input = [
      { text: "x", slug: "x", depth: 2 },
      { text: "y", slug: "y", depth: 3 },
    ];
    const clone = structuredClone(input);
    treeifyHeadings(input);
    expect(input).toStrictEqual(clone);
  });
});
