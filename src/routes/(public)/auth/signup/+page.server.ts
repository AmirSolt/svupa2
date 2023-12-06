import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { signupSchema } from '$lib/utils/schema'
import {createStripeCustomer} from '$lib/utils/stripeHelper.server.js'


export const load = async (event) => {
    const session = await event.locals.getSession()
    if (session) {
        throw redirect(302, '/')
    }

	// always return `form` in load and form actions
	const form = await superValidate(event, signupSchema)
	return { form }
}

export const actions = {
	default: async (event) => {


		const form = await superValidate(event, signupSchema)
        
		if (!form.valid) {
			return fail(400, { form })
		}		

		const { data, error:signupError } = await event.locals.supabaseAuthServer.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					full_name: form.data.full_name,
				}
			}
		})
		if(signupError!=null){
			
			throw error(signupError.status??500, {
				message: signupError.message,
			})
		}

        throw redirect(302, '/profile/dashboard')
    }
}


