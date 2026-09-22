"use client";

import { useEffect, Suspense } from "react";
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
  MapPin,
  CalendarDays,
  Briefcase,
  GraduationCap,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  FileCheck2,
  CreditCard,
  Camera,
  IdCard,
  ChevronRight,
  Lock,
  CircleDot,
  Edit3,
} from "lucide-react";
import { FaFacebook, FaInstagram , FaTwitter, FaYoutube} from "react-icons/fa";

/* =========================================================
   PROFILE REQUIRED
========================================================= */

function ProfileRequired() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black text-white flex items-center justify-center px-4 py-16">
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
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl"
      >
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] sm:text-xs font-black tracking-[0.18em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Contestant Registration
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-zinc-950/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-red-950/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

          <div className="relative px-6 sm:px-10 md:px-14 py-10 sm:py-14 text-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mx-auto w-24 h-24 mb-7"
            >
              <div className="absolute inset-0 rounded-3xl bg-red-600/10 border border-red-500/20 rotate-6" />

              <div className="absolute inset-1 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                <User className="w-11 h-11 text-red-500" />
              </div>

              <div className="absolute -right-2 -top-2 w-7 h-7 rounded-full bg-red-600 border-4 border-zinc-950 flex items-center justify-center">
                <span className="text-white text-[10px] font-black">!</span>
              </div>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Your Profile
              <span className="block text-red-500 mt-1">Isn't Ready Yet.</span>
            </h1>

            <p className="max-w-lg mx-auto mt-5 text-sm sm:text-base leading-7 text-zinc-400">
              Complete your contestant registration to enter the{" "}
              <span className="text-white font-semibold">Border-Bound</span>{" "}
              selection process.
            </p>

            <div className="mt-8 p-4 rounded-2xl bg-white/[0.025] border border-white/10 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-red-400" />
                </div>

                <div className="flex-1">
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

            <div className="mt-8">
              <Link href="/register" className="group block">
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="relative overflow-hidden w-full rounded-2xl bg-red-600 hover:bg-red-500 transition-colors px-6 py-4 shadow-xl shadow-red-950/30"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <span className="text-sm sm:text-base font-black uppercase tracking-wider">
                      Complete My Profile
                    </span>

                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = {
    draft: {
      label: "PROFILE DRAFT",
      icon: Edit3,
      className: "text-zinc-300 bg-zinc-800/80 border-zinc-700",
    },

    pending_payment: {
      label: "PAYMENT PENDING",
      icon: CreditCard,
      className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },

    pending_review: {
      label: "UNDER REVIEW",
      icon: Clock,
      className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },

    approved: {
      label: "PROFILE LIVE",
      icon: CheckCircle,
      className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },

    rejected: {
      label: "ACTION REQUIRED",
      icon: AlertCircle,
      className: "text-red-400 bg-red-500/10 border-red-500/20",
    },
  };

  const item = config[status] || config.draft;
  const Icon = item.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-[9px] sm:text-[10px] font-black tracking-wider ${item.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {item.label}
    </div>
  );
}

/* =========================================================
   DOCUMENT STATUS
========================================================= */

function DocumentCard({ type, status, icon: Icon }) {
  const pending = status === "pending";
  const approved = status === "approved";

  return (
    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-zinc-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white truncate">{type}</p>

        <p className="text-[10px] text-zinc-500 mt-0.5">
          {approved
            ? "Verified"
            : pending
            ? "Awaiting verification"
            : "Not submitted"}
        </p>
      </div>

      {approved ? (
        <CheckCircle className="w-4 h-4 text-emerald-400" />
      ) : pending ? (
        <Clock className="w-4 h-4 text-amber-400" />
      ) : (
        <CircleDot className="w-4 h-4 text-zinc-600" />
      )}
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-11 h-11 mx-auto rounded-full border-2 border-white/10 border-t-red-500"
          />

          <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
            Loading Contestant Portal
          </p>
        </div>
      </div>
    );
  }

  if (!myProfile) {
    return <ProfileRequired />;
  }

  const isApproved = myProfile.status === "approved";

  const documents = myProfile.documents || [];

  const photograph = documents.find(
    (doc) => doc.docType === "photograph"
  );

  const identityProof = documents.find(
    (doc) => doc.docType === "identity_proof"
  );

const profileFields = [
  myProfile.fullName,
  myProfile.dob,
  myProfile.gender,
  myProfile.mobile,
  myProfile.email,
  myProfile.city,
  myProfile.state,
  myProfile.permanentAddress,
  myProfile.occupation,
  myProfile.education,
  myProfile.bio,
  myProfile.profilePhotoUrl,
  myProfile.termsAccepted,
];

const completedFields = profileFields.filter(Boolean).length;

const profileCompletion = Math.round(
  (completedFields / profileFields.length) * 100
);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/contestant/${myProfile._id}`
      : "";

  const copyShareLink = () => {
    if (!shareUrl) return;

    navigator.clipboard.writeText(shareUrl);
    alert("Public profile link copied!");
  };

  const getNextAction = () => {
    if (myProfile.status === "draft") {
      return {
        title: "Complete Your Registration",
        description:
          "Your contestant profile is saved as a draft. Complete the remaining registration steps to continue.",
        button: "Continue Registration",
        href: "/register",
      };
    }

    if (!myProfile.registrationFeePaid) {
      return {
        title: "Registration Fee Pending",
        description:
          "Complete your registration payment to move your application into official review.",
        button: "Complete Payment",
        href: "/register",
      };
    }

    if (myProfile.status === "pending_review") {
      return {
        title: "Application Under Review",
        description:
          "Your application and documents have been submitted. The Border-Bound team is reviewing your entry.",
        button: null,
        href: null,
      };
    }

    if (myProfile.status === "rejected") {
      return {
        title: "Changes Required",
        description:
          myProfile.rejectionReason ||
          "Please review your application and submit the required changes.",
        button: "Update Profile",
        href: "/register",
      };
    }

    return null;
  };

  const nextAction = getNextAction();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-700/[0.07] blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-red-950/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* =====================================================
            PAYMENT ALERT
        ===================================================== */}

        <AnimatePresence>
          {paymentStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex gap-3"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />

              <div>
                <p className="text-sm font-bold text-emerald-400">
                  Payment Successful
                </p>

                <p className="text-xs text-emerald-300/70 mt-1">
                  Transaction ID: {txnid || "BBTXN"} • Your application has
                  been submitted for official review.
                </p>
              </div>
            </motion.div>
          )}

          {paymentStatus === "failed" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />

              <div>
                <p className="text-sm font-bold text-red-400">
                  Payment Failed
                </p>

                <p className="text-xs text-red-300/70 mt-1">
                  {reason ||
                    "The payment could not be processed. Please try again."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />

              <span className="text-[10px] font-black tracking-[0.22em] uppercase text-red-500">
                Contestant Portal
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Your Border-Bound
              <span className="text-red-500"> Journey.</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              Manage your application, profile and selection status.
            </p>
          </div>

          <StatusBadge status={myProfile.status} />
        </motion.div>

        {/* =====================================================
            HERO PROFILE CARD
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 shadow-2xl shadow-black/50"
        >
          {/* Hero background */}
          <div className="absolute inset-0">
            {myProfile.profilePhotoUrl && (
              <img
                src={myProfile.profilePhotoUrl}
                alt=""
                className="w-full h-full object-cover opacity-[0.08] blur-xl scale-110"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative p-5 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-7 md:items-center">
              {/* Profile Image */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="absolute -inset-2 rounded-[1.7rem] bg-red-600/10 blur-xl" />

                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[1.5rem] overflow-hidden border border-white/10 bg-zinc-900">
                  {myProfile.profilePhotoUrl ? (
                    <img
                      src={myProfile.profilePhotoUrl}
                      alt={myProfile.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-zinc-700" />
                    </div>
                  )}

                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.5rem]" />
                </div>

                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-red-600 border-4 border-black flex items-center justify-center shadow-lg shadow-red-950/50">
                  <Flame className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Identity */}
              <div className="flex-1 min-w-0 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-zinc-400">
                    {myProfile.applicationId}
                  </span>

                  {myProfile.isLive && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400">
                      LIVE
                    </span>
                  )}
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
                  {myProfile.fullName}
                </h2>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {myProfile.city}, {myProfile.state}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-500" />
                    {myProfile.age} years
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-red-500" />
                    {myProfile.occupation || "Contestant"}
                  </span>
                </div>

                {myProfile.bio && (
                  <p className="max-w-2xl text-sm text-zinc-400 leading-6 mt-5">
                    {myProfile.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative border-t border-white/[0.07] grid grid-cols-3">
            <div className="p-4 sm:p-5 text-center border-r border-white/[0.07]">
              <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold">
                Rank
              </p>

              <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                {myProfile.rank ? `#${myProfile.rank}` : "—"}
              </p>
            </div>

            <div className="p-4 sm:p-5 text-center border-r border-white/[0.07]">
              <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold">
                Votes
              </p>

              <p className="text-xl sm:text-2xl font-black text-red-400 mt-1">
                {(myProfile.totalValidVotes || 0).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="p-4 sm:p-5 text-center">
              <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold">
                Selection
              </p>

              <p className="text-sm sm:text-base font-black text-white mt-2 uppercase">
                {myProfile.selectionStatus === "none"
                  ? "In Progress"
                  : myProfile.selectionStatus}
              </p>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            NEXT ACTION
        ===================================================== */}

        {nextAction && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-6 relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/30 via-zinc-950 to-zinc-950"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  {myProfile.status === "pending_review" ? (
                    <Clock className="w-5 h-5 text-amber-400" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-red-400" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-black text-white">
                    {nextAction.title}
                  </p>

                  <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-5">
                    {nextAction.description}
                  </p>
                </div>
              </div>

              {nextAction.button && (
                <Link href={nextAction.href} className="shrink-0">
                  <button className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition-colors text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/30">
                    {nextAction.button}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>
          </motion.section>
        )}

        {/* =====================================================
            APPLICATION JOURNEY
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-5 sm:p-7"
        >
          <div className="flex items-center justify-between mb-7">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-red-500 font-black">
                Application Journey
              </p>

              <h3 className="text-lg font-black text-white mt-1">
                Your Progress
              </h3>
            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-white">
                {profileCompletion}%
              </p>

              <p className="text-[9px] text-zinc-600 uppercase">
                Profile Complete
              </p>
            </div>
          </div>

          <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-red-700 to-red-400 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              {
                title: "Profile",
                icon: User,
                done: profileCompletion >= 70,
                active: myProfile.status === "draft",
              },
              {
                title: "Payment",
                icon: CreditCard,
                done: myProfile.registrationFeePaid,
                active:
                  myProfile.status === "pending_payment" ||
                  !myProfile.registrationFeePaid,
              },
              {
                title: "Verification",
                icon: ShieldCheck,
                done:
                  myProfile.status === "approved" ||
                  myProfile.isLive ||
                  myProfile.status === "pending_review",
                active: myProfile.status === "pending_review",
              },
              {
                title: "Live & Voting",
                icon: Vote,
                done: myProfile.isLive,
                active: myProfile.isLive,
              },
            ].map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className={`relative p-4 rounded-2xl border ${
                    step.active
                      ? "border-red-500/30 bg-red-500/[0.06]"
                      : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        step.done
                          ? "bg-emerald-500/10 text-emerald-400"
                          : step.active
                          ? "bg-red-500/10 text-red-400"
                          : "bg-zinc-900 text-zinc-600"
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        {step.title}
                      </p>

                      <p className="text-[9px] text-zinc-600 mt-0.5">
                        {step.done
                          ? "Completed"
                          : step.active
                          ? "Current step"
                          : "Locked"}
                      </p>
                    </div>
                  </div>

                  {index < 3 && (
                    <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-px bg-white/10" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* =====================================================
            CONTENT GRID
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          {/* Personal Information */}
          <motion.section
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28 }}
            className="lg:col-span-3 rounded-3xl border border-white/10 bg-zinc-950/70 overflow-hidden"
          >
            <div className="px-5 sm:px-7 py-5 border-b border-white/[0.07] flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-red-500 font-black">
                  Identity
                </p>

                <h3 className="text-base font-black text-white mt-1">
                  Personal Information
                </h3>
              </div>

              <Link
                href="/register"
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.06]"
              >
                <Edit3 className="w-4 h-4 text-zinc-500" />
              </Link>
            </div>

            <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  icon: CalendarDays,
                  label: "Date of Birth",
                  value: new Date(myProfile.dob).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  ),
                },
                {
                  icon: User,
                  label: "Gender",
                  value: myProfile.gender,
                },
                {
                  icon: Briefcase,
                  label: "Occupation",
                  value: myProfile.occupation,
                },
                {
                  icon: GraduationCap,
                  label: "Education",
                  value: myProfile.education,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: `${myProfile.city}, ${myProfile.state}`,
                },
                {
                  icon: Fingerprint,
                  label: "Application ID",
                  value: myProfile.applicationId,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex gap-3">
                    <Icon className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />

                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold">
                        {item.label}
                      </p>

                      <p className="text-xs text-zinc-300 mt-1 capitalize truncate">
                        {item.value || "Not provided"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Documents */}
          <motion.section
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-3xl border border-white/10 bg-zinc-950/70 overflow-hidden"
          >
            <div className="px-5 sm:px-6 py-5 border-b border-white/[0.07]">
              <p className="text-[9px] uppercase tracking-[0.2em] text-red-500 font-black">
                Verification
              </p>

              <h3 className="text-base font-black text-white mt-1">
                Submitted Documents
              </h3>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              <DocumentCard
                type="Photograph"
                status={photograph?.status}
                icon={Camera}
              />

              <DocumentCard
                type="Identity Proof"
                status={identityProof?.status}
                icon={IdCard}
              />

              <div className="flex items-center gap-2 pt-2 text-[9px] text-zinc-600">
                <Lock className="w-3 h-3" />
                Documents are securely stored and reviewed by the team.
              </div>
            </div>
          </motion.section>
        </div>

        {/* =====================================================
            CONTACT + EMERGENCY
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-red-400" />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-red-500 font-black">
                  Contact
                </p>

                <h3 className="text-sm font-black text-white mt-1">
                  Contact Information
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                  Email
                </p>

                <p className="text-sm text-zinc-300 mt-1 break-all">
                  {myProfile.email}
                </p>
              </div>

              <div>
                <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                  Mobile
                </p>

                <p className="text-sm text-zinc-300 mt-1">
                  {myProfile.mobile}
                </p>
              </div>

              <div>
                <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                  Permanent Address
                </p>

                <p className="text-sm text-zinc-300 mt-1 leading-6">
                  {myProfile.permanentAddress || "Not provided"}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-black">
                  Safety
                </p>

                <h3 className="text-sm font-black text-white mt-1">
                  Emergency Contact
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                  Name
                </p>

                <p className="text-sm text-zinc-300 mt-1">
                  {myProfile.emergencyContact?.name || "Not provided"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                    Relation
                  </p>

                  <p className="text-sm text-zinc-300 mt-1">
                    {myProfile.emergencyContact?.relation || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                    Phone
                  </p>

                  <p className="text-sm text-zinc-300 mt-1">
                    {myProfile.emergencyContact?.phone || "—"}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* =====================================================
            SOCIAL MEDIA
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 overflow-hidden"
        >
          <div className="px-5 sm:px-7 py-5 border-b border-white/[0.07]">
            <p className="text-[9px] uppercase tracking-[0.2em] text-red-500 font-black">
              Social Presence
            </p>

            <h3 className="text-base font-black text-white mt-1">
              Your Social Profiles
            </h3>
          </div>

          <div className="p-5 sm:p-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                name: "Instagram",
                value: myProfile.socialMedia?.instagram,
                icon: FaInstagram,
              },
              {
                name: "Facebook",
                value: myProfile.socialMedia?.facebook,
                icon: FaFacebook,
              },
              {
                name: "YouTube",
                value: myProfile.socialMedia?.youtube,
                icon: FaYoutube,
              },
              {
                name: "Twitter",
                value: myProfile.socialMedia?.twitter,
                icon: FaTwitter,
              },
            ].map((social) => {
              const Icon = social.icon;

              return (
                <div
                  key={social.name}
                  className="p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07]"
                >
                  <Icon className="w-4 h-4 text-zinc-400 mb-3" />

                  <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                    {social.name}
                  </p>

                  <p className="text-xs text-zinc-300 mt-1 truncate">
                    {social.value || "Not connected"}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* =====================================================
            SHARE
        ===================================================== */}

        {isApproved && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/40 to-zinc-950"
          >
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-red-600/10 rounded-full blur-[80px]" />

            <div className="relative p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <Vote className="w-4 h-4" />

                  <span className="text-[9px] uppercase tracking-[0.2em] font-black">
                    Public Voting
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black">
                  Your journey is now public.
                </h3>

                <p className="text-xs text-zinc-500 mt-2 max-w-lg">
                  Share your contestant profile and let your supporters follow
                  your Border-Bound journey.
                </p>
              </div>

              <button
                onClick={copyShareLink}
                className="shrink-0 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 transition-all text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-950/40"
              >
                <Share2 className="w-4 h-4" />
                Copy Voting Link
              </button>
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <div className="pt-6 pb-4 text-center">
          <div className="inline-flex items-center gap-2 text-[9px] text-zinc-700 uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3 h-3" />
            Border-Bound Contestant Portal
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ContestantDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-white/10 border-t-red-500 animate-spin" />

            <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
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
