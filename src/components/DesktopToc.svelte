<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteSet } from "svelte/reactivity";

  // https://www.emgoto.com/react-table-of-contents was super valuble when building this!
  interface Props {
    headings: { text: string; slug: string; depth: number }[];
  }

  const props: Props = $props();
  const headings = $state<{ text: string; slug: string; depth: number; active: boolean }[]>(
    props.headings
      .filter((heading) => heading.depth === 2 || heading.depth === 3)
      .map((heading) => ({ ...heading, depth: heading.depth - 1, active: false })),
  );

  let headingElems = $state([]);
  let visibleHeadings = new SvelteSet<string>();

  onMount(() => {
    headingElems = Array.from(document.querySelectorAll("#article h2, #article h3, #article h4"));
    const observer = new IntersectionObserver(observerCallback, {
      // ignore bottom 40% of the screen
      rootMargin: "0px 0px -40% 0px",
    });

    for (const elem of headingElems) {
      observer.observe(elem);
    }

    return () => {
      observer.disconnect();
    };
  });

  function observerCallback(observedEntries: IntersectionObserverEntry[]): void {
    for (const entry of observedEntries) {
      if (entry.isIntersecting) {
        visibleHeadings.add(entry.target.id);
      } else {
        visibleHeadings.delete(entry.target.id);
      }
    }

    if (visibleHeadings.size < 1) {
      return;
    }
    for (const heading of headings) {
      const active = visibleHeadings.has(heading.slug);
      heading.active = active;
    }
  }
</script>

<div class="hidden w-66 lg:block">
  <nav class="sticky top-20">
    <h2 class="text-sm/6 font-semibold text-gray-950 dark:text-white">On This Page</h2>
    <ul
      class="mt-3 flex flex-col gap-3 border-l border-gray-950/10 text-sm/6 text-gray-700 dark:border-white/10 dark:text-gray-400"
    >
      {#each headings as heading}
        <li
          class="-ml-px border-l border-transparent pl-4 hover:text-gray-950 hover:not-has-aria-[current=location]:border-gray-400 has-aria-[current=location]:border-gray-950 dark:hover:text-white dark:has-aria-[current=location]:border-white"
        >
          <a
            class={`block aria-[current=location]:font-medium aria-[current=location]:text-gray-950 dark:aria-[current=location]:text-white ${heading.depth === 2 ? "ps-4" : ""}`}
            href={"#" + heading.slug}
            aria-current={heading.active ? "location" : undefined}
          >
            {heading.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>
