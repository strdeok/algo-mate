import { useQuery } from "@tanstack/react-query";
import { getReviews, getTodoReviews } from "../api/getReviews";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useTodoReviews = () => {
  return useQuery({
    queryKey: ["todoReviews"],
    queryFn: getTodoReviews,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
