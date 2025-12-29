import { authStore } from "../store/authStore";
import { supabase } from "./supabase";

export interface Profile {
  id: string;
  baekjoon_id: string | null;
  goal_streak: number;
  created_at: string;
}

export const getProfile = async (supabase_id: string) => {
  const { setUuid } = authStore.getState();
  setUuid(supabase_id);
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", supabase_id)
    .single();

  if (error) throw error;
  setUuid(data.id)
  return data as Profile;
};
