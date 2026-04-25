import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Supabase environment variables are not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
    this.name = "SupabaseNotConfiguredError";
  }
}

let supabaseInstance: SupabaseClient | null = null;

// Lazy getter — defers env validation to first call so a missing key
// doesn't crash module evaluation during `next build`.
export function getSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new SupabaseNotConfiguredError();
  supabaseInstance = createClient(url, anonKey);
  return supabaseInstance;
}

export function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new SupabaseNotConfiguredError();
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
