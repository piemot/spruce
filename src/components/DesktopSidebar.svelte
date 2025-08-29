<script lang="ts">
  import SearchIcon from "@lucide/svelte/icons/search";
  import TreePineIcon from "@lucide/svelte/icons/tree-pine";
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonStarIcon from "@lucide/svelte/icons/moon-star";

  import Sidebar from "./Sidebar.svelte";
  import type { SidebarCategory } from "./sidebar";

  interface Props {
    categories: SidebarCategory[];
  }

  const { categories }: Props = $props();
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<div class="fixed inset-y-0 left-0 w-2xs data-sidebar-collapsed:hidden max-lg:hidden">
  <nav class="flex h-full min-h-0 flex-col">
    <div class="flex flex-col space-y-2.5 border-b border-gray-950/5 p-4 dark:border-white/5">
      <div
        class="flex w-full items-center gap-3 px-2 py-2.5 text-base/6 font-medium text-gray-950 dark:text-emerald-600 dark:hover:text-emerald-500 dark:transition-colors"
      >
        <a href="/spruce" class="flex items-center gap-3">
          <span class="inline-grid size-7 shrink-0 align-middle">
            <TreePineIcon class="size-full" />
          </span>
          <span class="truncate font-header">SpruceBytes</span>
        </a>
        <ThemeSwitcher
          class="ml-auto inline-grid size-7 shrink-0 rounded-md border-2 border-gray-950/5 p-1 align-middle text-gray-500 hover:bg-gray-950/5 dark:border-white/10 dark:hover:bg-white/5"
        >
          <SunIcon class="block size-full dark:hidden" stroke-width={1.5} />
          <MoonStarIcon class="hidden size-full dark:block" stroke-width={1.5} />
        </ThemeSwitcher>
      </div>
      <button
        class="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-base/6 text-gray-950 hover:bg-gray-950/5 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <span
          class="size-5 shrink-0 text-gray-500 group-hover:text-gray-950 dark:text-gray-400 dark:group-hover:text-white"
        >
          <SearchIcon class="size-full" />
        </span>
        <span class="truncate">Search</span>
      </button>
    </div>
    <Sidebar {categories} />
  </nav>
</div>
