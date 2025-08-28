<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { ThemeManager } from "./themes.svelte";
  let manager = $state<ThemeManager>();

  const { children, ...props }: HTMLButtonAttributes = $props();

  function handleClick() {
    manager?.setTheme(manager.theme === "dark" ? "light" : "dark");
  }

  onMount(() => {
    manager = ThemeManager.getInstance();
  });
</script>

<button onclick={handleClick} {...props}>
  {@render children?.()}
  {#if manager}
    {#if manager.theme === "dark"}
      <span class="sr-only">Switch to light theme</span>
    {:else}
      <span class="sr-only">Switch to dark theme</span>
    {/if}
  {/if}
</button>
