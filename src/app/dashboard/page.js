"use client";

import { useEffect, useState, Suspense } from "react";
import { useAuthStore } from "@/store/authStore";
import { useContestantStore } from "@/store/contestantStore";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Trophy,
  Vote,
  CheckCircle,
  Clock,
  Share2,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Flame,
  Fingerprint,
  ChevronRight,
} from "lucide-react";

function ProfileRequired() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black text-white flex items-center justify-center px-4 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-2xl"
      >
        {/* Top Label */}
        <div className="flex justify-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] sm:text-xs font-black tracking-[0.18em] uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Contestant Registration
          </motion.div>
        </div>

        {/* Main Card */}
        <div className="relative rounded-[2rem] border border-white/10 bg-zinc-950/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-red-950/20">
          {/* Red Top Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

          {/* Decorative Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-red-600/10 blur-[90px]" />

          <div className="relative px-6 sm:px-10 md:px-14 py-10 sm:py-14 text-center">
            {/* Icon */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-7"
            >
              <div className="absolute inset-0 rounded-3xl bg-red-600/10 border border-red-500/20 rotate-6" />

              <div className="absolute inset-1 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.12)]">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
              </div>

              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-2 -top-2 w-7 h-7 rounded-full bg-red-600 border-4 border-zinc-950 flex items-center justify-center"
              >
                <span className="text-white text-[10px] font-black">!</span>
              </motion.div>
            </motion.div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Your Profile
              <span className="block text-red-500 mt-1">Isn't Ready Yet.</span>
            </h1>

            <p className="max-w-lg mx-auto mt-5 text-sm sm:text-base leading-7 text-zinc-400">
              You haven't completed your contestant profile. Complete your
              registration to enter the{" "}
              <span className="text-white font-semibold">Border-Bound</span>{" "}
              selection process.
            </p>

            {/* Status */}
            <div className="mt-8 p-4 rounded-2xl bg-white/[0.025] border border-white/10 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-red-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-white uppercase tracking-wider">
                    Registration Required
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Create your contestant profile to continue.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Action Needed
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              {[
                {
                  icon: User,
                  title: "Your Identity",
                  text: "Build your contestant profile",
                },
                {
                  icon: Trophy,
                  title: "Your Journey",
                  text: "Enter the selection process",
                },
                {
                  icon: Vote,
                  title: "Public Voting",
                  text: "Get discovered by viewers",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] text-left"
                  >
                    <Icon className="w-4 h-4 text-red-500 mb-3" />

                    <p className="text-xs font-bold text-white">
                      {item.title}
                    </p>

                    <p className="text-[10px] leading-4 text-zinc-500 mt-1">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link href="/register" className="group block">
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="relative overflow-hidden w-full rounded-2xl bg-red-600 hover:bg-red-500 transition-colors px-6 py-4 shadow-xl shadow-red-950/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <div className="relative flex items-center justify-center gap-3">
                    <span className="text-sm sm:text-base font-black uppercase tracking-wider">
                      Complete My Profile
                    </span>

                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>

              <p className="mt-4 text-[10px] text-zinc-600 uppercase tracking-[0.18em]">
                Registration • Verification • Selection
              </p>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Bottom Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] text-zinc-600 uppercase tracking-wider"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
            Secure Registration
          </span>

          <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />

          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-600" />
            Border-Bound
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DashboardContent() {
  const { user } = useAuthStore();
  const { myProfile, fetchMyProfile, loading } = useContestantStore();

  const searchParams = useSearchParams();

  const paymentStatus = searchParams?.get("payment");
  const txnid = searchParams?.get("txnid");
  const reason = searchParams?.get("reason");

  useEffect(() => {
    if (user) {
      fetchMyProfile();
    }
  }, [user, fetchMyProfile]);

  /*
   * IMPORTANT:
   * Loading aur "profile doesn't exist" ko alag rakha hai.
   * Jab API loading complete kar de aur myProfile null ho,
   * tab ProfileRequired screen dikhegi.
   */

  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-red-600/10 blur-[100px]" />

        <div className="relative text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mx-auto w-12 h-12 rounded-full border-2 border-white/10 border-t-red-500"
          />

          <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
            Loading Contestant Dashboard
          </p>
        </div>
      </div>
    );
  }

  // No contestant profile
  if (!myProfile) {
    return <ProfileRequired />;
  }

  const isApproved = myProfile.status === "approved";

  const isPending =
    myProfile.status === "pending_review" ||
    myProfile.status === "pending_payment";

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/contestant/${myProfile._id}`
      : "";

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Public profile link copied!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Payment Success */}
        <AnimatePresence>
          {paymentStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />

              <div>
                <span className="font-bold block">
                  PayU Registration Fee Payment Successful!
                </span>

                <span className="text-xs text-emerald-300/80 font-mono">
                  Transaction ID: {txnid || "BBTXN"} • Application is now
                  pending official admin review.
                </span>
              </div>
            </motion.div>
          )}

          {/* Payment Failed */}
          {paymentStatus === "failed" && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />

              <div>
                <span className="font-bold block">
                  PayU Payment Failed or Cancelled
                </span>

                <span className="text-xs text-rose-300/80">
                  {reason ||
                    "The payment could not be processed. Please try again."}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-red-400 uppercase">
                  Contestant Dashboard
                </span>

                <span className="text-xs text-zinc-600">•</span>

                <span className="text-xs font-mono text-zinc-400">
                  {myProfile.applicationId}
                </span>
              </div>

              <h1 className="text-3xl font-black text-white">
                {myProfile.fullName}
              </h1>

              <p className="text-xs text-zinc-500 mt-1">
                {myProfile.city}, {myProfile.state}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900 border border-white/10">
              {isApproved && (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />

                  <span className="text-xs font-bold text-emerald-400 uppercase">
                    Profile Live & Approved
                  </span>
                </>
              )}

              {isPending && (
                <>
                  <Clock className="w-5 h-5 text-amber-400 animate-pulse" />

                  <span className="text-xs font-bold text-amber-400 uppercase">
                    Under Verification
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10">
            <span className="text-xs text-zinc-500 block font-mono">
              Current Live Rank
            </span>

            <span className="text-3xl font-black text-amber-400 font-mono mt-1 block">
              #{myProfile.rank || "-"}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10">
            <span className="text-xs text-zinc-500 block font-mono">
              Verified Vote Count
            </span>

            <span className="text-3xl font-black text-red-400 font-mono mt-1 block">
              {(myProfile.totalValidVotes || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10">
            <span className="text-xs text-zinc-500 block font-mono">
              Selection Status
            </span>

            <span className="text-lg font-bold text-white mt-2 block uppercase">
              {myProfile.selectionStatus || "In Progress"}
            </span>
          </div>
        </div>

        {/* Share Profile */}
        {isApproved && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-sm font-bold text-white">
                Share Your Profile For Votes
              </h3>

              <p className="text-xs text-zinc-500 mt-0.5">
                Share your dedicated voting link with supporters across social
                media.
              </p>
            </div>

            <button
              onClick={copyShareLink}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs shadow-lg shadow-red-500/20 flex items-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Copy Share Link
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ContestantDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-white/10 border-t-red-500 animate-spin" />

            <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Loading Dashboard...
            </p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}