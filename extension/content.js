// 1. [Helper 함수] 백준 데이터 추출 및 전송 로직
function checkLatestSubmission(table) {
  const latestRow = table.querySelector("tbody tr:first-child");

  if (!latestRow) return;

  const problemId = latestRow.querySelector(".problem_title")?.innerText;
  const resultText = latestRow.querySelector(".result-text")?.innerText;
  const username = latestRow.querySelector(".user_id")?.innerText;

  // '틀렸습니다'가 포함된 경우에만 데이터 전송
  if (resultText && resultText.includes("틀렸습니다")) {
    chrome.runtime.sendMessage({
      action: "SAVE_WRONG_ANSWER",
      data: {
        problemId: parseInt(problemId),
        result: resultText,
        username,
      },
    });
  }
}

// 2. [기능 함수] Algo-Mate 웹사이트 설치 확인 플래그 삽입
const initAlgoMateFlag = () => {
  if (!document.getElementById("algo-mate-installed")) {
    const flag = document.createElement("div");
    flag.id = "algo-mate-installed";
    flag.style.display = "none";
    document.body.appendChild(flag);
  }
};

// 3. [기능 함수] 백준 사이트 감시자(Observer) 초기화
const initBaekjoonObserver = () => {
  // 1. 안전장치: Cloudflare 보안 점검 중이면 종료
  if (
    document.title.includes("Just a moment") ||
    document.title.includes("잠시만")
  ) {
    // throw new Error 대신 콘솔 경고로 남기는 것이 실행 흐름상 안전할 수 있습니다.
    console.warn("Algo-Mate: Cloudflare Check Detected. Observer halted.");
    return;
  }

  const TARGET_TABLE_ID = "status-table";

  // 2. 테이블이 생길 때까지 기다리는 감시자(Observer) 설정
  const observer = new MutationObserver((mutations, obs) => {
    const table = document.getElementById(TARGET_TABLE_ID);
    if (table) {
      checkLatestSubmission(table); // 위에서 정의한 Helper 함수 호출
      obs.disconnect(); // 임무 완료 후 감시 종료
    }
  });

  // 3. 감시 시작
  observer.observe(document.body, { childList: true, subtree: true });
};

// 4. [메인 실행 로직] URL에 따른 라우팅
const currentUrl = window.location.href;

if (currentUrl.includes("localhost") || currentUrl.includes("algo-mate")) {
  initAlgoMateFlag();
} else if (currentUrl.includes("acmicpc.net")) {
  initBaekjoonObserver();
}
