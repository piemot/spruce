<script lang="ts">
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = SvelteHTMLElements["div"] & { title: string; open?: boolean; icon?: Snippet };
  const { title, open: startsOpen, children, icon, ...props }: Props = $props();
  let open = $state(startsOpen ?? false);

  function toggle() {
    open = !open;
  }
</script>

<div
  data-open={open ? "" : undefined}
  class="group my-4 grid grid-cols-[auto_1fr] gap-2 rounded-xl border border-gray-500 bg-card p-3 ps-2 text-sm text-card-foreground shadow-md"
  {...props}
>
  <button type="button" onclick={toggle} class="flex gap-2">
    {#if icon}
      {@render icon?.()}
    {:else}
      <ChevronRightIcon class="size-5 transition group-data-open:rotate-90" />
    {/if}
  </button>
  <div class="grid grid-cols-1">
    <button onclick={toggle} class="!my-0 font-medium">{title}</button>
    <div class="grid grid-rows-[0fr] transition-[grid-template-rows] group-data-open:grid-rows-[1fr]">
      <div class="overflow-hidden text-muted-foreground [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0">
        {@render children?.()}
      </div>
    </div>
  </div>
</div>
