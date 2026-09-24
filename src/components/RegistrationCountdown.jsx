"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegistrationCountdown() {
  const getTimeLeft = () => {
    const target = new Date("2026-10-05T00:00:00+05:30").getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    setIsOpen(true);

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft.expired) {
      setIsOpen(true);
    }
  }, [timeLeft.expired]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md sm:px-6"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.12] blur-[110px] sm:h-[550px] sm:w-[550px]" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-2xl overflow-hidden border border-white/[0.12] bg-[#080809] shadow-[0_25px_100px_rgba(0,0,0,0.7)]"
          >
            {/* Top red line */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            {/* Ambient glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-red-600/[0.08] blur-[70px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-amber-500/[0.05] blur-[80px]" />

            {/* Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-white/[0.1] bg-white/[0.04] text-zinc-400 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative px-5 pb-7 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
              {/* Header */}
              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center border border-red-500/25 bg-red-500/[0.07]">
                  {timeLeft.expired ? (
                    <Flame className="h-5 w-5 text-red-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-red-500" />
                  )}
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-7 bg-red-500/60" />

                  <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-red-400 sm:text-[9px]">
                    Official Announcement
                  </span>

                  <span className="h-px w-7 bg-red-500/60" />
                </div>

                {timeLeft.expired ? (
                  <>
                    <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                      Registrations
                      <br />
                      <span className="text-red-500">Are Open.</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-zinc-400 sm:text-sm">
                      The BorderBound journey starts now. Step forward and
                      enter the battlefield.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                      Registration
                      <br />
                      <span className="text-red-500">Begins Soon.</span>
                    </h2>

                    <p className="mt-4 text-xs text-zinc-400 sm:text-sm">
                      Registrations open on{" "}
                      <span className="font-bold text-zinc-200">
                        05 October 2026
                      </span>
                    </p>
                  </>
                )}
              </div>

              {!timeLeft.expired && (
                <>
                  {/* Countdown */}
                  <div className="mx-auto mt-8 grid max-w-xl grid-cols-4 gap-2 sm:mt-10 sm:gap-3">
                    {[
                      {
                        value: timeLeft.days,
                        label: "Days",
                      },
                      {
                        value: timeLeft.hours,
                        label: "Hours",
                      },
                      {
                        value: timeLeft.minutes,
                        label: "Minutes",
                      },
                      {
                        value: timeLeft.seconds,
                        label: "Seconds",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="relative overflow-hidden border border-white/[0.09] bg-white/[0.025] px-2 py-4 text-center sm:px-4 sm:py-5"
                      >
                        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

                        <div className="font-mono text-2xl font-black tracking-[-0.06em] text-white sm:text-4xl">
                          {String(item.value).padStart(2, "0")}
                        </div>

                        <div className="mt-1 text-[7px] font-bold uppercase tracking-[0.16em] text-zinc-500 sm:text-[8px]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom message */}
                  <div className="mt-7 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />

                    <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                      Your chance starts here
                    </span>
                  </div>
                </>
              )}

              {/* CTA */}
              {timeLeft.expired && (
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="group mx-auto mt-7 flex w-full max-w-sm items-center justify-between bg-red-600 px-5 py-4 text-[9px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)]"
                >
                  Enter The Battlefield

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              {/* Close text */}
              {!timeLeft.expired && (
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mx-auto mt-7 block text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:text-zinc-300"
                >
                  Continue to website
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}