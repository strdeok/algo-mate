const TIER_RATINGS = [
  0, // 0: Unrated
  30, // 1: Bronze V
  60, // 2: Bronze IV
  90, // 3: Bronze III
  120, // 4: Bronze II
  150, // 5: Bronze I
  200, // 6: Silver V
  400, // 7: Silver IV
  600, // 8: Silver III
  800, // 9: Silver II
  1000, // 10: Silver I
  1200, // 11: Gold V
  1400, // 12: Gold IV
  1600, // 13: Gold III
  1750, // 14: Gold II
  1900, // 15: Gold I
  2000, // 16: Platinum V
  2100, // 17: Platinum IV
  2200, // 18: Platinum III
  2300, // 19: Platinum II
  2400, // 20: Platinum I
  2500, // 21: Diamond V
  2600, // 22: Diamond IV
  2700, // 23: Diamond III
  2800, // 24: Diamond II
  2850, // 25: Diamond I
  3000, // 26: Ruby V
  3050, // 27: Ruby IV
  3100, // 28: Ruby III
  3150, // 29: Ruby II
  3200, // 30: Ruby I
  3500, // 31: Master
];

export const extractUserInfo = (userData: any) => {
  // 이름
  const handle = userData.handle;

  // 푼 문제 수
  const solvedCount = userData.solvedCount;

  // 현재 티어 및 점수
  const currentTier = userData.tier;
  const currentRating = userData.rating;

  // 다음 승급까지 남은 점수 계산
  let remainRating = 0;
  let nextTierRating = 0;
  let progress = 0;

  // 마스터(31)가 아니면 다음 티어 점수 조회
  if (currentTier < 31) {
    nextTierRating = TIER_RATINGS[currentTier + 1] || 0;
    const prevTierRating = TIER_RATINGS[currentTier] || 0;
    remainRating = nextTierRating - currentRating;

    // 현재 티어 내 진행률 계산
    const totalGap = nextTierRating - prevTierRating;
    const currentGap = currentRating - prevTierRating;
    progress = Math.floor((currentGap / totalGap) * 100);
  }

  return {
    handle,
    solvedCount,
    currentTier,
    currentRating,
    nextTierRating,
    remainRating,
    progress,
  };
};
