import { useQuery } from "@tanstack/react-query";
import { getUserStatus } from "../api/getUserStatus";

export const useUserStatus = (baekjoon_id:string|undefined) => {
  return useQuery({
    queryKey: ["userStatus"],
    queryFn: () => getUserStatus(baekjoon_id!),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
