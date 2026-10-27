'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface HeroObjectProps {
  reducedMotion?: boolean;
}

export function HeroObject({ reducedMotion = false }: HeroObjectProps) {
  const [imgError, setImgError] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);

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
    <motion.div
      animate={
        reducedMotion
          ? { y: 0 }
          : {
              y: [-6, 6, -6],
            }
      }
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full max-w-[580px] rounded-[24px] bg-[#F4F3F8] border border-white/80 shadow-[0_25px_60px_rgba(10,10,30,0.22)] p-4 sm:p-6 select-none pointer-events-auto text-[#14141F]"
    >
      {/* 1. Browser Window Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10">
        {/* Window Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10" />
        </div>

        {/* Center Title Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/5 font-mono text-[11px] text-[#14141F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF3D] border border-black/20" />
          <span className="font-bold">akshat.dev</span>
        </div>

        {/* Right Location */}
        <div className="flex items-center gap-1 font-mono text-[11px] text-[#5E6073]">
          <MapPin className="w-3 h-3 text-[#5E6073]" />
          <span>India</span>
        </div>
      </div>

      {/* 2. Profile Details */}
      <div className="py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Avatar / Monogram */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-mono font-black text-xl shrink-0 shadow-sm overflow-hidden border border-black/10">
          {!imgError ? (
            <Image
              src="/home/me.png"
              alt="Akshat Agrawal"
              width={64}
              height={64}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>A</span>
          )}
        </div>

        {/* Name & Role */}
        <div className="space-y-1 text-center sm:text-left flex-1 min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#14141F] tracking-tight">
              Akshat Agrawal
            </h3>
            <span className="w-2 h-2 rounded-full bg-[#D6FF3D] animate-pulse" title="Available" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#5E6073] font-medium leading-relaxed">
            Full-stack developer · AI engineer · Designer
          </p>
        </div>
      </div>

      {/* 3. Row of 3 Small Chips */}
      <div className="pt-3 border-t border-black/10 flex flex-wrap items-center justify-center sm:justify-start gap-2">
        <span className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/8 font-mono text-[11px] text-[#14141F] font-medium">
          B.Tech CS · Newton School
        </span>
        <span className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/8 font-mono text-[11px] text-[#14141F] font-medium">
          Open to internships
        </span>
        <span className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/8 font-mono text-[11px] text-[#14141F] font-medium">
          3 hackathons, Top 10
        </span>
      </div>
    </motion.div>
  );
}
