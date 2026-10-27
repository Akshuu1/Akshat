'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';
import { homeData } from '@/data/home';

interface HeroHeadlineProps {
  reducedMotion?: boolean;
}

export function HeroHeadline({ reducedMotion = false }: HeroHeadlineProps) {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="relative z-10 max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8 select-none">
      {/* 1. Main Headline with Line-by-Line Mask Reveal */}
      <div className="space-y-0.5 sm:space-y-1">
        {/* Line 1: "Building where" */}
        <div className="overflow-hidden">
          <motion.h1
            initial={reducedMotion ? false : { y: 45, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="font-sans font-light text-[clamp(44px,7.5vw,118px)] text-white tracking-[-0.03em] leading-[0.94] drop-shadow-sm"
          >
            {homeData.hero.headline.line1}
          </motion.h1>
        </div>

        {/* Line 2: "AI meets software." ("AI meets" in Instrument Serif italic, kept on one line) */}
        <div className="overflow-hidden">
          <motion.div
            initial={reducedMotion ? false : { y: 45, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="font-sans font-light text-[clamp(44px,7.5vw,118px)] text-white tracking-[-0.03em] leading-[0.94] drop-shadow-sm flex flex-wrap items-baseline gap-x-3 sm:gap-x-4"
          >
            <span className="font-serif italic font-normal text-white whitespace-nowrap">
              {homeData.hero.headline.line2Part1}
            </span>
            <span>{homeData.hero.headline.line2Part2}</span>
          </motion.div>
        </div>
      </div>

      {/* 2. One Support Line Below (max 80 chars, real facts only) */}
      <motion.p
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease }}
        className="font-sans text-base sm:text-lg md:text-xl text-[#F4F3F8]/90 max-w-xl leading-relaxed tracking-tight"
      >
        {homeData.hero.supportLine}
      </motion.p>

      {/* 3. Primary Button (lime, magnetic) + Secondary Text Link (80ms stagger) */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.63, ease }}
        className="flex items-center gap-6 pt-2"
      >
        {/* Primary Magnetic Lime Button */}
        <MagneticButton dataCursor="work">
          <Link
            href={homeData.hero.ctaPrimary.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D6FF3D] text-[#111111] font-sans text-sm font-bold shadow-[0_4px_24px_rgba(214,255,61,0.35)] hover:scale-105 transition-transform"
          >
            <span>{homeData.hero.ctaPrimary.label}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MagneticButton>

        {/* Secondary Text Link */}
        <Link
          href={homeData.hero.ctaSecondary.href}
          data-cursor="contact"
          className="font-sans text-sm sm:text-base text-white/80 hover:text-white transition-colors underline decoration-white/40 hover:decoration-white underline-offset-4"
        >
          {homeData.hero.ctaSecondary.label}
        </Link>
      </motion.div>
    </div>
  );
}
