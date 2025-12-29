import { create } from "zustand";

interface authStoreInterface {
  uuid: string | undefined;
  setUuid: (uuid: string | undefined) => void;
  baekjoon_id: string | undefined;
  setBaekjoon_id: (baekjoon_id: string | undefined) => void;
  supabase_id: string | undefined;
  setSupabase_id: (supabase_id: string | undefined) => void;
}

export const authStore = create<authStoreInterface>((set) => ({
  uuid: "",
  baekjoon_id: "",
  supabase_id: "",
  setUuid: (uuid) => set({ uuid }),
  setBaekjoon_id: (baekjoon_id) => set({ baekjoon_id }),
  setSupabase_id: (supabase_id) => set({ supabase_id }),
}));
