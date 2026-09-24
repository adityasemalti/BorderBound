"use client";

import {
  Radio,
  IndianRupee,
  Trophy,
  Star,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function LiveTicker() {
  const tickerItems = [
    {
      text: "Public Voting Is LIVE Across India",
      icon: Radio,
      accent: "text-red-500",
    },
    {
      text: "₹5 = 1 Vote | Voting Options",
      icon: IndianRupee,
      accent: "text-amber-400",
    },
    {
      text: "Top 32 Qualified Directly For The Outdoor Competition",
      icon: Trophy,
      accent: "text-amber-400",
    },
    {
      text: "Top 50 Remain Eligible For 4 Wild Card Opportunities",
      icon: Star,
      accent: "text-red-400",
    },
    {
      text: "Anti-Fraud Automated Verification Enabled",
      icon: ShieldCheck,
      accent: "text-emerald-400",
    },
    {
      text: "Voting Closes 15 November",
      icon: Clock3,
      accent: "text-zinc-300",
    },
  ];

  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="relative z-50 w-full overflow-hidden border-y border-white/[0.07] bg-[#050506]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050506] to-transparent sm:w-24" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050506] to-transparent sm:w-24" />

      <div className="flex h-9 items-center overflow-hidden sm:h-10">
        <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={`${item.text}-${index}`}
                className="flex shrink-0 items-center"
              >
                <div className="flex items-center gap-2 px-5 sm:px-7">
                  <Icon
                    className={`h-3.5 w-3.5 ${item.accent} shrink-0`}
                    strokeWidth={2.5}
                  />

                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400 sm:text-[9px] sm:tracking-[0.2em]">
                    {item.text}
                  </span>
                </div>

                <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden bg-white/[0.03]">
        <div className="h-full w-1/4 animate-ticker-line bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes ticker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes tickerLine {
          from {
            transform: translateX(-120%);
          }

          to {
            transform: translateX(500%);
          }
        }

        .animate-ticker {
          animation: ticker 32s linear infinite;
          will-change: transform;
        }

        .animate-ticker-line {
          animation: tickerLine 5s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-ticker {
            animation-duration: 26s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-ticker,
          .animate-ticker-line {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}