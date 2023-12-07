<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
  
  
    export let href: string | undefined = undefined;
    export let type: HTMLButtonAttributes['type'] = 'button';
    export let tag: string = 'button';
    export let buttonClass:string = ""
 

  </script>
  
  {#if href}
    <a {href} {...$$restProps} class={buttonClass} role="button" on:click on:change on:keydown on:keyup on:touchstart|passive on:touchend on:touchcancel on:mouseenter on:mouseleave>
      <slot />
    </a>
  {:else if tag === 'button'}
    <button {type} {...$$restProps} class={buttonClass} on:click on:change on:keydown on:keyup on:touchstart|passive on:touchend on:touchcancel on:mouseenter on:mouseleave>
      <slot />
    </button>
  {:else}
    <svelte:element this={tag} {...$$restProps} class={buttonClass}>
      <slot />
    </svelte:element>
  {/if}
  