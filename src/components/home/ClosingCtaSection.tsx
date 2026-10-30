'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

interface ClosingCtaSectionProps {
  reducedMotion?: boolean;
}

export function ClosingCtaSection({ reducedMotion = false }: ClosingCtaSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      className="relative w-full min-h-[75svh] flex flex-col justify-center items-center text-center px-6 py-20 bg-[#0E1016] text-[#F2F1F7] select-none"
      aria-label="Closing Call to Action"
    >
      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
        {/* Giant Statement: "got something to build? let's talk." on 2 lines */}
        <h2
          style={{
            fontSize: 'clamp(32px, 9vw, 68px)',
            maxWidth: '16ch',
          }}
          className="font-light tracking-tight text-[#F2F1F7] leading-[1.08] mx-auto select-none"
        >
          got something to build?{' '}
          <span className="font-serif italic font-normal text-[#F2F1F7] block sm:inline">
            let&apos;s talk.
          </span>
        </h2>

        {/* Buttons: full width stacked on mobile, inline row on desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
          {/* Lime Button: "start a conversation" -> /contact */}
          <Link
            href="/contact"
            data-cursor="contact"
            className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#D6FF3D] text-[#14141F] font-mono text-sm font-semibold hover:bg-[#cbf731] transition-all duration-200 shadow-xl shadow-[#D6FF3D]/10 hover:shadow-[#D6FF3D]/25 w-full sm:w-auto"
          >
            <span>start a conversation</span>
            <div className="w-5 h-5 rounded-full bg-[#14141F]/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#14141F]" />
            </div>
          </Link>

          {/* Dual Resume Download Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <a
              href={siteConfig.resumes.ai.href}
              target="_blank"
              rel="noopener noreferrer"
              download={siteConfig.resumes.ai.filename}
              data-cursor="cv"
              className="group inline-flex items-center justify-center gap-2 px-4.5 py-3 rounded-full bg-transparent border border-white/20 text-[#F2F1F7] font-mono text-xs sm:text-sm font-medium hover:border-[#D6FF3D] hover:bg-[#D6FF3D]/10 transition-all duration-200"
              title="Download AI & Machine Learning Resume (PDF)"
            >
              <span>AI / ML CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D6FF3D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={siteConfig.resumes.fullstack.href}
              target="_blank"
              rel="noopener noreferrer"
              download={siteConfig.resumes.fullstack.filename}
              data-cursor="cv"
              className="group inline-flex items-center justify-center gap-2 px-4.5 py-3 rounded-full bg-transparent border border-white/20 text-[#F2F1F7] font-mono text-xs sm:text-sm font-medium hover:border-[#5CE1E6] hover:bg-[#5CE1E6]/10 transition-all duration-200"
              title="Download Full-Stack Engineering Resume (PDF)"
            >
              <span>Full-Stack CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5CE1E6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Mono Email beneath: Copy on click with toast */}
        <div className="pt-2">
          <button
            onClick={handleCopyEmail}
            type="button"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1D2B] border border-white/10 hover:border-white/25 transition-all text-xs font-mono text-[#D0D3E2] hover:text-[#F2F1F7] cursor-pointer"
          >
            <span>{siteConfig.contact.email}</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[#D6FF3D] font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>copied</span>
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#9094AD] group-hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
