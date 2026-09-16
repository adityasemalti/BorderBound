import { create } from "zustand";
import api from "@/lib/api";

export const useContestantStore = create((set, get) => ({
  myProfile: null,
  loading: false,
  error: null,
  activeStep: 1, // 1: Profile | 2: Documents | 3: Terms | 4: Fee Payment

  setStep: (step) => set({ activeStep: step }),

  fetchMyProfile: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/contestants/my-profile");
      if (res.data?.success) {
        set({ myProfile: res.data.data, loading: false });
      }
    } catch (err) {
      set({ loading: false });
    }
  },

  saveProfileDetails: async (profileData) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/contestants/profile", profileData);
      if (res.data?.success) {
        set({ myProfile: res.data.data, activeStep: 2, loading: false });
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save profile";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  uploadDoc: async (docType, file) => {
    try {
      set({ loading: true, error: null });
      const formData = new FormData();
      formData.append("docType", docType);
      formData.append("file", file);

      const res = await api.post("/contestants/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        set({ myProfile: res.data.data, loading: false });
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Document upload failed";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  acceptTerms: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/contestants/terms");
      if (res.data?.success) {
        set({ myProfile: res.data.data, activeStep: 4, loading: false });
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to accept terms";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  payRegistrationFee: async () => {
    try {
      set({ loading: true, error: null });
      const orderRes = await api.post("/contestants/pay-fee");
      if (!orderRes.data?.success) {
        throw new Error(orderRes.data?.message || "Order creation failed");
      }
      const orderData = orderRes.data.data;

      // Verify payment (mock verification)
      const verifyRes = await api.post("/contestants/verify-fee", {
        razorpayOrderId: orderData.razorpayOrderId,
        razorpayPaymentId: `pay_reg_${Date.now()}`,
        razorpaySignature: "mock_sig",
      });

      if (verifyRes.data?.success) {
        set({ loading: false });
        get().fetchMyProfile();
        return verifyRes.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Fee payment failed";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },
}));
