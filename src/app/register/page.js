"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useContestantStore } from "@/store/contestantStore";
import { useConfigStore } from "@/store/configStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileCheck2,
  FileText,
  Fingerprint,
  Image as ImageIcon,
  Instagram,
  Loader2,
  LockKeyhole,
  Phone,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  AlertCircle,
  WalletCards,
  X,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";

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

  const [profileForm, setProfileForm] = useState({
    dob: "",
    gender: "",
    mobile: "",
    city: "",
    state: "",

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

  const steps = [
    {
      number: 1,
      title: "Profile",
      short: "About you",
      icon: UserRound,
    },
    {
      number: 2,
      title: "Documents",
      short: "Verify identity",
      icon: FileCheck2,
    },
    {
      number: 3,
      title: "Terms",
      short: "Official rules",
      icon: ShieldCheck,
    },
    {
      number: 4,
      title: "Payment",
      short: "Finish entry",
      icon: CreditCard,
    },
  ];

  useEffect(() => {
    fetchPublicConfig();

    if (user) {
      fetchMyProfile();
    }
  }, [user, fetchPublicConfig, fetchMyProfile]);

  useEffect(() => {
    if (!myProfile) return;

    if (myProfile.registrationFeePaid) {
      router.push("/dashboard");
    } else if (myProfile.termsAccepted) {
      setStep(4);
    } else if (myProfile.documents?.length > 0) {
      setStep(3);
    } else {
      setStep(1);
    }
  }, [myProfile, router]);

  useEffect(() => {
    if (!myProfile) return;

    setProfileForm({
      dob: myProfile.dob
        ? new Date(myProfile.dob).toISOString().split("T")[0]
        : "",
      gender: myProfile.gender || "",
      mobile: myProfile.mobile || "",
      city: myProfile.city || "",
      state: myProfile.state || "",

      permanentAddress: myProfile.permanentAddress || "",
      occupation: myProfile.occupation || "",
      education: myProfile.education || "",
      bio: myProfile.bio || "",

      socialInstagram: myProfile.socialMedia?.instagram || "",
      socialFacebook: myProfile.socialMedia?.facebook || "",

      emergencyName: myProfile.emergencyContact?.name || "",
      emergencyRelation: myProfile.emergencyContact?.relation || "Parent",
      emergencyPhone: myProfile.emergencyContact?.phone || "",
    });
  }, [myProfile]);

  const regAmount = configData?.registration?.amount || 1;

  const progress = useMemo(() => {
    return ((step - 1) / 3) * 100;
  }, [step]);

  const updateField = (field, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveProfileDetails({
        dob: profileForm.dob,
        gender: profileForm.gender,
        mobile: profileForm.mobile,
        city: profileForm.city,
        state: profileForm.state,

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {}
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    try {
      if (photoFile) {
        await uploadDoc("photograph", photoFile);
      }

      if (idDocFile) {
        await uploadDoc("identity_proof", idDocFile);
      }

      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {}
  };

  const handleTermsSubmit = async () => {
    try {
      await acceptTerms();

      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {}
  };

  const handleFeePayment = async (simulate = false) => {
    try {
      await payRegistrationFee(simulate);
      if (simulate) {
        router.push("/dashboard");
      }
    } catch (err) {}
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 18,
      scale: 0.985,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.99,
      transition: {
        duration: 0.22,
      },
    },
  };

  if (!user) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#050505] px-4 py-10 sm:py-20 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[280px] h-[280px] bg-rose-600/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[240px] h-[240px] bg-orange-500/10 blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative max-w-md mx-auto"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-semibold">
                THE BORDERBOUND
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                Official contestant portal
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
              <LockKeyhole className="w-4 h-4 text-zinc-400" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0c0c] shadow-2xl shadow-black/50">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/70 to-transparent" />

            <div className="p-6 sm:p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-xl shadow-rose-500/20 mb-7">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <p className="text-[10px] tracking-[0.25em] uppercase text-rose-400 font-bold mb-3">
                APPLICATION OPEN
              </p>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-[1.05]">
                Enter the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-yellow-300">
                  BorderBound.
                </span>
              </h1>

              <p className="text-sm leading-6 text-zinc-500 mt-5">
                Your journey starts here. Create your contestant account and
                complete the official application process.
              </p>

              <div className="grid grid-cols-3 gap-2 mt-7">
                {[
                  ["01", "Profile"],
                  ["02", "Verify"],
                  ["03", "Enter"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-white/8 bg-white/[0.025] p-3"
                  >
                    <p className="text-[10px] text-zinc-600 font-mono">
                      {number}
                    </p>
                    <p className="text-xs text-zinc-300 font-semibold mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openAuthModal("register")}
                className="group mt-7 w-full h-14 rounded-2xl bg-white text-black font-bold text-sm flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.98]"
              >
                Create Contestant Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-zinc-600">
                <LockKeyhole className="w-3 h-3" />
                Secure registration portal
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-rose-600/[0.055] blur-[120px] rounded-full" />
        <div className="absolute top-[45%] -right-40 w-[300px] h-[300px] bg-orange-500/[0.035] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-7 sm:mb-10"
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>

              <span className="text-xs sm:text-sm font-black tracking-tight text-white">
                BORDERBOUND
              </span>
            </div>

            <p className="text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-[0.2em] mt-1 ml-9">
              Contestant Registration
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-white/8 bg-white/[0.025]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-zinc-400">
              Registration portal active
            </span>
          </div>
        </motion.div>

        {/* PROGRESS HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-[24px] border border-white/10 bg-[#0b0b0b]/90 backdrop-blur-xl overflow-hidden mb-5 sm:mb-7"
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-600 font-bold">
                  APPLICATION PROGRESS
                </p>

                <p className="text-sm font-bold text-white mt-1">
                  Step {step}{" "}
                  <span className="text-zinc-600 font-normal">of 4</span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-black text-white">
                  {Math.round((step / 4) * 100)}%
                </p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                  Complete
                </p>
              </div>
            </div>

            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-5">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-400 rounded-full"
              />
            </div>

            <div className="grid grid-cols-4 gap-1">
              {steps.map((item) => {
                const Icon = item.icon;
                const active = step === item.number;
                const completed = step > item.number;

                return (
                  <div
                    key={item.number}
                    className={`relative flex flex-col items-center gap-2 py-1 ${
                      active || completed ? "text-white" : "text-zinc-700"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all ${
                        completed
                          ? "bg-white text-black border-white"
                          : active
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-lg shadow-rose-500/10"
                            : "bg-white/[0.02] border-white/6"
                      }`}
                    >
                      {completed ? (
                        <Check className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] sm:text-[11px] font-bold">
                        {item.title}
                      </p>

                      <p className="hidden sm:block text-[9px] text-zinc-600 mt-0.5">
                        {item.short}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              className="mb-5 overflow-hidden"
            >
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/[0.07] border border-rose-500/20 text-rose-300">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>

                <div>
                  <p className="text-xs font-bold">Something went wrong</p>
                  <p className="text-[11px] text-rose-300/70 mt-1 leading-5">
                    {error}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.form
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleProfileSubmit}
              className="relative rounded-[28px] border border-white/10 bg-[#0b0b0b] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

              <div className="p-5 sm:p-8">
                <StepHeading
                  eyebrow="01 / YOUR PROFILE"
                  title="Tell us about yourself."
                  description="These details help us understand who is stepping into the BorderBound."
                  icon={UserRound}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Date of Birth" required>
                    <input
                      type="date"
                      required
                      value={profileForm.dob}
                      onChange={(e) => updateField("dob", e.target.value)}
                      className={inputClass()}
                    />
                  </Field>

                  <Field label="Gender" required>
                    <select
                      required
                      value={profileForm.gender}
                      onChange={(e) => updateField("gender", e.target.value)}
                      className={`${inputClass()} appearance-none`}
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Mobile Number" required>
                    <input
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      minLength={10}
                      maxLength={10}
                      placeholder="9876543210"
                      value={profileForm.mobile}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);

                        updateField("mobile", value);
                      }}
                      className={inputClass()}
                    />
                  </Field>

                  <Field label="City" required>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dehradun"
                      value={profileForm.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className={inputClass()}
                    />
                  </Field>
                </div>

                <Field label="State" required>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttarakhand"
                    value={profileForm.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className={inputClass()}
                  />
                </Field>

                <div className="space-y-5 mt-8">
                  <Field
                    label="Permanent Address"
                    required
                    hint="Your current permanent residential address"
                  >
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter your full permanent address..."
                      value={profileForm.permanentAddress}
                      onChange={(e) =>
                        updateField("permanentAddress", e.target.value)
                      }
                      className={inputClass("textarea")}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Occupation">
                      <input
                        type="text"
                        placeholder="e.g. Entrepreneur (Optional)"
                        value={profileForm.occupation}
                        onChange={(e) =>
                          updateField("occupation", e.target.value)
                        }
                        className={inputClass()}
                      />
                    </Field>

                    <Field label="Education">
                      <input
                        type="text"
                        placeholder="e.g. Bachelor's Degree (Optional)"
                        value={profileForm.education}
                        onChange={(e) =>
                          updateField("education", e.target.value)
                        }
                        className={inputClass()}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Your Story"
                    hint="A short introduction about yourself"
                  >
                    <textarea
                      rows={4}
                      required
                      placeholder="What makes you different from everyone else?"
                      value={profileForm.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      className={inputClass("textarea")}
                    />

                    <div className="flex justify-between mt-2">
                      <span className="text-[9px] text-zinc-700">
                        Keep it authentic.
                      </span>

                      <span className="text-[9px] text-zinc-700">
                        {profileForm.bio.length}/500
                      </span>
                    </div>
                  </Field>

                  <div className="pt-5 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center">
                        <FaInstagram className="w-4 h-4 text-zinc-400" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-white">
                          Social presence
                        </p>
                        {/* <p className="text-[10px] text-zinc-600 mt-0.5">
                          Optional — help us discover your story
                        </p> */}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Instagram">
                        <input
                          type="text"
                          placeholder="@yourusername"
                          value={profileForm.socialInstagram}
                          onChange={(e) =>
                            updateField("socialInstagram", e.target.value)
                          }
                          className={inputClass()}
                        />
                      </Field>

                      <Field label="Facebook Url (Optional)">
                        <input
                          type="text"
                          placeholder="Profile URL"
                          value={profileForm.socialFacebook}
                          onChange={(e) =>
                            updateField("socialFacebook", e.target.value)
                          }
                          className={inputClass()}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/[0.06]">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/[0.08] border border-rose-500/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-rose-400" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-white">
                          Emergency contact
                        </p>

                        <p className="text-[10px] text-zinc-600 mt-0.5 leading-4">
                          Required for participant safety during the
                          competition.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Field label="Contact Name" required>
                        <input
                          type="text"
                          required
                          placeholder="Full name"
                          value={profileForm.emergencyName}
                          onChange={(e) =>
                            updateField("emergencyName", e.target.value)
                          }
                          className={inputClass()}
                        />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Relation" required>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Father"
                            value={profileForm.emergencyRelation}
                            onChange={(e) =>
                              updateField("emergencyRelation", e.target.value)
                            }
                            className={inputClass()}
                          />
                        </Field>

                        <Field label="Emergency Phone" required>
                          <input
                            type="tel"
                            required
                            inputMode="numeric"
                            pattern="[0-9]{10,}"
                            minLength={10}
                            placeholder="9876543210"
                            value={profileForm.emergencyPhone}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 15);
                              updateField("emergencyPhone", value);
                            }}
                            className={inputClass()}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>

                <ActionButton
                  loading={loading}
                  loadingText="Saving profile..."
                  text="Save & Continue"
                  icon={ArrowRight}
                />
              </div>
            </motion.form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.form
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleUploadSubmit}
              className="relative rounded-[28px] border border-white/10 bg-[#0b0b0b] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

              <div className="p-5 sm:p-8">
                <StepHeading
                  eyebrow="02 / VERIFICATION"
                  title="Prove it's really you."
                  description="Upload clear, readable files. These will be used only for contestant verification."
                  icon={Fingerprint}
                />

                <div className="mt-8 space-y-4">
                  <UploadCard
                    title="Profile Photograph"
                    description="Recent clear face photo"
                    accept="image/*"
                    file={photoFile}
                    setFile={setPhotoFile}
                    icon={ImageIcon}
                    formats="JPG, PNG"
                  />

                  <UploadCard
                    title="Identity / Age Proof"
                    description="Government-issued identity document"
                    accept="image/*,application/pdf"
                    file={idDocFile}
                    setFile={setIdDocFile}
                    icon={FileText}
                    formats="JPG, PNG, PDF"
                  />
                </div>

                <div className="flex items-start gap-3 mt-6 p-4 rounded-2xl bg-white/[0.025] border border-white/[0.06]">
                  <LockKeyhole className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />

                  <p className="text-[10px] leading-5 text-zinc-600">
                    Please make sure your documents are clearly visible and
                    readable. Avoid screenshots or heavily edited images.
                  </p>
                </div>

                <ActionButton
                  loading={loading}
                  loadingText="Uploading documents..."
                  text="Save Documents & Continue"
                  icon={ArrowRight}
                />
              </div>
            </motion.form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative rounded-[28px] border border-white/10 bg-[#0b0b0b] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

              <div className="p-5 sm:p-8">
                <StepHeading
                  eyebrow="03 / OFFICIAL DECLARATION"
                  title="Know what you're signing."
                  description="Review the important declarations before completing your application."
                  icon={ShieldCheck}
                />

                <div className="mt-8 space-y-3">
                  {[
                    {
                      number: "01",
                      title: "Authentic information",
                      text: "I confirm that all details and documents provided by me are true, accurate and complete.",
                    },
                    {
                      number: "02",
                      title: "Registration fee",
                      text: "I understand that the registration fee is non-refundable and is separate from the public voting process.",
                    },
                    {
                      number: "03",
                      title: "Public voting",
                      text: "I understand that public voting closes on 15 November and submitted votes may be subject to verification.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="group p-4 sm:p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.035] transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg border border-white/8 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-mono text-zinc-500">
                            {item.number}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">
                            {item.title}
                          </h4>

                          <p className="text-[11px] sm:text-xs leading-5 text-zinc-500 mt-1.5">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 p-4 rounded-2xl bg-amber-500/[0.05] border border-amber-500/10">
                  <div className="flex gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />

                    <p className="text-[10px] leading-5 text-amber-200/60">
                      By continuing, you confirm that you have read and
                      understood these declarations and agree to the official
                      registration conditions.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleTermsSubmit}
                  disabled={loading}
                  className="group mt-7 w-full h-14 rounded-2xl bg-white text-black font-black text-sm flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.985] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Accept & Continue
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative rounded-[28px] border border-white/10 bg-[#0b0b0b] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

              <div className="p-5 sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 15,
                    }}
                    className="relative w-20 h-20 rounded-[26px] bg-gradient-to-br from-rose-500/15 to-orange-500/10 border border-rose-500/20 flex items-center justify-center"
                  >
                    <div className="absolute inset-2 rounded-[20px] border border-white/[0.06]" />
                    <WalletCards className="w-8 h-8 text-rose-400" />
                  </motion.div>

                  <p className="text-[9px] uppercase tracking-[0.28em] text-emerald-400 font-bold mt-7">
                    FINAL STEP
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
                    Secure your entry.
                  </h2>

                  <p className="text-xs sm:text-sm leading-6 text-zinc-500 max-w-md mt-3">
                    Complete the registration payment to submit your official
                    contestant application for verification.
                  </p>
                </div>

                <div className="relative mt-8 max-w-sm mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-transparent blur-2xl" />

                  <div className="relative rounded-[26px] border border-white/10 bg-[#111111] p-5 sm:p-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/[0.06] blur-2xl rounded-full" />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                          Registration
                        </p>

                        <p className="text-xs font-semibold text-zinc-300 mt-1">
                          Official entry fee
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-zinc-500" />
                      </div>
                    </div>

                    <div className="mt-6 flex items-end gap-2">
                      <span className="text-5xl sm:text-6xl font-black tracking-tighter text-white">
                        ₹{regAmount}
                      </span>

                      <span className="text-[10px] text-zinc-600 font-mono mb-2">
                        INR
                      </span>
                    </div>

                    <div className="h-px bg-white/[0.06] my-5" />

                    <div className="space-y-3">
                      {[
                        "Application submission",
                        "Contestant verification",
                        "Eligibility review",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>

                          <span className="text-[10px] text-zinc-500">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-w-sm mx-auto mt-6">
                  <button
                    onClick={() => handleFeePayment(false)}
                    disabled={loading}
                    className="group relative w-full h-14 sm:h-16 rounded-2xl overflow-hidden bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 text-white font-black text-sm shadow-2xl shadow-rose-500/20 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.985] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                    <span className="relative flex items-center gap-3">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Redirecting to PayU...
                        </>
                      ) : (
                        <>
                          Pay ₹{regAmount} via PayU Gateway
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>

                  <button
                    onClick={() => handleFeePayment(true)}
                    disabled={loading}
                    className="w-full py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-amber-400 font-bold text-xs border border-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Simulate Instant PayU Success (Test Mode)</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-5">
                  <LockKeyhole className="w-3 h-3 text-zinc-700" />
                  <span className="text-[9px] text-zinc-700">
                    Secure 256-bit encrypted PayU payment • Official BorderBound
                    portal
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-2 mt-6 pb-4"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
          <p className="text-[9px] text-zinc-700">
            Your information is handled through the official registration
            system.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

/* =========================
   COMPONENTS
========================= */

function StepHeading({ eyebrow, title, description, icon: Icon }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] uppercase tracking-[0.25em] text-rose-400 font-bold">
          {eyebrow}
        </span>

        <span className="h-px w-8 bg-white/10" />
      </div>

      <div className="flex items-start gap-3">
        <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-white/[0.035] border border-white/8 items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-zinc-400" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-500 leading-5 mt-2 max-w-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-zinc-400">
          {label}
          {required && <span className="text-rose-400 ml-1">*</span>}
        </label>

        {hint && (
          <span className="hidden sm:block text-[9px] text-zinc-700">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

function inputClass(type = "input") {
  return `
    w-full
    ${type === "textarea" ? "min-h-[100px] resize-none" : "h-12"}
    rounded-2xl
    bg-white/[0.025]
    border border-white/[0.08]
    px-4
    py-3
    text-sm
    text-white
    placeholder:text-zinc-700
    outline-none
    transition-all
    duration-200
    focus:bg-white/[0.04]
    focus:border-rose-500/40
    focus:ring-4
    focus:ring-rose-500/[0.06]
  `;
}

function UploadCard({
  title,
  description,
  accept,
  file,
  setFile,
  icon: Icon,
  formats,
}) {
  const handleChange = (e) => {
    const selected = e.target.files?.[0];

    if (selected) {
      setFile(selected);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className={`relative rounded-[24px] border transition-all overflow-hidden ${
        file
          ? "border-emerald-500/20 bg-emerald-500/[0.035]"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <label className="block cursor-pointer p-4 sm:p-5">
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
              file
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-white/[0.035] border-white/8"
            }`}
          >
            {file ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Icon className="w-5 h-5 text-zinc-500" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                {title}
              </h3>

              {file && (
                <span className="text-[8px] uppercase tracking-wider text-emerald-400 font-bold">
                  Ready
                </span>
              )}
            </div>

            <p className="text-[10px] text-zinc-600 mt-1 truncate">
              {file ? file.name : description}
            </p>

            <p className="text-[9px] text-zinc-700 mt-1">{formats}</p>
          </div>

          {!file && (
            <div className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
              <Upload className="w-4 h-4 text-zinc-500" />
            </div>
          )}

          {file && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile();
              }}
              className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center flex-shrink-0 hover:bg-white/[0.07] transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          )}
        </div>

        {!file && (
          <div className="mt-4 border border-dashed border-white/[0.08] rounded-xl py-3 text-center">
            <span className="text-[9px] text-zinc-600">
              Tap to choose a file
            </span>
          </div>
        )}
      </label>
    </motion.div>
  );
}

function ActionButton({ loading, loadingText, text, icon: Icon }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group mt-7 w-full h-14 rounded-2xl bg-white text-black font-black text-sm flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.985] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {text}
          <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
