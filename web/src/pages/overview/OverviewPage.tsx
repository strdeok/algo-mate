import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function OverviewPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      alert("로그아웃 중 문제가 발생했습니다.");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-jaro text-7xl text-white">OverviewPage</h1>

      <button
        onClick={handleLogout}
        className="bg-secondary text-white text-xl w-64 h-16 rounded-full hover:bg-secondary-hover hover:cursor-pointer transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}
