'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HeroObject } from './HeroObject';
import {
  ArrowUpRight,
  Home,
  Layers,
  Sparkles,
  User,
  Mail,
} from 'lucide-react';

interface HeroFrameProps {
  reducedMotion?: boolean;
}

const HERO_BLUR_DATA =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDhCmVU+o9aFjGCSM4FPjbO0EDFOcgBsAdKAP/Z';

export function generateNotchedPath(W: number, H: number): string {
  const R = 40; // Outer frame corner radius
  const r = 24; // Fillet / notch corner radius

  // Top notch: ~54% width, 64px tall, centered
  const wTop = Math.max(460, Math.min(W * 0.54, 760));
  const hTop = 64;
  const xt1 = (W - wTop) / 2;
  const xt2 = (W + wTop) / 2;

  // Bottom-right notch: ~220px wide, 64px tall
  const wBr = 220;
  const hBr = 64;
  const xbr2 = W - 48 - r;
  const xbr1 = xbr2 - wBr;

  // Left notch: ~72px wide, 260px tall, centered vertically
  const wLeft = 72;
  const hLeft = 260;
  const yl1 = H / 2 - hLeft / 2;
  const yl2 = H / 2 + hLeft / 2;

  return [
    `M ${R} 0`,
    // Top edge of left tab
    `H ${xt1 - r}`,
    // Concave curve into center notch
    `A ${r} ${r} 0 0 1 ${xt1} ${r}`,
    `V ${hTop - r}`,
    `A ${r} ${r} 0 0 0 ${xt1 + r} ${hTop}`,
    `H ${xt2 - r}`,
    `A ${r} ${r} 0 0 0 ${xt2} ${hTop - r}`,
    `V ${r}`,
    // Concave curve out onto right tab
    `A ${r} ${r} 0 0 1 ${xt2 + r} 0`,
    `H ${W - R}`,

    // Top-Right corner
    `A ${R} ${R} 0 0 1 ${W} ${R}`,

    // Right edge to bottom-right corner
    `V ${H - R}`,

    // Bottom-Right corner
    `A ${R} ${R} 0 0 1 ${W - R} ${H}`,

    // Bottom edge to bottom-right notch
    `H ${xbr2 + r}`,
    `A ${r} ${r} 0 0 1 ${xbr2} ${H - r}`,
    `V ${H - hBr + r}`,
    `A ${r} ${r} 0 0 0 ${xbr2 - r} ${H - hBr}`,
    `H ${xbr1 + r}`,
    `A ${r} ${r} 0 0 0 ${xbr1} ${H - hBr + r}`,
    `V ${H - r}`,
    `A ${r} ${r} 0 0 1 ${xbr1 - r} ${H}`,
    `H ${R}`,

    // Bottom-Left corner
    `A ${R} ${R} 0 0 1 0 ${H - R}`,

    // Left edge to left notch
    `V ${yl2 + r}`,
    `A ${r} ${r} 0 0 1 ${r} ${yl2}`,
    `H ${wLeft - r}`,
    `A ${r} ${r} 0 0 0 ${wLeft} ${yl2 - r}`,
    `V ${yl1 + r}`,
    `A ${r} ${r} 0 0 0 ${wLeft - r} ${yl1}`,
    `H ${r}`,
    `A ${r} ${r} 0 0 1 0 ${yl1 - r}`,
    `V ${R}`,

    // Top-Left corner
    `A ${R} ${R} 0 0 1 ${R} 0`,
    `Z`,
  ].join(' ');
}

export function generateInnerScreenPath(W: number, H: number): string {
  const Rin = 24;
  const r = 20;
  const wBr = 220;
  const hBr = 64;
  const xbr2 = W - 48 - 24;
  const xbr1 = xbr2 - wBr;
  const wLeft = 72;
  const hLeft = 260;
  const yl1 = H / 2 - hLeft / 2;
  const yl2 = H / 2 + hLeft / 2;

  return [
    `M ${12 + Rin} 64`,
    `H ${W - 12 - Rin}`,
    `A ${Rin} ${Rin} 0 0 1 ${W - 12} ${64 + Rin}`,
    `V ${H - 12 - Rin}`,
    `A ${Rin} ${Rin} 0 0 1 ${W - 12 - Rin} ${H - 12}`,
    `H ${xbr2 + r}`,
    `A ${r} ${r} 0 0 1 ${xbr2} ${H - 12 - r}`,
    `V ${H - hBr + r}`,
    `A ${r} ${r} 0 0 0 ${xbr2 - r} ${H - hBr}`,
    `H ${xbr1 + r}`,
    `A ${r} ${r} 0 0 0 ${xbr1} ${H - hBr + r}`,
    `V ${H - 12 - r}`,
    `A ${r} ${r} 0 0 1 ${xbr1 - r} ${H - 12}`,
    `H ${12 + Rin}`,
    `A ${Rin} ${Rin} 0 0 1 12 ${H - 12 - Rin}`,
    `V ${yl2 + r}`,
    `A ${r} ${r} 0 0 1 ${12 + r} ${yl2}`,
    `H ${wLeft - r}`,
    `A ${r} ${r} 0 0 0 ${wLeft} ${yl2 - r}`,
    `V ${yl1 + r}`,
    `A ${r} ${r} 0 0 0 ${wLeft - r} ${yl1}`,
    `H ${12 + r}`,
    `A ${r} ${r} 0 0 1 12 ${yl1 - r}`,
    `V ${64 + Rin}`,
    `A ${Rin} ${Rin} 0 0 1 ${12 + Rin} 64`,
    `Z`,
  ].join(' ');
}

export function HeroFrame({ reducedMotion = false }: HeroFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 1280, h: 720 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 85 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt max 1.5deg
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-1.5, 1.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [1.5, -1.5]);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({
            w: Math.round(rect.width),
            h: Math.round(rect.height),
          });
        }
      }
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

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

  const { w, h } = dimensions;
  const notchedPath = generateNotchedPath(w, h);
  const innerPath = generateInnerScreenPath(w, h);

  // Top notch coordinates
  const wTop = Math.max(460, Math.min(w * 0.54, 760));
  const xt1 = (w - wTop) / 2;
  const xt2 = (w + wTop) / 2;

  return (
    <>
      {/* =================================================================== */}
      {/* MOBILE HERO FRAME (< 768px): SIMPLER FRAME (Inset 10px, radius 28px) */}
      {/* =================================================================== */}
      <div className="block md:hidden relative w-full h-auto px-[10px] py-[10px] z-20">
        <div className="relative w-full min-h-[calc(100svh-20px)] h-auto rounded-[28px] bg-[#F4F3F8] p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.45)] flex flex-col overflow-visible">
          {/* Inner Screen */}
          <div className="relative w-full min-h-[calc(100svh-26px)] h-auto rounded-[25px] bg-[#10121F] flex flex-col justify-between overflow-visible">
            {/* Mountain photo layer -> Charcoal doodle artwork interior at scale(1.08) */}
            <div className="absolute inset-0 w-full h-full rounded-[25px] overflow-hidden pointer-events-none z-0">
              <Image
                src="/home/hero-bg.webp"
                alt="Charcoal doodle artwork backdrop interior"
                fill
                priority
                sizes="100vw"
                quality={85}
                placeholder="blur"
                blurDataURL={HERO_BLUR_DATA}
                className="object-cover object-[50%_30%] scale-[1.08]"
              />
            </div>

            {/* TOP NOTCH: Single top notch with logo and hamburger */}
            <div className="relative z-10 w-full flex justify-center pt-0">
              <div className="w-[min(260px,72%)] h-11 bg-[#ECEBF2] rounded-b-[18px] px-3.5 flex items-center justify-between shadow-xs">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-[6px] bg-[#111111] text-white flex items-center justify-center font-mono font-black text-xs">
                    A
                  </div>
                  <span className="font-sans text-xs font-bold text-[#111111] tracking-tight">
                    Akshat Agrawal
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('toggle-mobile-menu'))}
                  aria-label="Toggle navigation menu"
                  className="w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1 hover:bg-black/5 text-[#111111] cursor-pointer"
                >
                  <span className="w-3.5 h-[2px] bg-[#111111] rounded-full" />
                  <span className="w-3.5 h-[2px] bg-[#111111] rounded-full" />
                </button>
              </div>
            </div>

            {/* CONTENT (Normal vertical flow, no absolute positioning) */}
            <div className="relative z-10 w-full flex-1 px-4 pt-4 pb-6 flex flex-col items-center justify-center gap-3.5 text-center">
              {/* 1. Status chip: rgba(20,20,24,0.7), border 1px solid rgba(255,255,255,0.14) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(20,20,24,0.7)] backdrop-blur-[12px] border border-white/[0.14] text-[#F2F1F7] font-mono text-[11px] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D6FF3D] animate-pulse" />
                <span className="font-semibold text-[#F2F1F7]">Open to internships · 2026–27</span>
              </div>

              {/* 2. Headline: clamp(28px, 8.2vw, 48px), exactly 2 lines + 0.65 scrim */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center px-1">
                <div
                  className="absolute inset-0 -inset-x-8 pointer-events-none rounded-full blur-2xl"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(8,8,10,0.65) 0%, transparent 65%)',
                  }}
                  aria-hidden="true"
                />
                <h1
                  className="relative z-10 font-sans font-light text-white tracking-[-0.03em] leading-[1.1] text-center"
                  style={{
                    fontSize: 'clamp(24px, 7.0vw, 42px)',
                    textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  Building where<br />
                  <span className="font-serif italic font-normal text-white">AI meets</span> software.
                </h1>
              </div>

              {/* 3. Profile card (full width, shorter) -> LIGHT (#F4F3F8, ink #14141F) */}
              <div className="w-full max-w-[340px] p-3.5 rounded-[18px] bg-[#F4F3F8] border border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.25)] text-[#14141F] text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-sm text-[#14141F] tracking-tight">
                    Akshat Agrawal
                  </h3>
                  <span className="font-mono text-[10px] text-[#5E6073] font-medium">B.Tech CS</span>
                </div>
                <p className="text-xs text-[#5E6073] leading-relaxed">
                  Full-stack developer & AI systems builder at Newton School of Technology.
                </p>
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  {['Python', 'FastAPI', 'Next.js', 'React'].map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-full bg-black/[0.05] border border-black/10 font-mono text-[10px] text-[#14141F] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Single glass card (intro) -> DARK glass */}
              <div 
                style={{
                  background: 'rgba(24, 24, 28, 0.72)',
                  backdropFilter: 'blur(18px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(18px) saturate(120%)',
                }}
                className="w-full max-w-[340px] p-3.5 rounded-[18px] border border-white/[0.12] shadow-[0_12px_28px_rgba(0,0,0,0.35)] text-[#F2F1F7] text-left flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF3D]" />
                    <span className="font-mono text-[10px] uppercase font-bold text-[#B4B7CB]">Currently</span>
                  </div>
                  <p className="text-xs text-[#F2F1F7] font-medium leading-snug">
                    Studying B.Tech CS (2024–28) & building with AI.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#14141A] text-[#D6FF3D] border border-white/[0.14] font-mono text-[10px] font-bold hover:scale-105 transition-transform"
                >
                  <span>ABOUT</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* DESKTOP HERO FRAME (>= 768px): ORIGINAL NOTCHED BEZEL               */}
      {/* =================================================================== */}
      <motion.div
        ref={containerRef}
        initial={false}
        animate={{ opacity: 1, scale: 1.0 }}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="hidden md:block absolute inset-0 w-full h-full z-20 select-none perspective-[1200px]"
      >
        {/* 1. SOLID WHITE/LIGHT BEZEL SURFACE & BOX SHADOW */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox={`0 0 ${w} ${h}`}
        >
          <defs>
            <clipPath id="inner-screen-clip" clipPathUnits="userSpaceOnUse">
              <path d={innerPath} />
            </clipPath>
          </defs>

          {/* Deep Drop Shadow */}
          <path
            d={notchedPath}
            fill="none"
            stroke="rgba(0, 0, 0, 0.5)"
            strokeWidth="32"
            strokeLinejoin="round"
            style={{
              filter: 'blur(24px)',
            }}
          />

          {/* Crisp 1px White Edge Highlight */}
          <path
            d={notchedPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Solid #ECEBF2 Bezel Frame */}
          <path
            d={notchedPath}
            fill="#ECEBF2"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* 2. INNER SCREEN (Inside foreignObject clipped by innerScreenPath) */}
          <g clipPath="url(#inner-screen-clip)">
            <foreignObject x="0" y="0" width={w} height={h} className="pointer-events-auto">
              <div className="relative w-full h-full overflow-hidden bg-[#16161A]">
                {/* Same doodle photo at scale(1.08) with matching object-position */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <Image
                    src="/home/hero-bg.webp"
                    alt="Charcoal doodle artwork backdrop interior"
                    fill
                    priority
                    sizes="90vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={HERO_BLUR_DATA}
                    className="object-cover object-[50%_45%] scale-[1.08]"
                  />
                </div>

                {/* Top-Right Status Chip: rgba(20,20,24,0.7), border 1px solid rgba(255,255,255,0.14) */}
                <div className="absolute top-20 right-10 z-20 hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(20,20,24,0.7)] backdrop-blur-[12px] border border-white/[0.14] text-[#F2F1F7] font-mono text-[11px] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D6FF3D] animate-pulse" />
                  <span className="font-semibold text-[#F2F1F7]">Open to internships · 2026–27</span>
                </div>

                {/* =========================================================== */}
                {/* CSS GRID CONTENT: rows [auto 1fr auto] (Never Overlaps)     */}
                {/* =========================================================== */}
                <div className="relative z-10 w-full h-full px-6 sm:px-12 pt-20 sm:pt-16 pb-8 sm:pb-9 grid grid-rows-[auto_1fr_auto] items-center">
                  {/* Row 1: SINGLE Headline with soft radial scrim */}
                  <div className="relative z-10 w-full flex flex-col items-center justify-center pt-2 text-center select-none">
                    {/* Soft radial scrim sized to headline block */}
                    <div
                      className="absolute inset-0 -inset-x-12 pointer-events-none rounded-full blur-2xl"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(8,8,10,0.55) 0%, transparent 65%)',
                      }}
                      aria-hidden="true"
                    />

                    <h1
                      className="relative z-10 font-sans font-light text-white tracking-[-0.03em] leading-[1.03] text-center"
                      style={{
                        fontSize: 'clamp(36px, 5.0vw, 88px)',
                        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                      }}
                    >
                      <div className="overflow-hidden">
                        <motion.div
                          initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="whitespace-nowrap"
                        >
                          Building where
                        </motion.div>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div
                          initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="whitespace-nowrap opacity-70"
                        >
                          <span className="font-serif italic font-normal text-white">AI meets</span> software.
                        </motion.div>
                      </div>
                    </h1>
                  </div>

                  {/* Row 2: Hero Object / Profile Card in Center (LIGHT #F4F3F8) */}
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 25, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.85, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 w-full flex items-center justify-center -mt-2 sm:-mt-4"
                  >
                    <div className="w-[min(46vw,700px)] max-w-full">
                      <HeroObject reducedMotion={reducedMotion} />
                    </div>
                  </motion.div>

                  {/* Row 3: Cards zone -> DARK glass cards */}
                  <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-end pt-2">
                    {/* Lower Left Dark Glass Card */}
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.65, delay: 0.48 }}
                      style={{
                        background: 'rgba(24, 24, 28, 0.72)',
                        backdropFilter: 'blur(18px) saturate(120%)',
                        WebkitBackdropFilter: 'blur(18px) saturate(120%)',
                      }}
                      className="p-5 sm:p-6 rounded-[24px] border border-white/[0.12] shadow-[0_16px_36px_rgba(0,0,0,0.35)] text-[#F2F1F7] space-y-2.5 max-w-sm sm:max-w-md ml-2 sm:ml-6 mb-2"
                    >
                      <div className="space-y-1">
                        <h3 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight">
                          Akshat Agrawal
                        </h3>
                        <p className="text-xs sm:text-sm text-[#B4B7CB] leading-relaxed">
                          Full-stack developer and AI systems builder. B.Tech CS at Newton School of Technology.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {['Python', 'FastAPI', 'Next.js', 'React'].map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/10 font-mono text-[10px] text-white font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Lower Right Dark Glass Card: "Currently" */}
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.65, delay: 0.56 }}
                      style={{
                        background: 'rgba(24, 24, 28, 0.72)',
                        backdropFilter: 'blur(18px) saturate(120%)',
                        WebkitBackdropFilter: 'blur(18px) saturate(120%)',
                      }}
                      className="p-5 sm:p-6 rounded-[24px] border border-white/[0.12] shadow-[0_16px_36px_rgba(0,0,0,0.35)] text-[#F2F1F7] space-y-2 max-w-sm sm:max-w-md mr-16 sm:mr-28 mb-2 md:ml-auto"
                    >
                      <div className="flex items-center justify-between pb-1 border-b border-white/10">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#B4B7CB] font-bold">
                          Currently
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#D6FF3D]" />
                      </div>
                      <div className="space-y-2 pt-1">
                        <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                          Studying B.Tech CS (2024-2028) and building with AI.
                        </p>
                        <Link
                          href="/about"
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-white hover:text-[#D6FF3D] transition-colors"
                        >
                          <span>ABOUT ME</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#D6FF3D]" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* =================================================================== */}
        {/* 3. TOP NAVBAR: MATCHING REFERENCE IMAGE 1:1                         */}
        {/* - Top-Left White Tab: Monogram A + "Akshat Agrawal"                 */}
        {/* - Center Cutout Notch: Nav Links Work / Craft / About / Contact     */}
        {/* - Top-Right White Tab: "Get in touch" Button                        */}
        {/* =================================================================== */}

        {/* TOP-LEFT WHITE TAB: Logo & Brand */}
        <div
          className="absolute top-0 left-0 z-40 flex items-center px-6 sm:px-8 pointer-events-auto"
          style={{
            width: xt1,
            height: 64,
          }}
        >
          <Link href="/" className="flex items-center gap-2.5 select-none group">
            <div className="w-7 h-7 rounded-[7px] bg-[#111111] text-white flex items-center justify-center font-mono font-black text-xs transition-transform duration-200 group-hover:scale-105 shadow-2xs">
              A
            </div>
            <span className="font-sans text-[13px] font-bold text-[#111111] tracking-tight hidden sm:inline">
              Akshat Agrawal
            </span>
          </Link>
        </div>

        {/* CENTER NOTCH: Horizontal Navigation Links */}
        <div
          className="absolute top-0 z-40 flex items-center justify-center pointer-events-auto"
          style={{
            left: xt1,
            width: wTop,
            height: 64,
          }}
        >
          <nav
            aria-label="Notched Navigation"
            className="flex items-center gap-2 sm:gap-4 font-sans text-xs sm:text-[13px] select-none"
          >
            <Link
              href="/work"
              className="px-3.5 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium"
            >
              Work
            </Link>
            <Link
              href="/craft"
              className="px-3.5 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium"
            >
              Craft
            </Link>
            <Link
              href="/about"
              className="px-3.5 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3.5 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* TOP-RIGHT WHITE TAB: CTA Button */}
        <div
          className="absolute top-0 right-0 z-40 flex items-center justify-end px-6 sm:px-8 pointer-events-auto"
          style={{
            width: w - xt2,
            height: 64,
          }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-black text-[#D6FF3D] font-sans text-xs font-bold transition-transform hover:scale-105 shadow-xs select-none"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* =================================================================== */}
        {/* 4. LEFT NOTCH (Vertical Icon Dock, Active Home in Lime Circle)      */}
        {/* =================================================================== */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center pointer-events-auto"
          style={{
            width: 72,
            height: 260,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-2.5 p-2 rounded-2xl bg-[rgba(20,20,24,0.72)] backdrop-blur-2xl border border-white/[0.14] text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            {/* 1. Home (Active icon in lime circle) */}
            <Link
              href="/"
              title="Home"
              aria-label="Home"
              className="w-8 h-8 rounded-full bg-[#D6FF3D] text-[#111111] flex items-center justify-center shadow-[0_2px_10px_rgba(214,255,61,0.45)] hover:scale-105 transition-transform"
            >
              <Home className="w-4 h-4" />
            </Link>

            {/* 2. Work */}
            <Link
              href="/work"
              title="Work"
              aria-label="Work"
              className="w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <Layers className="w-4 h-4" />
            </Link>

            {/* 3. Craft */}
            <Link
              href="/craft"
              title="Craft"
              aria-label="Craft"
              className="w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </Link>

            {/* 4. About */}
            <Link
              href="/about"
              title="About"
              aria-label="About"
              className="w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* 5. Contact */}
            <Link
              href="/contact"
              title="Contact"
              aria-label="Contact"
              className="w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <Mail className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 5. RIGHT-BOTTOM NOTCH (Round Lime Arrow Button -> /about)           */}
        {/* =================================================================== */}
        <div
          className="absolute bottom-0 z-40 flex items-center justify-center pointer-events-auto"
          style={{
            right: 48 + 24, // Aligns with xbr2
            width: 220,
            height: 64,
          }}
        >
          <Link
            href="/about"
            data-cursor="open"
            className="group flex items-center justify-between gap-6 px-4 py-2 rounded-full bg-[#14141A] backdrop-blur-2xl border border-white/[0.14] text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-white/40 transition-all select-none"
          >
            <div className="flex flex-col text-left pl-1">
              <span className="font-mono text-[9px] text-[#D6FF3D] uppercase tracking-wider font-semibold">
                PROFILE
              </span>
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                ABOUT ME
              </span>
            </div>

            {/* Round lime arrow button */}
            <div className="w-8 h-8 rounded-full bg-[#D6FF3D] text-[#111111] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_2px_12px_rgba(214,255,61,0.4)]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
