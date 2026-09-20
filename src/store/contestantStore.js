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

  payRegistrationFee: async (simulateTest = false) => {
    try {
      set({ loading: true, error: null });
      const orderRes = await api.post("/contestants/initiate-payment");
      if (!orderRes.data?.success) {
        throw new Error(orderRes.data?.message || "Order creation failed");
      }
      const payData = orderRes.data.data;

      if (simulateTest) {
        // Instant test verification fallback
        const verifyRes = await api.post("/contestants/payu/success", {
          status: "success",
          txnid: payData.txnid,
          amount: payData.amount,
          productinfo: payData.productinfo,
          firstname: payData.firstname,
          email: payData.email,
          udf1: payData.udf1,
          udf2: payData.udf2,
          udf3: payData.udf3,
          hash: payData.hash,
        });

        if (verifyRes.data?.success) {
          set({ loading: false });
          await get().fetchMyProfile();
          return verifyRes.data;
        }
      }

      // Real PayU Hosted Form Submission
      if (typeof window !== "undefined") {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = payData.action || "https://test.payu.in/_payment";

        const fields = [
          "key",
          "txnid",
          "amount",
          "productinfo",
          "firstname",
          "email",
          "phone",
          "surl",
          "furl",
          "hash",
          "udf1",
          "udf2",
          "udf3",
          "udf4",
          "udf5",
        ];

        fields.forEach((field) => {
          if (payData[field] !== undefined && payData[field] !== null) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = field;
            input.value = payData[field];
            form.appendChild(input);
          }
        });

        document.body.appendChild(form);
        form.submit();
      }

      return payData;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Fee payment failed";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },
}));
