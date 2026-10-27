'use client';

import React, { useRef, useState, useEffect, useSyncExternalStore, useId } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface StretchyWordProps {
  text: string;
  className?: string;
  ariaLabel?: string;
}

// Subscribe to reduced motion preference
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

interface LetterSpringController {
  scaleYMotion: ReturnType<typeof useMotionValue<number>>;
  scaleXMotion: ReturnType<typeof useMotionValue<number>>;
}

// Single stretchy letter component
function StretchyLetter({
  char,
  index,
  isHovered,
  reducedMotion,
  registerController,
}: {
  char: string;
  index: number;
  isHovered: boolean;
  reducedMotion: boolean;
  registerController: (index: number, ctrl: LetterSpringController | null) => void;
}) {
  const scaleYMotion = useMotionValue(1);
  const scaleXMotion = useMotionValue(1);
  const scaleYSpring = useSpring(scaleYMotion, { stiffness: 260, damping: 22, mass: 0.7 });
  const scaleXSpring = useSpring(scaleXMotion, { stiffness: 260, damping: 22, mass: 0.7 });

  useEffect(() => {
    registerController(index, { scaleYMotion, scaleXMotion });
    return () => registerController(index, null);
  }, [index, registerController, scaleYMotion, scaleXMotion]);

  if (reducedMotion) {
    return (
      <span
        aria-hidden="true"
        className="inline-block transition-colors duration-200 hover:text-[var(--accent-lime)]"
      >
        {char}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      style={{
        scaleY: scaleYSpring,
        scaleX: scaleXSpring,
        transformOrigin: 'bottom center',
        willChange: 'transform',
      }}
      className={`inline-block select-none transition-colors duration-150 ${
        isHovered
          ? 'text-[var(--accent-lime)] dark:text-[#F3F0E8]'
          : 'text-[var(--text-primary)] dark:text-[var(--accent-lime)]'
      }`}
    >
      {char}
    </motion.span>
  );
}

export function StretchyWord({ text, className = '', ariaLabel }: StretchyWordProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterCenters = useRef<number[]>([]);
  const controllersRef = useRef<(LetterSpringController | null)[]>([]);
  const [activePeakIndex, setActivePeakIndex] = useState<number | null>(null);
  const isPointerActive = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  const registerController = React.useCallback(
    (index: number, ctrl: LetterSpringController | null) => {
      controllersRef.current[index] = ctrl;
    },
    []
  );

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const letters = Array.from(text);
  const uniqueId = useId();

  // Measure and cache letter center positions
  const updateLetterCenters = () => {
    if (!containerRef.current) return;
    const centers: number[] = [];
    letterRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        centers.push(rect.left + rect.width / 2);
      }
    });
    letterCenters.current = centers;
  };

  useEffect(() => {
    updateLetterCenters();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateLetterCenters();
      });
      resizeObserver.observe(containerRef.current);
    }

    const handleWindowResize = () => {
      updateLetterCenters();
    };

    window.addEventListener('resize', handleWindowResize, { passive: true });

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Idle state: slow sine-wave breathing ripple travelling across the word
  useEffect(() => {
    if (reducedMotion) return;

    const startTime = performance.now();

    const animateIdleRipple = (now: number) => {
      if (!isPointerActive.current) {
        const elapsed = (now - startTime) / 1000;
        // 6 second wave period
        const wave = elapsed % 6;

        if (wave < 2.5) {
          // wave pulse passes through
          const wavePosition = (wave / 2.5) * (letters.length + 2) - 1;

          controllersRef.current.forEach((ctrl, i) => {
            if (!ctrl) return;
            const dist = Math.abs(i - wavePosition);
            if (dist < 1.6) {
              const rippleInfluence = Math.cos((dist / 1.6) * (Math.PI / 2));
              ctrl.scaleYMotion.set(1 + rippleInfluence * 0.16);
              ctrl.scaleXMotion.set(1 - rippleInfluence * 0.03);
            } else {
              ctrl.scaleYMotion.set(1);
              ctrl.scaleXMotion.set(1);
            }
          });
        } else {
          controllersRef.current.forEach((ctrl) => {
            if (!ctrl) return;
            ctrl.scaleYMotion.set(1);
            ctrl.scaleXMotion.set(1);
          });
        }
      }

      animationFrameId.current = requestAnimationFrame(animateIdleRipple);
    };

    animationFrameId.current = requestAnimationFrame(animateIdleRipple);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [reducedMotion, letters.length]);

  // Pointer move handler with gaussian falloff
  const handlePointerMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    isPointerActive.current = true;

    const cursorX = e.clientX;
    const sigma = 110; // influence radius in px
    let maxInfluence = 0;
    let closestIndex = -1;

    controllersRef.current.forEach((ctrl, i) => {
      if (!ctrl) return;
      const centerX = letterCenters.current[i];
      if (centerX !== undefined) {
        const d = cursorX - centerX;
        const influence = Math.exp(-(d * d) / (2 * sigma * sigma));

        // scaleY grows tallest, scaleX narrows slightly
        const scaleY = 1 + influence * 0.55;
        const scaleX = 1 - influence * 0.08;

        ctrl.scaleYMotion.set(scaleY);
        ctrl.scaleXMotion.set(scaleX);

        if (influence > maxInfluence) {
          maxInfluence = influence;
          closestIndex = i;
        }
      }
    });

    if (maxInfluence > 0.45) {
      setActivePeakIndex(closestIndex);
    } else {
      setActivePeakIndex(null);
    }
  };

  const handlePointerLeave = () => {
    isPointerActive.current = false;
    setActivePeakIndex(null);

    // Ease back to scale 1
    controllersRef.current.forEach((ctrl) => {
      if (!ctrl) return;
      ctrl.scaleYMotion.set(1);
      ctrl.scaleXMotion.set(1);
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor="say hi"
      className={`relative w-full overflow-visible py-8 select-none touch-none ${className}`}
    >
      {/* Accessible visually hidden heading for screen readers */}
      <h2 className="sr-only">{ariaLabel || text}</h2>

      {/* Stretchable letters container */}
      <div
        className="w-full flex items-end justify-between leading-[0.78] tracking-[-0.04em] font-display font-normal uppercase overflow-visible"
        style={{
          fontSize: 'clamp(5rem, 15.5vw, 19rem)',
        }}
      >
        {letters.map((char, index) => (
          <span
            key={`${uniqueId}-${index}`}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className="overflow-visible"
          >
            <StretchyLetter
              char={char}
              index={index}
              isHovered={activePeakIndex === index}
              reducedMotion={reducedMotion}
              registerController={registerController}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
