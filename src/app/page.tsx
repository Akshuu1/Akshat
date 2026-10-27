'use client';

import React, { useSyncExternalStore } from 'react';
import { HeroBackdrop } from '@/components/home/HeroBackdrop';
import { HeroFrame } from '@/components/home/HeroFrame';
import { ScrollBadge } from '@/components/home/ScrollBadge';
import { IntroStatementSection } from '@/components/home/IntroStatementSection';
import { ProofStripSection } from '@/components/home/ProofStripSection';
import { DisciplinesTilesSection } from '@/components/home/DisciplinesTilesSection';
import { SkillsMarqueeSection } from '@/components/home/SkillsMarqueeSection';
import { SelectedWorkSection } from '@/components/home/SelectedWorkSection';
import { ClosingCtaSection } from '@/components/home/ClosingCtaSection';

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

export default function HomePage() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  return (
    <div className="relative w-full min-h-screen bg-[#16161A] text-[#F2F1F7] transition-colors duration-500 overflow-x-clip select-none">
      {/* =================================================================== */}
      {/* 1. CINEMATIC HERO (First Screen, 100svh - UNTOUCHED)                */}
      {/* Exactly: Photo backdrop, Full-Screen Notched Frame, Scroll Badge   */}
      {/* =================================================================== */}
      <section className="relative w-full h-auto min-h-[100svh] md:h-[100svh] md:min-h-[660px] flex flex-col md:flex-row items-center justify-center overflow-visible md:overflow-hidden">
        {/* Full-Bleed Mountain Photo Backdrop (desktop) */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <HeroBackdrop reducedMotion={reducedMotion} />
        </div>

        {/* The Device Frame */}
        <HeroFrame reducedMotion={reducedMotion} />

        {/* Scroll Badge: placed below the frame on mobile, centered at bottom on desktop */}
        <div className="relative my-4 md:my-0 md:absolute md:bottom-2.5 sm:bottom-3.5 md:left-1/2 md:-translate-x-1/2 z-30 pointer-events-auto flex justify-center w-full">
          <ScrollBadge reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. SECTIONS BELOW THE HERO (Streamlined, Non-Repetitive Flow)        */}
      {/* In 30 seconds: who I am, what I do, proof, and how to contact me   */}
      {/* =================================================================== */}
      <main className="relative z-10 w-full">
        {/* 1. Intro statement (sticky scroll-reveal) */}
        <IntroStatementSection reducedMotion={reducedMotion} />

        {/* 2. Proof strip "at a glance" (light bezel band #ECEBF2, 4 resume facts) */}
        <ProofStripSection reducedMotion={reducedMotion} />

        {/* 3. Disciplines 3 tiles (Blueprint, Glow, Paper) */}
        <DisciplinesTilesSection reducedMotion={reducedMotion} />

        {/* 4. Skills marquee (two opposite-direction rows, lime stars) */}
        <SkillsMarqueeSection reducedMotion={reducedMotion} />

        {/* 5. Selected work (light bezel band #ECEBF2, 3 clean rows) */}
        <SelectedWorkSection reducedMotion={reducedMotion} />

        {/* 6. Closing CTA (2-line title, lime button, cv link, email copy) */}
        <ClosingCtaSection reducedMotion={reducedMotion} />
      </main>
    </div>
  );
}
