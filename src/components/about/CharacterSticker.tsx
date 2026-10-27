'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CharacterStickerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  dieCutOutline?: boolean;
}

// TODO: When photo is provided, place it at /public/about/me-cutout.png (transparent PNG cutout)
// and toggle HAS_LOCAL_PHOTO to true.
const HAS_LOCAL_PHOTO = false;

export function CharacterSticker({
  className = '',
  size = 'md',
  dieCutOutline = true,
}: CharacterStickerProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52',
    lg: 'w-56 h-56 sm:w-72 sm:h-72 md:w-84 md:h-84',
  };

  return (
    <motion.div
      whileHover={{
        rotate: [-1, 2, -2, 0],
        scale: 1.06,
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
      className={`relative select-none cursor-pointer ${sizeClasses[size]} ${className}`}
      data-cursor="me"
    >
      {/* Outer Die-cut Sticker border in Electric Lime #D6FF3D */}
      <div
        className={`w-full h-full rounded-full flex items-center justify-center relative transition-transform ${
          dieCutOutline
            ? 'p-1.5 bg-[#D6FF3D] shadow-[0_8px_24px_rgba(0,0,0,0.28)]'
            : ''
        }`}
      >
        <div className="w-full h-full rounded-full bg-[#111111] overflow-hidden relative border-2 border-white/20 flex items-center justify-center">
          {HAS_LOCAL_PHOTO && !hasImageError ? (
            <Image
              src="/about/me-cutout.png"
              alt="Akshat Agrawal cutout portrait sticker"
              fill
              sizes="(max-width: 768px) 160px, 320px"
              className="object-cover object-top"
              onError={() => setHasImageError(true)}
              priority
            />
          ) : (
            // High-craft vector character sticker placeholder with die-cut zine attitude
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E201E] via-[#111111] to-[#252822] text-[#F3F0E8] p-3 text-center relative">
              {/* Halftone dot pattern in background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#D6FF3D 1px, transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
              />

              {/* Stylized Avatar Illustration */}
              <svg
                viewBox="0 0 100 100"
                className="w-3/4 h-3/4 drop-shadow-md z-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hair */}
                <path
                  d="M26 42 C 24 22, 76 22, 74 42 C 72 30, 28 30, 26 42 Z"
                  fill="#D6FF3D"
                />
                <circle cx="50" cy="50" r="30" fill="#EFE9DC" />
                {/* Modern rectangular glasses */}
                <rect
                  x="30"
                  y="44"
                  width="16"
                  height="12"
                  rx="3"
                  stroke="#111111"
                  strokeWidth="3.5"
                  fill="#D6FF3D"
                  fillOpacity="0.4"
                />
                <rect
                  x="54"
                  y="44"
                  width="16"
                  height="12"
                  rx="3"
                  stroke="#111111"
                  strokeWidth="3.5"
                  fill="#D6FF3D"
                  fillOpacity="0.4"
                />
                <line x1="46" y1="50" x2="54" y2="50" stroke="#111111" strokeWidth="3.5" />
                {/* Eyes */}
                <circle cx="38" cy="50" r="2.5" fill="#111111" />
                <circle cx="62" cy="50" r="2.5" fill="#111111" />
                {/* Smile */}
                <path
                  d="M42 66 Q 50 72 58 66"
                  stroke="#111111"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              {/* Monogram tag */}
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#D6FF3D] font-bold z-10">
                AKSHAT · DEV
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
