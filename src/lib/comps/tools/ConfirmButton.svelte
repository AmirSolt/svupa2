<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';

    export let func:()=>void
	export let parent:SvelteComponent

	// Modal
	const modalStore = getModalStore();

	function confirmHandler(){
		parent.onClose()
		func()
	}

</script>


<!-- @component -->
{#if $modalStore[0]}


	<div class="card p-4 w-full shadow-sm flex flex-col gap-4">
		<div>
			<header class="text-2xl font-bold">Are you sure?</header>
		</div>

        <button class="btn variant-filled w-24" type="button" on:click={parent.onClose}>No</button>
        <button class="btn variant-filled w-24" type="button" on:click={confirmHandler}>Yes</button>


	</div>
{/if}

