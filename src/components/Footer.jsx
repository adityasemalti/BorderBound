import Link from "next/link";
import { Flame, ShieldCheck, Award, Trophy, Users } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05080E] text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timeline Summary Banner */}
        <div className="mb-16 p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                OFFICIAL BORDERBOUND TIMELINE
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                India chooses who gets the opportunity. The Borderbound decides who survives it.
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-mono">
              <Users className="w-4 h-4" />
              <span>32 Initial + 4 Wild Cards = 36 Main Contestants</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <span className="text-xs text-rose-400 font-mono font-bold block">5 OCT</span>
              <span className="text-xs text-slate-200 font-semibold mt-1 block">Registration Opens</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <span className="text-xs text-amber-400 font-mono font-bold block">15 OCT</span>
              <span className="text-xs text-slate-200 font-semibold mt-1 block">Public Voting Opens</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <span className="text-xs text-amber-400 font-mono font-bold block">20 OCT</span>
              <span className="text-xs text-slate-200 font-semibold mt-1 block">Fee ₹499 → ₹1,499</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <span className="text-xs text-rose-400 font-mono font-bold block">5 NOV</span>
              <span className="text-xs text-slate-200 font-semibold mt-1 block">Registration Closes</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <span className="text-xs text-rose-500 font-mono font-bold block">15 NOV</span>
              <span className="text-xs text-slate-200 font-semibold mt-1 block">Voting Closes</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-rose-500" />
              <span className="font-extrabold text-xl text-white tracking-wider">
                THE BORDERBOUND
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              The premier real-time outdoor reality competition. Thousands register, India decides, 50 remain in contention, 32 earn their place, and 4 fight back through the Wild Card.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-rose-400 transition-colors">Home</Link></li>
              <li><Link href="/leaderboard" className="hover:text-rose-400 transition-colors">Live Leaderboard</Link></li>
              <li><Link href="/register" className="hover:text-rose-400 transition-colors">Register as Contestant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Rules & Security</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-400"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Anti-Fraud Verified</li>
              <li className="flex items-center gap-2 text-slate-400"><Award className="w-4 h-4 text-amber-400" /> Official Terms & Conditions</li>
              <li className="text-xs text-slate-500">₹5 = 1 Vote | Unlimited Voting</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} THE BORDERBOUND. All rights reserved.</p>
          <p className="font-mono text-slate-500">Official Registration & Voting Platform</p>
        </div>
      </div>
    </footer>
  );
}
