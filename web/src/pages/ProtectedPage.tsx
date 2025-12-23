import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserSession } from "../api/getUserSession";

export default function ProtectedPage() {
    const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const isLogin = await getUserSession();
      if (!isLogin) {
        navigate("/login", { replace: true });
      }
    };
    checkSession();
  }, []);

  return <Outlet />;
}
