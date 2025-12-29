import { authStore } from "../store/authStore";
import { supabase } from "./supabase";

export const getUserSession = async () => {
  const { data } = await supabase.auth.getSession();
  const { setSupabase_id } = authStore.getState();
  setSupabase_id(data?.session?.user?.id);

  return data.session;
};
