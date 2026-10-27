'use client';

import React, { useSyncExternalStore } from 'react';
import { HeroBackdrop } from '@/components/home/HeroBackdrop';
import { HeroFrame } from '@/components/home/HeroFrame';
import { ScrollBadge } from '@/components/home/ScrollBadge';
import { DisciplinesSection } from '@/components/home/DisciplinesSection';
import { SelectedWorkSection } from '@/components/home/SelectedWorkSection';
import { HowIWorkSection } from '@/components/home/HowIWorkSection';
import { NowSection } from '@/components/home/NowSection';
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
    <div className="relative w-full min-h-screen bg-[#0F1118] text-[#F2F1F7] transition-colors duration-500 overflow-x-hidden select-none">
      {/* =================================================================== */}
      {/* 1. CINEMATIC HERO (First Screen, 100svh - UNTOUCHED)                */}
      {/* Exactly: Photo backdrop, Full-Screen Notched Frame, Scroll Badge   */}
      {/* =================================================================== */}
      <section className="relative w-full h-[100svh] min-h-[660px] flex items-center justify-center overflow-hidden">
        {/* Full-Bleed Mountain Photo Backdrop */}
        <HeroBackdrop reducedMotion={reducedMotion} />

        {/* The Full-Screen White Notched Device Frame */}
        <HeroFrame reducedMotion={reducedMotion} />

        {/* Bottom Center Scroll Badge on the photo */}
        <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <ScrollBadge reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. SECTIONS BELOW THE HERO (Alternating Dark Palette: #0F1118 / #161925) */}
      {/* Exactly 5 sections, clean structure, no fake claims                 */}
      {/* =================================================================== */}
      <main className="relative z-10 w-full">
        {/* 1. "What I do" (bg #0F1118) */}
        <DisciplinesSection reducedMotion={reducedMotion} />

        {/* 2. "Selected work" (bg #161925) */}
        <SelectedWorkSection reducedMotion={reducedMotion} />

        {/* 3. "How I work" highlight band (LIGHT bezel surface #ECEBF2) */}
        <HowIWorkSection reducedMotion={reducedMotion} />

        {/* 4. "Now" (bg #0F1118) */}
        <NowSection reducedMotion={reducedMotion} />

        {/* 5. Closing CTA (bg #161925) */}
        <ClosingCtaSection reducedMotion={reducedMotion} />
      </main>
    </div>
  );
}
