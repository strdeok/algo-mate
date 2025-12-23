import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserSession } from "../api/getUserSession";

export default function PublicPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const isLogin = await getUserSession();
      if (isLogin) {
        navigate("/overview", { replace: true });
      }
    };
    checkSession();
  }, []);

  return <Outlet />;
}
