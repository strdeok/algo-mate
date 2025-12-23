import { supabase } from "../api/supabase";

export const useAuth = async () => {
  const { data } = await supabase.auth.getSession();

  return data.session;
};
