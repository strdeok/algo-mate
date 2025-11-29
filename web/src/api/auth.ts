import { supabase } from "./supabase";

export const login = async (email: string, password: string) => {
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return response;
  } catch (error) {
    return null;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await supabase.auth.signUp({
      email,
      password,
    });
    return response;
  } catch (error) {
    return null;
  }
};

export const githubLogin = async () => {
  try {
    const response = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/overview",
      },
    });
    return response;
  } catch (error) {
    return null;
  }
};