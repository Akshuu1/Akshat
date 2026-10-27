'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutPolaroidProps {
  className?: string;
}

export function AboutPolaroid({ className = '' }: AboutPolaroidProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.article
        initial={{ rotate: -2.5, y: 0 }}
        whileHover={{
          rotate: 0,
          scale: 1.03,
          y: -6,
          transition: { type: 'spring', stiffness: 320, damping: 22 },
        }}
        className="group relative w-full max-w-[290px] sm:max-w-[310px] p-3.5 sm:p-4 pb-5 sm:pb-6 rounded-xs bg-[#FAF8F5] dark:bg-[#1E2028] border border-[#DFD8C7] dark:border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.08)] select-none cursor-pointer transition-shadow"
        data-cursor="me"
      >
        {/* Semi-translucent Washi Tape Strip at Top */}
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#EBE3D0]/85 border border-black/10 -rotate-2 backdrop-blur-xs shadow-xs z-30 pointer-events-none"
          aria-hidden="true"
        />

        {/* Vintage Red Film Stamp on Top Right */}
        <div className="absolute -top-2 -right-2 z-20 px-2 py-0.5 rounded-xs bg-[#FF5A36] text-white font-mono text-[9px] font-bold tracking-wider uppercase shadow-xs rotate-3">
          PORTRAIT &apos;26
        </div>

        {/* Polaroid Photographic Cutout Area */}
        <div className="relative w-full aspect-[4/4.2] rounded-xs overflow-hidden bg-[#16181D] border border-black/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
          {!imgError ? (
            <Image
              src="/akshat.png"
              alt="Akshat Agrawal framed in Polaroid"
              fill
              sizes="(max-width: 768px) 290px, 320px"
              priority
              onError={() => setImgError(true)}
              className="object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E201E] to-[#111111] text-[#F3F0E8] p-4 text-center">
              <span className="font-display font-black text-5xl text-[#D6FF3D]">A</span>
              <span className="font-mono text-xs text-[#9E9B92] mt-2">Akshat Agrawal</span>
            </div>
          )}

          {/* Film Gloss / Vignette Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Bottom-right photo watermarking */}
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-xs bg-black/45 backdrop-blur-xs font-mono text-[8px] tracking-widest text-white/90 uppercase font-semibold">
            INSTANT FILM · 2026
          </div>
        </div>

        {/* Classic Thick Bottom Margin with Handwritten Signature & Meta */}
        <div className="pt-3.5 sm:pt-4 px-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-handwriting text-3xl sm:text-4xl text-[#111111] dark:text-[#F3F0E8] leading-none font-bold">
              akshat agrawal ✍
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-black/10 dark:border-white/10 font-mono text-[10px] text-[#575349] dark:text-[#A1A1AA] tracking-wider uppercase">
            <span>DELHI NCR // 28.61° N</span>
            <span className="text-[#FF5A36] font-bold">B.TECH CS &apos;28</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
