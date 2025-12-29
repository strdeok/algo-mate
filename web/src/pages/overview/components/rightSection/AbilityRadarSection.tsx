import useProblems from "../../../../hooks/useProblems";
import { getTagStats } from "../../../../utils/getMostFailed";
import RadarChartComponent from "./RadarChartComponent";

export default function AbilityRadarSection() {
  const { data: problems, isError, isLoading } = useProblems();
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const mostFailedTags = getTagStats(problems!);
  const refinedData = mostFailedTags.slice(0, 3); // 상위 3개

  return (
    <div className="flex flex-row">
      <div className="flex-2 h-36">
        <RadarChartComponent mostFailedTags={mostFailedTags} />
      </div>
      <div className="flex-1">
        <span className="mb-4">가장 많이 틀린 유형</span>

        <ol className="text-sm">
          {refinedData.map((tag, index) => {
            return (
              <li key={tag.name}>
                {index + 1}. {tag.name}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
