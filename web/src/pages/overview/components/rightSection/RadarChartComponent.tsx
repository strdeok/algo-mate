import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const BASE = [
  { subject: "구현", A: 80, fullMark: 100 },
  { subject: "DP", A: 50, fullMark: 100 },
  { subject: "그래프", A: 90, fullMark: 100 },
  { subject: "DFS/BFS", A: 70, fullMark: 100 },
  { subject: "그리디", A: 60, fullMark: 100 },
  { subject: "정렬", A: 85, fullMark: 100 },
];

export default function RadarChartComponent({
  mostFailedTags,
}: {
  mostFailedTags: { name: string; count: number }[];
}) {
  const combinedData = BASE.map((base) => {
    const userTag = mostFailedTags.find((tag) => tag.name === base.subject);

    return {
      ...base,
      A: userTag ? userTag.count : 0,
    };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        style={{
          fontSize: "14px",
        }}
        outerRadius="80%"
        data={combinedData}
        margin={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
        }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
