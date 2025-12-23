import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserStatus } from "../api/solvedacAPI";
import { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { logout } from "../api/auth";
import { useExtensionCheck } from "../hooks/useExtensionCheck";

export default function Header() {
  const [userTier, setUserTier] = useState(-1);
  const [userImage, setUserImage] = useState("");
  const [isDropdownActivate, setIsDropdownActivate] = useState(false);
  const isInstalled = useExtensionCheck();

  const location = useLocation();
  const nowLocation = location.pathname;
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      alert("로그아웃 중 문제가 발생했습니다.");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserStatus();
      setUserTier(res.tier);
      setUserImage(res.profileImageUrl);
    };
    getUser();
  }, []);

  const nav_style =
    "h-full rounded-full flex-1 flex flex-col items-center justify-center";

  return (
    <header className="w-full p-4 flex flex-row justify-between items-center">
      {/* 서비스 이름 */}
      <Link to={"/overview"} className="text-4xl font-jaro">
        Algo-mate
      </Link>

      {/* 네비게이션 */}
      <nav className="bg-surface flex flex-row h-12 justify-between items-center w-1/3 rounded-full">
        <Link
          to={"/overview"}
          className={`${nav_style} ${
            nowLocation == "/overview" ? "bg-white text-surface" : ""
          }`}
        >
          overview
        </Link>
        <Link
          to={"/review"}
          className={`${nav_style} ${
            nowLocation == "/review" ? "bg-white text-surface" : ""
          }`}
        >
          review
        </Link>
        <Link
          to={"/report"}
          className={`${nav_style} ${
            nowLocation == "/report" ? "bg-white text-surface" : ""
          }`}
        >
          report
        </Link>
      </nav>

      {/* 유저 status */}
      <div className="relative flex flex-row gap-6">
        <div className="size-12 bg-white rounded-full relative">
          <div
            className={`size-4 ${
                isInstalled ? "bg-primary" : "bg-danger"
              } rounded-full absolute bottom-0 right-0`}
          />
        </div>
        <img
          alt="tier"
          src={`https://static.solved.ac/tier_small/${userTier}.svg`}
          className="size-12"
        ></img>
        <button
          className="w-11 cursor-pointer"
          onClick={() => {
            setIsDropdownActivate(!isDropdownActivate);
          }}
        >
          <AiOutlineDown
            size={28}
            color="#8b5cf6"
            className={`scale-x-200 transition-transform ${
              isDropdownActivate ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownActivate && (
          <div className="absolute top-16 right-0 bg-surface border border-text-sub rounded-sm w-48 h-64 flex flex-col items-center justify-between text-sm">
            <button
              className={`border-b cursor-pointer w-full h-full border-b-text-sub ${
                isInstalled ? "text-primary" : "text-danger"
              }`}
            >
              {isInstalled ? "익스텐션 활성화" : "익스텐션 설치 필요"}
            </button>
            <button className="border-b cursor-pointer w-full h-full border-b-text-sub">
              목표 설정
            </button>
            <button className="border-b cursor-pointer w-full h-full border-b-text-sub">
              개인정보 설정
            </button>
            <button
              className="cursor-pointer w-full h-full"
              onClick={() => handleLogout()}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
