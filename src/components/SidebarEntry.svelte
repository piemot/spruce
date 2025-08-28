<script lang="ts">
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

  interface Props {
    title: string;
    pages: { name: string; href: string; current: boolean }[];
    open: boolean;
  }

  const { title, pages, open = false }: Props = $props();

  let isOpen = $state(open);
  function update() {
    isOpen = !isOpen;
  }
</script>

<li>
  <button
    onclick={update}
    aria-expanded={isOpen}
    class="space-x-1 text-sm/6 font-semibold text-pretty text-gray-950 sm:text-base/7 dark:text-white"
  >
    <h3 class="inline">{title}</h3>
    <ChevronRightIcon
      data-expanded={isOpen ? "" : undefined}
      class="inline size-4 text-gray-950/30 dark:text-white/30 dark:data-expanded:text-white data-expanded:text-gray-950 data-expanded:rotate-90 transition"
    />
  </button>
  <div class="hidden data-expanded:block" data-expanded={isOpen ? "" : undefined}>
    <ul
      class="mt-4 flex flex-col gap-4 border-l border-gray-950/10 text-base/7 text-gray-700 sm:mt-3 sm:gap-3 sm:text-sm/6 dark:border-white/10 dark:text-gray-400"
    >
      {#each pages as page}
        <li
          class="-ml-px flex border-l-2 border-transparent pl-4 hover:text-gray-950 hover:not-has-aria-[current=page]:border-gray-400 has-aria-[current=page]:border-gray-950 dark:hover:text-white dark:has-aria-[current=page]:border-white z-20"
        >
          <a
            class="aria-[current=page]:font-medium aria-[current=page]:text-gray-950 dark:aria-[current=page]:text-white"
            href={page.href}
            aria-current={page.current ? "page" : undefined}
          >
            {page.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</li>
