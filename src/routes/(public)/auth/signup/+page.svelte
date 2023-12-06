<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
    import { signupSchema } from '$lib/utils/schema'
    import {toastError} from '$lib/utils/toastHelper.js'
	import SuperTextInput from '$lib/comps/superForms/SuperTextInput.svelte';
	import SuperEmail from '$lib/comps/superForms/SuperEmail.svelte';
	import SuperPassword from '$lib/comps/superForms/SuperPassword.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore()

	export let data
	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators:signupSchema,
		onError: (result)=>{toastError(result.result.error.message, toastStore)},
		taintedMessage:null
	})

</script>





<div class="card-mod">
	<h1>Sign up</h1>


	<form method="POST" class="flex flex-col justify-center items-start gap-4 w-full pt-4" use:enhance>
		

		<SuperTextInput
			session={data.session} 
			formAttrName="full_name"
			form={form}
			constraints={constraints}
			errors={errors}
			placeholder="(optional)"
			autocomplete="name"
		>
			<div slot="head">
				<h3>Full Name</h3>
			</div>
		</SuperTextInput>
	
		<SuperEmail 
			session={data.session} 
			formAttrName="email"
			form={form}
			constraints={constraints}
			errors={errors}
			autocomplete="email"
		>
			<div slot="head">
				<h3>Email</h3>
			</div>
		</SuperEmail>
		<SuperPassword 
			session={data.session} 
			formAttrName="password"
			form={form}
			constraints={constraints}
			errors={errors}
			autocomplete="new-password"
		>
			<div slot="head">
				<h3>Password</h3>
			</div>
		</SuperPassword>



		<button class="btn variant-filled" type="submit">Sign up</button>	
			
	</form>
</div>

<br>

<p class="text-center">
	Have an account?
	<a href="/auth/signin" class="underline ">Sign in</a>
</p>