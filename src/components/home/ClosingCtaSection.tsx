'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';

interface ClosingCtaSectionProps {
  reducedMotion?: boolean;
}

export function ClosingCtaSection({ reducedMotion = false }: ClosingCtaSectionProps) {
  return (
    <section
      id="closing-cta"
      className="relative w-full bg-[#161925] text-[#F2F1F7] py-28 sm:py-36 md:py-44 scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 md:px-14 flex flex-col items-center text-center">
        {/* Giant Light-weight 2-line Headline (max-width: 16ch) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10 sm:space-y-12 flex flex-col items-center"
        >
          <h2
            className="font-sans font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F2F1F7] leading-[1.02] mx-auto select-none"
            style={{ maxWidth: '16ch' }}
          >
            got something to build?{' '}
            <span className="font-serif italic font-normal text-[#9AA3FF] block sm:inline">
              let&apos;s talk.
            </span>
          </h2>

          {/* Two Buttons: Lime "start a conversation" & Outlined "download cv" */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              data-cursor="contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#D6FF3D] hover:bg-[#cbf532] text-[#111111] font-sans text-sm sm:text-base font-bold shadow-[0_4px_24px_rgba(214,255,61,0.35)] transition-all hover:scale-105 active:scale-95"
            >
              <span>start a conversation</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <a
              href="/resume.pdf"
              download
              data-cursor="cv"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/[0.05] text-[#F2F1F7] font-mono text-sm transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-[#8A8EA8]" />
              <span>download cv</span>
            </a>
          </div>

          {/* Single Mono Line Under Buttons */}
          <div className="pt-2">
            <a
              href="mailto:akshat.agrawal2024@nst.rishihood.edu.in"
              className="font-mono text-xs sm:text-sm text-[#8A8EA8] hover:text-[#F2F1F7] transition-colors"
            >
              akshat.agrawal2024@nst.rishihood.edu.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
