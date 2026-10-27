'use client';

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, FileText, ExternalLink, RotateCcw, Shuffle, Smile, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { siteConfig } from '@/data/siteConfig';

// Motion preference subscription
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

interface StickerDef {
  id: string;
  type: 'email' | 'link' | 'download' | 'decorative';
  label: string;
  sublabel?: string;
  href?: string;
  ariaLabel: string;
  color: string;
  defaultX: number;
  defaultY: number;
  defaultRotate: number;
  isLarge?: boolean;
  isRound?: boolean;
}

const INITIAL_STICKERS: StickerDef[] = [
  {
    id: 'email',
    type: 'email',
    label: 'akshat.agrawal2024@nst.rishihood.edu.in',
    sublabel: 'copy email',
    href: `mailto:${siteConfig.contact.email}`,
    ariaLabel: 'Copy email address: akshat.agrawal2024@nst.rishihood.edu.in',
    color: '#F4F3F8',
    defaultX: 18,
    defaultY: 22,
    defaultRotate: -2.5,
    isLarge: true,
  },
  {
    id: 'whatsapp',
    type: 'link',
    label: '+91 89549 28960',
    sublabel: 'WhatsApp',
    href: 'https://wa.me/918954928960',
    ariaLabel: 'Chat on WhatsApp: +91 89549 28960',
    color: '#7CF0B4',
    defaultX: 20,
    defaultY: 96,
    defaultRotate: 3.5,
  },
  {
    id: 'linkedin',
    type: 'link',
    label: 'LinkedIn',
    href: siteConfig.contact.linkedin,
    ariaLabel: 'Open LinkedIn profile in new tab',
    color: '#D6FF3D',
    defaultX: 232,
    defaultY: 90,
    defaultRotate: -3,
  },
  {
    id: 'hi',
    type: 'decorative',
    label: 'hi ✦',
    ariaLabel: 'Decorative hi badge',
    color: '#F4F3F8',
    defaultX: 368,
    defaultY: 82,
    defaultRotate: -6,
    isRound: true,
  },
  {
    id: 'github',
    type: 'link',
    label: 'GitHub',
    href: siteConfig.contact.github,
    ariaLabel: 'Open GitHub profile in new tab',
    color: '#F4B860',
    defaultX: 24,
    defaultY: 172,
    defaultRotate: 3,
  },
  {
    id: 'cv',
    type: 'download',
    label: 'Download CV',
    sublabel: 'PDF',
    href: '/resume.pdf',
    ariaLabel: 'Download CV curriculum vitae PDF',
    color: '#FF9EB5',
    defaultX: 168,
    defaultY: 166,
    defaultRotate: -2.5,
  },
  {
    id: 'smiley',
    type: 'decorative',
    label: 'smiley',
    ariaLabel: 'Decorative smiley sticker, click to spin',
    color: '#D6FF3D',
    defaultX: 350,
    defaultY: 160,
    defaultRotate: 6,
    isRound: true,
  },
];

export function StickerPile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [topZIndex, setTopZIndex] = useState(10);
  const [zIndices, setZIndices] = useState<Record<string, number>>({});
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; rotate: number }>>({});
  const [smileySpin, setSmileySpin] = useState(0);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Track drag distance to differentiate drag from normal click
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // Initialize positions
  useEffect(() => {
    const initPos: Record<string, { x: number; y: number; rotate: number }> = {};
    INITIAL_STICKERS.forEach((s) => {
      initPos[s.id] = { x: s.defaultX, y: s.defaultY, rotate: s.defaultRotate };
    });
    setPositions(initPos);
  }, []);

  const bringToFront = (id: string) => {
    setTopZIndex((prev) => {
      const next = prev + 1;
      setZIndices((indices) => ({ ...indices, [id]: next }));
      return next;
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setToastMessage('copied email to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    } catch {
      setToastMessage('copied email!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleShuffle = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const newPos: Record<string, { x: number; y: number; rotate: number }> = {};
    INITIAL_STICKERS.forEach((s) => {
      const maxX = Math.max(12, width - (s.isLarge ? 320 : s.isRound ? 60 : 170));
      const maxY = Math.max(12, height - 60);
      newPos[s.id] = {
        x: Math.round(12 + Math.random() * maxX),
        y: Math.round(12 + Math.random() * maxY),
        rotate: Math.round(-8 + Math.random() * 16),
      };
    });
    setPositions(newPos);
  };

  const handleReset = () => {
    const resetPos: Record<string, { x: number; y: number; rotate: number }> = {};
    INITIAL_STICKERS.forEach((s) => {
      resetPos[s.id] = { x: s.defaultX, y: s.defaultY, rotate: s.defaultRotate };
    });
    setPositions(resetPos);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    hasDragged.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const dist = Math.hypot(e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y);
    if (dist > 5) {
      hasDragged.current = true;
    }
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case 'email':
        return <Mail className="w-4 h-4 text-[#14141F] shrink-0" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-[#14141F] shrink-0" />;
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4 text-[#14141F] shrink-0" />;
      case 'github':
        return <GithubIcon className="w-4 h-4 text-[#14141F] shrink-0" />;
      case 'cv':
        return <FileText className="w-4 h-4 text-[#14141F] shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-2.5 font-mono">
      {/* Toast Announcement for Accessibility */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-[9999] px-4 py-2.5 rounded-full border-2 border-[#14141F] bg-[#D6FF3D] text-[#14141F] font-bold text-xs shadow-[4px_4px_0_#14141F] transition-all duration-300 pointer-events-none ${
          toastMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
        }`}
      >
        ✦ {toastMessage}
      </div>

      {/* ============================================================ */}
      {/* DESKTOP PILE CONTAINER (>=768px): Cutting-Mat Canvas         */}
      {/* ============================================================ */}
      <div className="hidden md:block rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 shadow-sm space-y-3">
        {/* Integrated Top Bar with Controls */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pb-2 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
            <span className="font-semibold text-[var(--text-primary)] tracking-wide">
              STICKER DECK
            </span>
            <span className="text-[10px] text-[var(--text-muted)] hidden lg:inline">
              {"//"} PEEL & DRAG
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              type="button"
              className="px-2.5 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              data-cursor="filter"
            >
              <Shuffle className="w-3 h-3" />
              <span>shuffle</span>
            </button>

            <button
              onClick={handleReset}
              type="button"
              className="px-2.5 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              data-cursor="filter"
            >
              <RotateCcw className="w-3 h-3" />
              <span>reset</span>
            </button>
          </div>
        </div>

        {/* The Tactile Mat Surface */}
        <div
          ref={containerRef}
          className="relative w-full h-[260px] rounded-xl border border-[var(--border-hairline)]/80 bg-[var(--bg-base)]/60 overflow-hidden select-none"
        >
          {/* Subtle millimeter drafting grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Corner Drafting Crosshairs */}
          <span className="absolute top-2 left-2 text-[10px] text-[var(--text-muted)] opacity-30 pointer-events-none select-none">
            +
          </span>
          <span className="absolute top-2 right-2 text-[10px] text-[var(--text-muted)] opacity-30 pointer-events-none select-none">
            +
          </span>
          <span className="absolute bottom-2 left-2 text-[10px] text-[var(--text-muted)] opacity-30 pointer-events-none select-none">
            +
          </span>
          <span className="absolute bottom-2 right-2 text-[10px] text-[var(--text-muted)] opacity-30 pointer-events-none select-none">
            +
          </span>

          {INITIAL_STICKERS.map((sticker) => {
            const pos = positions[sticker.id] || {
              x: sticker.defaultX,
              y: sticker.defaultY,
              rotate: sticker.defaultRotate,
            };
            const zIndex = zIndices[sticker.id] || 1;

            // Round decorative badges
            if (sticker.isRound) {
              return (
                <motion.div
                  key={sticker.id}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.2}
                  onDragStart={() => bringToFront(sticker.id)}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  initial={false}
                  animate={{
                    rotate: sticker.id === 'smiley' ? pos.rotate + smileySpin : pos.rotate,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                  }}
                  whileHover={
                    reducedMotion
                      ? {}
                      : {
                          scale: 1.08,
                          rotate: [pos.rotate, pos.rotate - 3, pos.rotate + 3, pos.rotate],
                          transition: { duration: 0.3 },
                        }
                  }
                  whileDrag={{
                    scale: 1.15,
                    rotate: pos.rotate + 6,
                    zIndex: 60,
                  }}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    zIndex,
                    backgroundColor: sticker.color,
                  }}
                  onClick={() => {
                    if (hasDragged.current) return;
                    if (sticker.id === 'smiley') {
                      setSmileySpin((prev) => prev + 360);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={sticker.ariaLabel}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (sticker.id === 'smiley') {
                        setSmileySpin((prev) => prev + 360);
                      }
                    }
                  }}
                  className="absolute cursor-grab active:cursor-grabbing w-11 h-11 rounded-full flex items-center justify-center border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] text-[#14141F] font-bold text-xs focus-visible:ring-2 focus-visible:ring-[#14141F] focus-visible:outline-none transition-shadow"
                >
                  {/* Subtle Vinyl Sheen Overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-black/10 pointer-events-none" />

                  {sticker.id === 'smiley' ? (
                    <Smile className="w-5 h-5 stroke-[2.5] relative z-10" />
                  ) : (
                    <span className="font-sans font-extrabold text-[12px] tracking-tight relative z-10">
                      hi ✦
                    </span>
                  )}
                </motion.div>
              );
            }

            // Link & Action Pill Stickers
            return (
              <motion.div
                key={sticker.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                onDragStart={() => bringToFront(sticker.id)}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                initial={false}
                animate={{
                  rotate: pos.rotate,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
                whileHover={
                  reducedMotion
                    ? {}
                    : {
                        scale: 1.04,
                        rotate: [pos.rotate, pos.rotate - 2, pos.rotate + 2, pos.rotate],
                        transition: { duration: 0.3 },
                      }
                }
                whileDrag={{
                  scale: 1.08,
                  rotate: pos.rotate + 4,
                  zIndex: 60,
                }}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  zIndex,
                }}
                className="absolute cursor-grab active:cursor-grabbing"
              >
                {sticker.type === 'email' ? (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={sticker.ariaLabel}
                    onClick={() => {
                      if (hasDragged.current) return;
                      handleCopyEmail();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCopyEmail();
                      }
                    }}
                    className="relative group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] text-[#14141F] font-medium text-[13px] sm:text-[14px] focus-visible:ring-2 focus-visible:ring-[#14141F] focus-visible:outline-none cursor-pointer overflow-hidden"
                    style={{ backgroundColor: sticker.color }}
                  >
                    {/* Vinyl Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />

                    <div className="relative z-10 flex items-center gap-2">
                      {renderIcon(sticker.id)}
                      <span className="font-mono text-xs sm:text-[12.5px] font-bold tracking-tight">
                        {sticker.label}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-extrabold bg-[#14141F] text-[#F4F3F8] px-1.5 py-0.5 rounded-full ml-0.5">
                        copy
                      </span>
                      <a
                        href={sticker.href}
                        aria-label="Open default mail client"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1 rounded-full hover:bg-black/10 transition-colors ml-0.5 cursor-pointer focus-visible:ring-1 focus-visible:ring-[#14141F]"
                        title="Open mailto:"
                      >
                        <ExternalLink className="w-3 h-3 text-[#14141F]" />
                      </a>
                    </div>
                  </div>
                ) : sticker.type === 'download' ? (
                  <a
                    href={sticker.href}
                    download
                    aria-label={sticker.ariaLabel}
                    onClick={(e) => {
                      if (hasDragged.current) {
                        e.preventDefault();
                      }
                    }}
                    className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] text-[#14141F] font-medium text-[13px] sm:text-[14px] focus-visible:ring-2 focus-visible:ring-[#14141F] focus-visible:outline-none cursor-pointer overflow-hidden"
                    style={{ backgroundColor: sticker.color }}
                  >
                    {/* Vinyl Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
                    <div className="relative z-10 flex items-center gap-1.5">
                      {renderIcon(sticker.id)}
                      <span className="font-semibold text-xs sm:text-[13px]">{sticker.label}</span>
                      <span className="text-[9px] font-mono opacity-80 font-bold">(PDF)</span>
                    </div>
                  </a>
                ) : (
                  <a
                    href={sticker.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sticker.ariaLabel}
                    onClick={(e) => {
                      if (hasDragged.current) {
                        e.preventDefault();
                      }
                    }}
                    className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] text-[#14141F] font-medium text-[13px] sm:text-[14px] focus-visible:ring-2 focus-visible:ring-[#14141F] focus-visible:outline-none cursor-pointer overflow-hidden"
                    style={{ backgroundColor: sticker.color }}
                  >
                    {/* Vinyl Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
                    <div className="relative z-10 flex items-center gap-1.5">
                      {renderIcon(sticker.id)}
                      <span className="font-semibold text-xs sm:text-[13px]">{sticker.label}</span>
                      <ExternalLink className="w-3 h-3 text-[#14141F]/80 ml-0.5" />
                    </div>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE WRAPPED GRID (<768px): Chunky Tappable Vinyl Pills    */}
      {/* ============================================================ */}
      <div className="md:hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pb-1.5 border-b border-[var(--border-hairline)]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[var(--accent-lime)]" />
            <span className="font-semibold text-[var(--text-primary)]">DIRECT CHANNELS</span>
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">TAP TO OPEN</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Email Full Width on Top */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Copy email address"
            onClick={handleCopyEmail}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCopyEmail();
              }
            }}
            className="col-span-2 min-h-[46px] px-3.5 py-2.5 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] bg-[#F4F3F8] text-[#14141F] flex items-center justify-between text-xs font-semibold cursor-pointer rotate-[-1deg] active:scale-[0.98] transition-transform overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/10 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-2 overflow-hidden">
              <Mail className="w-4 h-4 shrink-0 text-[#14141F]" />
              <span className="truncate font-mono text-[11px] font-bold">
                {siteConfig.contact.email}
              </span>
            </div>
            <span className="relative z-10 text-[9px] uppercase font-bold bg-[#14141F] text-[#F4F3F8] px-2 py-0.5 rounded-full ml-1 shrink-0">
              copy
            </span>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918954928960"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="min-h-[44px] px-3 py-2 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] bg-[#7CF0B4] text-[#14141F] flex items-center justify-center gap-2 text-xs font-bold rotate-[1deg] active:scale-[0.98] transition-transform relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={siteConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn"
            className="min-h-[44px] px-3 py-2 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] bg-[#D6FF3D] text-[#14141F] flex items-center justify-center gap-2 text-xs font-bold rotate-[-1deg] active:scale-[0.98] transition-transform relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-1.5">
              <LinkedinIcon className="w-4 h-4 shrink-0" />
              <span>LinkedIn</span>
            </span>
          </a>

          {/* GitHub */}
          <a
            href={siteConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub"
            className="min-h-[44px] px-3 py-2 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] bg-[#F4B860] text-[#14141F] flex items-center justify-center gap-2 text-xs font-bold rotate-[1deg] active:scale-[0.98] transition-transform relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-1.5">
              <GithubIcon className="w-4 h-4 shrink-0" />
              <span>GitHub</span>
            </span>
          </a>

          {/* Download CV */}
          <a
            href="/resume.pdf"
            download
            aria-label="Download CV curriculum vitae PDF"
            className="min-h-[44px] px-3 py-2 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] bg-[#FF9EB5] text-[#14141F] flex items-center justify-center gap-2 text-xs font-bold rotate-[-1deg] active:scale-[0.98] transition-transform relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-1.5">
              <FileText className="w-4 h-4 shrink-0" />
              <span>Download CV</span>
            </span>
          </a>

          {/* Decorative Smiley & Hi pill */}
          <div className="col-span-2 flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setSmileySpin((prev) => prev + 360)}
              aria-label="Decorative smiley sticker, click to spin"
              className="w-10 h-10 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] bg-[#D6FF3D] flex items-center justify-center text-[#14141F] cursor-pointer active:scale-90 transition-transform relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-black/10 pointer-events-none" />
              <motion.div animate={{ rotate: smileySpin }} transition={{ duration: 0.6 }}>
                <Smile className="w-5 h-5 stroke-[2.5] relative z-10" />
              </motion.div>
            </button>

            <div
              aria-label="Decorative hi badge"
              className="px-3.5 py-1 rounded-full border-[2.5px] border-[#14141F] shadow-[3px_3px_0_#14141F] bg-[#F4F3F8] text-[#14141F] font-bold text-xs relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />
              <span className="relative z-10">hi ✦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
