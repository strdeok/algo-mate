import { useQuery } from "@tanstack/react-query";
import { getUserStatus } from "../api/getUserStatus";
import { authStore } from "../store/authStore";

export const useUserStatus = () => {
  const { baekjoon_id } = authStore();
  return useQuery({
    queryKey: ["userStatus"],
    queryFn: () => getUserStatus(baekjoon_id!),
    enabled: !!baekjoon_id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
