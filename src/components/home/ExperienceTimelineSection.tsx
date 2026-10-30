'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ExperienceTimelineSectionProps {
  reducedMotion?: boolean;
}

const TIMELINE_ENTRIES = [
  {
    period: '2024 — Present',
    role: 'Software & AI Systems Developer',
    org: 'Independent / Projects',
    description:
      'Engineering autonomous AI harnesses, full-stack applications, and high-throughput data backends.',
  },
  {
    period: '2024 — Present',
    role: 'B.Tech Computer Science',
    org: 'Newton School of Technology, Rishihood University',
    description:
      'Specializing in Computer Science & Artificial Intelligence with foundational algorithms and systems core.',
  },
  {
    period: '2024 — 2025',
    role: 'Director',
    org: 'Damru 2.0',
    description:
      'Cultural event planning and large-scale team management across university initiatives.',
  },
  {
    period: '2024',
    role: 'Organizing Committee',
    org: 'Neutron 2.0',
    description:
      'Coordinating technical activities, student hackathons, and software competitions.',
  },
  {
    period: '2024 — Present',
    role: 'Junior Mentor',
    org: 'Campus Peer Mentorship',
    description:
      'Guiding students in foundational programming, web architectures, and technical learning.',
  },
  {
    period: '2024 — 2025',
    role: 'Hackathons',
    org: 'Competitive Engineering',
    description:
      '3 national hackathons with Top 10 finishes.',
  },
];

export function ExperienceTimelineSection({
  reducedMotion = false,
}: ExperienceTimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-[1240px] mx-auto px-6 sm:px-12 py-16 md:py-24 select-none text-[#F2F1F7]"
      aria-label="Experience & Timeline"
    >
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <span className="font-mono text-xs text-[#9094AD] uppercase tracking-widest block mb-2">
          TIMELINE & BACKGROUND
        </span>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#F2F1F7]">
          Where I&apos;ve <span className="font-serif italic font-normal text-[#F2F1F7]">been</span>
        </h2>
      </div>

      {/* Vertical Timeline with Left-Aligned Line & Lime Nodes */}
      <div className="relative pl-6 sm:pl-10 space-y-10 sm:space-y-12">
        {/* Continuous Vertical Line */}
        <div
          className="absolute left-[7px] sm:left-[11px] top-2 bottom-4 w-px bg-white/15"
          aria-hidden="true"
        />

        {TIMELINE_ENTRIES.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={reducedMotion ? {} : { opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative group"
          >
            {/* Glowing Lime Node */}
            <div
              className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#0E1016] border-2 border-[#D6FF3D] group-hover:bg-[#D6FF3D] transition-colors shadow-[0_0_8px_rgba(214,255,61,0.5)]"
              aria-hidden="true"
            />

            <div className="space-y-1.5">
              {/* Date in Mono */}
              <div className="font-mono text-xs text-[#9094AD] uppercase tracking-wider">
                {entry.period}
              </div>

              {/* Title & Organization */}
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-lg sm:text-xl font-semibold text-[#F2F1F7] tracking-tight">
                  {entry.role}
                </span>
                <span className="font-mono text-xs sm:text-sm text-[#D0D3E2]">
                  · {entry.org}
                </span>
              </div>

              {/* One Line Summary */}
              <p className="font-mono text-xs sm:text-sm text-[#D0D3E2] max-w-2xl leading-relaxed">
                {entry.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
