
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  Fingerprint,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authMode,
    closeAuthModal,
    setAuthMode,
    login,
    register,
    verifyOtp,
    loading,
    error,
  } = useAuthStore();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [regData, setRegData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    dob: "2000-01-01",
    gender: "male",
    city: "",
    state: "",
    password: "",
  });

  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    if (!isAuthModalOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") closeAuthModal();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);
    } catch (err) {}
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(regData);
    } catch (err) {}
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyOtp(otpCode);
    } catch (err) {}
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(value);
  };

  const modeMeta = {
    login: {
      eyebrow: "WELCOME BACK",
      title: "Continue your journey.",
      description: "Sign in to access your BorderBound contestant account.",
      icon: Lock,
    },
    register: {
      eyebrow: "START YOUR JOURNEY",
      title: "Make your entry count.",
      description:
        "Create your contestant account and take the first step towards BorderBound.",
      icon: User,
    },
    otp: {
      eyebrow: "SECURITY CHECK",
      title: "Verify your number.",
      description:
        "One final check before we create your contestant account.",
      icon: ShieldCheck,
    },
  };

  const current = modeMeta[authMode];
  const CurrentIcon = current.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-xl"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeAuthModal();
        }}
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full bg-rose-600/[0.07] blur-[110px]"
          />

          <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-orange-500/[0.04] blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 25,
            scale: 0.98,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative w-full sm:max-w-md max-h-[94vh] sm:max-h-[90vh] flex flex-col"
        >
          <div className="relative overflow-hidden rounded-t-[30px] sm:rounded-[30px] border border-white/10 bg-[#0a0a0a] shadow-[0_-20px_80px_rgba(0,0,0,0.5)] sm:shadow-2xl">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/70 to-transparent" />

            {/* Close */}
            <button
              type="button"
              onClick={closeAuthModal}
              className="absolute z-20 top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-xl border border-white/8 bg-white/[0.04] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] transition-all active:scale-95"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="px-5 pt-6 pb-5 sm:px-7 sm:pt-7 sm:pb-6">
              <div className="flex items-start gap-3 pr-10">
                <motion.div
                  key={authMode}
                  initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-rose-500/15 to-orange-500/10 border border-rose-500/15 flex items-center justify-center flex-shrink-0"
                >
                  <CurrentIcon className="w-5 h-5 text-rose-400" />
                </motion.div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-rose-400 font-bold">
                    {current.eyebrow}
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={authMode}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 leading-tight"
                    >
                      {current.title}
                    </motion.h2>
                  </AnimatePresence>

                  <p className="text-[11px] sm:text-xs leading-5 text-zinc-600 mt-1.5">
                    {current.description}
                  </p>
                </div>
              </div>

              {/* Mode switch */}
              {authMode !== "otp" && (
                <div className="flex mt-6 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <ModeButton
                    active={authMode === "login"}
                    onClick={() => setAuthMode("login")}
                  >
                    Sign In
                  </ModeButton>

                  <ModeButton
                    active={authMode === "register"}
                    onClick={() => setAuthMode("register")}
                  >
                    Register
                  </ModeButton>
                </div>
              )}
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -5 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -5 }}
                  className="px-5 sm:px-7 overflow-hidden"
                >
                  <div className="flex gap-3 p-3.5 rounded-2xl bg-rose-500/[0.07] border border-rose-500/15 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-rose-300">
                        Unable to continue
                      </p>

                      <p className="text-[10px] text-rose-300/60 leading-4 mt-0.5 break-words">
                        {error}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Body */}
            <div className="px-5 sm:px-7 pb-6 overflow-y-auto max-h-[64vh] sm:max-h-[58vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                {/* LOGIN */}
                {authMode === "login" && (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    onSubmit={handleLoginSubmit}
                    className="space-y-4"
                  >
                    <AuthInput
                      label="Email Address"
                      icon={Mail}
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                    />

                    <AuthInput
                      label="Password"
                      icon={Lock}
                      type="password"
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative overflow-hidden w-full h-14 rounded-2xl bg-white text-black font-black text-sm flex items-center justify-center gap-3 transition-all hover:bg-zinc-200 active:scale-[0.985] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <LoadingSpinner text="Signing you in..." />
                      ) : (
                        <>
                          Enter BorderBound
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <SecurityNote text="Your account is protected by secure authentication." />
                  </motion.form>
                )}

                {/* REGISTER */}
                {authMode === "register" && (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    onSubmit={handleRegisterSubmit}
                    className="space-y-4"
                  >
                    <AuthInput
                      label="Full Name"
                      icon={User}
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      value={regData.fullName}
                      onChange={(e) =>
                        setRegData({
                          ...regData,
                          fullName: e.target.value,
                        })
                      }
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AuthInput
                        label="Mobile Number"
                        icon={Phone}
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="numeric"
                        placeholder="9876543210"
                        value={regData.mobile}
                        onChange={(e) =>
                          setRegData({
                            ...regData,
                            mobile: e.target.value,
                          })
                        }
                      />

                      <AuthInput
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        value={regData.email}
                        onChange={(e) =>
                          setRegData({
                            ...regData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AuthInput
                        label="Date of Birth"
                        icon={CalendarDays}
                        type="date"
                        required
                        value={regData.dob}
                        onChange={(e) =>
                          setRegData({
                            ...regData,
                            dob: e.target.value,
                          })
                        }
                      />

                      <div>
                        <label className="block text-[9px] uppercase tracking-[0.15em] font-bold text-zinc-500 mb-2">
                          Gender
                        </label>

                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />

                          <select
                            value={regData.gender}
                            onChange={(e) =>
                              setRegData({
                                ...regData,
                                gender: e.target.value,
                              })
                            }
                            className={selectClass()}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AuthInput
                        label="City"
                        icon={MapPin}
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="Your city"
                        value={regData.city}
                        onChange={(e) =>
                          setRegData({
                            ...regData,
                            city: e.target.value,
                          })
                        }
                      />

                      <AuthInput
                        label="State"
                        icon={MapPin}
                        type="text"
                        required
                        autoComplete="address-level1"
                        placeholder="Your state"
                        value={regData.state}
                        onChange={(e) =>
                          setRegData({
                            ...regData,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>

                    <AuthInput
                      label="Create Password"
                      icon={Lock}
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Choose a secure password"
                      value={regData.password}
                      onChange={(e) =>
                        setRegData({
                          ...regData,
                          password: e.target.value,
                        })
                      }
                    />

                    <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.06]">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 mt-0.5 flex-shrink-0" />

                      <p className="text-[9px] leading-4 text-zinc-600">
                        Your mobile number will be verified with a one-time
                        password before your account is activated.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full h-14 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 text-white font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-rose-500/10 hover:brightness-110 active:scale-[0.985] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <LoadingSpinner text="Creating account..." />
                      ) : (
                        <>
                          Continue with Mobile Verification
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}

                {/* OTP */}
                {authMode === "otp" && (
                  <motion.form
                    key="otp"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    onSubmit={handleOtpSubmit}
                    className="space-y-5"
                  >
                    <div className="relative overflow-hidden rounded-[24px] border border-amber-500/10 bg-amber-500/[0.035] p-5 text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                        }}
                        className="absolute w-24 h-24 rounded-full bg-amber-500/10 blur-2xl left-1/2 -translate-x-1/2 top-2"
                      />

                      <div className="relative">
                        <div className="mx-auto w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-amber-400" />
                        </div>

                        <p className="text-xs font-bold text-amber-200 mt-3">
                          Check your mobile
                        </p>

                        <p className="text-[10px] leading-4 text-amber-200/50 mt-1">
                          Enter the 6-digit verification code sent to your
                          registered mobile number.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-center text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 mb-3">
                        Verification Code
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        required
                        maxLength={6}
                        placeholder="000000"
                        value={otpCode}
                        onChange={handleOtpChange}
                        autoFocus
                        className="w-full h-16 rounded-2xl bg-white/[0.025] border border-white/[0.09] text-center text-2xl sm:text-3xl tracking-[0.35em] font-mono font-black text-white placeholder:text-zinc-800 outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/[0.05] transition-all"
                      />

                      <div className="flex justify-center gap-1.5 mt-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <motion.span
                            key={index}
                            animate={{
                              scale:
                                otpCode.length === index
                                  ? [1, 1.25, 1]
                                  : 1,
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              otpCode.length > index
                                ? "bg-amber-400"
                                : "bg-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otpCode.length < 6}
                      className="group w-full h-14 rounded-2xl bg-white text-black font-black text-sm flex items-center justify-center gap-3 hover:bg-zinc-200 active:scale-[0.985] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <LoadingSpinner text="Verifying..." dark />
                      ) : (
                        <>
                          Verify & Create Account
                          <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuthMode("register")}
                      className="mx-auto flex items-center gap-2 text-[10px] font-bold text-zinc-600 hover:text-zinc-300 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Back to registration
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-7 py-4 border-t border-white/[0.06] bg-white/[0.012]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-zinc-700" />
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-zinc-700 font-bold">
                    THE BORDERBOUND
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-700">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-[8px]">
                    Secure registration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================
   AUTH INPUT
========================= */

function AuthInput({
  label,
  icon: Icon,
  type = "text",
  required = false,
  ...props
}) {
  return (
    <div>
      <label className="block text-[9px] uppercase tracking-[0.15em] font-bold text-zinc-500 mb-2">
        {label}
        {required && <span className="text-rose-400 ml-1">*</span>}
      </label>

      <div className="relative group">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-rose-400 transition-colors pointer-events-none" />

        <input
          type={type}
          required={required}
          {...props}
          className={`
            w-full
            h-12
            rounded-2xl
            bg-white/[0.025]
            border
            border-white/[0.08]
            pl-10
            pr-4
            text-sm
            text-white
            placeholder:text-zinc-700
            outline-none
            transition-all
            duration-200
            focus:bg-white/[0.04]
            focus:border-rose-500/35
            focus:ring-4
            focus:ring-rose-500/[0.05]
            ${
              type === "date"
                ? "[color-scheme:dark]"
                : ""
            }
          `}
        />
      </div>
    </div>
  );
}

/* =========================
   MODE BUTTON
========================= */

function ModeButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-1 h-9 rounded-lg text-[10px] font-bold transition-all ${
        active
          ? "text-white"
          : "text-zinc-600 hover:text-zinc-400"
      }`}
    >
      {active && (
        <motion.div
          layoutId="auth-mode-pill"
          className="absolute inset-0 rounded-lg bg-white/[0.07] border border-white/[0.07]"
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* =========================
   LOADING
========================= */

function LoadingSpinner({ text, dark = false }) {
  return (
    <>
      <span
        className={`w-4 h-4 rounded-full border-2 ${
          dark
            ? "border-black/30 border-t-black"
            : "border-white/30 border-t-white"
        } animate-spin`}
      />

      <span>{text}</span>
    </>
  );
}

/* =========================
   SECURITY NOTE
========================= */

function SecurityNote({ text }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <ShieldCheck className="w-3 h-3 text-zinc-700" />

      <span className="text-[9px] text-zinc-700">
        {text}
      </span>
    </div>
  );
}

/* =========================
   SELECT
========================= */

function selectClass() {
  return `
    w-full
    h-12
    rounded-2xl
    bg-white/[0.025]
    border
    border-white/[0.08]
    pl-10
    pr-4
    text-sm
    text-white
    outline-none
    appearance-none
    focus:bg-white/[0.04]
    focus:border-rose-500/35
    focus:ring-4
    focus:ring-rose-500/[0.05]
    transition-all
  `;
}
