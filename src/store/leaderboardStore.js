import { create } from "zustand";
import api from "@/lib/api";

export const useLeaderboardStore = create((set, get) => ({
  leaderboard: [],
  pagination: { totalContestants: 0, page: 1, pages: 1 },
  meta: { totalVotesCast: 0, lastUpdated: null },
  loading: false,
  error: null,
  search: "",
  city: "",
  page: 1,

  setSearch: (search) => set({ search, page: 1 }),
  setCity: (city) => set({ city, page: 1 }),
  setPage: (page) => set({ page }),

  fetchLeaderboard: async () => {
    try {
      set({ loading: true, error: null });
      const { page, search, city } = get();
      const params = { page, limit: 50 };
      if (search) params.search = search;
      if (city) params.city = city;

      const res = await api.get("/leaderboard", { params });
      if (res.data?.success) {
        set({
          leaderboard: res.data.data.leaderboard,
          pagination: res.data.data.pagination,
          meta: res.data.data.meta,
          loading: false,
        });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
