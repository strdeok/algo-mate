import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { authStore } from "../store/authStore";

export default function ProtectedPage() {
  const navigate = useNavigate();
  const { supabase_id, isInitialized } = authStore();

  useEffect(() => {
    if (isInitialized && !supabase_id) {
      navigate("/login", { replace: true });
    }
  }, [isInitialized, supabase_id, navigate]);

  if (!isInitialized) return <div>인증 확인 중...</div>;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />

      <main className="flex-1 w-full overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}
