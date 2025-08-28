<script lang="ts">
  import SearchIcon from "@lucide/svelte/icons/search";
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonStarIcon from "@lucide/svelte/icons/moon-star";
  import PanelLeftOpenIcon from "@lucide/svelte/icons/panel-left-open";

  import ThemeSwitcher from "./ThemeSwitcher.svelte";

  import { sidebarOpen } from "../util/state";
</script>

<header class="flex items-center px-4 lg:hidden">
  <div class="pt-4">
    <button
      class="inline-grid shrink-0 rounded-md stroke-1 p-1 align-middle text-gray-700 hover:bg-gray-950/5 active:bg-gray-950/5 dark:text-gray-300 dark:hover:bg-white/5 dark:active:bg-white/5"
      aria-label="Open sidebar"
      onclick={() => sidebarOpen.set(true)}
    >
      <PanelLeftOpenIcon class="size-6" stroke-width={1.5} />
    </button>
  </div>
  <div class="flex flex-1 items-center justify-end gap-4 pt-4">
    <button
      class="inline-grid shrink-0 rounded-md stroke-1 p-1 align-middle text-gray-700 hover:bg-gray-950/5 active:bg-gray-950/5 dark:text-gray-300 dark:hover:bg-white/5 dark:active:bg-white/5"
    >
      <SearchIcon class="size-6" stroke-width={1.5} />
    </button>
    <ThemeSwitcher
      class="inline-grid shrink-0 rounded-md stroke-1 p-1 align-middle text-gray-700 hover:bg-gray-950/5 active:bg-gray-950/5 dark:text-gray-300 dark:hover:bg-white/5 dark:active:bg-white/5"
    >
      <SunIcon class="block size-6 dark:hidden" stroke-width={1.5} />
      <MoonStarIcon class="hidden size-6 dark:block" stroke-width={1.5} />
    </ThemeSwitcher>
  </div>
</header>
