'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function subscribePointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(pointer: coarse), (hover: none)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getPointerSnapshot() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(pointer: coarse), (hover: none)').matches;
}

function getServerSnapshot() {
  return true;
}

export function CustomCursor() {
  const pathname = usePathname();
  const isCraft = pathname?.startsWith('/craft');
  const isTouch = useSyncExternalStore(subscribePointer, getPointerSnapshot, getServerSnapshot);
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pill' | 'hover'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant('pill');
        return;
      }

      const interactiveTarget = target.closest('a, button, input, textarea, select, [role="button"]');
      if (interactiveTarget) {
        setCursorText('');
        setCursorVariant('hover');
        return;
      }

      setCursorText('');
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor-element fixed pointer-events-none z-[9999] flex items-center justify-center font-mono text-xs select-none"
      style={{
        left: cursorX,
        top: cursorY,
        x: '-50%',
        y: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: cursorVariant === 'pill' ? 1 : cursorVariant === 'hover' ? 1.4 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {cursorVariant === 'pill' ? (
        <div className="relative">
          {/* Center tiny dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] shadow-xs" />

          {/* Cursor Label offset 16px from pointer */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              transform: 'translate(16px, 16px)',
            }}
            className="absolute top-0 left-0 px-3 py-1 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-semibold tracking-wider uppercase text-[10px] shadow-lg flex items-center gap-1 border border-black/10 whitespace-nowrap"
          >
            <span>{cursorText}</span>
            <span className="text-[9px]">↗</span>
          </motion.div>
        </div>
      ) : cursorVariant === 'hover' ? (
        <div className="w-8 h-8 rounded-full border border-[var(--text-primary)]/40 bg-[var(--text-primary)]/10 backdrop-blur-xs transition-colors duration-200" />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-primary)] transition-transform duration-150" />
      )}
    </motion.div>
  );
}
