"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useContestantStore } from "@/store/contestantStore";
import { useConfigStore } from "@/store/configStore";
import { useRouter } from "next/navigation";
import { Sparkles, FileText, Upload, ShieldCheck, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

export default function RegistrationWizard() {
  const router = useRouter();
  const { user, openAuthModal } = useAuthStore();
  const { configData, fetchPublicConfig } = useConfigStore();
  const {
    myProfile,
    fetchMyProfile,
    saveProfileDetails,
    uploadDoc,
    acceptTerms,
    payRegistrationFee,
    loading,
    error,
  } = useContestantStore();

  const [step, setStep] = useState(1);

  // Profile form data
  const [profileForm, setProfileForm] = useState({
    permanentAddress: "",
    occupation: "",
    education: "",
    bio: "",
    socialInstagram: "",
    socialFacebook: "",
    emergencyName: "",
    emergencyRelation: "Parent",
    emergencyPhone: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [idDocFile, setIdDocFile] = useState(null);

  useEffect(() => {
    fetchPublicConfig();
    if (user) fetchMyProfile();
  }, [user, fetchPublicConfig, fetchMyProfile]);

  useEffect(() => {
    if (myProfile) {
      if (myProfile.registrationFeePaid) {
        router.push("/dashboard");
      } else if (myProfile.termsAccepted) {
        setStep(4);
      } else if (myProfile.documents?.length > 0) {
        setStep(3);
      } else {
        setStep(2);
      }
    }
  }, [myProfile, router]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl bg-slate-900 border border-white/10 text-center space-y-4">
        <Sparkles className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Contestant Registration</h2>
        <p className="text-sm text-slate-400">
          Please sign in or create an account to start your official contestant registration.
        </p>
        <button
          onClick={() => openAuthModal("register")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/20"
        >
          Create Contestant Account
        </button>
      </div>
    );
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProfileDetails({
        permanentAddress: profileForm.permanentAddress,
        occupation: profileForm.occupation,
        education: profileForm.education,
        bio: profileForm.bio,
        socialMedia: {
          instagram: profileForm.socialInstagram,
          facebook: profileForm.socialFacebook,
        },
        emergencyContact: {
          name: profileForm.emergencyName,
          relation: profileForm.emergencyRelation,
          phone: profileForm.emergencyPhone,
        },
      });
      setStep(2);
    } catch (err) {}
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      if (photoFile) await uploadDoc("photograph", photoFile);
      if (idDocFile) await uploadDoc("identity_proof", idDocFile);
      setStep(3);
    } catch (err) {}
  };

  const handleTermsSubmit = async () => {
    try {
      await acceptTerms();
      setStep(4);
    } catch (err) {}
  };

  const handleFeePayment = async () => {
    try {
      await payRegistrationFee();
      router.push("/dashboard");
    } catch (err) {}
  };

  const regAmount = configData?.registration?.amount || 499;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-white/10 text-xs font-mono">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-rose-400 font-bold" : "text-slate-500"}`}>
          <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">1</span>
          <span>Profile</span>
        </div>
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-rose-400 font-bold" : "text-slate-500"}`}>
          <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">2</span>
          <span>Documents</span>
        </div>
        <div className={`flex items-center gap-2 ${step >= 3 ? "text-rose-400 font-bold" : "text-slate-500"}`}>
          <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">3</span>
          <span>Terms</span>
        </div>
        <div className={`flex items-center gap-2 ${step >= 4 ? "text-rose-400 font-bold" : "text-slate-500"}`}>
          <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">4</span>
          <span>Fee Payment</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Profile Details */}
      {step === 1 && (
        <form onSubmit={handleProfileSubmit} className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-500" /> Contestant Profile Details
            </h3>
            <p className="text-xs text-slate-400 mt-1">Provide your verified information for the selection committee.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Permanent Address</label>
            <textarea
              required
              rows={2}
              placeholder="Full permanent residential address"
              value={profileForm.permanentAddress}
              onChange={(e) => setProfileForm({ ...profileForm, permanentAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Occupation</label>
              <input
                type="text"
                placeholder="Fitness Trainer / Model / Student"
                value={profileForm.occupation}
                onChange={(e) => setProfileForm({ ...profileForm, occupation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Education</label>
              <input
                type="text"
                placeholder="Bachelor's Degree"
                value={profileForm.education}
                onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Short Bio / Introduction</label>
            <textarea
              rows={3}
              placeholder="Tell India why you deserve to qualify for BorderBound..."
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3">Emergency Contact Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Contact Name"
                value={profileForm.emergencyName}
                onChange={(e) => setProfileForm({ ...profileForm, emergencyName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500"
              />
              <input
                type="text"
                required
                placeholder="Relation (e.g. Father)"
                value={profileForm.emergencyRelation}
                onChange={(e) => setProfileForm({ ...profileForm, emergencyRelation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500"
              />
              <input
                type="tel"
                required
                placeholder="Emergency Phone"
                value={profileForm.emergencyPhone}
                onChange={(e) => setProfileForm({ ...profileForm, emergencyPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/20"
          >
            {loading ? "Saving..." : "Save & Proceed To Document Upload"}
          </button>
        </form>
      )}

      {/* STEP 2: Document Upload */}
      {step === 2 && (
        <form onSubmit={handleUploadSubmit} className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-rose-500" /> Document & Photo Upload
            </h3>
            <p className="text-xs text-slate-400 mt-1">Upload clear files for eligibility & identity verification.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Profile Photograph (JPG/PNG)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="w-full text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-rose-400 hover:file:bg-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Identity / Age Proof (Aadhaar / Passport / Voter ID)</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setIdDocFile(e.target.files[0])}
              className="w-full text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-rose-400 hover:file:bg-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/20"
          >
            {loading ? "Uploading..." : "Save Documents & Proceed To Terms"}
          </button>
        </form>
      )}

      {/* STEP 3: Accept Terms */}
      {step === 3 && (
        <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" /> Terms & Official Declarations
            </h3>
            <p className="text-xs text-slate-400 mt-1">Please accept the official contest rules to proceed.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-2 leading-relaxed">
            <p>1. I confirm that all details and documents provided are true and accurate.</p>
            <p>2. I accept that the registration fee is non-refundable and separate from public voting.</p>
            <p>3. I understand that public voting closes on 15 November and final selections are subject to vote verification.</p>
          </div>

          <button
            onClick={handleTermsSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/20"
          >
            {loading ? "Processing..." : "I Accept Official Terms & Proceed To Payment"}
          </button>
        </div>
      )}

      {/* STEP 4: Registration Fee Payment */}
      {step === 4 && (
        <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 text-center">
          <CreditCard className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-2xl font-bold text-white">Complete Registration Payment</h3>
          <p className="text-sm text-slate-400">
            Pay the application registration fee to submit your profile for verification.
          </p>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center max-w-sm mx-auto">
            <span className="text-xs text-slate-400 block font-mono">Registration Fee</span>
            <span className="text-4xl font-black text-amber-400 font-mono">
              ₹{regAmount} <span className="text-sm text-slate-400">INR</span>
            </span>
          </div>

          <button
            onClick={handleFeePayment}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-base shadow-xl shadow-rose-500/25"
          >
            {loading ? "Processing..." : `PAY REGISTRATION FEE ₹${regAmount}`}
          </button>
        </div>
      )}
    </div>
  );
}
