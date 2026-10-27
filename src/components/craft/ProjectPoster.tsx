'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CraftProjectPoster } from '@/data/craft';
import { ArrowUpRight } from 'lucide-react';

interface ProjectPosterProps {
  project: CraftProjectPoster;
  accentColor: string;
}

function PosterArt({ artType, accentColor }: { artType: string; accentColor: string }) {
  if (artType === 'database' || artType === 'stack') {
    return (
      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-black/20 border border-white/10 p-5 flex flex-col justify-between group-hover:border-white/20 transition-colors shadow-inner">
        <div className="flex items-center justify-between font-mono text-[11px] opacity-70">
          <span>HIGH-THROUGHPUT SYSTEM</span>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Abstract Database Slabs & Flow Vector */}
        <svg viewBox="0 0 320 120" fill="none" className="w-full h-24 my-auto opacity-80" xmlns="http://www.w3.org/2000/svg">
          {/* Cylinder 1 */}
          <ellipse cx="60" cy="30" rx="40" ry="14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 30v40c0 8 18 14 40 14s40-6 40-14V30" stroke="currentColor" strokeWidth="1.5" />
          {/* Connectors */}
          <line x1="100" y1="50" x2="220" y2="50" stroke={accentColor} strokeWidth="2" strokeDasharray="4 4" />
          {/* Cylinder 2 */}
          <ellipse cx="260" cy="30" rx="40" ry="14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M220 30v40c0 8 18 14 40 14s40-6 40-14V30" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="flex items-center justify-between font-mono text-[10px] opacity-60">
          <span>POSTGRESQL // FASTAPI</span>
          <span>SUB-100MS LATENCY</span>
        </div>
      </div>
    );
  }

  if (artType === 'worktree' || artType === 'neural') {
    return (
      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-black/20 border border-white/10 p-5 flex flex-col justify-between group-hover:border-white/20 transition-colors shadow-inner">
        <div className="flex items-center justify-between font-mono text-[11px] opacity-70">
          <span>AUTONOMOUS AGENT HARNESS</span>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Abstract Neural Synapse / Git Worktree Vector */}
        <svg viewBox="0 0 320 120" fill="none" className="w-full h-24 my-auto opacity-85" xmlns="http://www.w3.org/2000/svg">
          {/* Main Worktree Branch */}
          <line x1="30" y1="60" x2="290" y2="60" stroke="currentColor" strokeWidth="2" />
          {/* Nodes */}
          <circle cx="50" cy="60" r="7" fill={accentColor} />
          <circle cx="120" cy="30" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="120" cy="90" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="200" cy="60" r="7" fill={accentColor} />
          <circle cx="270" cy="60" r="9" stroke={accentColor} strokeWidth="2" />

          {/* Arcs */}
          <path d="M50 60 Q 85 30 120 30 T 200 60" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M50 60 Q 85 90 120 90 T 200 60" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="flex items-center justify-between font-mono text-[10px] opacity-60">
          <span>9-PHASE WORKTREE</span>
          <span>100% VERIFIED PATCHES</span>
        </div>
      </div>
    );
  }

  // Bezier / Canvas Art
  return (
    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-black/20 border border-white/10 p-5 flex flex-col justify-between group-hover:border-white/20 transition-colors shadow-inner">
      <div className="flex items-center justify-between font-mono text-[11px] opacity-70">
        <span>TACTILE INTERFACE DESIGN</span>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>

      {/* Abstract Golden Spiral & Vector Bezier Curves */}
      <svg viewBox="0 0 320 120" fill="none" className="w-full h-24 my-auto opacity-80" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 20 100 C 60 100, 100 20, 160 20 C 220 20, 260 100, 300 100"
          stroke={accentColor}
          strokeWidth="2.5"
        />
        <path
          d="M 20 60 C 80 60, 120 100, 180 100 C 240 100, 270 40, 300 40"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <circle cx="160" cy="20" r="4" fill={accentColor} />
        <circle cx="180" cy="100" r="4" fill="currentColor" />
      </svg>

      <div className="flex items-center justify-between font-mono text-[10px] opacity-60">
        <span>SPRING PHYSICS</span>
        <span>EDITORIAL TYPOGRAPHY</span>
      </div>
    </div>
  );
}

export function ProjectPoster({ project, accentColor }: ProjectPosterProps) {
  const isExternal = project.href.startsWith('http');

  const Content = (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      data-cursor="view"
      className="relative w-full h-full rounded-[28px] sm:rounded-[36px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/25 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between space-y-6 group transition-colors shadow-lg overflow-hidden"
    >
      {/* Top Graphic Poster Art */}
      <div className="transform group-hover:scale-[1.02] transition-transform duration-300">
        <PosterArt artType={project.artType} accentColor={accentColor} />
      </div>

      {/* Main Project Details */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider opacity-60">
              {project.subtitle}
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Action Glyph */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/15 group-hover:scale-110 transition-transform shadow-xs"
            style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
          >
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        <p className="font-mono text-xs sm:text-sm opacity-80 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom Tags */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 font-mono text-[11px] opacity-80"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-current rounded-[36px]"
      >
        {Content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-current rounded-[36px]"
    >
      {Content}
    </Link>
  );
}
