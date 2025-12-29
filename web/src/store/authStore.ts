import { create } from "zustand";

interface AuthState {
  isInitialized: boolean;
  supabase_id: string | undefined;
  baekjoon_id: string | undefined;
  setAuth: (ids: { supabase_id?: string; baekjoon_id?: string }) => void;
  resetAuth: () => void;
}

export const authStore = create<AuthState>((set) => ({
  isInitialized: false,
  supabase_id: undefined,
  baekjoon_id: undefined,
  setAuth: (ids) => set((state) => ({ ...state, ...ids, isInitialized: true })),
  resetAuth: () => set({ supabase_id: undefined, baekjoon_id: undefined, isInitialized: true }),
}));