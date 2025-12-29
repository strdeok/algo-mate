import { useQuery } from "@tanstack/react-query";
import { getProblems } from "../api/getProblems";

export default function useProblems() {
  return useQuery({
    queryKey: ["problems"],
    queryFn: getProblems,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
