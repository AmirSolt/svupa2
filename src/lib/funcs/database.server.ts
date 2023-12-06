

import { error } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { PRIVATE_SERVICE_ROLE_KEY_SUPABASE } from '$env/static/private'
import { createClient, type Session } from '@supabase/supabase-js'



// Create a single supabase client for interacting with your database
export const supabaseAdmin = createClient(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
    {
        auth: { persistSession: false },
    }
)


export async function fetchProfile(session:Session|null):Promise<Profile|null>{
    let profile:Profile
    if (session) {
        const { data, error: err } = await supabaseAdmin
            .from('profiles')
            .select(`
                first_name,
                last_name,
                wallet(customer_id, subscription_id)
            `)
            .eq('id', session?.user.id)
            .single()
        if (err != null) {
            
            throw error(400, {
                message: err.message,
            })
        }else{
            const first_name:string|null=data["first_name"]
            const last_name:string|null=data["last_name"]
            const wallet:Wallet=data["wallet"]
            profile = {
                first_name,
                last_name,
                wallet,
            }
        }
        return profile
    }
    return null
}


export async function updateWalletCustomerId(session:Session|null, customer_id:string|undefined|null):Promise<boolean>{
    if(customer_id==null && session==null){
        return false
    }

    const { data, error: err } = await supabaseAdmin
        .from('wallets')
        .update({customer_id})
        .eq('id', session?.user.id)
        .single()
    if (err != null) {
        // throw error(400, {
        //     message: err.message,
        // })
        return false
    }

    return true
}


export async function updateWalletSubscriptionId(customer_id:string|undefined|null, subscription_id:string|undefined|null):Promise<boolean>{

    if(customer_id==null && subscription_id==null){
        return false
    }
    const { data, error: err } = await supabaseAdmin
        .from('wallets')
        .update({subscription_id})
        .eq('customer_id', customer_id)
        .single()
    if (err != null) {
        // throw error(400, {
        //     message: err.message,
        // })
        return false
    }
    return true
   
}


export async function getWalletSubscriptionId(customer_id:string|undefined|null):Promise<string|undefined>{
    if(customer_id==null){
        return undefined
    }
    const { data, error: err } = await supabaseAdmin
        .from('wallets')
        .select("subscription_id")
        .eq('customer_id', customer_id)
        .single()

    if (err != null) {
        // throw error(400, {
        //     message: err.message,
        // })
        return undefined
    }
    const subscription_id:string|undefined=data["subscription_id"]
    return subscription_id
}


export async function removeWalletSubscriptionId(customer_id:string|undefined|null):Promise<boolean>{
    if(customer_id==null){
        return false
    }
    const { data, error: err } = await supabaseAdmin
        .from('wallets')
        .update({subscription_id:null})
        .eq('customer_id', customer_id)
        .single()
    if (err != null) {
        // throw error(400, {
        //     message: err.message,
        // })
        return false
    }
    return true
}


export async function updateName(session:Session|null, first_name:string|null, last_name:string|null,):Promise<boolean>{
    if (session) {
        const { data, error: err } = await supabaseAdmin
            .from('profiles')
            .update({first_name, last_name})
            .eq('id', session.user.id)
            .single()
        if (err != null) {
            // throw error(400, {
            //     message: err.message,
            // })
            return false
        }
        return true
    }
    return false
}
