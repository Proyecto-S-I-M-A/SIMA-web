import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types.js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.PROJECT_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: PROJECT_URL or SUPABASE_KEY');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);