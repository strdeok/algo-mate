import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

// 1. 스토리지에서 유저 ID 가져오기
function getUserIdFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["algo_user_id"], (result) => {
      console.log("🔍 [Storage Check] 저장된 ID:", result.algo_user_id); // 디버깅
      resolve(result.algo_user_id || null);
    });
  });
}

// 2. 메시지 리스너
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SAVE_WRONG_ANSWER") {
    console.log(`🔴 [Step 1] 메시지 수신: ${request.data.problemId}번`);
    processWrongAnswer(request.data);
  }
});

// 3. 통합 처리 함수 (ID확인 -> 문제저장 -> 리뷰저장)
async function processWrongAnswer({ problemId, result, username }) {
  try {
    console.log("🟡 [Step 2] 유저 ID 확인 중...");
    const userId = await getUserIdFromStorage();

    if (!userId) {
      console.error("❌ [Error] 로그인이 필요합니다! (ID 없음)");
      console.error("👉 익스텐션 아이콘을 눌러서 로그인을 진행해주세요.");
      return;
    }
    console.log(`🟢 [Step 2-OK] 유저 ID 확인됨: ${userId}`);

    // Solved.ac 조회
    console.log("🟡 [Step 3] Solved.ac 정보 조회 중...");
    const problemInfo = await fetchProblemInfo(problemId);

    // 문제 정보 저장 (Problems 테이블)
    console.log("🟡 [Step 4] 문제 정보 저장 시도...");
    if (problemInfo) {
      await saveProblem(problemInfo);
    }

    // 리뷰 저장 (Reviews 테이블)
    console.log("🟡 [Step 5] 리뷰(오답노트) 저장 시도...");
    await saveReview(problemId, userId);

  } catch (error) {
    console.error("🔥 [Critical Error] 처리 중 예외 발생:", error);
  }
}

// --- [API 및 DB 함수들] ---

async function fetchProblemInfo(problemId) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(
      `https://solved.ac/api/v3/problem/show?problemId=${problemId}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("Solved.ac API Error");

    const data = await res.json();
    console.log("🟢 [Step 3-OK] Solved.ac 데이터 수신 완료");

    return {
      id: data.problemId,
      title: data.titleKo,
      level: data.level,
      tags: data.tags.map((tag) => ({
        key: tag.key,
        name: tag.displayNames.find((n) => n.language === "ko")?.name || tag.key,
      })),
    };
  } catch (error) {
    console.warn(`⚠️ [Warning] API 호출 실패. 깡통 데이터 사용. (${error.message})`);
    return {
      id: problemId,
      title: `${problemId}번 문제`,
      level: 0,
      tags: [],
    };
  }
}

async function saveProblem(data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/problems`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        id: data.id,
        title: data.title,
        level: data.level,
        tags: data.tags,
      }),
    });
    
    if (!res.ok) {
        const err = await res.json();
        console.error("❌ [Step 4-Fail] 문제 저장 실패:", err);
    } else {
        console.log("🟢 [Step 4-OK] 문제 정보 저장 완료");
    }
  } catch (e) {
      console.error("❌ [Step 4-Error] 통신 오류:", e);
  }
}

async function saveReview(problemId, userId) {
  try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
        method: "POST",
        headers: { ...headers(), Prefer: "return=minimal" },
        body: JSON.stringify({
          user_id: userId,
          problem_id: problemId,
          stage: 0,
          next_review_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }),
      });

      if (res.ok) {
        console.log("🎉 [Step 5-Success] 최종 저장 성공!");
      } else {
        const err = await res.json();
        console.error("❌ [Step 5-Fail] 리뷰 저장 실패:", err);
      }
  } catch (e) {
      console.error("❌ [Step 5-Error] 통신 오류:", e);
  }
}

function headers() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates",
  };
}