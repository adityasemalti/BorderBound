import { create } from "zustand";
import api from "@/lib/api";

export const useConfigStore = create((set) => ({
  configData: null,
  loading: false,

  fetchPublicConfig: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/config/public");
      if (res.data?.success) {
        set({ configData: res.data.data, loading: false });
      }
    } catch (err) {
      set({ loading: false });
    }
  },
}));
