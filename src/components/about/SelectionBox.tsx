'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CharacterSticker } from './CharacterSticker';

interface SelectionBoxProps {
  className?: string;
}

export function SelectionBox({ className = '' }: SelectionBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Figma-style Selection Box Frame */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotate: isHovered ? 2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative p-6 sm:p-8 border border-[#FF5A36] bg-[var(--bg-surface)] select-none shadow-sm"
      >
        {/* Figma Label Badge */}
        <div className="absolute -top-3 left-4 bg-[#FF5A36] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs flex items-center gap-1.5 shadow-xs">
          <span>me.png</span>
          <span className="opacity-75">1:1</span>
        </div>

        {/* 8 Figma Selection Square Handles */}
        {/* Corners */}
        <motion.div
          animate={isHovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36] shadow-xs"
        />
        <motion.div
          animate={isHovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }}
          className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36] shadow-xs"
        />
        <motion.div
          animate={isHovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
          className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36] shadow-xs"
        />
        <motion.div
          animate={isHovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
          className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36] shadow-xs"
        />

        {/* Edge Midpoints */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36]" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36]" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36]" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-[var(--bg-base)] border border-[#FF5A36]" />

        {/* The Cutout Photo / Sticker Asset */}
        <div className="relative">
          <CharacterSticker size="md" dieCutOutline={true} />
        </div>

        {/* Dimension pill at bottom */}
        <div className="absolute -bottom-3 right-4 bg-[var(--text-primary)] text-[var(--bg-base)] font-mono text-[9px] px-2 py-0.5 rounded-xs">
          W: 240px H: 240px
        </div>
      </motion.div>
    </div>
  );
}
