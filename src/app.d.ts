// src/app.d.ts


// npx supabase gen types typescript --project-id lzwzuonzdnqgacynnsry > ./src/lib/utils/database.types.ts

import { SupabaseClient, AuthSession } from '@supabase/supabase-js'
import type { Database } from '$lib/utils/database.types.js'

declare global {
  namespace App {
    interface Locals {
      supabaseAuthServer: SupabaseClient<Database>
      getSession(): Promise<AuthSession | null>
    }
    interface PageData {
      session: AuthSession | null,
    }
    // interface Error {}
    // interface Platform {}
  }
}
