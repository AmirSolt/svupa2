<script lang="ts">
	import '../app.postcss';
	import {User, Menu, Settings} from 'lucide-svelte'
	import Dropdown from '$lib/comps/tools/flowbite-borrow/Dropdown.svelte';
	import DropdownItem from '$lib/comps/tools/flowbite-borrow/DropdownItem.svelte';
	import DropdownDivider from '$lib/comps/tools/flowbite-borrow/DropdownDivider.svelte';
	import Button from '$lib/comps/tools/flowbite-borrow/Button.svelte';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { Toast, Modal, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	let { supabaseAuthClient, session } = data;
	$: ({ supabaseAuthClient, session } = data);
	onMount(() => {
		const {
			data: { subscription }
		} = supabaseAuthClient.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				console.log("======= invalidate auth =======")
				invalidate('supabase:auth');
			}
		});
		return () => subscription.unsubscribe();
	});

	
	

	// Highlight JS
	// import hljs from 'highlight.js';
	// import 'highlight.js/styles/github-dark.css';
	// import { storeHighlightJs } from '@skeletonlabs/skeleton';
	// storeHighlightJs.set(hljs);

	// // Floating UI for Popups
	// import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	// import { storePopup } from '@skeletonlabs/skeleton';
	// storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


</script>

<Toast position="t" />
<Modal />

<AppShell>
	<svelte:fragment  slot="header">
		<AppBar gap="gap-1" padding="p-3" slotTrail="space-x-2">
			<svelte:fragment slot="lead">
				<a href="/">
					<p class="text-3xl md:text-4xl font-bold"> Svupa2 </p>
				</a>
		
			</svelte:fragment>
			
			<svelte:fragment  slot="trail" >
				<div class="flex justify-center items-center gap-2">
					<a class="btn variant-ringed" href="/payment/pricing">
						Pricing 
					</a>


					{#if session?.user}


					<a class="btn btn-icon variant-filled" href="/profile/dashboard">
						<User class="inline-block"/> 
					</a>
					
					<Button buttonClass="btn btn-icon variant-filled-secondary">
						<Menu/>
					</Button>
					  <Dropdown>
						  <DropdownItem href="/profile/page1" >Page 1</DropdownItem>
						  <DropdownDivider />
						  <DropdownItem href="/profile/page2" >Page 2</DropdownItem>
						  <DropdownDivider />
						<DropdownItem href="/profile/settings"> <span><Settings class="inline-block"/> Settings</span> </DropdownItem>
					  </Dropdown>

	
					{:else}
						<a class="btn btn-sm md:btn-md variant-filled" href="/auth/signin"> Log in </a>
						<a class="btn btn-sm md:btn-md variant-filled-primary" href="/auth/signup"> Sign up </a>
					{/if}

				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		
		<div class="flex justify-end items-start p-2">
				<LightSwitch />
		</div>
	</svelte:fragment>


	<div class="flex justify-center w-full p-4 pt-2">
		<slot />
	</div>


	<div class="px-4 md:px-24 pt-52 md:pt-96 pb-8">
		<hr>
	</div>

	<svelte:fragment slot="pageFooter">
		
		<div class="flex flex-wrap justify-evenly items-center px-4 md:px-24 py-8 gap-4">
			<div class="flex flex-col justify-center items-start">
				<img src="/logo.png" alt="Logo" width="80" height="80" />
				<p class="text-xl font-bold">Svupa</p>
				<p>[Text]</p>
				<p>support@Svupa.com</p>
			</div>
			<div class="flex flex-wrap justify-center items-center gap-8">
				<div class="flex flex-col justify-center items-start">
					<h3>Features</h3>
					<ul>
						<li>
							<a href="/profile/page"> page </a>
						</li>
						<li>
							<a href="/profile/page"> page </a>
						</li>
						<li>
							<a href="/profile/page"> page </a>
						</li>
						<li>
							<a href="/profile/page"> page </a>
						</li>
					</ul>
				</div>
				<div class="flex flex-col justify-center items-start">
					<h3>Website</h3>
					<ul>
						<li>
							<a href="/payment/pricing"> Pricing </a>
						</li>
						<li>
							<a href="/auth/signup"> Sign up </a>
						</li>
						<li>
							<a href="/auth/signin"> Sign in </a>
						</li>
						<li>
							<a href="/auth/resetPassword/init"> Reset Passowrd </a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
	</svelte:fragment>


</AppShell>
