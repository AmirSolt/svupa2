import type { AuthSession } from "@supabase/supabase-js";
import { fetchProfile } from '$lib/funcs/database.server.js'


export const load = async ({locals: { getSession } }) => {
  const session:AuthSession|null = await getSession()
	const profile = await fetchProfile(session)
  return {
    session,
    profile
  }
}





