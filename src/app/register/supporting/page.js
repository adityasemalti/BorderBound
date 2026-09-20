"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Loader2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export default function SupportingContestantPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    backedContestantCode: "",
    supportType: "Fan / Voter",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 py-12 sm:py-20 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-rose-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-2xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              SUPPORTING CONTESTANT ENTRY
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            BACK A CONTESTANT
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
            Register as an official Supporting Contestant or Team Backer for THE BORDERBOUND. Support your favorite contestant with dedicated voting power and updates.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-white/10 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">Registration Received!</h2>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Thank you for registering as a Supporting Contestant. You will receive real-time updates and exclusive access to voting packages.
            </p>
            <div className="pt-4">
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20"
              >
                Go to Live Leaderboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Mobile Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Contestant Name or Application ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. BB-2026-00012 or Contestant Name"
                  value={form.backedContestantCode}
                  onChange={(e) => setForm({ ...form, backedContestantCode: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Support Category
                </label>
                <select
                  value={form.supportType}
                  onChange={(e) => setForm({ ...form, supportType: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-zinc-800 border border-white/[0.08] px-4 text-sm text-white outline-none focus:border-rose-500/50"
                >
                  <option value="Fan / Voter">Fan / Primary Voter</option>
                  <option value="Team Sponsor">Team / Personal Sponsor</option>
                  <option value="Campaign Promoter">Campaign / Social Promoter</option>
                  <option value="Family / Friend">Family & Friends Circle</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Optional Note / Message
              </label>
              <textarea
                rows={3}
                placeholder="Share a message of support..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Submit Supporting Entry</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </main>
  );
}
