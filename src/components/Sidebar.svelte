<script lang="ts">
  import type { SidebarCategory } from "./sidebar";
  import SidebarEntry from "./SidebarEntry.svelte";

  interface Props {
    categories: SidebarCategory[];
  }

  const props: Props = $props();
</script>

<ul class="flex flex-1 flex-col gap-8 overflow-y-auto p-4">
  {#each props.categories as entry}
    <SidebarEntry open={entry.pages.some((p) => p.current)} title={entry.name} pages={entry.pages} />
  {/each}
</ul>
