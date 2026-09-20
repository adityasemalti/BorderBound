"use client";

import { useEffect, Suspense } from "react";
import { useLeaderboardStore } from "@/store/leaderboardStore";
import { useSearchParams } from "next/navigation";
import ContestantCard from "@/components/ContestantCard";
import { Vote, Search, Filter, RefreshCw, Trophy, Crown, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

function LeaderboardContent() {
  const {
    leaderboard,
    pagination,
    meta,
    loading,
    search,
    city,
    setSearch,
    setCity,
    fetchLeaderboard,
  } = useLeaderboardStore();

  const searchParams = useSearchParams();
  const votingStatus = searchParams?.get("voting");
  const votesCount = searchParams?.get("votes");
  const reason = searchParams?.get("reason");

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const top32 = leaderboard.filter((c) => c.rank <= 32);
  const wildcardPool = leaderboard.filter((c) => c.rank > 32 && c.rank <= 50);
  const remaining = leaderboard.filter((c) => c.rank > 50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Voting Alerts */}
      {votingStatus === "success" && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <span className="font-bold block">PayU Vote Payment Successful!</span>
            <span className="text-xs text-emerald-300/80 font-mono">
              Successfully allocated {votesCount || "your"} votes! Leaderboard rankings updated.
            </span>
          </div>
        </div>
      )}

      {votingStatus === "failed" && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <span className="font-bold block">Vote Payment Failed or Cancelled</span>
            <span className="text-xs text-rose-300/80">
              {reason || "The voting transaction could not be completed."}
            </span>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-400 mb-2 uppercase">
            <Trophy className="w-3.5 h-3.5" />
            PROVISIONAL LIVE RANKINGS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            LIVE VOTING LEADERBOARD
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time contestant rankings based on verified valid public votes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-right">
            <span className="text-xs text-slate-400 block font-mono">Total Valid Votes</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">
              {(meta?.totalVotesCast || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={fetchLeaderboard}
            disabled={loading}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search contestant by name or BB ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="relative w-full sm:w-64">
          <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by city (e.g. Delhi)..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading && leaderboard.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-mono">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-rose-500 mb-3" />
          Loading Live Leaderboard Standings...
        </div>
      )}

      {/* Empty State */}
      {!loading && leaderboard.length === 0 && (
        <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/50 border border-white/10">
          <Vote className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Contestants Found</h3>
          <p className="text-sm text-slate-400">
            No approved live contestants match your search criteria.
          </p>
        </div>
      )}

      {/* TOP 32 QUALIFYING ZONE */}
      {top32.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
            <Crown className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
              INITIAL TOP 32 QUALIFYING ZONE (DIRECT SELECTION)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {top32.map((c) => (
              <ContestantCard key={c.id || c._id} contestant={c} />
            ))}
          </div>
        </div>
      )}

      {/* TOP 50 WILDCARD ZONE */}
      {wildcardPool.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/30">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider font-mono">
              TOP 50 WILDCARD ELIGIBLE POOL (POSITIONS 33 – 50)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildcardPool.map((c) => (
              <ContestantCard key={c.id || c._id} contestant={c} />
            ))}
          </div>
        </div>
      )}

      {/* REMAINING CONTESTANTS */}
      {remaining.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            OUTSIDE TOP 50
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((c) => (
              <ContestantCard key={c.id || c._id} contestant={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-24 text-center font-mono text-slate-400">Loading Leaderboard...</div>}>
      <LeaderboardContent />
    </Suspense>
  );
}
