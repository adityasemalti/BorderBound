"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useContestantStore } from "@/store/contestantStore";
import Link from "next/link";
import { User, Trophy, Vote, CheckCircle, Clock, AlertTriangle, Share2, Sparkles } from "lucide-react";

export default function ContestantDashboard() {
  const { user } = useAuthStore();
  const { myProfile, fetchMyProfile, loading } = useContestantStore();

  useEffect(() => {
    if (user) fetchMyProfile();
  }, [user, fetchMyProfile]);

  if (loading || !myProfile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center font-mono text-slate-400">
        Loading Contestant Dashboard...
      </div>
    );
  }

  const isApproved = myProfile.status === "approved";
  const isPending = myProfile.status === "pending_review" || myProfile.status === "pending_payment";

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/contestant/${myProfile._id}` : "";

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Public profile link copied!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                CONTESTANT DASHBOARD
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-300">{myProfile.applicationId}</span>
            </div>
            <h1 className="text-3xl font-black text-white">{myProfile.fullName}</h1>
            <p className="text-xs text-slate-400 mt-1">
              {myProfile.city}, {myProfile.state}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700">
            {isApproved && (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase">PROFILE LIVE & APPROVED</span>
              </>
            )}
            {isPending && (
              <>
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-400 uppercase">UNDER VERIFICATION</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <span className="text-xs text-slate-400 block font-mono">Current Live Rank</span>
          <span className="text-3xl font-black text-amber-400 font-mono mt-1 block">
            #{myProfile.rank || "-"}
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <span className="text-xs text-slate-400 block font-mono">Verified Vote Count</span>
          <span className="text-3xl font-black text-rose-400 font-mono mt-1 block">
            {(myProfile.totalValidVotes || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <span className="text-xs text-slate-400 block font-mono">Selection Status</span>
          <span className="text-lg font-bold text-white mt-2 block uppercase">
            {myProfile.selectionStatus || "In Progress"}
          </span>
        </div>
      </div>

      {/* Share Profile Widget */}
      {isApproved && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Share Your Profile For Votes</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Share your dedicated voting link with supporters across social media.
            </p>
          </div>
          <button
            onClick={copyShareLink}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" /> Copy Share Link
          </button>
        </div>
      )}
    </div>
  );
}
