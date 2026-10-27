'use client';

import React from 'react';
import { aboutData } from '@/data/about';
import { Briefcase, GraduationCap } from 'lucide-react';

export function ExperienceEducation() {
  return (
    <section className="relative w-full py-8 space-y-8 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
            <span className="font-semibold text-[var(--text-primary)]">02 // EXPERIENCE & FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-primary)] uppercase tracking-tight">
            Background <span className="font-serif italic font-normal text-[var(--text-muted)]">&amp; Education</span>
          </h2>
        </div>
        <span className="hidden sm:inline font-mono text-xs text-[var(--text-muted)]">
          VERIFIED RECORD
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* Experience Card */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm space-y-6 flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
          {/* Corner Washi Tape Accent */}
          <div
            className="absolute -top-3 left-8 w-16 h-5 bg-[#FF5A36]/90 text-white border border-black/10 -rotate-2 shadow-xs pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-5">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <Briefcase className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-bold text-[var(--text-primary)] tracking-wider uppercase">
                EXPERIENCE
              </span>
            </div>

            {aboutData.experience.map((exp) => (
              <div key={exp.company} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {exp.role}{' '}
                    <span className="font-serif italic font-normal text-[var(--text-muted)]">
                      at
                    </span>{' '}
                    {exp.company}
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-primary)] font-medium px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] w-[42%] ">
                    {exp.period}
                  </span>
                </div>

                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {exp.location}
                </p>

                <ul className="space-y-2.5 pt-2 font-mono text-xs text-[var(--text-primary)] leading-relaxed">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FF5A36] mt-0.5 shrink-0">✦</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span>Domain: ERP &amp; Data Workflows</span>
            <span className="font-semibold text-[var(--text-primary)]">Python · FastAPI · Docker</span>
          </div>
        </div>

        {/* Education Card */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm space-y-6 flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
          {/* Corner Washi Tape Accent */}
          <div
            className="absolute -top-3 right-8 w-16 h-5 bg-[#D6FF3D] text-[#111111] border border-black/10 rotate-3 shadow-xs pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-5">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <GraduationCap className="w-4 h-4 text-[var(--text-primary)]" />
              <span className="font-bold text-[var(--text-primary)] tracking-wider uppercase">
                ACADEMIC FOUNDATIONS
              </span>
            </div>

            <div className="space-y-4">
              {aboutData.education.map((edu, idx) => (
                <div
                  key={edu.degree}
                  className={`space-y-1.5 ${
                    idx !== 0 ? 'pt-4 border-t border-[var(--border-hairline)]' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className=" font-bold text-[var(--text-primary)]">
                      {edu.degree}
                    </h3>
                    <span className="font-mono text-xs font-bold text-[#111111] bg-[#D6FF3D] px-2 py-0.5 rounded w-fit border border-black/15">
                      {edu.grade}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[var(--text-muted)]">
                    {edu.institution}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--text-muted)]">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span>Newton School of Technology</span>
            <span className="font-semibold text-[var(--text-primary)]">Class of 2028</span>
          </div>
        </div>
      </div>
    </section>
  );
}
