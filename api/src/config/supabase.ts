import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types.js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.PROJECT_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: PROJECT_URL or SUPABASE_KEY');
}

// Cliente publico (anon key) — usado para autenticacion de usuarios
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Cliente admin (service role) — solo para llamadas server-side como Edge Functions
// No exponer en el cliente ni en respuestas HTTP
if (!supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variable: SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});