import type { Session } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";


export const load = async ({locals: { getSession } }) => {
  const session:Session|null = await getSession()

    if(!session){
        throw redirect(305, "/")
    }

  return {
    session,
  }
}
