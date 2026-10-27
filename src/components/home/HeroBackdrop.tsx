'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroBackdropProps {
  reducedMotion?: boolean;
}

export function HeroBackdrop({ reducedMotion = false }: HeroBackdropProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 85 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax translation max 10px
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

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
      {/* Slow zoom (scale 1.04 -> 1.0 over 8s) + mouse parallax container */}
      <motion.div
        initial={reducedMotion ? false : { scale: 1.04 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        style={{
          x: reducedMotion ? 0 : parallaxX,
          y: reducedMotion ? 0 : parallaxY,
        }}
        className="relative w-full h-full"
      >
        <Image
          src="/home/hero-bg.jpg"
          alt="Misty mountain landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            filter: 'grayscale(1) contrast(1.05)',
          }}
        />

        {/* Multiply gradient overlay: rgba(120,128,170,0.35) -> rgba(20,22,40,0.55) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(120,128,170,0.35) 0%, rgba(20,22,40,0.55) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* 5% Grain texture */}
        <div className="absolute inset-0 bg-grain opacity-5" />
      </motion.div>
    </div>
  );
}
