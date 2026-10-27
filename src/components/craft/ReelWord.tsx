'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

const N = 6;

interface ReelWordProps {
  i: number;
  pos: MotionValue<number>;
  label: string;
  onClick?: () => void;
}

export function ReelWord({ i, pos, label, onClick }: ReelWordProps) {
  // Wrapped signed distance: pos drives everything
  const d = useTransform(pos, (p) => (((i - p + N / 2) % N + N) % N) - N / 2);
  const y = useTransform(d, (v) => `calc(${v} * var(--pitch))`);
  const opacity = useTransform(d, [-2, -1, 0, 1, 2], [0, 0.18, 1, 0.18, 0]);
  const scale = useTransform(d, [-1, 0, 1], [0.9, 1, 0.9]);
  const filter = useTransform(d, (v) => `blur(${Math.min(Math.abs(v), 1) * 8}px)`);
  const pointerEvents = useTransform(d, (v) => (Math.abs(v) <= 1.2 ? 'auto' : 'none'));

  return (
    <motion.div
      aria-hidden={i > 2}
      onClick={onClick}
      role="button"
      tabIndex={i <= 2 ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        y,
        opacity,
        scale,
        filter,
        pointerEvents,
        position: 'absolute',
        left: '9vw',
        top: '50%',
        marginTop: 'calc(var(--pitch) / -2)',
        height: 'var(--pitch)',
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        fontSynthesis: 'none',
        WebkitFontSmoothing: 'antialiased',
        letterSpacing: '0',
        textTransform: 'uppercase',
        lineHeight: 1,
        fontSize: 'var(--fs)',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {label}
    </motion.div>
  );
}
