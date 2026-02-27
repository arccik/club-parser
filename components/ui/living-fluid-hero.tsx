"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

// ── Animated background blob ─────────────────────────────────────────────────
interface BlobProps {
  className: string;
  animateX: number[];
  animateY: number[];
  duration: number;
  color: string;
}

const Blob = ({ className, animateX, animateY, duration, color }: BlobProps) => (
  <motion.div
    className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    style={{ background: color }}
    animate={{ x: animateX, y: animateY }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ── Decorative floating card (desktop only) ──────────────────────────────────
interface FloatingCardProps {
  title: string;
  venue: string;
  date: string;
  style?: React.CSSProperties;
  delay?: number;
}

const FloatingCard = ({ title, venue, date, style, delay = 0 }: FloatingCardProps) => (
  <motion.div
    className="float-card hidden md:flex flex-col gap-1.5 p-4 w-52"
    style={style}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: [0, -6, 0] }}
    transition={{
      opacity: { delay, duration: 0.7 },
      y: { delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    <div className="text-xs font-semibold text-brand-teal uppercase tracking-wide">{date}</div>
    <div className="text-sm font-bold text-white leading-tight">{title}</div>
    <div className="text-xs text-white/50">{venue}</div>
    <div className="mt-1 h-0.5 w-8 rounded-full bg-brand-cyan/40" />
  </motion.div>
);

// ── Single animated headline word ────────────────────────────────────────────
const HeadlineWord = ({ word, i }: { word: string; i: number }) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 28, rotateX: -40 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      delay: 0.15 + i * 0.1,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {word}
  </motion.span>
);

// ── Scroll indicator ─────────────────────────────────────────────────────────
const ScrollIndicator = () => (
  <motion.div
    className="scroll-indicator"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.4, duration: 0.8 }}
  >
    <span />
    <span />
    <span />
    <div>Scroll</div>
  </motion.div>
);

// ── Main hero ────────────────────────────────────────────────────────────────
const headline = "Find the Night Before It Finds You";
const words = headline.split(" ");

export const LivingFluidHero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden flex flex-col hero-height border-b border-white/10 bg-brand-navy"
    >
      {/* Aurora animated gradient */}
      <motion.div
        className="aurora-bg pointer-events-none absolute inset-0"
        style={{ y: bgY, opacity: 0.6 }}
      />

      {/* Dark vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#05070d_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-brand-navy/80" />

      {/* Animated blobs */}
      <Blob
        className="left-[-8%] top-[10%] h-72 w-72 md:h-96 md:w-96"
        color="rgba(78,161,255,0.18)"
        animateX={[0, 24, -12, 0]}
        animateY={[0, -16, 10, 0]}
        duration={14}
      />
      <Blob
        className="right-[-5%] top-[20%] h-64 w-64 md:h-80 md:w-80"
        color="rgba(168,85,247,0.15)"
        animateX={[0, -20, 12, 0]}
        animateY={[0, 18, -8, 0]}
        duration={17}
      />
      <Blob
        className="left-[40%] bottom-[15%] h-48 w-48 md:h-64 md:w-64"
        color="rgba(236,72,153,0.12)"
        animateX={[0, 16, -8, 0]}
        animateY={[0, -12, 6, 0]}
        duration={20}
      />

      {/* Decorative floating cards — desktop only */}
      <div className="pointer-events-none absolute inset-0">
        <div className="relative h-full max-w-6xl mx-auto px-4">
          <FloatingCard
            title="Warehouse Project"
            venue="Mayfield Depot, Manchester"
            date="Sat 1 Mar"
            style={{ position: "absolute", left: "-1rem", top: "22%" }}
            delay={0.8}
          />
          <FloatingCard
            title="fabric presents"
            venue="fabric, London EC1A"
            date="Fri 28 Feb"
            style={{ position: "absolute", right: "-1rem", top: "30%" }}
            delay={1.0}
          />
        </div>
      </div>

      {/* ── Centred content ── */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Social proof pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="social-proof-pill">Join 10,000+ night owls</span>
        </motion.div>

        {/* Staggered headline */}
        <h1
          className="mx-auto mb-5 w-full max-w-4xl text-[clamp(2rem,8.5vw,5rem)] font-black leading-[1.06] text-white"
          style={{ perspective: "600px" }}
        >
          {words.map((word, i) => (
            <span key={i} className="mr-[0.25em] last:mr-0">
              <HeadlineWord word={word} i={i} />
            </span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mx-auto mb-8 max-w-xl text-[clamp(0.9rem,3.5vw,1.1rem)] leading-relaxed text-white/60"
        >
          Explore venues, artists, and events across the UK — with location-aware
          search and curated recommendations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <a
            href="#content-start"
            className="tap-target flex w-full items-center justify-center rounded-full bg-brand-cyan px-7 py-3 text-sm font-bold text-brand-navy shadow-[0_0_24px_rgba(78,161,255,0.4)] transition hover:bg-white hover:shadow-[0_0_32px_rgba(78,161,255,0.55)] sm:w-auto"
          >
            Find Events Tonight
          </a>
          <Link
            href="/events"
            className="tap-target flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12 hover:border-white/35 sm:w-auto"
          >
            Browse All Events
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative pb-6 flex justify-center">
        <ScrollIndicator />
      </div>

      {/* Bottom fade — replaces the wave SVGs, zero overflow risk */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-surface to-transparent" />
    </section>
  );
};

export default LivingFluidHero;
