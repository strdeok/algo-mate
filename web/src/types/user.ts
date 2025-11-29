import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .nonempty("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export const SignupSchema = z
  .object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다."),
    passwordConfirm: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type Login = z.infer<typeof LoginSchema>;
export type Signup = z.infer<typeof SignupSchema>;
