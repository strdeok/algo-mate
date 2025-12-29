import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";

export default function PublicPage() {
  const navigate = useNavigate();
  const { supabase_id, isInitialized } = authStore();

  useEffect(() => {
    if (supabase_id) {
      navigate("/overview", { replace: true });
    }
  }, [isInitialized, supabase_id]);

  return <Outlet />;
}
