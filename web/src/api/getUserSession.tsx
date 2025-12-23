import { supabase } from "./supabase";

export const getUserSession = async () => {
  const { data } = await supabase.auth.getSession();

  return data.session;
};
