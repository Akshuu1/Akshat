'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  'full-stack developer',
  'AI systems builder',
  'backend architect',
  'data-flow optimizer',
];

export function RoleWordSwap() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block font-mono text-[var(--accent-lime-text)] bg-[var(--accent-lime)] px-2.5 py-0.5 rounded-md font-medium text-xs md:text-sm tracking-tight border border-black/10 shadow-xs"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
