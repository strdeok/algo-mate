import AbilityRadarSection from "./components/rightSection/AbilityRadarSection";
import UserInfoSection from "./components/rightSection/UserInfoSection";
import Weekgoal from "./components/rightSection/WeekGoal";
import { useProfile } from "../../hooks/useProfile";
import OverviewLeftSection from "./components/leftSection/OverviewLeftSection";
import { useTodoReviews } from "../../hooks/useReviews";

export default function OverviewPage() {
  const { data: profile } = useProfile();
  const { data: reviews } = useTodoReviews();

  return (
    <div className="flex flex-col h-full items-center gap-4 py-9 px-4">
      <span className="text-xl">
        오늘도 오셨군요 {profile?.baekjoon_id}님! 오늘 복습할 문제{" "}
        {reviews?.length}개가 기다리고 있어요!
      </span>

      <div className="flex flex-row w-full h-full gap-6">
        {/* 왼쪽 섹션 */}
        <div className="glass-card flex-1 h-full flex flex-col py-6 px-8 gap-6">
          <span className="text-xl">오늘 할 일</span>
          <div className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
            <OverviewLeftSection />
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div className="glass-card flex-1 h-full flex flex-col py-6 px-8 ">
          <span className="text-xl">내 실력 분석</span>
          <AbilityRadarSection />
          <UserInfoSection />
          <Weekgoal />
        </div>
      </div>
    </div>
  );
}
