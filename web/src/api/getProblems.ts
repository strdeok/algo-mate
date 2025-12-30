import { supabase } from "./supabase";

export const getProblems = async () => {
  const { data, error } = await supabase.from("problems").select("*");

  if (error) throw error;
  return data;
};
