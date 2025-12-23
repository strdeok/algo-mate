import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { LoginSchema, type Login } from "../../types/user";
import { githubLogin, login } from "../../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: Login) => {
    const res = await login(data.email, data.password);

    switch (res.error?.status) {
      case 400:
        alert("이메일과 비밀번호를 확인해주세요.");
    }

    if (res.data.user) {
      navigate("/overview");
    }
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then(() => {
        navigate("/overview");
      })
      .catch(() => {
        alert("GitHub 로그인에 실패했습니다.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 my-4">
      <h1 className="font-jaro text-6xl">Algo-Mate</h1>
      <p className="text-lg font-light text-text-sub">로그인</p>

      <div className="glass-card w-xl flex flex-col p-8 gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              placeholder="your@email.com"
              className={
                "w-full glass-card rounded-lg px-4 py-2 text-white placeholder:text-sm " +
                (errors.email ? "border-red-500" : "")
              }
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className={
                  "w-full glass-card rounded-lg px-4 py-2 text-white! font-sans placeholder:font-jeju placeholder:text-sm " +
                  (errors.password ? "border-red-500" : "")
                }
                {...register("password")}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                onClick={togglePasswordVisibility}
                type="button"
              >
                {showPassword ? (
                  <AiOutlineEye size={24} />
                ) : (
                  <AiOutlineEyeInvisible color="gray" size={24} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="w-full mt-4">
            <button
              className="flex flex-row justify-center items-center py-2.5 rounded-lg gap-2 w-full bg-secondary hover:bg-secondary-hover cursor-pointer"
              type="submit"
            >
              <HiOutlineMail color="white" size={24} />
              이메일로 로그인
            </button>
          </div>
        </form>

        <div className="relative h-12 flex flex-row items-center justify-center">
          <div className="border-t border-text-sub flex-1/3" />
          <p className="text-sm text-text-sub mx-4">또는</p>
          <div className="border-t border-text-sub flex-1/3" />
        </div>

        <div>
          <button
            onClick={handleGithubLogin}
            className="flex flex-row justify-center items-center py-2.5 rounded-lg gap-2 w-full bg-black cursor-pointer"
          >
            <AiFillGithub color="white" size={24} />
            GitHub로 로그인
          </button>
        </div>

        <div className="text-center text-text-sub text-sm">
          계정이 없으신가요?
          <span
            className="text-secondary hover:text-secondary-hover cursor-pointer ml-1"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}
