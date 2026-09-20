import { create } from "zustand";
import api from "@/lib/api";
import confetti from "canvas-confetti";

export const useVotingStore = create((set, get) => ({
  isVoteModalOpen: false,
  targetContestant: null,
  votesCount: 10,
  unitPrice: 5,
  loading: false,
  error: null,
  packages: [
    { votes: 1, amount: 5, label: "1 Vote (₹5)" },
    { votes: 10, amount: 50, label: "10 Votes (₹50)" },
    { votes: 100, amount: 500, label: "100 Votes (₹500)" },
    { votes: 1000, amount: 5000, label: "1,000 Votes (₹5,000)" },
  ],

  openVoteModal: (contestant, defaultVotes = 10) => {
    set({
      isVoteModalOpen: true,
      targetContestant: contestant,
      votesCount: defaultVotes,
      error: null,
    });
  },

  closeVoteModal: () => set({ isVoteModalOpen: false, targetContestant: null, error: null }),
  setVotesCount: (count) => set({ votesCount: Math.max(1, count) }),

  submitVotePayment: async (simulateTest = false) => {
    try {
      set({ loading: true, error: null });
      const { targetContestant, votesCount } = get();

      if (!targetContestant) throw new Error("No target contestant selected.");

      const orderRes = await api.post("/voting/create-order", {
        contestantId: targetContestant.id || targetContestant._id,
        votesCount,
      });

      if (!orderRes.data?.success) {
        throw new Error(orderRes.data?.message || "Failed to create vote order.");
      }

      const payData = orderRes.data.data;

      if (simulateTest) {
        // Simulated instant payment verification
        const verifyRes = await api.post("/voting/verify-payment", {
          status: "success",
          txnid: payData.txnid,
          amount: payData.amount,
          productinfo: payData.productinfo,
          firstname: payData.firstname,
          email: payData.email,
          udf1: payData.udf1,
          udf2: payData.udf2,
          udf3: payData.udf3,
          udf4: payData.udf4,
          hash: payData.hash,
        });

        if (verifyRes.data?.success) {
          try {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#FF2A5F", "#FFB800", "#00F0FF", "#00E676"],
            });
          } catch (e) {}

          set({ isVoteModalOpen: false, loading: false });
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
      const msg = err.response?.data?.message || err.message || "Voting failed";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },
}));
