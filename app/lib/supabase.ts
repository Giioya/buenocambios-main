import { createClient } from '@supabase/supabase-js';

// Obtén tus credenciales de Supabase desde las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);


