"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { X, Lock, Mail, Phone, User, MapPin, Calendar, AlertCircle, ShieldCheck } from "lucide-react";

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

  const [loginData, setLoginData] = useState({ email: "", password: "" });
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900/95 border border-white/10 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            THE BORDERBOUND AUTH
          </span>
          <h3 className="text-2xl font-black text-white mt-1">
            {authMode === "login" && "Welcome Back"}
            {authMode === "register" && "Create Contestant Account"}
            {authMode === "otp" && "Mobile OTP Verification"}
          </h3>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {authMode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Sign In"}
            </button>

            <p className="text-xs text-center text-slate-400 mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="text-amber-400 font-bold hover:underline"
              >
                Register Now
              </button>
            </p>
          </form>
        )}

        {/* REGISTER FORM */}
        {authMode === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Rahul Sharma"
                value={regData.fullName}
                onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={regData.mobile}
                  onChange={(e) => setRegData({ ...regData, mobile: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={regData.dob}
                  onChange={(e) => setRegData({ ...regData, dob: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Gender</label>
                <select
                  value={regData.gender}
                  onChange={(e) => setRegData({ ...regData, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  required
                  placeholder="Mumbai"
                  value={regData.city}
                  onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
                <input
                  type="text"
                  required
                  placeholder="Maharashtra"
                  value={regData.state}
                  onChange={(e) => setRegData({ ...regData, state: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-3 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Send OTP Verification"}
            </button>

            <p className="text-xs text-center text-slate-400 mt-3">
              Already registered?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="text-amber-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {/* OTP VERIFICATION FORM */}
        {authMode === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-xs text-amber-300">
              Enter the 6-digit OTP sent to your registered mobile number.
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-center">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center tracking-widest text-2xl font-mono py-3 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-extrabold focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Verify OTP & Complete"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
