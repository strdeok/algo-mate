import { useWeeklyStats } from "../../../../hooks/useLogs";
import { getDayLabel } from "../../../../utils/dateUtil";

export default function Weekgoal() {
  const { data, isLoading } = useWeeklyStats();

  const solvedDays = data?.map((log) => getDayLabel(log.solved_at));

  return (
    <div>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <span>주간 목표</span>
          <div className="flex flex-row gap-4 justify-center">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => {
              return (
                <div
                  className={`size-8 flex flex-col justify-center items-center font-light text-xs ${
                    solvedDays?.includes(day) === true
                      ? "bg-primary"
                      : "bg-text-sub text-background"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
