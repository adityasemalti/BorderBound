"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
} from "lucide-react";

import img1 from "@/assets/img1.jpg";
import img2 from "@/assets/img2.jpg";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: img1,
    eyebrow: "THE REALITY COMPETITION",
    title: "CROSS",
    highlight: "THE BORDER.",
    description:
      "32 contestants. One battlefield. Every decision changes the game.",
  },
  {
    id: 2,
    image: img2,
    eyebrow: "THE BATTLE BEGINS",
    title: "SURVIVE",
    highlight: "THE UNKNOWN.",
    description:
      "Strategy, leadership, survival and relationships collide.",
  },
  {
    id: 3,
    image: img1,
    eyebrow: "YOUR STORY STARTS HERE",
    title: "BECOME",
    highlight: "LEGENDARY.",
    description:
      "Thousands will enter. Only the strongest stories will make it through.",
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.08,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
<section className="relative h-[460px] w-full overflow-hidden bg-black text-white sm:h-[600px] lg:h-[calc(100svh-68px)] lg:min-h-[650px]">
      {/* IMAGE */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-center"
          />

          {/* MOBILE OVERLAY */}
          <div className="absolute inset-0 bg-black/35 sm:bg-black/40" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/90 sm:bg-gradient-to-r sm:from-black sm:via-black/50 sm:to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(220,38,38,0.10),transparent_35%)]" />
        </motion.div>
      </AnimatePresence>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:55px_55px] sm:[background-size:70px_70px]" />

      {/* CONTENT */}
<div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-end px-5 pb-24 pt-20 sm:items-center sm:px-8 sm:pb-24 lg:px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.3 },
            }}
            className="w-full max-w-3xl"
          >

            {/* EYEBROW */}
            <div className="mb-5 flex items-center gap-2.5 sm:mb-7 sm:gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-red-500/30 bg-red-500/10 backdrop-blur-md sm:h-11 sm:w-11">
                <Flame className="h-3.5 w-3.5 text-red-500 sm:h-5 sm:w-5" />
              </div>

              <div className="min-w-0">
                <div className="truncate text-[7px] font-bold uppercase tracking-[0.24em] text-red-400 sm:text-[10px] sm:tracking-[0.3em]">
                  {slide.eyebrow}
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-[7px] uppercase tracking-[0.18em] text-white/40 sm:gap-2 sm:text-[9px] sm:tracking-[0.2em]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  LIVE EXPERIENCE
                </div>
              </div>
            </div>

            {/* HEADING */}
            <h1 className="text-[clamp(3.7rem,17vw,10rem)] font-black leading-[0.8] tracking-[-0.075em] sm:text-[clamp(4rem,14vw,10rem)]">
              <span>{slide.title}</span>

              <span className="block bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-[310px] border-l border-red-500/50 pl-3 text-[10px] leading-5 text-white/60 sm:mt-9 sm:max-w-lg sm:pl-5 sm:text-sm sm:leading-7">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="absolute bottom-7 left-5 right-5 z-20 flex items-center justify-between sm:bottom-10 sm:left-8 sm:right-8 lg:left-14 lg:right-14">

        {/* INDICATORS */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {slides.map((item, index) => (
            <button
              key={item.id}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className="group flex items-center"
            >
              <span
                className={`block h-[2px] transition-all duration-500 ${
                  current === index
                    ? "w-9 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] sm:w-14"
                    : "w-4 bg-white/20 group-hover:bg-white/50 sm:w-6"
                }`}
              />

              <span
                className={`ml-2 hidden font-mono text-[8px] sm:block ${
                  current === index
                    ? "text-white"
                    : "text-white/30"
                }`}
              >
                0{index + 1}
              </span>
            </button>
          ))}
        </div>

        {/* ARROWS */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center border border-white/10 bg-black/40 backdrop-blur-xl transition-all active:scale-95 hover:border-white/30 hover:bg-white/10 sm:h-12 sm:w-12"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center border border-white/10 bg-black/40 backdrop-blur-xl transition-all active:scale-95 hover:border-red-500/50 hover:bg-red-500/10 sm:h-12 sm:w-12"
          >
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-white/10">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-red-600 via-red-400 to-amber-400"
        />
      </div>
    </section>
  );
}