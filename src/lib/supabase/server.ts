import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Server-side Supabase client with service role key
 * Use only for server-side operations (API routes, server actions)
 * Never expose service role key to the client
 */
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing required Supabase environment variables. Check your .env.local file.'
    );
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Export a singleton instance for convenience
export const supabaseServer = createServerClient();
