import { useTodoReviews } from "../../../../hooks/useReviews";
import Card from "./Card";

export default function OverviewLeftSection() {
  const { data: reviews, isLoading } = useTodoReviews();

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {reviews?.length == 0 && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text-sub">
              오늘 복습할 문제가 없습니다. <br /> 부족한 문제들을 풀어보세요.
            </div>
          </>
        )}
        {reviews?.map((review) => (
          <>
            <Card key={review.id} review={review} />
          </>
        ))}
      </div>
    </>
  );
}
