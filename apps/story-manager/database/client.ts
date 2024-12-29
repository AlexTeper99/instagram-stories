/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient(): any {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
