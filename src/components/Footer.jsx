import Link from "next/link";
import {
  ArrowUpRight,
  Flame,
  ShieldCheck,
  Trophy,
  Users,
  Vote,
} from "lucide-react";

export default function Footer() {
  const timeline = [
    {
      date: "05 OCT",
      title: "Registration Opens",
      active: true,
    },
    {
      date: "15 OCT",
      title: "Public Voting Opens",
      active: false,
    },
    {
      date: "20 OCT",
      title: "Fee Changes",
      active: false,
      detail: "₹499 → ₹1,499",
    },
    {
      date: "05 NOV",
      title: "Registration Closes",
      active: false,
    },
    {
      date: "15 NOV",
      title: "Voting Closes",
      active: false,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#030303] text-zinc-400">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/[0.035] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* Timeline */}
        <div className="border-b border-white/[0.07] py-14 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-red-500" />

                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-400">
                  Official Protocol
                </span>
              </div>

              <h2 className="text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
                BorderBound Timeline
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-400 sm:text-sm">
                India chooses who gets the opportunity. The BorderBound
                decides who survives it.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-full border border-red-500/15 bg-red-500/[0.04] px-4 py-2.5 lg:self-auto">
              <Users className="h-4 w-4 text-red-400" />

              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-300 sm:text-[10px]">
                32 Initial + 04 Wild Cards
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-10 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5">
            {timeline.map((item, index) => (
              <div
                key={item.date}
                className="group relative flex gap-4 border-b border-white/[0.07] py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0 lg:border-r lg:border-white/[0.07] lg:py-2 lg:first:pl-0 lg:last:border-r-0"
              >
                {/* Connector */}
                {index < timeline.length - 1 && (
                  <div className="absolute bottom-0 left-[7px] top-[42px] hidden w-px bg-white/[0.07] sm:block lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:h-px lg:w-8" />
                )}

                <div className="relative z-10 mt-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-[#030303]">
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                </div>

                <div>
                  <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-red-400">
                    {item.date}
                  </div>

                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.04em] text-zinc-200">
                    {item.title}
                  </div>

                  {item.detail && (
                    <div className="mt-1 text-[10px] text-zinc-500">
                      {item.detail}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.5fr_0.7fr_0.9fr] lg:gap-20">

          {/* Brand */}
          <div>
            <Link
              href="/home"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06] transition-colors group-hover:border-red-500/40 group-hover:bg-red-500/[0.1]">
                <Flame className="h-5 w-5 text-red-500" />
              </div>

              <div>
                <div className="text-lg font-black tracking-[0.12em] text-white">
                  BORDERBOUND
                </div>

                <div className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.35em] text-zinc-500">
                  15-Day Reality Competition
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-xs leading-6 text-zinc-400 sm:text-sm">
              A real-time outdoor reality competition where registration,
              public voting, strategy and performance decide who gets to
              cross the border.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
                <Users className="h-3.5 w-3.5 text-red-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                  32 Contestants
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
                <Vote className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                  ₹5 / Vote
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Navigate
            </div>

            <div className="space-y-3">
              {[
                ["Home", "/home"],
                ["Leaderboard", "/leaderboard"],
                ["Register", "/register"],
                ["Support a Contestant", "/register/supporting"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between text-xs font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  <span>{label}</span>

                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Trust & Verification
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                <div>
                  <div className="text-xs font-bold text-zinc-200">
                    Secure Payments
                  </div>
                  <div className="mt-1 text-[10px] leading-4 text-zinc-500">
                    Payments processed through a secure gateway.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Vote className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

                <div>
                  <div className="text-xs font-bold text-zinc-200">
                    Verified Voting
                  </div>
                  <div className="mt-1 text-[10px] leading-4 text-zinc-500">
                    Only valid successfully processed votes count.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

                <div>
                  <div className="text-xs font-bold text-zinc-200">
                    Public Leaderboard
                  </div>
                  <div className="mt-1 text-[10px] leading-4 text-zinc-500">
                    Voting positions remain publicly visible.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[9px] uppercase tracking-[0.15em] text-zinc-600">
            © {new Date().getFullYear()} The BorderBound. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-red-500" />

            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-zinc-500">
              Official Registration & Voting Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}