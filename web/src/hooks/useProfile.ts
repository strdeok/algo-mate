import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profiles";
import { authStore } from "../store/authStore";

export const useProfile = () => {
  const { supabase_id } = authStore();

  const query = useQuery({
    queryKey: ["profile", supabase_id],
    queryFn: () => getProfile(supabase_id!),
    enabled: !!supabase_id,
  });
  return query;
};
