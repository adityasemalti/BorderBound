"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useVotingStore } from "@/store/votingStore";
import { Vote, Trophy, MapPin, Calendar, Globe, ExternalLink, Share2, Sparkles } from "lucide-react";

export default function ContestantProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { openVoteModal } = useVotingStore();

  useEffect(() => {
    if (params?.id) {
      setLoading(true);
      api
        .get(`/contestants/public/${params.id}`)
        .then((res) => {
          if (res.data?.success) setProfile(res.data.data);
        })
        .catch((err) => setError(err.response?.data?.message || "Profile not found"))
        .finally(() => setLoading(false));
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center font-mono text-slate-400">
        Loading Contestant Profile...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl bg-slate-900 border border-white/10 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Profile Unavailable</h3>
        <p className="text-sm text-slate-400">{error || "Contestant profile does not exist."}</p>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Vote for ${profile.fullName} on THE BORDERBOUND`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile URL copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Profile Header Card */}
      <div className="relative p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="w-36 h-36 rounded-3xl bg-slate-800 border-2 border-amber-500/30 overflow-hidden flex-shrink-0 shadow-2xl">
            {profile.profilePhotoUrl ? (
              <img
                src={profile.profilePhotoUrl}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-400 font-black text-4xl">
                {profile.fullName?.[0]}
              </div>
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold">
                RANK #{profile.rank || "-"}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs">
                {profile.applicationId}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">{profile.fullName}</h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {profile.city}, {profile.state}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Age: {profile.age || "-"}
              </span>
            </div>

            {profile.bio && (
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                "{profile.bio}"
              </p>
            )}

            {/* Social Links */}
            {profile.socialMedia && (
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                {profile.socialMedia.instagram && (
                  <a
                    href={profile.socialMedia.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-xs font-mono text-slate-300 hover:text-rose-400 transition-colors flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" /> Instagram <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {profile.socialMedia.facebook && (
                  <a
                    href={profile.socialMedia.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-xs font-mono text-slate-300 hover:text-rose-400 transition-colors flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" /> Facebook <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Voting Action Section */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-slate-400 block font-mono">Total Valid Votes</span>
            <span className="text-3xl font-black text-amber-400 font-mono">
              {(profile.totalValidVotes || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShare}
              className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              title="Share Profile"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => openVoteModal(profile)}
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Vote className="w-5 h-5" />
              <span>VOTE FOR {profile.fullName.split(" ")[0].toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
