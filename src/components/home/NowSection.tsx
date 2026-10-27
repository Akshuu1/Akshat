'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface NowSectionProps {
  reducedMotion?: boolean;
}

export function NowSection({ reducedMotion = false }: NowSectionProps) {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIstTime(timeStr);
      } catch {
        setIstTime('Live // IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="now"
      className="relative w-full bg-[#0F1118] text-[#F2F1F7] py-20 sm:py-28 scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 md:px-14">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[720px] mx-auto rounded-[28px] bg-[#1D2130] border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-7 sm:p-9 space-y-5"
        >
          {/* Header Row: Live IST Clock in Mono */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <span
              className="font-mono text-xs uppercase tracking-wider font-semibold"
              style={{ color: '#8A8EA8' }}
            >
              Now
            </span>

            <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-[#161824] border border-white/[0.08] text-[#F2F1F7]">
              <Clock className="w-3.5 h-3.5 text-[#D6FF3D]" />
              <span>{istTime || 'Loading...'} IST</span>
            </div>
          </div>

          {/* Education Line */}
          <div className="space-y-2">
            <p
              className="font-sans font-medium text-base sm:text-lg leading-relaxed"
              style={{ color: '#F2F1F7' }}
            >
              B.Tech CS at Newton School of Technology, Rishihood University (2024-2028).
            </p>
          </div>

          {/* Availability Line with Pulsing Lime Dot */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2.5 font-sans text-sm sm:text-base">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6FF3D] animate-pulse shrink-0" />
            <span
              className="font-medium"
              style={{ color: '#F2F1F7' }}
            >
              Open to internships and placements, 2026-27.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
