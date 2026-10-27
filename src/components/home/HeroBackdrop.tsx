'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroBackdropProps {
  reducedMotion?: boolean;
}

const HERO_BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDhCmVU+o9aFjGCSM4FPjbO0EDFOcgBsAdKAP/Z';

export function HeroBackdrop({ reducedMotion = false }: HeroBackdropProps) {
  const [hasError, setHasError] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 85 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax translation max 6px on desktop only
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion, mouseX, mouseY]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Light mouse parallax (max 6px) container on desktop without zoom or color filter */}
      <motion.div
        style={{
          x: reducedMotion ? 0 : parallaxX,
          y: reducedMotion ? 0 : parallaxY,
        }}
        className="relative w-full h-full"
      >
        <Image
          src="/home/hero-bg.webp"
          alt="Charcoal doodle artwork backdrop"
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA}
          className="object-cover object-[50%_30%] md:object-[50%_45%]"
          onError={() => setHasError(true)}
        />

        {/* Visible dev warning if backdrop image is missing */}
        {hasError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-amber-500/90 text-black font-mono text-xs font-bold shadow-2xl">
            [DEV WARNING] Backdrop image (/home/hero-bg.webp) failed to load.
          </div>
        )}
      </motion.div>
    </div>
  );
}
