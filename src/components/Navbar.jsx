
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Vote,
  User,
  LogOut,
  Shield,
  Sparkles,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useConfigStore } from "@/store/configStore";

export default function Navbar() {
  const { user, checkAuth, openAuthModal, logout } = useAuthStore();
  const { configData, fetchPublicConfig } = useConfigStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchPublicConfig();
  }, [checkAuth, fetchPublicConfig]);

  const regAmount = configData?.registration?.amount || 499;
  const isRegClosed = configData?.registration?.isClosed;

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.28,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -12,
      scale: 0.97,
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#050506]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-[68px] w-full max-w-[1500px] items-center justify-between px-4 sm:px-8 lg:px-12">

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-9 w-9 items-center justify-center border border-red-500/30 bg-red-500/[0.06]">
            <div className="absolute inset-0 bg-red-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

            <Flame className="relative h-4 w-4 text-red-500 transition-colors duration-300 group-hover:text-amber-400" />
          </div>

          <div className="hidden flex-col sm:flex">
            <span className="text-[17px] font-black tracking-[-0.03em] text-white">
              BORDER<span className="text-red-500">BOUND</span>
            </span>

            <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-zinc-600">
              Official Reality Competition
            </span>
          </div>

          <span className="text-[15px] font-black tracking-[-0.03em] text-white sm:hidden">
            BORDER<span className="text-red-500">BOUND</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          

          <Link
            href="/leaderboard"
            className="group flex items-center gap-2 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
          >
            <Vote className="h-3.5 w-3.5 text-red-500 transition-transform group-hover:scale-110" />
            Live Leaderboard
          </Link>

         {user ? (
  <Link
    href="/register"
    className="group flex items-center gap-2 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
  >
    <Sparkles className="h-3.5 w-3.5 text-amber-400 transition-transform group-hover:rotate-12" />
    Register as Contestant
  </Link>
) : (
  <Link
    href="/register"
    className="group flex items-center gap-2 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
  >
    <Sparkles className="h-3.5 w-3.5 text-amber-400 transition-transform group-hover:rotate-12" />
    Register
  </Link>
)}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-2 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400 transition-colors hover:text-cyan-300"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">

          {!isRegClosed && (
            <div className="hidden items-center gap-2 border border-red-500/15 bg-red-500/[0.05] px-3 py-2 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Reg Fee
              </span>

              <span className="text-xs font-black text-amber-400">
                ₹{regAmount}
              </span>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 border border-white/[0.08] bg-white/[0.025] px-3 py-2 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex h-6 w-6 items-center justify-center bg-zinc-800">
                  <User className="h-3 w-3 text-zinc-400 group-hover:text-amber-400" />
                </div>

                <span className="hidden text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-300 sm:block">
                  {user.fullName?.split(" ")[0]}
                </span>

                <ArrowUpRight className="hidden h-3 w-3 text-zinc-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
              </Link>

              <button
                onClick={logout}
                title="Logout"
                className="flex h-9 w-9 items-center justify-center border border-white/[0.07] bg-white/[0.02] text-zinc-600 transition-all hover:border-red-500/20 hover:bg-red-500/[0.06] hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <button
                onClick={() => openAuthModal("login")}
                className="px-2 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-white"
              >
                Sign In
              </button>

              <button
                onClick={() => openAuthModal("register")}
                className="group flex items-center gap-2 bg-red-600 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
              >
                Create Account
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative flex h-9 w-9 items-center justify-center border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition-colors hover:border-red-500/30 hover:bg-red-500/[0.05] hover:text-white md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <Menu className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-t border-white/[0.07] bg-[#050506]/98 backdrop-blur-2xl md:hidden"
          >
            <motion.div className="space-y-2 px-4 py-4">

              <motion.div variants={itemVariants}>
                <Link
                  href="/home"
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between border border-white/[0.06] bg-white/[0.015] px-4 py-4 transition-all duration-300 hover:border-red-500/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-white/[0.07] bg-white/[0.025] transition-colors group-hover:border-red-500/20 group-hover:bg-red-500/[0.05]">
                      <Flame className="h-3.5 w-3.5 text-zinc-500 group-hover:text-red-500" />
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">
                      Home
                    </span>
                  </div>

                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-500" />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/leaderboard"
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between border border-white/[0.06] bg-white/[0.015] px-4 py-4 transition-all duration-300 hover:border-red-500/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-red-500/15 bg-red-500/[0.05]">
                      <Vote className="h-3.5 w-3.5 text-red-500" />
                    </div>

                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">
                        Live Leaderboard
                      </span>

                      <span className="mt-1 block text-[7px] uppercase tracking-[0.15em] text-zinc-700">
                        Track The Battle
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-500" />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="group relative flex items-center justify-between overflow-hidden border border-red-500/25 bg-red-600 px-4 py-4 transition-all duration-300 hover:bg-red-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/10">
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    </div>

                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-white">
                        Register Contestant
                      </span>

                      <span className="mt-1 block text-[7px] uppercase tracking-[0.15em] text-white/50">
                        Enter The Border
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="relative h-4 w-4 text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              {user?.role === "admin" && (
                <motion.div variants={itemVariants}>
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between border border-cyan-500/10 bg-cyan-500/[0.02] px-4 py-4 transition-all duration-300 hover:bg-cyan-500/[0.05]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center border border-cyan-500/15 bg-cyan-500/[0.05]">
                        <Shield className="h-3.5 w-3.5 text-cyan-400" />
                      </div>

                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                        Admin Portal
                      </span>
                    </div>

                    <ArrowUpRight className="h-3.5 w-3.5 text-cyan-500/50 group-hover:text-cyan-400" />
                  </Link>
                </motion.div>
              )}

              {!user && (
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-2 pt-1"
                >
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openAuthModal("login");
                    }}
                    className="border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openAuthModal("register");
                    }}
                    className="bg-red-600 px-4 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-500"
                  >
                    Create Account
                  </button>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-2 pt-2"
              >
                <span className="h-px w-8 bg-zinc-800" />
                <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-zinc-700">
                  The Borderbound
                </span>
                <span className="h-px w-8 bg-zinc-800" />
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
