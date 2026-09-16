"use client";

import Link from "next/link";
import { useVotingStore } from "@/store/votingStore";
import { Vote, ArrowUpRight, TrendingUp, TrendingDown, Minus, Crown, Sparkles } from "lucide-react";

export default function ContestantCard({ contestant }) {
  const { openVoteModal } = useVotingStore();

  const rank = contestant.rank || 0;
  const isTop3 = rank > 0 && rank <= 3;
  const isTop32 = rank > 0 && rank <= 32;
  const isWildCardPool = rank > 32 && rank <= 50;

  let rankBadgeColor = "bg-slate-800 text-slate-300 border-slate-700";
  if (isTop3) {
    rankBadgeColor = "bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-yellow-300 font-extrabold shadow-lg shadow-amber-500/20";
  } else if (isTop32) {
    rankBadgeColor = "bg-rose-500/20 text-rose-400 border-rose-500/40 font-bold";
  } else if (isWildCardPool) {
    rankBadgeColor = "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-bold";
  }

  const movement = contestant.movement || "SAME";

  return (
    <div className={`group relative rounded-2xl bg-slate-900/70 border transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
      isTop3
        ? "border-amber-500/40 hover:border-amber-400 shadow-xl shadow-amber-500/10"
        : isTop32
        ? "border-white/10 hover:border-rose-500/40"
        : "border-white/5 hover:border-slate-700"
    }`}>
      {/* Top Banner Gradient for Top 3 */}
      {isTop3 && (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-rose-500" />
      )}

      <div className="p-5 flex flex-col justify-between h-full">
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full border text-xs font-mono tracking-wider ${rankBadgeColor}`}>
              {isTop3 && <Crown className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />}
              RANK #{rank}
            </span>
            {contestant.selectionStatus === "wildcard" && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 uppercase font-bold">
                WILD CARD
              </span>
            )}
          </div>

          {/* Movement Badge */}
          <div className="flex items-center gap-1 text-xs font-mono font-bold">
            {movement === "UP" && (
              <span className="flex items-center text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +{contestant.rankChange || 1}
              </span>
            )}
            {movement === "DOWN" && (
              <span className="flex items-center text-rose-500">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -{contestant.rankChange || 1}
              </span>
            )}
            {movement === "SAME" && (
              <span className="text-slate-500 flex items-center">
                <Minus className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        {/* Contestant Photo & Details */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {contestant.profilePhotoUrl ? (
              <img
                src={contestant.profilePhotoUrl}
                alt={contestant.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-400 font-extrabold text-xl">
                {contestant.fullName?.[0]}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base truncate group-hover:text-amber-400 transition-colors">
              {contestant.fullName}
            </h3>
            <span className="text-xs text-slate-400 font-mono block truncate">
              {contestant.applicationId} • {contestant.city}, {contestant.state}
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 font-bold">
                {(contestant.totalValidVotes || 0).toLocaleString("en-IN")} Votes
              </span>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
          <Link
            href={`/contestant/${contestant.id || contestant._id}`}
            className="px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-xs font-semibold text-slate-300 text-center transition-colors flex items-center justify-center gap-1"
          >
            <span>Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => openVoteModal(contestant)}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-xs font-bold text-white shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1 active:scale-95"
          >
            <Vote className="w-3.5 h-3.5" />
            <span>VOTE NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
}
