import { create } from "zustand";
import { signInWithPopup, signOut } from "firebase/auth";

import api from "@/lib/api";
import { auth, googleProvider } from "@/lib/firebase";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  isAuthModalOpen: false,
  authMode: "login",

  openAuthModal: (mode = "login") =>
    set({
      isAuthModalOpen: true,
      authMode: mode,
      error: null,
    }),

  closeAuthModal: () =>
    set({
      isAuthModalOpen: false,
      error: null,
    }),

  setAuthMode: (mode) =>
    set({
      authMode: mode,
      error: null,
    }),

  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/auth/me");

      if (res.data?.success) {
        set({
          user: res.data.data.user,
          loading: false,
        });

        return res.data;
      }

      set({
        user: null,
        loading: false,
      });
    } catch (err) {
      localStorage.removeItem("bb_auth_token");

      set({
        user: null,
        token: null,
        loading: false,
      });
    }
  },

  register: async (formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await api.post("/auth/register", formData);

      if (res.data?.success) {
        const { user, token } = res.data.data;

        if (token) {
          localStorage.setItem("bb_auth_token", token);
        }

        set({
          user,
          token: token || null,
          isAuthModalOpen: false,
          loading: false,
        });

        return res.data;
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed";

      set({
        error: msg,
        loading: false,
      });

      throw new Error(msg);
    }
  },

  login: async (email, password) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data?.success) {
        const { user, token } = res.data.data;

        if (token) {
          localStorage.setItem("bb_auth_token", token);
        }

        set({
          user,
          token: token || null,
          isAuthModalOpen: false,
          loading: false,
        });

        return res.data;
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed";

      set({
        error: msg,
        loading: false,
      });

      throw new Error(msg);
    }
  },

  googleLogin: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const idToken = await result.user.getIdToken();

      const res = await api.post("/auth/google", {
        idToken,
      });

      if (res.data?.success) {
        const { user, token } = res.data.data;

        if (token) {
          localStorage.setItem("bb_auth_token", token);
        }

        set({
          user,
          token: token || null,
          isAuthModalOpen: false,
          loading: false,
        });

        return res.data;
      }

      throw new Error("Google authentication failed");
    } catch (err) {
      console.error("Google login error:", err);

      let msg = "Google login failed";

      if (err.code === "auth/popup-closed-by-user") {
        msg = "Google login cancelled";
      } else if (err.code === "auth/popup-blocked") {
        msg = "Google popup was blocked by your browser";
      } else if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }

      set({
        error: msg,
        loading: false,
      });

      throw new Error(msg);
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {}

    try {
      await signOut(auth);
    } catch (err) {}

    localStorage.removeItem("bb_auth_token");

    set({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  },
}));