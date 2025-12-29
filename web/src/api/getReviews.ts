import { authStore } from "../store/authStore";
import { supabase } from "./supabase";

export const getReviews = async () => {
  const { supabase_id: userId } = authStore.getState();

  if (!userId) {
    console.warn("userId가 없습니다. 로그인이 필요합니다.");
    return [];
  }

  const { data: review, error } = await supabase
    .from("reviews")
    .select(
      `*,
      problems (
        title,
        tags,
        level
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("리뷰 데이터를 가져오는 중 에러 발생:", error);
    throw error;
  }

  return review;
};

export const getTodoReviews = async () => {
  const { supabase_id: userId } = authStore.getState();
  if (!userId) return [];

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      problems (
        title,
        tags,
        level
      )
    `
    )
    .eq("user_id", userId)
    .or(`memo.is.null, next_review_at.lte.${now}`)
    .order("next_review_at", { ascending: true });

  if (error) throw error;
  return data;
};
