import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const isLogin = await useAuth();
      if (isLogin) {
        navigate("/overview", { replace: true });
      }
    };
    checkSession();
  }, []);

  return <Outlet />;
}
