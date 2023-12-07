import type { Session } from "@supabase/supabase-js";
import { fetchProfile } from '$lib/funcs/database.server.js'


export const load = async ({locals: { getSession } }) => {
  const session:Session|null = await getSession()
	const profile = await fetchProfile(session)
  return {
    session,
    profile
  }
}





