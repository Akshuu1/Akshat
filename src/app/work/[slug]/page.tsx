import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { projects, Project } from '@/data/projects';
import {
  AnvilArchitectureDiagram,
  HealthWeArchitectureDiagram,
  HookPilotArchitectureDiagram,
  IrrigIQArchitectureDiagram,
  MarketingAbTestDiagram,
  NycTaxiAnalyticsDiagram,
  StockMarketAnalyticsDiagram,
} from '@/components/work/SystemArchitectureSvg';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.filter((p) => !p.isVisualOnly).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export const instant = false;

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project: Project = projects[projectIndex];
  if (project.isVisualOnly) {
    redirect('/work?filter=design');
  }
  const nextProject: Project = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="max-w-[1140px] mx-auto px-5 sm:px-8 md:px-12 pt-20 md:pt-24 pb-14 md:pb-20 space-y-8 md:space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>back to all work</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[var(--text-muted)]">
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-semibold text-[10px] uppercase tracking-wider">
            {project.categoryLabel}
          </span>
          <span>{"//"} {project.year}</span>
          <span>· {project.role}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
          {project.title}{' '}
          <span className="font-serif italic font-normal text-[var(--text-primary)] block sm:inline">
            — {project.subtitle}
          </span>
        </h1>

        <p
          style={{ color: 'var(--text-muted)' }}
          className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed font-mono"
        >
          {project.summary}
        </p>

        {/* Action & Links Row */}
        <div className="pt-1 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--category-accent,var(--accent-lime))] bg-[var(--category-accent,var(--accent-lime))]/10 text-xs font-mono font-semibold text-[var(--text-primary)] hover:bg-[var(--category-accent,var(--accent-lime))]/20 transition-colors"
              data-cursor="open"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>view live project / viz</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono hover:border-[var(--text-primary)]/40 transition-colors"
              data-cursor="github"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>repository (code)</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
            </a>
          )}
        </div>
      </div>

      {/* Key Metrics / Impact Strip (High Signal Details) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-hairline)] font-mono text-[11px] text-[var(--text-muted)]">
            <span className="uppercase tracking-wider font-semibold">Key Metrics & Impact</span>
            <span>DATA-BACKED VERIFICATION</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-hairline)] space-y-1">
                <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
                  {m.label}
                </span>
                <span className="block text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] font-mono">
                  {m.value}
                </span>
                {m.detail && (
                  <span className="block font-mono text-[10px] text-[var(--text-muted)] leading-tight">
                    {m.detail}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Tech Stack Pills */}
      <div className="flex flex-wrap items-center gap-2 py-2 px-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-xs">
        <span className="text-[10px] uppercase text-[var(--text-muted)] mr-2 tracking-wider">
          {project.isVisualOnly ? 'Design Tools & Medium:' : 'Tech Stack:'}
        </span>
        {project.stack.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[11px] text-[var(--text-primary)]"
          >
            {t}
          </span>
        ))}
      </div>

      {project.isVisualOnly && project.imageUrl ? (
        /* Visual Design Showcase Display */
        <section className="space-y-6">
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3 sm:p-6 md:p-10 flex flex-col items-center justify-center shadow-lg">
            <div className="relative max-w-full overflow-hidden rounded-xl shadow-2xl border border-black/10">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)]" />
              <span className="font-semibold text-[var(--text-primary)]">ORIGINAL ARTWORK &amp; UI</span>
              <span className="text-[var(--text-muted)] hidden sm:inline">· High-resolution visual showcase</span>
            </div>

            <a
              href={project.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <span>Open Full Resolution ↗</span>
            </a>
          </div>
        </section>
      ) : (
        <>
          {/* 2-Column Split: Challenge vs Solution (Shortens Page Vertical Height) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Challenge */}
            <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)] font-mono text-xs">
                <span className="uppercase text-[var(--text-primary)] tracking-wider font-bold">01 // The Challenge</span>
                <span className="text-[var(--accent-tomato)] text-[10px] uppercase font-semibold">Problem</span>
              </div>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Right: Solution */}
            <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)] font-mono text-xs">
                <span className="uppercase text-[var(--text-primary)] tracking-wider font-bold">02 // The Solution</span>
                <span className="text-[var(--accent-lime)] text-[10px] uppercase font-semibold">Engineered</span>
              </div>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                {project.whatIBuilt}
              </p>
            </div>
          </div>

          {/* Section 3: System Architecture / Execution Pipeline */}
          {project.architectureDetails && (
            <section className="space-y-5">
              <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
                <h2 className="uppercase tracking-wider text-[var(--text-primary)] font-bold">
                  03 // Execution Pipeline
                </h2>
                <span className="text-xs text-[var(--text-muted)]">architecture & workflow</span>
              </div>

              {/* Abstract Technical SVG Visual Diagram */}
              <div>
                {project.slug === 'anvil' && <AnvilArchitectureDiagram />}
                {project.slug === 'healthwe' && <HealthWeArchitectureDiagram />}
                {project.slug === 'hookpilot' && <HookPilotArchitectureDiagram />}
                {project.slug === 'irrigiq' && <IrrigIQArchitectureDiagram />}
                {project.slug === 'marketing-ab-test' && <MarketingAbTestDiagram />}
                {project.slug === 'nyc-yellow-taxi' && <NycTaxiAnalyticsDiagram />}
                {project.slug === 'stock-market-risk' && <StockMarketAnalyticsDiagram />}
              </div>

              {/* Step Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                {project.architectureDetails.steps.map((step) => (
                  <div
                    key={step.number}
                    className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-1.5"
                  >
                    <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                      <span className="px-1.5 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)] font-bold text-[var(--text-primary)] text-[10px]">
                        {step.number}
                      </span>
                      <span className="font-semibold text-[var(--text-primary)]">{step.title}</span>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 4: Stack Decisions & Trade-offs */}
          {project.stackDecisions && (
            <section className="space-y-5">
              <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
                <h2 className="uppercase tracking-wider text-[var(--text-primary)] font-bold">
                  04 // Stack Rationale
                </h2>
                <span className="text-xs text-[var(--text-muted)]">engineering decisions</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.stackDecisions.map((decision) => (
                  <div
                    key={decision.technology}
                    className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2"
                  >
                    <span className="inline-block px-2 py-0.5 rounded font-mono text-[11px] bg-[var(--bg-base)] border border-[var(--border-hairline)] font-semibold text-[var(--text-primary)]">
                      {decision.technology}
                    </span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {decision.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: Future Roadmap & Next Iterations */}
          {project.whatIDoNext && project.whatIDoNext.length > 0 && (
            <section className="space-y-4">
              <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
                <h2 className="uppercase tracking-wider text-[var(--text-primary)] font-bold">
                  05 // Next Iterations
                </h2>
                <span className="text-xs text-[var(--text-muted)]">planned roadmap</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.whatIDoNext.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-lime)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Next Project Compact Card */}
      <div className="pt-8 border-t border-[var(--border-hairline)]">
        <Link
          href={`/work/${nextProject.slug}`}
          className="group block rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 md:p-8 hover:border-[var(--text-primary)]/40 hover:bg-[var(--bg-surface-elevated)] transition-all duration-300"
          data-cursor="next"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                NEXT CASE STUDY →
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
                {nextProject.title}{' '}
                <span className="font-serif italic font-normal text-[var(--text-primary)]">
                  — {nextProject.subtitle}
                </span>
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)] max-w-xl line-clamp-2">
                {nextProject.summary}
              </p>
            </div>

            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] flex items-center justify-center group-hover:bg-[var(--accent-lime)] group-hover:text-[var(--accent-lime-text)] group-hover:scale-105 transition-all duration-200">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
