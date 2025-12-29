import { IoWarning } from "react-icons/io5";
import type { ReviewType } from "../../../../types/review";
import { getDaysAgo } from "../../../../utils/dateUtil";
import { Link } from "react-router-dom";

export default function Card({ review }: { review: ReviewType }) {
  const lastSolved = getDaysAgo(review.last_solved_at);

  return (
    <div className="bg-surface rounded-lg shadow-xl flex flex-row justify-between px-2 py-4">
      <div className="flex gap-4">
        {!review.memo && <IoWarning size={20} color={"red"} />}
        <span className="max-w-56 truncate text-ellipsis">
          {review.problem_id}번: {review.problems.title}
        </span>
        <span className="text-text-sub">{lastSolved}일전 복습한 문제</span>
      </div>

      {!review.memo ? (
        <>
          <div className="flex gap-4">
            <Link to={"/review"} className="cursor-pointer">복습하기</Link>
            <Link
              to={`https://www.acmicpc.net/problem/${review.problem_id}`}
              className=" cursor-pointer text-primary"
            >
              다시풀기
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to={"/review"} className="text-danger cursor-pointer">
            오답노트 작성하기
          </Link>
        </>
      )}
    </div>
  );
}
