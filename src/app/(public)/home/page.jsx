"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLeaderboardStore } from "@/store/leaderboardStore";
import ContestantCard from "@/components/ContestantCard";
import {
  ArrowDownRight,
  ArrowRight,
  Flame,
  MoveUpRight,
  Play,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Vote,
  Zap,
} from "lucide-react";
import HeroCarousel from "./home-comp/Carousel";

const reveal = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Page() {
  const { leaderboard, fetchLeaderboard } = useLeaderboardStore();
  const [calcVotes, setCalcVotes] = useState(100);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const top3 = leaderboard.slice(0, 3);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#050506] text-white">
      <HeroCarousel />
      <section className="relative min-h-[calc(100svh-70px)] overflow-hidden border-b border-white/[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(220,38,38,0.12),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(245,158,11,0.08),transparent_24%),linear-gradient(180deg,#080809_0%,#050506_100%)]" />

        <div className="absolute left-[20%] top-[30%] h-[300px] w-[300px] rounded-full bg-red-700/[0.07] blur-[110px] sm:h-[500px] sm:w-[500px] sm:blur-[150px]" />

        <div className="absolute -right-24 top-32 h-[250px] w-[250px] rounded-full bg-amber-500/[0.04] blur-[100px] sm:h-[400px] sm:w-[400px] sm:blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:50px_50px] sm:[background-size:80px_80px]" />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-red-500 to-transparent"
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-70px)] w-full max-w-[1500px] items-center px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative min-w-0"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center border border-red-500/30 bg-red-500/10">
                  <Flame className="h-3.5 w-3.5 text-red-500" />
                </span>

                <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-500 sm:text-[9px] sm:tracking-[0.3em]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  Registration Open
                </div>
              </div>

              <h1 className="max-w-3xl text-[clamp(3rem,8vw,7rem)] font-black leading-[0.82] tracking-[-0.07em]">
                <span className="block text-white">CROSS</span>

                <span className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                  THE
                </span>

                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
                  BORDER.
                </span>
              </h1>

              <div className="mt-6 max-w-lg border-l border-red-500/40 pl-4 sm:mt-7 sm:pl-5">
                <p className="text-xs leading-6 text-zinc-400 sm:text-sm sm:leading-7">
                  32 contestants. One battlefield. Every decision matters. The
                  public decides who gets through the border.
                </p>
              </div>

              {/* REGISTER AS */}
              <div className="mt-8 sm:mt-10">
                <div className="mb-3 text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-600 sm:text-[9px]">
                  Register As
                </div>

                <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
                  <Link
                    href="/register"
                    className="group relative flex min-h-[64px] items-center justify-between overflow-hidden border border-red-500/30 bg-red-600 px-5 text-left transition-all duration-300 hover:border-red-400 hover:bg-red-500 hover:shadow-[0_0_45px_rgba(220,38,38,0.22)] sm:min-h-[72px] sm:px-6"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white sm:text-xs">
                        Contestant
                      </div>

                      <div className="mt-1 text-[8px] uppercase tracking-[0.1em] text-white/50">
                        Enter the battlefield
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                  </Link>

                  <Link
                    href="/register/supporting"
                    className="group flex min-h-[64px] items-center justify-between border border-white/10 bg-white/[0.025] px-5 text-left backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:min-h-[72px] sm:px-6"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white sm:text-xs">
                        Supporting Contestant
                      </div>

                      <div className="mt-1 text-[8px] uppercase tracking-[0.1em] text-zinc-600">
                        Back someone in the game
                      </div>
                    </div>

                    <MoveUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white sm:h-5 sm:w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - CURRENT STATUS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative mx-auto w-full max-w-[430px]"
            >
              <div className="absolute -inset-6 rounded-full bg-red-600/[0.07] blur-[70px]" />

              <div className="relative overflow-hidden border border-white/[0.10] bg-[#0a0a0c]/90 shadow-2xl backdrop-blur-2xl">
                {/* TOP STATUS */}
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.28em] text-zinc-600">
                      Current Status
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
                      Live
                    </div>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center border border-white/[0.06] bg-white/[0.025]">
                    <Shield className="h-4 w-4 text-zinc-600" />
                  </div>
                </div>

                {/* MAIN NUMBER */}
                <div className="relative px-5 py-9 text-center sm:px-6 sm:py-12">
                  <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.06] blur-[55px]" />

                  <div className="relative">
                    <div className="text-[8px] font-bold uppercase tracking-[0.35em] text-zinc-600 sm:text-[9px]">
                      Contestants Entering
                    </div>

                    <div className="mt-1 text-[5.5rem] font-black leading-none tracking-[-0.09em] text-white sm:text-[7rem]">
                      32
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span className="h-px w-6 bg-red-500/40" />

                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-400 sm:text-[10px]">
                        Contestants
                      </span>

                      <span className="h-px w-6 bg-red-500/40" />
                    </div>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 border-t border-white/[0.07]">
                  <div className="border-r border-white/[0.07] px-5 py-5 text-center">
                    <div className="text-2xl font-black tracking-tight text-amber-400">
                      04
                    </div>

                    <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                      Gang Leaders
                    </div>
                  </div>

                  <div className="px-5 py-5 text-center">
                    <div className="text-2xl font-black tracking-tight text-white">
                      ₹5
                    </div>

                    <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                      Per Vote
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="m-4 flex items-center justify-between border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                  <div>
                    <div className="text-[7px] uppercase tracking-[0.25em] text-zinc-700">
                      Selection System
                    </div>

                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                      Public Voting
                    </div>
                  </div>

                  <div className="flex h-7 w-7 items-center justify-center border border-red-500/20 bg-red-500/[0.05]">
                    <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-zinc-700 sm:flex">
          <span className="h-px w-10 bg-zinc-800" />
          Scroll To Explore
          <span className="h-px w-10 bg-zinc-800" />
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        className="border-b border-white/[0.07]"
      >
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "32", "Direct Qualifiers"],
            ["02", "04", "Wild Card Slots"],
            ["03", "₹5", "One Valid Vote"],
            ["04", "100%", "Verified Voting"],
          ].map(([number, value, label], index) => (
            <div
              key={number}
              className={`relative min-w-0 p-4 sm:p-8 ${
                index % 2 === 0
                  ? "border-r border-white/[0.07]"
                  : "border-r border-white/[0.07] lg:border-r"
              } ${index > 1 ? "border-t border-white/[0.07] lg:border-t-0" : ""}`}
            >
              <span className="absolute right-3 top-3 text-[8px] font-mono text-zinc-800 sm:right-5 sm:top-5 sm:text-[9px]">
                {number}
              </span>

              <div className="text-2xl font-black tracking-tight text-white sm:text-4xl">
                {value}
              </div>

              <div className="mt-1 max-w-[110px] text-[8px] font-bold uppercase leading-4 tracking-[0.14em] text-zinc-600 sm:mt-2 sm:max-w-none sm:text-[9px] sm:tracking-[0.2em]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {top3.length > 0 && (
        <section className="relative py-16 sm:py-24 lg:py-32">
          <div className="absolute left-1/2 top-1/2 h-[280px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/[0.045] blur-[100px] sm:h-[400px] sm:w-[600px] sm:blur-[140px]" />

          <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-8 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={reveal}
              className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end"
            >
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-red-400 sm:text-[10px] sm:tracking-[0.3em]">
                  <Trophy className="h-4 w-4" />
                  Live Standings
                </div>

                <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-6xl">
                  WHO'S
                  <span className="ml-2 text-zinc-700 sm:ml-3">LEADING?</span>
                </h2>
              </div>

              <Link
                href="/leaderboard"
                className="group flex w-fit items-center gap-2 border-b border-red-500/40 pb-2 text-[9px] font-bold uppercase tracking-[0.17em] text-red-400 sm:text-[10px] sm:tracking-[0.2em]"
              >
                Full Leaderboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <div className="grid min-w-0 gap-4 md:grid-cols-3 md:gap-5">
              {top3.map((contestant, index) => (
                <motion.div
                  key={contestant.id || contestant._id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                  whileHover={{ y: -6 }}
                  className="min-w-0"
                >
                  <ContestantCard contestant={contestant} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative border-y border-white/[0.07] bg-[#080809] py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(245,158,11,0.07),transparent_25%),radial-gradient(circle_at_20%_50%,rgba(220,38,38,0.06),transparent_25%)]" />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="mb-10 max-w-2xl sm:mb-14"
          >
            <div className="mb-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400 sm:text-[10px] sm:tracking-[0.3em]">
              <Zap className="h-4 w-4" />
              Public Power
            </div>

            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-6xl">
              YOUR VOTE
              <br />
              <span className="text-red-500">CHANGES EVERYTHING.</span>
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-zinc-500 sm:mt-5 sm:text-sm sm:leading-7">
              Choose your firepower. Every ₹5 adds one valid vote to the
              contestant you believe belongs inside The Borderbound.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full min-w-0 border border-white/[0.08] bg-black/60"
          >
            <div className="grid min-w-0 lg:grid-cols-[1fr_0.8fr]">
              <div className="min-w-0 p-5 sm:p-10 lg:border-r lg:border-white/[0.08]">
                <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
                  <div className="min-w-0">
                    <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:text-[9px] sm:tracking-[0.25em]">
                      Selected Firepower
                    </div>

                    <div className="mt-2 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
                      {calcVotes}
                    </div>
                  </div>

                  <div className="shrink-0 pb-1 text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-400 sm:text-xs">
                      Votes
                    </div>

                    <div className="mt-1 text-[10px] text-zinc-600 sm:text-xs">
                      ₹{calcVotes * 5} INR
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={calcVotes}
                  onChange={(e) => setCalcVotes(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-none bg-zinc-800 accent-red-500"
                />

                <div className="mt-5 grid grid-cols-4 gap-1.5 sm:gap-2">
                  {[10, 50, 100, 1000].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCalcVotes(num)}
                      className={`min-w-0 border px-1 py-3 text-[8px] font-bold uppercase tracking-wider transition-all sm:px-2 sm:text-[9px] ${
                        calcVotes === num
                          ? "border-red-500 bg-red-500/10 text-white"
                          : "border-white/[0.07] bg-white/[0.02] text-zinc-600 hover:border-white/20 hover:text-zinc-300"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between border-t border-white/[0.08] p-5 sm:p-10 lg:border-t-0">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center border border-red-500/20 bg-red-500/10">
                    <Vote className="h-5 w-5 text-red-500" />
                  </div>

                  <h3 className="mt-6 text-xl font-black uppercase tracking-tight sm:mt-7 sm:text-2xl">
                    Ready To
                    <br />
                    Make A Move?
                  </h3>
                </div>

                <Link
                  href="/leaderboard"
                  className="group mt-9 flex min-h-[50px] items-center justify-between border border-red-500/30 bg-red-600 px-4 py-4 text-[9px] font-black uppercase tracking-[0.16em] transition-all hover:bg-red-500 hover:shadow-[0_0_35px_rgba(220,38,38,0.2)] sm:mt-12 sm:px-5 sm:text-[10px] sm:tracking-[0.2em]"
                >
                  Cast Your Votes
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="mb-10 sm:mb-16"
          >
            <div className="mb-4 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-600 sm:text-[10px] sm:tracking-[0.3em]">
              The Selection Protocol
            </div>

            <h2 className="text-3xl font-black tracking-[-0.05em] sm:text-6xl">
              THREE STEPS.
              <br />
              <span className="text-zinc-700">ONE BORDER.</span>
            </h2>
          </motion.div>

          <div className="grid border-l border-white/[0.08] md:grid-cols-3">
            {[
              {
                number: "01",
                icon: Users,
                title: "ENTER",
                text: "Create your contestant profile, verify your identity and complete the registration process.",
              },
              {
                number: "02",
                icon: Vote,
                title: "FIGHT",
                text: "Public voting opens. Every verified vote pushes contestants closer to the selection line.",
              },
              {
                number: "03",
                icon: Trophy,
                title: "CROSS",
                text: "The top 32 qualify directly. Four additional contestants enter through the Wild Card route.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="group relative min-w-0 border-b border-r border-t border-white/[0.08] p-5 transition-colors hover:bg-white/[0.025] sm:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black tracking-[0.2em] text-red-500">
                      {item.number}
                    </span>

                    <Icon className="h-5 w-5 text-zinc-700 transition-colors group-hover:text-red-500" />
                  </div>

                  <h3 className="mt-14 text-2xl font-black tracking-tight sm:mt-20 sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-xs leading-6 text-zinc-600 sm:mt-4 sm:text-sm sm:leading-7">
                    {item.text}
                  </p>

                  <div className="mt-8 h-px w-10 bg-red-500/50 transition-all duration-500 group-hover:w-24 sm:mt-10 sm:w-12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.07] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.12),transparent_40%)]" />

        <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-red-500/20 bg-red-500/10 sm:h-14 sm:w-14">
              <Play className="ml-0.5 h-4 w-4 fill-red-500 text-red-500 sm:h-5 sm:w-5" />
            </div>

            <div className="mt-6 text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-600 sm:mt-7 sm:text-[10px] sm:tracking-[0.4em]">
              The Borderbound
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:mt-4 sm:text-7xl">
              CROSS THE
              <br />
              <span className="text-red-500">LINE.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-zinc-500 sm:mt-6 sm:text-sm sm:leading-7">
              Thousands may enter. Only the strongest stories make it through.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex min-h-[50px] items-center gap-3 bg-white px-6 py-4 text-[9px] font-black uppercase tracking-[0.17em] text-black transition-all hover:bg-zinc-200 sm:mt-9 sm:px-8 sm:text-[10px] sm:tracking-[0.2em]"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
