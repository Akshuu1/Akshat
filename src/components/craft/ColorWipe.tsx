'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorWipeProps {
  color: string;
  triggerKey: number | string;
  reducedMotion?: boolean;
}

export function ColorWipe({
  color,
  triggerKey,
  reducedMotion = false,
}: ColorWipeProps) {
  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={triggerKey}
          initial={{
            clipPath: 'circle(0% at 8vw 50vh)',
            opacity: 1,
          }}
          animate={{
            clipPath: 'circle(160% at 8vw 50vh)',
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            backgroundColor: color,
          }}
          className="absolute inset-0 w-full h-full"
        />
      </AnimatePresence>
    </div>
  );
}
