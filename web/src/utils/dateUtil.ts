const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const getDayLabel = (dateString: string) => {
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return DAY_LABELS[dayIndex];
};

export const getDaysAgo = (dateString: string): number => {
  const lastSolvedDate = new Date(dateString); // 마지막 풀이 날짜
  const now = new Date(); // 현재 시간

  // 두 날짜의 차이를 밀리초(ms) 단위로 구함
  const diffInMs = now.getTime() - lastSolvedDate.getTime();

  // 밀리초를 일(day) 단위로 변환
  // 1000(ms) * 60(s) * 60(m) * 24(h) = 1일
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export const getStartOfWeek = () => {
  const now = new Date();
  const day = now.getDay(); // 0(일요일) ~ 6(토요일)

  // 오늘 날짜에서 요일만큼 빼서 '이번 주 일요일'을 구함
  const diff = now.getDate() - day;

  const startOfWeek = new Date(now.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0); // 시간을 00시 00분 00초로 초기화

  return startOfWeek.toISOString(); // Supabase가 이해하는 문자열 형식으로 변환
};
