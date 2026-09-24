"use client";

import { useVotingStore } from "@/store/votingStore";
import { useLeaderboardStore } from "@/store/leaderboardStore";
import { X, Vote, Sparkles, AlertCircle, CheckCircle } from "lucide-react";

export default function VoteModal() {
  const {
    isVoteModalOpen,
    targetContestant,
    votesCount,
    setVotesCount,
    closeVoteModal,
    submitVotePayment,
    packages,
    loading,
    error,
  } = useVotingStore();

  const { fetchLeaderboard } = useLeaderboardStore();

  if (!isVoteModalOpen || !targetContestant) return null;

  const unitPrice = 5;
  const totalAmount = votesCount * unitPrice;

  const handlePay = async (simulate = false) => {
    try {
      await submitVotePayment(simulate);
      fetchLeaderboard();
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-8 shadow-2xl shadow-rose-500/10">
        {/* Close Button */}
        <button
          onClick={closeVoteModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Vote className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Cast Public Votes</h3>
            <p className="text-xs text-slate-400 font-mono">₹5 = 1 Vote | Voting</p>
          </div>
        </div>

        {/* Target Contestant Badge */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-700 overflow-hidden relative flex-shrink-0">
            {targetContestant.profilePhotoUrl ? (
              <img
                src={targetContestant.profilePhotoUrl}
                alt={targetContestant.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold">
                {targetContestant.fullName?.[0]}
              </div>
            )}
          </div>
          <div className="flex-1">
            <span className="text-xs text-amber-400 font-mono block font-semibold">
              RANK #{targetContestant.rank || "-"}
            </span>
            <h4 className="font-bold text-white text-base leading-tight">
              {targetContestant.fullName}
            </h4>
            <span className="text-xs text-slate-400">
              {targetContestant.applicationId || targetContestant.city}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Current Votes</span>
            <span className="text-sm font-extrabold text-amber-400">
              {targetContestant.totalValidVotes || 0}
            </span>
          </div>
        </div>

        {/* Presets */}
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
          Select Package
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {packages.map((pkg) => (
            <button
              key={pkg.votes}
              type="button"
              onClick={() => setVotesCount(pkg.votes)}
              className={`p-3 rounded-xl border text-center transition-all ${
                votesCount === pkg.votes
                  ? "bg-rose-500/20 border-rose-500 text-white font-bold shadow-lg shadow-rose-500/20"
                  : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-500"
              }`}
            >
              <div className="text-sm font-bold">{pkg.votes} Votes</div>
              <div className="text-xs text-amber-400 font-mono mt-0.5">₹{pkg.amount}</div>
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Or Enter Custom Votes
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={votesCount}
              onChange={(e) => setVotesCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono focus:outline-none focus:border-rose-500 text-lg font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-amber-400">
              = ₹{totalAmount} INR
            </span>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Summary Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 mb-6">
          <div>
            <span className="text-xs text-slate-400 block">Total Payable</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              ₹{totalAmount} <span className="text-xs font-normal text-slate-400">INR</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />  Voting
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handlePay(false)}
            disabled={loading || votesCount < 1}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-base shadow-xl shadow-rose-500/25 transition-all duration-300 transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>PAY ₹{totalAmount} WITH PAYU</span>
              </>
            )}
          </button>

          <button
            onClick={() => handlePay(true)}
            disabled={loading || votesCount < 1}
            className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-400 font-bold text-xs border border-amber-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Simulate Instant PayU Success (Test Mode)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
