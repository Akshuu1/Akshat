'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CraftDiscipline } from '@/data/craft';
import { ProjectPoster } from './ProjectPoster';

interface DisciplinePanelProps {
  discipline: CraftDiscipline;
  index: number;
  reducedMotion?: boolean;
}

export function DisciplinePanel({
  discipline,
  index,
  reducedMotion = false,
}: DisciplinePanelProps) {
  return (
    <section
      id={discipline.id}
      style={{
        backgroundColor: discipline.colors.bg,
        color: discipline.colors.text,
      }}
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 flex flex-col justify-between overflow-hidden select-none transition-colors duration-500"
    >
      {/* Background Giant Outlined Typographic Silhouette (~18vw, 15% opacity, stroke 2px) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-display font-black text-[clamp(90px,18vw,320px)] tracking-tighter leading-none whitespace-nowrap opacity-15 text-center"
        style={{
          WebkitTextStroke: '2px currentColor',
          color: 'transparent',
        }}
        aria-hidden="true"
      >
        {discipline.outlineLabel}
      </div>

      {/* Subtle Radial Ambient Hearth Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-15"
        style={{
          background: `radial-gradient(circle, ${discipline.colors.accent} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Container for content */}
      <div className="relative z-10 max-w-[1360px] mx-auto w-full space-y-12 sm:space-y-16">
        {/* Top Header Row & Editorial Statement */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs opacity-70">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: discipline.colors.accent }}
              />
              <span className="font-semibold">{discipline.modeNumber}</span>
              <span className="opacity-40">/</span>
              <span>{discipline.label}</span>
            </div>
            <span className="hidden sm:inline uppercase tracking-widest text-[10px]">
              PANEL 0{index + 1}
            </span>
          </div>

          {/* Statement: Display type with one word italic serif in accent color */}
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] max-w-4xl"
          >
            {discipline.statement.prefix}
            <span
              className="font-serif italic font-normal"
              style={{ color: discipline.colors.accent }}
            >
              {discipline.statement.italicWord}
            </span>
            {discipline.statement.suffix}
          </motion.h2>
        </div>

        {/* Horizontal Row of 2 Project Posters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
          {discipline.projects.map((project) => (
            <motion.div
              key={project.id}
              initial={reducedMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectPoster
                project={project}
                accentColor={discipline.colors.accent}
              />
            </motion.div>
          ))}
        </div>

        {/* Tools Shown as ONE line of plain mono text separated by " / " */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs sm:text-sm opacity-80"
        >
          <span className="opacity-50 text-[10px] tracking-widest uppercase shrink-0">
            DISCIPLINE TOOLCHAIN:
          </span>
          <p className="font-mono tracking-tight truncate max-w-4xl">
            {discipline.tools.join(' / ')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
