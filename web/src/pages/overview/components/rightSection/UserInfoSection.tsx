import { useUserStatus } from "../../../../hooks/useUserStatus";
import { extractUserInfo } from "../../../../utils/extractUserInfo";

export default function UserInfoSection() {
  const { data, isLoading, error } = useUserStatus();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  if (!data) {
    return (
      <div className="w-full h-full text-center">사용자 정보가 없습니다.</div>
    );
  }

  const userData = extractUserInfo({ userData: data });

  return (
    <div className="flex flex-row items-center gap-6 p-4 w-full h-full">
      {/* 티어 이미지 & 점수 */}
      <div className="flex-1 flex flex-col justify-center items-center gap-2">
        {/* 티어 이미지 */}
        <img
          alt="tier"
          src={`https://static.solved.ac/tier_small/${userData.currentTier}.svg`}
          className="w-16 h-16 object-contain drop-shadow-md"
        />
        {/* 현재 레이팅 점수 */}
        <span className="font-jaro">{userData.currentRating} pts</span>
      </div>

      {/* 텍스트 정보 & 승급 현황 */}
      <div className="flex-1 flex flex-col justify-center gap-3">
        {/* 닉네임 */}
        <div>
          <span className="text-sm text-gray-400">사용자 이름</span>
          <p className="text-xl font-bold text-white leading-none">
            {userData.handle}
          </p>
        </div>

        {/* 푼 문제 수 */}
        <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/10">
          <span className="text-sm text-gray-300">해결한 문제 수</span>
          <span className="text-lg font-bold text-primary font-mono">
            {userData.solvedCount}
            <span className="text-xs text-gray-500"> problems</span>
          </span>
        </div>

        {/* 승급까지 남은 점수 */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Next Tier</span>
            <span className="text-danger font-bold">
              {userData.remainRating} pts
            </span>
          </div>

          {/* 프로그레스 바 배경 */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-secondary h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${userData.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
