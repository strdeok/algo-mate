// 현재 접속한 URL 확인
const currentUrl = window.location.href;

// ✅ Case 1: Algo-Mate 웹사이트인 경우 -> 설치 확인용 깃발 꽂기
if (currentUrl.includes("localhost") || currentUrl.includes("algo-mate")) {
  if (!document.getElementById("algo-mate-installed")) {
    const flag = document.createElement("div");
    flag.id = "algo-mate-installed";
    flag.style.display = "none";
    document.body.appendChild(flag);
    console.log("Algo-Mate Extension Detected!");
  }
} 
// ✅ Case 2: 백준 사이트인 경우 -> 오답 수집 로직 실행
else if (currentUrl.includes("acmicpc.net")) {
  
  // 1. 안전장치: Cloudflare 보안 점검 중이면 종료
  if (document.title.includes("Just a moment") || document.title.includes("잠시만")) {
    throw new Error("Cloudflare Check Detected"); 
  }

  const TARGET_TABLE_ID = "status-table";

  // 2. 테이블이 생길 때까지 기다리는 감시자(Observer) 설정
  const observer = new MutationObserver((mutations, obs) => {
    const table = document.getElementById(TARGET_TABLE_ID);
    if (table) {
      checkLatestSubmission(table);
      obs.disconnect(); // 임무 완료 후 감시 종료
    }
  });

  // 3. 감시 시작
  observer.observe(document.body, { childList: true, subtree: true });

  // 4. 데이터 추출 함수
  function checkLatestSubmission(table) {
    const latestRow = table.querySelector("tbody tr:first-child");

    if (!latestRow) return;

    const problemId = latestRow.querySelector(".problem_title")?.innerText;
    const resultText = latestRow.querySelector(".result-text")?.innerText;
    const username = latestRow.querySelector(".user_id")?.innerText;

    if (resultText && resultText.includes("틀렸습니다")) {
      chrome.runtime.sendMessage({
        action: "SAVE_WRONG_ANSWER",
        data: {
          problemId: parseInt(problemId),
          result: resultText,
          username
        }
      });
    }
  }
}