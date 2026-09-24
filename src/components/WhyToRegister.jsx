"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const reveal = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function WhyToRegister() {
  const reasons = [
    {
      number: "02",
      title: "Be Seen",
      description:
        "Put your personality, skills and story in front of an audience.",
      icon: Users,
    },
    {
      number: "03",
      title: "Prove Yourself",
      description:
        "Strategy, leadership, pressure and performance will define your journey.",
      icon: Trophy,
    },
    {
      number: "04",
      title: "Build Your Story",
      description:
        "Every decision becomes part of a journey people can follow.",
      icon: ArrowRight,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={reveal}
      className="relative overflow-hidden border-b border-white/[0.07] bg-[#070708]"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.07] blur-[130px]" />

      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-red-600/[0.05] blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-500/[0.04] blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-500" />

            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.32em] text-red-400">
              <Flame className="h-3 w-3" />
              Your Moment
            </span>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-500" />
          </motion.div>

          <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Why Should
            <br />
            <span className="text-red-500">I Register?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
            Because BorderBound is not just another competition.
            <span className="text-zinc-200">
              {" "}
              It is your chance to be seen, tested, and remembered.
            </span>
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto mt-12 max-w-6xl sm:mt-16">
          <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
            {/* BIG FEATURE CARD */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-red-500/[0.10] via-white/[0.025] to-transparent p-7 sm:p-10"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/[0.13] blur-[90px] transition-all duration-700 group-hover:bg-red-600/[0.22]" />

              {/* Animated Top Border */}
              <div className="absolute left-0 top-0 h-px w-1/2 bg-gradient-to-r from-red-500 via-red-400 to-transparent transition-all duration-700 group-hover:w-full" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.08] text-red-400">
                      <Zap className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-600">
                      01 / 04
                    </span>
                  </div>

                  <h3 className="mt-10 max-w-lg text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                    Get Your
                    <br />
                    <span className="text-red-500">Shot.</span>
                  </h3>

                  <p className="mt-5 max-w-md text-xs leading-6 text-zinc-400 sm:text-sm sm:leading-7">
                    You cannot make it through the border if you never step
                    forward. Registration puts your name into the selection
                    process and gives you a real shot at entering the
                    competition.
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />

                  <span className="text-[8px] font-black uppercase tracking-[0.24em] text-zinc-500">
                    Opportunity does not wait
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {reasons.map(
                ({ number, title, description, icon: Icon }, index) => (
                  <motion.div
                    key={number}
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 5 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors duration-300 hover:border-red-500/25 hover:bg-white/[0.04]"
                  >
                    {/* Glow */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-600/[0.06] blur-3xl transition-all duration-500 group-hover:bg-red-600/[0.14]" />

                    <div className="relative flex items-start gap-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:border-red-500/40 group-hover:bg-red-500/[0.1] group-hover:text-red-300">
                        <Icon
                          className="h-[18px] w-[18px]"
                          strokeWidth={1.7}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">
                            {title}
                          </h3>

                          <span className="font-mono text-[8px] tracking-[0.2em] text-zinc-600">
                            {number}
                          </span>
                        </div>

                        <p className="mt-2 text-[11px] leading-5 text-zinc-400 sm:text-xs sm:leading-6">
                          {description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Line */}
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-500 group-hover:w-full" />
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Bottom Statement */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mt-3 overflow-hidden rounded-2xl border border-red-500/15 bg-red-500/[0.035] px-6 py-6 sm:px-8"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-72 -translate-x-1/2 rounded-full bg-red-500/[0.08] blur-3xl" />

            <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
              <div>
                <div className="text-[8px] font-black uppercase tracking-[0.28em] text-red-400">
                  One Decision
                </div>

                <div className="mt-2 text-lg font-black uppercase tracking-[-0.02em] text-white sm:text-xl">
                  You either enter the story —
                  <span className="text-red-500">
                    {" "}
                    or watch it happen.
                  </span>
                </div>
              </div>

              <Link
                href="/register"
                className="group flex shrink-0 items-center gap-3 border border-red-500/30 bg-red-600 px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_35px_rgba(220,38,38,0.25)]"
              >
                Register Now

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}