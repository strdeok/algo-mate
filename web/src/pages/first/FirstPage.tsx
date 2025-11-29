import { useNavigate } from "react-router-dom";

export default function FirstPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12">
      <h1 className="font-jaro text-6xl">Algo-Mate</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row p-2 w-xl glass-card">
          <div className="flex-1/4"></div>
          <div className="flex-3/4 px-4 py-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold">체계적인 복습 시스템</h2>
            <p className="text-sm font-light text-text-sub">
              최적의 타이밍에 문제를 다시 풀어보세요
            </p>
          </div>
        </div>
        <div className="flex flex-row p-2 w-xl glass-card">
          <div className="flex-1/4"></div>
          <div className="flex-3/4 px-4 py-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold">실력 분석 리포트</h2>
            <p className="text-sm font-light text-text-sub">
              내 취약점을 파악하고 개선하세요
            </p>
          </div>
        </div>
        <div className="flex flex-row p-2 w-xl glass-card">
          <div className="flex-1/4"></div>
          <div className="flex-3/4 px-4 py-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold">주간 목표 관리</h2>
            <p className="text-sm font-light text-text-sub">
              꾸준한 학습 습관을 만들어보세요
            </p>
          </div>
        </div>
      </div>

      <button onClick={()=>navigate("/login")} className="bg-secondary text-white text-xl w-64 h-16 rounded-full hover:bg-secondary-hover hover:cursor-pointer">시작하기</button>
    </div>
  );
}
