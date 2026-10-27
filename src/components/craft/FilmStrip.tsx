'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { BannerWords } from './BannerWords';
import { FrameFullStack } from './FrameFullStack';
import { FrameAI } from './FrameAI';
import { FrameData } from './FrameData';
import { FrameDesign } from './FrameDesign';
import { StripTabs } from './StripTabs';

export function FilmStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Measure scroll through the 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed progress for silky continuous horizontal motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.8,
  });

  // Translate track across 400vw (0vw to -300vw)
  const trackX = useTransform(smoothProgress, [0, 1], ['0vw', '-300vw']);

  // Continuous accent interpolation: lime -> pink -> cyan -> amber
  const accentColor = useTransform(
    smoothProgress,
    [0, 1 / 3, 2 / 3, 1],
    ['#D6FF3D', '#FF9EB5', '#5CE1E6', '#F4B860']
  );

  // Fade out bottom-right "scroll" hint after initial scroll
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // Track active frame index for tabs, counter, and keyboard navigation
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const idx = Math.min(3, Math.max(0, Math.round(latest * 3)));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  // Check accessibility & device modes
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);
    const handleTouchChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    touchQuery.addEventListener('change', handleTouchChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      touchQuery.removeEventListener('change', handleTouchChange);
    };
  }, []);

  // Scroll to a specific frame (0, 1, 2, 3)
  const scrollToFrame = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const startTop = scrollTop + rect.top;
    const scrollableDistance = rect.height - window.innerHeight;
    const targetScroll = startTop + (index / 3) * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Keyboard navigation: Left/Right arrows jump between frames
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToFrame(Math.min(3, activeIndex + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToFrame(Math.max(0, activeIndex - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Deep linking via hash (#full-stack, #ai-ml, #data-analyst, #designer)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#full-stack') {
        scrollToFrame(0);
      } else if (hash === '#ai-ml' || hash === '#ai') {
        scrollToFrame(1);
      } else if (hash === '#data-analyst' || hash === '#data') {
        scrollToFrame(2);
      } else if (hash === '#designer' || hash === '#design') {
        scrollToFrame(3);
      }
    };

    // Run on initial load and hash changes
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Continuous background gradient: forest #1F3D2B -> maroon #4D1D30 -> navy #12284A -> espresso #3B2A1D
  const stripGradient =
    'linear-gradient(90deg, #1F3D2B 0%, #1F3D2B 15%, #4D1D30 35%, #4D1D30 45%, #12284A 60%, #12284A 70%, #3B2A1D 85%, #3B2A1D 100%)';

  // Mobile / Touch Layout: horizontal scroll-snap row with same continuous gradient
  if (isTouch) {
    return (
      <div className="relative w-full overflow-hidden">
        {/* Top-Left Counter */}
        <div className="fixed top-20 left-6 z-40 font-mono text-xs text-white/70 tracking-widest pointer-events-none select-none flex items-center gap-1.5">
          <span className="font-bold text-[#D6FF3D]">0{activeIndex + 1}</span>
          <span className="text-white/40">/ 04</span>
        </div>

        {/* Scroll-Snap Row */}
        <div
          className="flex w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ background: stripGradient }}
          onScroll={(e) => {
            const target = e.currentTarget;
            const scrollLeft = target.scrollLeft;
            const width = target.clientWidth;
            const idx = Math.min(3, Math.max(0, Math.round(scrollLeft / width)));
            setActiveIndex(idx);
          }}
        >
          <FrameFullStack reducedMotion={true} />
          <FrameAI reducedMotion={true} />
          <FrameData reducedMotion={true} />
          <FrameDesign reducedMotion={true} />
        </div>

        {/* Bottom Tabs */}
        <StripTabs
          activeIndex={activeIndex}
          accentColor={accentColor}
          onSelectFrame={(idx) => {
            const container = document.querySelector('.snap-x');
            if (container) {
              container.scrollTo({
                left: idx * window.innerWidth,
                behavior: 'smooth',
              });
            }
          }}
        />
      </div>
    );
  }

  // Desktop Layout: 600vh scroll container, sticky 100svh stage, 400vw track
  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600vh] overflow-visible pb-0 mb-0"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden select-none">
        {/* Top-Left Persistent Rolling Counter: "01 / 04" */}
        <div className="fixed top-20 sm:top-24 left-6 sm:left-12 z-40 font-mono text-xs text-white/70 tracking-widest pointer-events-none select-none flex items-center gap-2">
          <motion.span
            style={{ color: accentColor }}
            className="font-bold tracking-widest text-sm"
          >
            0{activeIndex + 1}
          </motion.span>
          <span className="text-white/40 font-mono">/ 04</span>
        </div>

        {/* Bottom-Right "scroll" Hint (Fades after first scroll) */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="fixed bottom-6 right-6 sm:right-12 z-40 font-mono text-[11px] text-white/50 tracking-widest uppercase flex items-center gap-2 pointer-events-none select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-ping" />
          <span>scroll</span>
          <span className="text-xs">↓</span>
        </motion.div>

        {/* 400vw Film Strip Track */}
        <motion.div
          ref={trackRef}
          style={{
            x: trackX,
            width: '400vw',
            background: stripGradient,
          }}
          className="relative h-[100svh] flex will-change-transform"
        >
          {/* Giant Banner Words Parallax Layer (Behind foreground, moves at 0.7x) */}
          <BannerWords
            progress={smoothProgress}
            reducedMotion={reducedMotion}
          />

          {/* Foreground Frame 1: Full Stack (100vw x 100svh) */}
          <FrameFullStack reducedMotion={reducedMotion} />

          {/* Foreground Frame 2: AI Engineer (100vw x 100svh) */}
          <FrameAI reducedMotion={reducedMotion} />

          {/* Foreground Frame 3: Data Analyst (100vw x 100svh) */}
          <FrameData reducedMotion={reducedMotion} />

          {/* Foreground Frame 4: Designer (100vw x 100svh) */}
          <FrameDesign reducedMotion={reducedMotion} />
        </motion.div>

        {/* Persistent Bottom Tabs */}
        <StripTabs
          activeIndex={activeIndex}
          accentColor={accentColor}
          onSelectFrame={scrollToFrame}
        />
      </div>
    </div>
  );
}
