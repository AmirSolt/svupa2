import type { AuthSession } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";


export const load = async ({locals: { getSession } }) => {
  const session:AuthSession|null = await getSession()

    if(!session){
        throw redirect(305, "/")
    }

  return {
    session,
  }
}
