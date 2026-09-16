"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Shield, CheckCircle, XCircle, AlertTriangle, Trophy, Sparkles, RefreshCw } from "lucide-react";

export default function AdminPortal() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [tab, setTab] = useState("applications"); // 'applications' | 'votes' | 'selections'
  const [applications, setApplications] = useState([]);
  const [votesLogs, setVotesLogs] = useState([]);
  const [selectionsData, setSelectionsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedWildcards, setSelectedWildcards] = useState([]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/applications");
      if (res.data?.success) setApplications(res.data.data.applications);
    } catch (err) {}
    setLoading(false);
  };

  const fetchVotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/votes");
      if (res.data?.success) setVotesLogs(res.data.data.transactions);
    } catch (err) {}
    setLoading(false);
  };

  const fetchSelections = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/final-selections");
      if (res.data?.success) setSelectionsData(res.data.data);
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    if (tab === "applications") fetchApplications();
    if (tab === "votes") fetchVotes();
    if (tab === "selections") fetchSelections();
  }, [tab]);

  const handleReview = async (id, action) => {
    try {
      await api.patch(`/admin/applications/${id}/status`, { action, rejectionReason: "Rejected by admin" });
      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Review action failed");
    }
  };

  const handleInvalidate = async (transactionId) => {
    try {
      await api.post("/admin/votes/invalidate", { transactionId, reason: "Bot / Fraudulent Traffic" });
      fetchVotes();
    } catch (err) {
      alert(err.response?.data?.message || "Invalidation failed");
    }
  };

  const toggleWildcardSelect = (id) => {
    if (selectedWildcards.includes(id)) {
      setSelectedWildcards(selectedWildcards.filter((wId) => wId !== id));
    } else {
      if (selectedWildcards.length >= 4) {
        alert("You can select exactly 4 Wild Cards.");
        return;
      }
      setSelectedWildcards([...selectedWildcards, id]);
    }
  };

  const handleSaveWildcards = async () => {
    if (selectedWildcards.length !== 4) {
      alert("Please select exactly 4 Wild Card contestants.");
      return;
    }
    try {
      await api.post("/admin/select-wildcards", { wildcardContestantIds: selectedWildcards });
      alert("Wild Cards successfully selected!");
      fetchSelections();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save Wild Cards.");
    }
  };

  const handleCertify = async () => {
    if (!confirm("Are you sure you want to certify and lock final competition results?")) return;
    try {
      const res = await api.post("/admin/certify-results");
      alert(res.data?.message || "Results certified!");
      fetchSelections();
    } catch (err) {
      alert(err.response?.data?.message || "Certification failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Shield className="w-4 h-4" /> OFFICIAL ADMIN CONTROL PANEL
          </span>
          <h1 className="text-3xl font-black text-white mt-1">BorderBound Management Portal</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-800">
        <button
          onClick={() => setTab("applications")}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${
            tab === "applications" ? "border-rose-500 text-rose-400" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Contestant Applications ({applications.length})
        </button>
        <button
          onClick={() => setTab("votes")}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${
            tab === "votes" ? "border-rose-500 text-rose-400" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Vote Audit & Anti-Fraud
        </button>
        <button
          onClick={() => setTab("selections")}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${
            tab === "selections" ? "border-rose-500 text-rose-400" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Top 32 & 4 Wildcards
        </button>
      </div>

      {/* TAB 1: APPLICATIONS */}
      {tab === "applications" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Pending & Verified Applications</h3>
            <button onClick={fetchApplications} className="p-2 rounded-lg bg-slate-800 text-slate-300">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {applications.map((app) => (
              <div key={app._id} className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">{app.applicationId}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-mono">{app.status}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">{app.fullName}</h4>
                  <p className="text-xs text-slate-400">{app.city}, {app.state} • Mobile: {app.mobile}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReview(app._id, "approve")}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => handleReview(app._id, "reject")}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VOTE AUDIT & ANTI-FRAUD */}
      {tab === "votes" && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Vote Audit Log & Anti-Fraud Actions</h3>
          <div className="space-y-3">
            {votesLogs.map((tx) => (
              <div key={tx._id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-400 font-mono block">
                    {tx.votesCount} Votes (₹{tx.totalAmountPaid})
                  </span>
                  <span className="text-xs text-slate-400">
                    IP: {tx.voterIp} • Contestant: {tx.contestantId?.fullName || tx.contestantId}
                  </span>
                </div>
                {tx.status === "valid" ? (
                  <button
                    onClick={() => handleInvalidate(tx._id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-400 font-bold text-xs hover:bg-rose-600 hover:text-white transition-all"
                  >
                    Invalidate Votes
                  </button>
                ) : (
                  <span className="text-xs text-rose-500 font-mono font-bold">INVALIDATED</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SELECTIONS & WILDCARDS */}
      {tab === "selections" && selectionsData && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Top 32 Qualification & Wild Card Selection</h3>
              <p className="text-xs text-slate-400">Select exactly 4 Wild Card contestants from the Top 50 remaining pool.</p>
            </div>
            <button
              onClick={handleCertify}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20"
            >
              CERTIFY & LOCK FINAL RESULTS
            </button>
          </div>

          {/* Top 32 Qualified */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30">
            <h4 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Top 32 Qualifiers (Direct Qualification)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectionsData.top32.map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-slate-800/60 text-xs font-mono">
                  <span className="text-amber-400 font-bold">#{c.rank}</span> {c.fullName}
                </div>
              ))}
            </div>
          </div>

          {/* Top 50 Wildcard Eligible */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Select 4 Wildcards from Top 50 Remaining ({selectedWildcards.length}/4 Selected)
              </h4>
              <button
                onClick={handleSaveWildcards}
                disabled={selectedWildcards.length !== 4}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-extrabold text-xs disabled:opacity-50"
              >
                Save 4 Wild Card Selections
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectionsData.wildcardEligibleTop50.map((c) => {
                const isSelected = selectedWildcards.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleWildcardSelect(c.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-lg"
                        : "bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-cyan-400 font-bold block">#{c.rank}</span>
                    <span className="truncate block">{c.fullName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
