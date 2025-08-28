<script lang="ts">
  import PanelLeftCloseIcon from "@lucide/svelte/icons/panel-left-close";

  import Sidebar from "./Sidebar.svelte";
  import type { SidebarCategory } from "./sidebar";
  import { sidebarOpen } from "../util/state";

  interface Props {
    categories: SidebarCategory[];
  }

  const close = () => {
    sidebarOpen.set(false);
  };

  const { categories }: Props = $props();
</script>

{#if $sidebarOpen}
  <div
    class="trasition-opacity fixed z-10 opacity-100 backdrop-blur-sm transition duration-1000 ease-out data-closed:size-0 data-closed:opacity-0 data-open:inset-0 dark:bg-gray-900/30"
    aria-hidden="true"
    onclick={close}
    data-open={$sidebarOpen ? "" : undefined}
    data-closed={!$sidebarOpen ? "" : undefined}
  ></div>
{/if}

<div
  class="fixed z-10 inset-y-0 left-0 isolate block w-sm max-w-[calc(100%-(--spacing(11)))] overflow-y-auto rounded-r-md bg-white ring ring-gray-950/10 lg:hidden dark:bg-gray-950 dark:ring-white/10 translate-x-0 transition ease-out data-closed:invisible data-closed:-translate-x-full"
  data-open={$sidebarOpen ? "" : undefined}
  data-closed={!$sidebarOpen ? "" : undefined}
>
  <div class="flex items-center px-4">
    <div class="pt-4">
      <button
        class="inline-grid shrink-0 rounded-md stroke-1 p-1 align-middle text-gray-700 hover:bg-gray-950/5 active:bg-gray-950/5 dark:text-gray-300 dark:hover:bg-white/5 dark:active:bg-white/5"
        aria-label="Close sidebar"
        onclick={close}
      >
        <PanelLeftCloseIcon class="size-6" stroke-width={1.5} />
      </button>
    </div>
  </div>
  <nav class="flex h-full min-h-0 flex-col">
    <Sidebar {categories} />
  </nav>
</div>
