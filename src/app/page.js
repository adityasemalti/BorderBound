
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const letters = "BORDER-BOUND".split("");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.10] blur-[150px]" />

      <div className="pointer-events-none absolute left-[35%] top-[45%] h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/[0.10] blur-[130px]" />

      <div className="pointer-events-none absolute right-[15%] top-[25%] h-[300px] w-[300px] rounded-full bg-amber-400/[0.06] blur-[110px]" />

      <div className="pointer-events-none absolute bottom-[-150px] left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-red-900/[0.12] blur-[120px]" />
      <div className="relative z-10 flex items-center justify-center">
        <h1
          className="flex text-center text-[clamp(3rem,10vw,9rem)] font-black tracking-[-0.07em] uppercase"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(255,255,255,0.18)) drop-shadow(0 0 40px rgba(255,255,255,0.08))",
          }}
        >
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="inline-block animate-border-letter bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent"
              style={{
                animationDelay: `${index * 0.07}s`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>
      </div>

      <div className="absolute bottom-10 left-1/2 h-[1px] w-32 -translate-x-1/2 overflow-hidden bg-zinc-800">
        <div className="h-full w-full origin-left animate-progress bg-white" />
      </div>

      <style jsx>{`
        @keyframes borderLetter {
          0% {
            opacity: 0;
            transform: translateY(120px) scale(0.85);
            filter: blur(12px);
          }

          55% {
            opacity: 1;
            transform: translateY(-8px) scale(1.03);
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        .animate-border-letter {
          animation: borderLetter 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </main>
  );
}
