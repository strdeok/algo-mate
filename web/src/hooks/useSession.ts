import { useQuery } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { getUserSession } from "../api/getUserSession"; 

export const useSession = () => {
  return useQuery<Session | null>({
    queryKey: ["session"],
    queryFn: getUserSession,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });
};