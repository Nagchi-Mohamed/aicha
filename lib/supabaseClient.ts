import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://qnmyualthtyojygvzfhr.supabase.co';
const supabaseKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) || 'sb_publishable_7xgHA7YLbxzbU634OMoiRQ_LEZFWtxY';

export const supabase = createClient(supabaseUrl, supabaseKey);

