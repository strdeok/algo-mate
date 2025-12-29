import { useTodoReviews } from "../../../../hooks/useReviews";
import Card from "./Card";

export default function OverviewLeftSection() {
  const { data: reviews, isLoading } = useTodoReviews();

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {reviews?.map((review) => (
          <>
            <Card key={review.id} review={review} />
          </>
        ))}
      </div>
    </>
  );
}
