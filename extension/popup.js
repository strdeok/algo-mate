import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection');
  const userSection = document.getElementById('userSection');
  
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const msg = document.getElementById('msg');
  const userEmailDisplay = document.getElementById('userEmailDisplay');

  // 1. 켜자마자 로그인 상태 확인 (세션 유지의 핵심!)
  chrome.storage.local.get(['algo_user_id', 'algo_email'], (result) => {
    if (result.algo_user_id) {
      showLoggedIn(result.algo_email);
    }
  });

  // 2. 로그인 버튼 클릭
  loginBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      msg.textContent = "이메일과 비밀번호를 입력해주세요.";
      return;
    }

    setLoading(true);

    try {
      // Supabase Auth API 호출 (로그인)
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || "로그인 실패");
      }

      // ★ 핵심: 로그인 성공 시 토큰과 ID 저장
      const userId = data.user.id;
      const userEmail = data.user.email;
      const accessToken = data.access_token; // (나중에 RLS 켤 때 필요)

      chrome.storage.local.set({
        'algo_user_id': userId,
        'algo_email': userEmail,
        'algo_token': accessToken
      }, () => {
        showLoggedIn(userEmail);
        msg.textContent = "";
      });

    } catch (error) {
      msg.textContent = "로그인 정보를 확인해주세요.";
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  // 3. 로그아웃
  logoutBtn.addEventListener('click', () => {
    // 저장소 비우기
    chrome.storage.local.remove(['algo_user_id', 'algo_email', 'algo_token'], () => {
      loginSection.classList.remove('hidden');
      userSection.classList.add('hidden');
      emailInput.value = "";
      passwordInput.value = "";
    });
  });

  // --- 화면 전환 함수 ---
  function showLoggedIn(email) {
    loginSection.classList.add('hidden');
    userSection.classList.remove('hidden');
    userEmailDisplay.textContent = email;
  }

  function setLoading(isLoading) {
    loginBtn.textContent = isLoading ? "로그인 중..." : "로그인";
    loginBtn.disabled = isLoading;
  }
});