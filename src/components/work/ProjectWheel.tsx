'use client';

import React, { useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from 'framer-motion';
import { Project } from '@/data/projects';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowUpRight, Terminal, Cpu } from 'lucide-react';

interface ProjectWheelProps {
  projects: Project[];
  sectionIndex?: string;
  sectionTitle?: string;
  headerAction?: React.ReactNode;
}

// Angular spacing between projects on the wheel
const ANGLE_STEP = 34; // degrees
const PROJECT_ANGLES = [0, -ANGLE_STEP, -ANGLE_STEP * 2]; // 0°, -34°, -68°
const TOTAL_TICKS = 72; // every 5 degrees around 360°

// Motion preference subscription using React useSyncExternalStore
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

// Bespoke abstract CSS/SVG mini-visuals for the wheel sticker cards
function ProjectStickerVisual({ slug }: { slug: string }) {
  if (slug === 'anvil') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-2.5 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-1 text-[var(--accent-lime-text)] bg-[var(--accent-lime)] px-1.5 py-0.2 rounded font-bold">
            9-PHASE
          </span>
          <span>SANDBOXED</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-1">
          <Terminal className="w-5 h-5 text-[var(--accent-lime)] shrink-0" />
          <div className="h-0.5 w-8 bg-[var(--border-hairline)]" />
          <Cpu className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
        </div>
        <div className="text-[9px] font-mono text-[var(--text-muted)] flex justify-between">
          <span>GIT WORKTREES</span>
          <span className="text-emerald-500">100% REPRO</span>
        </div>
      </div>
    );
  }

  if (slug === 'healthwe') {
    return (
      <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-2.5 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span className="text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
            CLINICAL AI
          </span>
          <span>PYDANTIC V2</span>
        </div>
        <div className="space-y-1 py-1">
          <div className="h-1.5 w-4/5 rounded bg-[var(--accent-lime)]" />
          <div className="h-1.5 w-3/5 rounded bg-[var(--border-hairline)]" />
          <div className="h-1.5 w-full rounded bg-[var(--border-hairline)]" />
        </div>
        <div className="text-[9px] font-mono text-[var(--text-muted)] flex justify-between">
          <span>SOURCE GROUNDED</span>
          <span>FASTAPI</span>
        </div>
      </div>
    );
  }

  // countrees-ai-erp
  return (
    <div className="w-full h-24 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] p-2.5 flex flex-col justify-between overflow-hidden relative">
      <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
        <span className="text-blue-500 font-bold bg-blue-500/10 px-1.5 py-0.2 rounded">
          BACKEND ERP
        </span>
        <span>POSTGRESQL</span>
      </div>
      <div className="grid grid-cols-3 gap-1 py-1">
        <div className="h-6 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[8px] font-mono">
          B-TREE
        </div>
        <div className="h-6 rounded bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-bold flex items-center justify-center text-[8px] font-mono">
          INDEX
        </div>
        <div className="h-6 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[8px] font-mono">
          ACID
        </div>
      </div>
      <div className="text-[9px] font-mono text-[var(--text-muted)] flex justify-between">
        <span>QUERY TUNED</span>
        <span>DOCKER</span>
      </div>
    </div>
  );
}

export function ProjectWheel({
  projects,
  sectionIndex = '01',
  sectionTitle = 'SELECTION',
  headerAction,
}: ProjectWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Scroll tracking across 400vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll (0..1) to rotation (0 to 68 degrees to bring projects 0, 1, 2 to 0° active apex)
  const rawRotation = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, ANGLE_STEP, ANGLE_STEP * 2]
  );

  // Smooth with weighted spring for weighty, tactile gauge feel
  const wheelRotation = useSpring(rawRotation, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  });

  // Active project calculation based on wheel rotation
  useMotionValueEvent(wheelRotation, 'change', (latest) => {
    let closestIndex = 0;
    let minDistance = Infinity;

    PROJECT_ANGLES.forEach((baseAngle, idx) => {
      const currentAngle = latest + baseAngle;
      const distance = Math.abs(currentAngle);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < projects.length) {
      setActiveIndex(closestIndex);
    }
  });

  const activeProject = projects[activeIndex] || projects[0];

  // If reduced motion is preferred, render standard accessible cards list
  if (reducedMotion) {
    return (
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-8 pt-8">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[var(--text-muted)]">{sectionIndex} {"//"} {sectionTitle}</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Selected <span className="font-serif italic font-normal">Projects</span>
            </h2>
          </div>
          {headerAction ? headerAction : (
            <Link href="/work" className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              view all case studies ↗
            </Link>
          )}
        </div>

        <div className="space-y-6">
          {projects.map((p, idx) => (
            <article
              key={p.slug}
              className="p-8 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>0{idx + 1} {"//"} {p.categoryLabel}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="text-2xl font-bold">{p.title} — {p.subtitle}</h3>
              <p className="text-sm text-[var(--text-muted)]">{p.summary}</p>
              <Link
                href={`/work/${p.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-mono text-xs font-bold"
              >
                <span>view case study</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh]"
      aria-label="Selected Work Interactive Project Wheel"
    >
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--bg-base)] flex flex-col justify-between pt-20 md:pt-24 pb-8 transition-colors duration-200">
        {/* Top Header Bar */}
        <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 shrink-0 z-20">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--text-muted)]">{sectionIndex} {"//"} {sectionTitle}</span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
              <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                SCROLL-DRIVEN PROJECT DIAL
              </span>
            </div>

            {headerAction ? headerAction : (
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                data-cursor="all"
              >
                <span>index view (all 3)</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Center Main Area: Left Wheel Arc + Right Details Panel */}
        <div className="relative flex-1 w-full max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between min-h-0">
          {/* ============================================================ */}
          {/* LEFT: THE GIANT PROJECT WHEEL DIAL                           */}
          {/* ============================================================ */}
          <div className="relative w-full lg:w-[48%] h-[300px] sm:h-[360px] lg:h-full flex items-center justify-start pointer-events-none select-none">
            {/* Active Gauge Marker / Arrow pointing to 3 o'clock */}
            <div className="absolute left-2 sm:left-4 lg:left-[42vw] top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center gap-2 pointer-events-none">
              <div className="w-3.5 h-0.5 bg-[var(--accent-lime)]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent-lime-text)] bg-[var(--accent-lime)] px-1.5 py-0.5 rounded font-bold">
                ACTIVE
              </span>
            </div>

            {/* The Huge Circular Dial */}
            <motion.div
              style={{
                rotate: wheelRotation,
                willChange: 'transform',
              }}
              className="absolute -left-[90vw] sm:-left-[60vw] lg:-left-[42vw] top-1/2 -translate-y-1/2 w-[145vh] h-[145vh] max-w-[1150px] max-h-[1150px] rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)]/45 pointer-events-auto"
            >
              {/* Inner Decorative Hairline Circles */}
              <div className="absolute inset-8 rounded-full border border-dashed border-[var(--border-hairline)] opacity-60" />
              <div className="absolute inset-24 rounded-full border border-[var(--border-hairline)] opacity-35" />

              {/* Center Pivot Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-lime)]" />
              </div>

              {/* 72 Hairline SVG Ticks around the perimeter */}
              <svg
                viewBox="0 0 1000 1000"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {Array.from({ length: TOTAL_TICKS }).map((_, i) => {
                  const deg = i * 5;
                  const isMajor = deg % 30 === 0;
                  const rad = (deg * Math.PI) / 180;
                  const cx = 500;
                  const cy = 500;
                  const outerR = 496;
                  const innerR = isMajor ? 468 : 484;

                  const x1 = cx + outerR * Math.cos(rad);
                  const y1 = cy + outerR * Math.sin(rad);
                  const x2 = cx + innerR * Math.cos(rad);
                  const y2 = cy + innerR * Math.sin(rad);

                  return (
                    <line
                      key={deg}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--border-hairline)"
                      strokeWidth={isMajor ? 1.5 : 0.9}
                      className={isMajor ? 'stroke-[var(--text-muted)]' : ''}
                    />
                  );
                })}
              </svg>

              {/* Perimeter Labels Tangent to the Arc */}
              {[
                { angle: -24, text: 'SEP 2026' },
                { angle: -12, text: 'ANVIL HARNESS' },
                { angle: 10, text: 'HEALTHWE AI' },
                { angle: 22, text: 'CLINICAL EHR' },
                { angle: 45, text: 'COUNTREES ERP' },
                { angle: 58, text: '2025' },
              ].map((lbl, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${lbl.angle}deg) translate(470px) rotate(90deg)`,
                    transformOrigin: '0 0',
                  }}
                  className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] select-none whitespace-nowrap opacity-75"
                >
                  {lbl.text}
                </div>
              ))}

              {/* Small Playful Decorative Stickers on the Wheel */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(-18deg) translate(370px) rotate(18deg)`,
                  transformOrigin: '0 0',
                }}
                className="px-2 py-0.5 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-mono text-[9px] font-bold border border-black/10 shadow-xs"
              >
                ✦ shipped
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(16deg) translate(380px) rotate(-16deg)`,
                  transformOrigin: '0 0',
                }}
                className="px-2 py-0.5 rounded-md bg-[var(--bg-base)] border border-[var(--border-hairline)] font-serif italic text-xs text-[var(--text-muted)] shadow-xs"
              >
                &ldquo;zero hallucinations&rdquo;
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(52deg) translate(370px) rotate(-52deg)`,
                  transformOrigin: '0 0',
                }}
                className="w-5 h-5 rounded-full bg-[var(--bg-base)] border border-[var(--border-hairline)] flex items-center justify-center text-[10px] text-[var(--accent-tomato)]"
              >
                ●
              </div>

              {/* The 3 Project Cards Sitting on the Wheel */}
              {projects.map((proj, idx) => {
                const baseAngle = PROJECT_ANGLES[idx];
                const isActive = activeIndex === idx;

                return (
                  <WheelProjectCard
                    key={proj.slug}
                    project={proj}
                    baseAngle={baseAngle}
                    index={idx}
                    isActive={isActive}
                    wheelRotation={wheelRotation}
                    onClick={() => setActiveIndex(idx)}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: ACTIVE PROJECT DETAILS EDITORIAL PANEL                */}
          {/* ============================================================ */}
          <div className="relative w-full lg:w-[48%] pl-0 lg:pl-10 z-20 flex flex-col justify-center py-4 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-bold text-[10px] uppercase tracking-wider">
                    {activeProject.categoryLabel}
                  </span>
                  <span>{"//"} {activeProject.year}</span>
                  <span className="hidden sm:inline">· {activeProject.role}</span>
                </div>

                {/* Big Display Title with Italic Serif Accent */}
                <div className="space-y-2">
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
                    {activeProject.title}{' '}
                    <span className="font-serif italic font-normal text-[var(--text-muted)] block sm:inline">
                      — {activeProject.subtitle}
                    </span>
                  </h3>
                </div>

                {/* One-Line Editorial Summary */}
                <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
                  {activeProject.summary}
                </p>

                {/* Stack Pills in Mono */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeProject.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-primary)] shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Magnetic View Case Study Button */}
                <div className="pt-3 flex items-center gap-4">
                  <MagneticButton dataCursor="view">
                    <Link
                      href={`/work/${activeProject.slug}`}
                      className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-mono font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>view case study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </MagneticButton>

                  <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline">
                    read full architecture & tradeoffs
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar: Dial Gauge Counter & Progress Strip */}
        <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 shrink-0 z-20">
          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            {/* Step Counter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[var(--text-primary)]">
                0{activeIndex + 1} <span className="text-[var(--text-muted)] font-normal">/ 03</span>
              </span>
              <span className="hidden sm:inline text-[11px] opacity-75">
                {activeProject.title}
              </span>
            </div>

            {/* Visual Dial Progress Line */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
                scroll to rotate dial
              </span>
              <div className="w-28 sm:w-36 h-1 rounded-full bg-[var(--border-hairline)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent-lime)]"
                  animate={{ width: `${((activeIndex + 1) / 3) * 100}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual card placed on the rotating wheel
interface WheelProjectCardProps {
  project: Project;
  baseAngle: number;
  index: number;
  isActive: boolean;
  wheelRotation: MotionValue<number>;
  onClick: () => void;
}

function WheelProjectCard({
  project,
  baseAngle,
  index,
  isActive,
  wheelRotation,
  onClick,
}: WheelProjectCardProps) {
  // Compute counter-rotation so card stays upright at all times
  const counterRotation = useTransform(wheelRotation, (r: number) => -(r + baseAngle));

  // Distance from 0° active apex (where 3 o'clock points toward details)
  const angularDistance = useTransform(wheelRotation, (r: number) => {
    return Math.abs(r + baseAngle);
  });

  const cardScale = useTransform(angularDistance, [0, ANGLE_STEP, ANGLE_STEP * 2], [1.0, 0.76, 0.65]);
  const cardOpacity = useTransform(angularDistance, [0, ANGLE_STEP, ANGLE_STEP * 2], [1.0, 0.42, 0.22]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `rotate(${baseAngle}deg) translate(370px)`,
        transformOrigin: '0 0',
      }}
      className="pointer-events-auto"
    >
      <motion.div
        style={{
          rotate: counterRotation,
          scale: cardScale,
          opacity: cardOpacity,
          willChange: 'transform, opacity',
        }}
        onClick={onClick}
        whileHover={{ scale: isActive ? 1.03 : 0.85 }}
        className={`w-64 sm:w-72 p-4 rounded-2xl border transition-colors duration-200 cursor-pointer shadow-md select-none ${
          isActive
            ? 'bg-[var(--bg-surface-elevated)] border-[var(--text-primary)] ring-2 ring-[var(--accent-lime)]/70'
            : 'bg-[var(--bg-surface)] border-[var(--border-hairline)] hover:border-[var(--text-primary)]/50'
        }`}
        data-cursor="view"
      >
        <div className="space-y-3">
          {/* Card Top Meta */}
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
            <span className="font-bold text-[var(--text-primary)]">
              0{index + 1} {"//"} {project.year}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full uppercase font-medium ${
                isActive
                  ? 'bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-bold'
                  : 'bg-[var(--bg-base)] text-[var(--text-muted)]'
              }`}
            >
              {project.categoryLabel}
            </span>
          </div>

          {/* Abstract CSS/SVG Visual */}
          <ProjectStickerVisual slug={project.slug} />

          {/* Title & Role */}
          <div className="space-y-0.5">
            <h4 className="text-base font-bold tracking-tight text-[var(--text-primary)] flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-transform ${
                  isActive ? 'text-[var(--accent-lime)]' : 'text-[var(--text-muted)]'
                }`}
              />
            </h4>
            <p className="text-[11px] font-mono text-[var(--text-muted)] truncate">
              {project.subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
