'use client';

import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { ReelWord } from './ReelWord';

const WORDS = [
  'Full Stack',
  'AI Engineer',
  'Designer',
  'Full Stack',
  'AI Engineer',
  'Designer',
];

const MONO_LINES = [
  'web apps, backends and databases that hold up.',
  'agents and LLM pipelines that check their own work.',
  'interfaces with taste, systems first.',
];

const ACCENT_COLORS = ['#D6FF3D', '#FF9EB5', '#F4B860'];
const BG_COLORS = ['#1F3D2B', '#4D1D30', '#3B2A1D'];

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

export function ReelStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeModeRef = useRef(0);
  const [activeMode, setActiveMode] = useState(0); // 0, 1, 2
  const [arrowNudge, setArrowNudge] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Scroll tracking across the 400vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // 3 modes -> pos 0..2
  const raw = useTransform(scrollYProgress, [0, 1], [0, 2]);

  // Spring physics for weighty, smooth inertia
  const pos = useSpring(raw, {
    stiffness: 70,
    damping: 24,
    mass: 0.9,
  });

  // Background and Accent color interpolations
  const stageBg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#1F3D2B', '#4D1D30', '#3B2A1D']
  );

  const stageAccent = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#D6FF3D', '#FF9EB5', '#F4B860']
  );

  const stageFg = '#F3F0E8';

  // Fade out "scroll ↓" hint after initial scroll
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Mode index = Math.round(pos) % 3 (updates only when the integer changes)
  useMotionValueEvent(pos, 'change', (latest) => {
    const rawInt = Math.round(latest);
    const mode = Math.max(0, Math.min(2, ((rawInt % 3) + 3) % 3));
    if (mode !== activeModeRef.current) {
      activeModeRef.current = mode;
      setActiveMode(mode);
      setArrowNudge(true);
    }
  });

  // Reset arrow nudge
  useEffect(() => {
    if (arrowNudge) {
      const timer = setTimeout(() => setArrowNudge(false), 350);
      return () => clearTimeout(timer);
    }
  }, [arrowNudge]);

  // Sync global CSS variables on mode change so floating elements adapt
  useEffect(() => {
    document.documentElement.style.setProperty('--craft-bg', BG_COLORS[activeMode]);
    document.documentElement.style.setProperty('--craft-accent', ACCENT_COLORS[activeMode]);
    document.documentElement.style.setProperty('--craft-text', '#F3F0E8');
  }, [activeMode]);

  // Scroll smoothly to a specific mode
  const scrollToMode = (mode: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const maxScroll = rect.height - window.innerHeight;
    const targetProgress = mode / 2; // 0, 0.5, 1.0
    const targetY = window.scrollY + rect.top + targetProgress * maxScroll;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= 50 && rect.bottom >= window.innerHeight - 50;
      if (!inView) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (activeModeRef.current < 2) {
          e.preventDefault();
          scrollToMode(activeModeRef.current + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activeModeRef.current > 0) {
          e.preventDefault();
          scrollToMode(activeModeRef.current - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Snap to nearest integer mode when scrolling stops (without fighting Lenis)
  useEffect(() => {
    if (reducedMotion) return;

    let snapTimeout: NodeJS.Timeout | null = null;
    const handleScrollSnap = () => {
      if (snapTimeout) clearTimeout(snapTimeout);

      snapTimeout = setTimeout(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        const currentRelative = -rect.top;

        // Only snap if currently inside the pinned stage
        if (currentRelative > 60 && currentRelative < maxScroll - 60) {
          const progress = currentRelative / maxScroll;
          const nearestMode = Math.round(progress * 2);
          const targetY = window.scrollY + rect.top + (nearestMode / 2) * maxScroll;
          const diff = Math.abs(window.scrollY - targetY);

          // Subtle snap only if close to resting point
          if (diff > 12 && diff < maxScroll * 0.18) {
            window.scrollTo({
              top: targetY,
              behavior: 'smooth',
            });
          }
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScrollSnap, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollSnap);
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full overflow-visible">
      {/* =================================================================== */}
      {/* PART 1: THE FULL-SCREEN REEL (400vh container, sticky 100svh stage) */}
      {/* =================================================================== */}
      <section
        ref={sectionRef}
        className="relative w-full h-[400vh]"
        aria-label="Kinetic Typography Discipline Reel"
      >
        <motion.div
          style={{
            backgroundColor: stageBg,
            color: stageFg,
            ['--fs' as string]: 'min(16vw, 26vh)',
            ['--pitch' as string]: 'calc(var(--fs) * 1.05)',
          }}
          className="sticky top-0 h-[100svh] w-screen overflow-hidden select-none z-10 flex flex-col justify-between"
        >
          {/* Accessibility Hidden Headings */}
          <div className="sr-only">
            <h2>Full Stack Development</h2>
            <h2>AI Engineer</h2>
            <h2>Designer</h2>
          </div>

          {/* =============================================================== */}
          {/* MINIMAL CHROME: TOP BAR                                         */}
          {/* =============================================================== */}
          <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 pt-8 sm:pt-10 flex items-center justify-between font-mono text-xs select-none">
            {/* Top Left: Counter "01 / 03" */}
            <div className="flex items-center overflow-hidden h-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeMode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-xs font-semibold tracking-wider inline-block"
                >
                  0{activeMode + 1} / 03
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Top Right: "scroll ↓" hint */}
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-mono select-none"
            >
              <span>scroll</span>
              <span className="text-[10px] animate-bounce">↓</span>
            </motion.div>
          </div>

          {/* =============================================================== */}
          {/* CENTER STAGE: Fixed Arrow "→" + Full-Screen Word Reel           */}
          {/* =============================================================== */}
          <div className="relative z-10 w-full flex-1 overflow-hidden pointer-events-none">
            {/* Fixed Arrow "→" (at stage's vertical center: top 50%, y -50%, left 2.5vw, width ~6vw, stroke 6px) */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '2.5vw',
                y: '-50%',
                width: 'clamp(32px, 5.5vw, 76px)',
                zIndex: 20,
                pointerEvents: 'none',
              }}
              animate={arrowNudge ? { x: [0, 12, 0] } : { x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 50" fill="none" className="w-full h-auto overflow-visible">
                <motion.path
                  d="M5 25h75M60 10l20 15-20 15"
                  style={{ stroke: stageAccent }}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Kinetic Words Column: driven by shared MotionValue pos */}
            <div className="absolute inset-0 pointer-events-auto">
              {WORDS.map((label, i) => (
                <ReelWord
                  key={i}
                  i={i}
                  pos={pos}
                  label={label}
                  onClick={() => scrollToMode(i % 3)}
                />
              ))}
            </div>
          </div>

          {/* =============================================================== */}
          {/* MINIMAL CHROME: BOTTOM BAR                                      */}
          {/* =============================================================== */}
          <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 pb-8 sm:pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 font-mono text-xs select-none">
            {/* Bottom Left: ONE mono line (crossfades on mode change) */}
            <div className="max-w-md sm:max-w-xl overflow-hidden min-h-[1.5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeMode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-xs sm:text-sm tracking-tight truncate"
                >
                  {MONO_LINES[activeMode]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Right: ONE pill "see the work" */}
            <button
              type="button"
              onClick={() => {
                if (sectionRef.current) {
                  const maxScroll = sectionRef.current.offsetHeight - window.innerHeight;
                  window.scrollTo({ top: maxScroll, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-md font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <span>see the work</span>
              <span className="text-sm leading-none">↓</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* STEP 1: Project panels are hidden while user reviews Step 1 */}
    </div>
  );
}
