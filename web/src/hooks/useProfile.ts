import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profiles";
import { authStore } from "../store/authStore";

export const useProfile = () => {
  const { supabase_id, setBaekjoon_id } = authStore();

  const query = useQuery({
    queryKey: ["profile", supabase_id],
    queryFn: () => getProfile(supabase_id!),
    enabled: !!supabase_id,
  });

  useEffect(() => {
    if (query.data?.baekjoon_id) {
      setBaekjoon_id(query.data.baekjoon_id);
    }
  }, [query.data, setBaekjoon_id]);

  return query;
};
