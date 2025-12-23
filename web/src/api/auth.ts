import { supabase } from "./supabase";
import { AuthError } from "@supabase/supabase-js";

export const login = async (email: string, password: string) => {
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return response;
  } catch (error) {
    return {
      data: { user: null, session: null },
      error: error as AuthError,
    };
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
    return {
      data: { user: null, session: null },
      error: error as AuthError,
    };
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
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error: error as AuthError };
  }
};
