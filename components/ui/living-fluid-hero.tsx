"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const headline = "Find the Night Before It Finds You";

const Wave = ({ delay = 0, opacity = 0.3, duration = 18, reverse = false }) => {
  return (
    <motion.svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 h-[24%] w-[165%] md:h-[34%] md:w-[205%]"
      initial={{ x: reverse ? "-50%" : "0%" }}
      animate={{ x: reverse ? "0%" : "-50%" }}
      transition={{ repeat: Infinity, ease: "linear", duration, delay }}
      style={{ opacity }}
    >
      <path
        fill="url(#waveGradient)"
        d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,197.3C672,181,768,171,864,181.3C960,192,1056,224,1152,234.7C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
      <defs>
        <linearGradient id="waveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(144, 157, 181, 0.4)" />
          <stop offset="50%" stopColor="rgba(72, 84, 110, 0.55)" />
          <stop offset="100%" stopColor="rgba(36, 45, 67, 0.65)" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export const LivingFluidHero = () => {
  return (
    <section className="relative isolate overflow-x-clip overflow-y-hidden border-b border-white/10 bg-[#05070d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(107,114,128,0.18),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(71,85,105,0.16),transparent_38%),linear-gradient(180deg,#05070d_0%,#0b1120_56%,#0d1323_100%)]" />

      <motion.div
        className="pointer-events-none absolute -left-16 top-16 h-44 w-44 rounded-full bg-slate-300/10 blur-3xl md:h-60 md:w-60"
        animate={{ x: [0, 20, -10, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-28 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl md:h-72 md:w-72"
        animate={{ x: [0, -18, 10, 0], y: [0, 14, -6, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex min-h-[66vh] w-full max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-16 text-center sm:px-6 md:min-h-[78vh] md:pb-28 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-5 w-fit rounded-full border border-slate-400/30 bg-slate-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200"
        >
          Live Event Discovery
        </motion.p>

        <h1 className="mx-auto w-full max-w-4xl break-words text-[clamp(1.95rem,9vw,4.8rem)] font-black leading-[1.06] text-white">
          {headline}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-5 max-w-2xl text-[clamp(0.95rem,3.8vw,1.15rem)] leading-relaxed text-slate-300/90"
        >
          Explore venues, artists, and events with a fast, fluid experience.
          Scroll down to dive into curated recommendations and location-based
          picks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-7 flex w-full max-w-md flex-col items-center justify-center gap-3 md:max-w-none md:flex-row"
        >
          <a
            href="#content-start"
            className="w-full rounded-full bg-slate-200 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white sm:text-base md:w-auto"
          >
            Start Exploring
          </a>
          <Link
            href="/events"
            className="w-full rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:text-base md:w-auto"
          >
            Browse Events
          </Link>
        </motion.div>
      </div>

      <Wave opacity={0.22} duration={20} />
      <Wave opacity={0.3} duration={15} delay={1.2} reverse />
      <div className="hidden md:block">
        <Wave opacity={0.16} duration={24} delay={0.8} />
      </div>
    </section>
  );
};

export default LivingFluidHero;
