'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '@/data/about';
import { Sparkles, Terminal, Database, Palette, BarChart3 } from 'lucide-react';

export function SkillsGrid() {
  const getCategoryIcon = (title: string) => {
    if (title.includes('AI')) return <Terminal className="w-4 h-4 text-[#FF5A36]" />;
    if (title.includes('Backend')) return <Database className="w-4 h-4 text-[var(--text-primary)]" />;
    if (title.includes('Frontend')) return <Palette className="w-4 h-4 text-[#FF5A36]" />;
    return <BarChart3 className="w-4 h-4 text-[var(--text-primary)]" />;
  };

  return (
    <section className="relative w-full py-8 space-y-8 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span className="font-semibold text-[var(--text-primary)]">03 // TECHNICAL TOOLCHAIN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-primary)] uppercase tracking-tight">
            Skills <span className="font-serif italic font-normal text-[var(--text-primary)]">&amp; Capabilities</span>
          </h2>
        </div>
        <span className="hidden sm:inline font-mono text-xs text-[var(--text-muted)]">
          MODULAR STACK
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aboutData.skills.map((cluster, cIdx) => (
          <div
            key={cluster.title}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] shadow-sm space-y-4 relative flex flex-col justify-between transition-colors"
          >
            {/* Washi tape accent strip */}
            <div
              className={`absolute -top-2.5 ${
                cIdx % 2 === 0 ? 'left-6 -rotate-2' : 'right-6 rotate-2'
              } w-12 h-3.5 bg-[#D6FF3D] text-[#111111] border border-black/10 backdrop-blur-xs shadow-xs`}
              aria-hidden="true"
            />

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-hairline)]">
                {getCategoryIcon(cluster.title)}
                <h3 className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  {cluster.title}
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {cluster.tools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ x: 2, scale: 1.01 }}
                    className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] flex items-center gap-2.5 transition-colors hover:border-[var(--text-primary)]/30"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#D6FF3D] text-[#111111] font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                      {tool.tag}
                    </span>
                    <span className="font-mono text-xs font-medium text-[var(--text-primary)] truncate">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-[var(--text-muted)] flex justify-between border-t border-[var(--border-hairline)]">
              <span>Verified in Prod</span>
              <span>{cluster.tools.length} Tools</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
