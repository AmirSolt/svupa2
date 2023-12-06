<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	
	import Header from '$lib/comps/basic/Header.svelte'
	import Rail from '$lib/comps/basic/Rail.svelte';
	import Footer from '$lib/comps/basic/Footer.svelte'



</script>



<AppShell>
	<svelte:fragment  slot="header">
		<Header />
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		
		<div class="flex justify-end items-start p-2">
				<LightSwitch />
		</div>
	</svelte:fragment>
</AppShell>
