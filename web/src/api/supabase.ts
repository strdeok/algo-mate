import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("🚨 .env 파일에 Supabase 키가 없습니다!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
