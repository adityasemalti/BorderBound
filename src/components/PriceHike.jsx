"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Flame,
  ShieldCheck,
  TrendingUp,
  Zap,
  Users,
  ArrowDown
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

export default function PriceHike() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={reveal}
      className="relative overflow-hidden border-b border-white/[0.07] bg-[#080809]"
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.07] blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-red-500/[0.06] blur-[110px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-amber-500/[0.04] blur-[110px]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-500" />

            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-red-400">
              <TrendingUp className="h-3.5 w-3.5" />
              Registration Pricing
            </span>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-500" />
          </motion.div>

          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Register Early.
            <br />
            <span className="text-red-500">Save More.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
            The registration fee increases as the competition moves closer.
            <span className="text-zinc-200">
              {" "}
              Lock your entry before the price goes up.
            </span>
          </p>
        </div>

        {/* PRICE COMPARISON */}
        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
            {/* EARLY PRICE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-red-500/30 bg-red-500/[0.06] p-7 sm:p-9"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-600/[0.12] blur-[80px] transition-all duration-700 group-hover:bg-red-600/[0.2]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.08] text-red-400">
                      <Zap className="h-4 w-4" />
                    </div>

                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-400">
                      Early Registration
                    </span>
                  </div>

                  <span className="rounded-full border border-red-500/20 bg-red-500/[0.06] px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.15em] text-red-400">
                    Best Window
                  </span>
                </div>

                <div className="mt-9">
                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-black tracking-[-0.08em] text-white sm:text-7xl">
                      ₹499
                    </span>

                    <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                      Registration
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400">
                    <CalendarDays className="h-3.5 w-3.5 text-red-400" />
                    05 October — 19 October
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-5">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-300">
                    <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
                    Secure your registration early
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PRICE ARROW */}
            <div className="flex items-center justify-center py-1 md:px-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/[0.06]"
              >
                <div className="absolute inset-0 animate-ping rounded-full border border-red-500/20" />

                <ArrowRight className="hidden sm:block relative h-5 w-5 text-red-500 md:rotate-0" />
                <ArrowDown className="sm:hidden relative h-5 w-5 text-red-500 md:rotate-0" />
              </motion.div>
            </div>

            {/* LATE PRICE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.025] p-7 sm:p-9"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/[0.03] blur-[80px]" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-zinc-400">
                    <Clock3 className="h-4 w-4" />
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    After Price Hike
                  </span>
                </div>

                <div className="mt-9">
                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-black tracking-[-0.08em] text-zinc-300 sm:text-7xl">
                      ₹1,499
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    20 October — 05 November
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-5">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                    ₹1,000 more after the hike
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* PRICE HIKE ALERT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-3 overflow-hidden rounded-2xl border border-red-500/25 bg-red-500/[0.055] px-5 py-6 sm:px-8"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-96 -translate-x-1/2 rounded-full bg-red-600/[0.1] blur-[60px]" />

            <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/[0.08]">
                  <Flame className="h-5 w-5 animate-pulse text-red-500" />
                </div>

                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.25em] text-red-400">
                    Price Increase Alert
                  </div>

                  <div className="mt-1 text-lg font-black uppercase tracking-[-0.02em] text-white sm:text-xl">
                    Don&apos;t wait for the{" "}
                    <span className="text-red-500">price hike.</span>
                  </div>
                </div>
              </div>

              <Link
                href="/register"
                className="group flex shrink-0 items-center gap-3 bg-red-600 px-6 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
              >
                Register Early

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* WHY PRICE HIKE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          <div className="mb-8 text-center">
            <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Why does the price increase?
            </div>

            <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
              More Than Just a <span className="text-red-500">Deadline.</span>
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Selection Progress",
                description:
                  "As registration progresses, the competition moves closer to the selection and screening stages.",
                icon: TrendingUp,
              },
              {
                number: "02",
                title: "Growing Competition",
                description:
                  "More participants enter as the deadline approaches, increasing the scale of the selection process.",
                icon: Users,
              },
              {
                number: "03",
                title: "Limited Window",
                description:
                  "The early registration window is designed to give participants an advantage before the fee increases.",
                icon: Clock3,
              },
            ].map(({ number, title, description, icon: Icon }, index) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-300 hover:border-red-500/25 hover:bg-white/[0.04]"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-600/[0.05] blur-2xl transition-all duration-500 group-hover:bg-red-600/[0.12]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06] text-red-400">
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="font-mono text-[8px] tracking-[0.2em] text-zinc-600">
                      {number}
                    </span>
                  </div>

                  <h4 className="mt-7 text-sm font-black uppercase tracking-[0.08em] text-white">
                    {title}
                  </h4>

                  <p className="mt-3 text-[11px] leading-5 text-zinc-400 sm:text-xs sm:leading-6">
                    {description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FINAL MESSAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 max-w-3xl text-center sm:mt-12"
        >
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">
            05 October — 19 October
          </p>

          <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-white sm:text-3xl">
            Pay <span className="text-red-500">₹499</span> now.
            <br />
            Don&apos;t pay <span className="text-zinc-500">₹1,499</span> later.
          </h3>

          <p className="mt-4 text-xs text-zinc-500">
            The early registration window is limited.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}