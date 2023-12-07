

import { error } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { PRIVATE_SERVICE_ROLE_KEY_SUPABASE } from '$env/static/private'
import { createClient, type AuthSession } from '@supabase/supabase-js'
import type { Database } from '$lib/utils/database.types'


// Create a single supabase client for interacting with your database
export const supabaseAdmin = createClient<Database>(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
    {
        auth: { persistSession: false },
    }
)


export async function fetchProfile(session:AuthSession|null){
    if (session) {

 
        const { data, error: err }  =  await supabaseAdmin
            .from('profiles')
            .select(`
                full_name,
                wallet:wallets(customer_id, subscription_id)
            `)
            .eq('id', session?.user.id)
            .single()  
            
        if (err != null) {
            throw error(400, {
                message: err.message,
            })
        }
        return data
    }
    return null
}


export async function updateWalletCustomerId(session:AuthSession|null, customer_id:string|undefined|null):Promise<boolean>{
    if(customer_id==null || session==null){
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

    if(customer_id==null || subscription_id==null){
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


export async function getWalletSubscriptionId(customer_id:string|undefined|null):Promise<string|null|undefined>{
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
    return data["subscription_id"]
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


export async function updateName(session:AuthSession|null, full_name:string|null):Promise<boolean>{
    if (session) {
        const { data, error: err } = await supabaseAdmin
            .from('profiles')
            .update({full_name})
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
