import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWeeklyLogs, logSolve } from "../api/logs";
import { authStore } from "../store/authStore";

// log 가져오기
export const useWeeklyStats = () => {
    const { uuid } = authStore()

  return useQuery({
    queryKey: ["weeklyLogs", uuid],
    queryFn: () => getWeeklyLogs(uuid!),
    enabled: !!uuid,
  });
};

// log 기록하기
export const useLogSolveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logSolve,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["weeklyLogs", variables.userId],
      });
    },
  });
};
