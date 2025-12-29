import { Routes, Route, useNavigate } from "react-router-dom";
import FirstPage from "./pages/first/FirstPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import SignupPage from "./pages/signup/SignupPage.tsx";
import OverviewPage from "./pages/overview/OverviewPage.tsx";
import ReviewPage from "./pages/review/ReviewPage.tsx";
import ReportPage from "./pages/report/ReportPage.tsx";
import { AnimatePresence } from "framer-motion";
import ProtectedPage from "./pages/ProtectedPage.tsx";
import PublicPage from "./pages/PublicPage.tsx";
import { authStore } from "./store/authStore.ts";
import { useEffect } from "react";
import { supabase } from "./api/supabase.ts";
import { getProfile } from "./api/profiles.ts";

function App() {
  const navigate = useNavigate()
  const { setAuth, resetAuth } = authStore();

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const profile = await getProfile(session.user.id);
        setAuth({
          supabase_id: session.user.id,
          baekjoon_id: profile.baekjoon_id || undefined,
        });
      } else {
        resetAuth();
      }
    };
    initAuth();
  }, [navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<PublicPage />}>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedPage />}>
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
