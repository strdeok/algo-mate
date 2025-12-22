import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useState } from "react";
import { SignupSchema, type Signup } from "../../types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { githubLogin, signup } from "../../api/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmit = async (data: Signup) => {
    const res = await signup(data.email, data.password)
    if (res.error){
      alert("오류가 발생하였습니다. 잠시후 다시 시도해주세요.")
    }
    if (res.data.user?.identities?.length == 0){
      alert("이미 가입된 유저입니다")
    }
    
    if (res.data.user){
      alert("가입 인증 메일이 발송되었습니다. 메일을 확인해주세요.")
      navigate("/login")
    }
  };

  const handleGithubLogin = () => {
    githubLogin().then((res) => {
      if (res?.data?.url) {
        console.log(res.data.url);
      } else
        alert("GitHub 회원가입에 실패했습니다.");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 my-12">
      <h1 className="font-jaro text-6xl">Algo-Mate</h1>
      <p className="text-lg font-light text-text-sub">회원가입</p>

      <div className="glass-card w-xl flex flex-col p-8 gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="w-full glass-card rounded-lg px-4 py-2 text-white placeholder:text-sm "
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
                className="w-full glass-card rounded-lg px-4 py-2 font-sans placeholder:font-jeju text-white placeholder:text-sm "
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
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                id="passwordConfirm"
                placeholder="********"
                className="w-full glass-card rounded-lg px-4 py-2 font-sans placeholder:font-jeju text-white placeholder:text-sm "
                {...register("passwordConfirm")}
              />

              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                onClick={togglePasswordConfirmVisibility}
                type="button"
              >
                {showPasswordConfirm ? (
                  <AiOutlineEye size={24} />
                ) : (
                  <AiOutlineEyeInvisible color="gray" size={24} />
                )}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <button className="flex flex-row justify-center items-center py-2.5 rounded-lg gap-2 w-full bg-secondary hover:bg-secondary-hover cursor-pointer">
              <HiOutlineMail color="white" size={24} />
              이메일로 가입하기
            </button>
          </div>
        </form>

        <div className="relative h-12 flex flex-row items-center justify-center">
          <div className="border-t border-text-sub flex-1/3" />
          <p className="text-sm text-text-sub mx-4">또는</p>
          <div className="border-t border-text-sub flex-1/3" />
        </div>

        <div>
          <button onClick={handleGithubLogin} className="flex flex-row justify-center items-center py-2.5 rounded-lg gap-2 w-full bg-black cursor-pointer">
            <AiFillGithub color="white" size={24} />
            GitHub로 가입하기
          </button>
        </div>

        <div className="text-center text-text-sub text-sm">
          이미 계정이 있으신가요?
          <span
            className="text-secondary hover:text-secondary-hover cursor-pointer ml-1"
            onClick={() => navigate("/login")}
          >
            로그인
          </span>
        </div>
      </div>
    </div>
  );
}
