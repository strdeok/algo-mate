import { supabase } from "./supabase";

export const getWeeklyLogs = async (userId: string) => {
  const { data, error } = await supabase
    .from("solve_logs")
    .select("solved_at")
    .eq("user_id", userId)
    .gte("solved_at", "2025-12-22T00:00:00Z");

  if (error) throw error;

  return data;
};

export const logSolve = async ({ userId, problemId }: { userId: string; problemId: number }) => {
  const { data, error } = await supabase
    .from("solve_logs")
    .insert([{ user_id: userId, problem_id: problemId }]);

  if (error) throw error;
  return data;
};