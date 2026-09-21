"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  LuArrowLeft,
  LuCalendarDays,
  LuCheck,
  LuCopy,
  LuExternalLink,
  LuFacebook,
  LuGlobe,
  LuInstagram,
  LuMapPin,
  LuShare2,
  LuSparkles,
  LuTrophy,
  LuVote,
  LuX,
  LuYoutube,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useVotingStore } from "@/store/votingStore";

export default function ContestantProfilePage() {
  const params = useParams();
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const { openVoteModal } = useVotingStore();

  useEffect(() => {
    if (!params?.id) return;

    setLoading(true);

    api
      .get(`/contestants/public/${params.id}`)
      .then((res) => {
        if (res.data?.success) {
          setProfile(res.data.data);
        } else {
          setError("Profile not found");
        }
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message || "Contestant profile not found"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params?.id]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Vote for ${profile.fullName} | THE BORDERBOUND`,
          text: `Support ${profile.fullName} in THE BORDERBOUND.`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch {}
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-6 w-24 rounded bg-zinc-900" />

          <div className="mt-8 overflow-hidden border border-zinc-900 bg-[#080808]">
            <div className="h-80 bg-zinc-900 sm:h-96" />

            <div className="space-y-4 p-6">
              <div className="h-4 w-32 rounded bg-zinc-900" />
              <div className="h-10 w-64 rounded bg-zinc-900" />
              <div className="h-4 w-full max-w-xl rounded bg-zinc-900" />
              <div className="h-12 w-full rounded bg-zinc-900" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md border border-red-900/40 bg-[#090909] p-8 text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-red-600/30 bg-red-600/10">
            <LuX className="text-red-500" size={28} />
          </div>

          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
            BORDERBOUND
          </p>

          <h1 className="text-2xl font-black uppercase text-white">
            Profile Unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            {error || "Contestant profile does not exist."}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-7 inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:border-red-600 hover:bg-red-600"
          >
            <LuArrowLeft size={16} />
            Go Back
          </button>
        </motion.div>
      </main>
    );
  }

  const isSelected =
    profile.selectionStatus === "top_32" ||
    profile.selectionStatus === "wildcard";

  const socialLinks = profile.socialMedia || {};

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-700/10 blur-[140px]" />

        <div className="absolute right-[-150px] top-[35%] h-[400px] w-[400px] rounded-full bg-red-600/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 flex items-center justify-between"
        >
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-950 transition group-hover:border-red-600 group-hover:bg-red-600">
              <LuArrowLeft size={15} />
            </span>

            <span className="hidden sm:block">All Contestants</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />

            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">
              Live Contestant Profile
            </span>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden border border-zinc-900 bg-[#080808]"
        >
          {/* Red top line */}
          <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />

          {/* Hero */}
          <div className="relative min-h-[560px] overflow-hidden sm:min-h-[600px]">
            {/* Image */}
            <div className="absolute inset-0">
              {profile.profilePhotoUrl ? (
                <motion.img
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  src={profile.profilePhotoUrl}
                  alt={profile.fullName}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-950">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-5xl font-black text-zinc-700">
                    {profile.fullName?.charAt(0)}
                  </div>
                </div>
              )}
            </div>

            {/* Image overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

            {/* Image Top Info */}
            <div className="absolute left-4 right-4 top-5 flex items-start justify-between sm:left-7 sm:right-7">
              <div className="border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-xl">
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Application
                </p>

                <p className="mt-1 text-[10px] font-black tracking-wider text-white">
                  {profile.applicationId}
                </p>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 bg-red-600 px-3 py-2 text-[9px] font-black uppercase tracking-[0.15em] shadow-[0_0_25px_rgba(220,38,38,0.3)]"
                >
                  <LuCheck size={13} />

                  {profile.selectionStatus === "wildcard"
                    ? "Wildcard"
                    : "Top 32"}
                </motion.div>
              )}
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 border border-red-600/30 bg-red-600/10 px-3 py-1.5">
                    <LuTrophy size={13} className="text-red-500" />

                    <span className="text-[9px] font-black uppercase tracking-widest text-red-400">
                      Rank #{profile.rank || "-"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                    <LuMapPin size={12} className="text-zinc-400" />

                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      {profile.city}, {profile.state}
                    </span>
                  </div>
                </div>

                <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl">
                  {profile.fullName}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span className="flex items-center gap-2">
                    <LuCalendarDays className="text-red-500" size={14} />
                    {profile.age || "-"} Years
                  </span>

                  <span className="h-1 w-1 rounded-full bg-zinc-700" />

                  <span className="text-zinc-500">THE BORDERBOUND</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-zinc-900">
            <div className="grid md:grid-cols-[1fr_300px]">
              {/* Left */}
              <div className="p-5 sm:p-8">
                {profile.bio && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <LuSparkles size={14} className="text-red-500" />

                      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500">
                        About The Contestant
                      </span>
                    </div>

                    <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                      {profile.bio}
                    </p>
                  </motion.div>
                )}

                {/* Social */}
                <div className="mt-8 border-t border-zinc-900 pt-6">
                  <p className="mb-4 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">
                    Connect
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {socialLinks.instagram && (
                      <SocialButton
                        href={socialLinks.instagram}
                        icon={<LuInstagram size={15} />}
                        label="Instagram"
                      />
                    )}

                    {socialLinks.facebook && (
                      <SocialButton
                        href={socialLinks.facebook}
                        icon={<LuFacebook size={15} />}
                        label="Facebook"
                      />
                    )}

                    {socialLinks.youtube && (
                      <SocialButton
                        href={socialLinks.youtube}
                        icon={<LuYoutube size={15} />}
                        label="YouTube"
                      />
                    )}

                    {socialLinks.twitter && (
                      <SocialButton
                        href={socialLinks.twitter}
                        icon={<LuGlobe size={15} />}
                        label="Twitter"
                      />
                    )}

                    {!socialLinks.instagram &&
                      !socialLinks.facebook &&
                      !socialLinks.youtube &&
                      !socialLinks.twitter && (
                        <span className="text-xs text-zinc-700">
                          No social profiles available.
                        </span>
                      )}
                  </div>
                </div>
              </div>

              {/* Right Stats */}
              <div className="border-t border-zinc-900 md:border-l md:border-t-0">
                <div className="p-5 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">
                      Current Votes
                    </span>

                    <LuVote size={15} className="text-red-500" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                      {Number(
                        profile.totalValidVotes || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                      Valid Votes
                    </p>
                  </motion.div>

                  <div className="my-7 h-px bg-zinc-900" />

                  {/* Share */}
                  <button
                    onClick={handleShare}
                    className="group mb-3 flex w-full items-center justify-center gap-2 border border-zinc-800 bg-zinc-950 px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <LuCheck size={15} className="text-green-500" />
                        Link Copied
                      </>
                    ) : (
                      <>
                        <LuShare2
                          size={15}
                          className="transition group-hover:rotate-12"
                        />
                        Share Profile
                      </>
                    )}
                  </button>

                  {/* Vote */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openVoteModal(profile)}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-red-600 px-4 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />

                    <LuVote size={18} />

                    <span>
                      Vote For{" "}
                      {profile.fullName?.split(" ")[0]?.toUpperCase()}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bottom Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center justify-between border-t border-zinc-900 pt-5"
        >
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-700">
            THE BORDERBOUND
          </p>

          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-800">
            15 DAYS • ONE BORDER • ONE WINNER
          </p>
        </motion.div>
      </div>
    </main>
  );
}

function SocialButton({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-[9px] font-black uppercase tracking-wider text-zinc-500 transition-all hover:border-red-600/50 hover:bg-red-600/5 hover:text-red-400"
    >
      {icon}

      {label}

      <LuExternalLink size={11} />
    </motion.a>
  );
}