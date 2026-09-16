import { create } from "zustand";
import api from "@/lib/api";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  pendingUserId: null,
  isAuthModalOpen: false,
  authMode: "login", // 'login' | 'register' | 'otp'

  openAuthModal: (mode = "login") => set({ isAuthModalOpen: true, authMode: mode, error: null }),
  closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),
  setAuthMode: (mode) => set({ authMode: mode, error: null }),

  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/auth/me");
      if (res.data?.success) {
        set({ user: res.data.data.user, loading: false });
      }
    } catch (err) {
      set({ user: null, loading: false });
    }
  },

  register: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/auth/register", formData);
      if (res.data?.success) {
        set({
          pendingUserId: res.data.data.userId,
          authMode: "otp",
          loading: false,
        });
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  verifyOtp: async (otp) => {
    try {
      set({ loading: true, error: null });
      const userId = get().pendingUserId;
      const res = await api.post("/auth/verify-otp", { userId, otp });
      if (res.data?.success) {
        const { user, token } = res.data.data;
        if (token) localStorage.setItem("bb_auth_token", token);
        set({
          user,
          token,
          isAuthModalOpen: false,
          pendingUserId: null,
          loading: false,
        });
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid OTP code";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/auth/login", { email, password });
      if (res.data?.success) {
        const { user, token } = res.data.data;
        if (token) localStorage.setItem("bb_auth_token", token);
        set({
          user,
          token,
          isAuthModalOpen: false,
          loading: false,
        });
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {}
    localStorage.removeItem("bb_auth_token");
    set({ user: null, token: null });
  },
}));
