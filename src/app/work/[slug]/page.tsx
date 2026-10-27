import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, Project } from '@/data/projects';
import {
  AnvilArchitectureDiagram,
  HealthWeArchitectureDiagram,
  CountreesErpDiagram,
} from '@/components/work/SystemArchitectureSvg';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [
    ...projects.map((p) => ({ slug: p.slug })),
    { slug: 'countrees' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug || (slug === 'countrees' && p.slug === 'countrees-ai-erp'));

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
  const projectIndex = projects.findIndex(
    (p) => p.slug === slug || (slug === 'countrees' && p.slug === 'countrees-ai-erp')
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project: Project = projects[projectIndex];
  const nextProject: Project = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24 space-y-16 md:space-y-24">
      {/* Back button */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>back to all projects</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-lime)] text-[var(--accent-lime-text)] font-semibold text-[10px] uppercase tracking-wider">
            {project.categoryLabel}
          </span>
          <span>{"//"} {project.year}</span>
          <span>· {project.role}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)]">
          {project.title}{' '}
          <span className="font-serif italic font-normal text-[var(--text-muted)] block sm:inline">
            — {project.subtitle}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed font-mono">
          {project.summary}
        </p>

        {/* Action & Links Row */}
        {project.githubUrl && (
          <div className="pt-2 flex flex-wrap items-center gap-3">
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
          </div>
        )}
      </div>

      {/* Meta Specifications Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-xs">
        <div className="space-y-1">
          <span className="text-[10px] uppercase text-[var(--text-muted)]">Timeline</span>
          <p className="font-semibold text-[var(--text-primary)]">{project.year}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase text-[var(--text-muted)]">Role</span>
          <p className="font-semibold text-[var(--text-primary)]">{project.role}</p>
        </div>
        <div className="space-y-1 col-span-2">
          <span className="text-[10px] uppercase text-[var(--text-muted)]">Core Stack</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[10px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            01 // THE PROBLEM
          </h2>
          <span className="text-xs font-mono text-[var(--accent-tomato)]">challenge</span>
        </div>
        <div className="max-w-3xl">
          <p className="text-base md:text-lg text-[var(--text-primary)] leading-relaxed">
            {project.problem}
          </p>
        </div>
      </section>

      {/* Section 2: What I Built */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            02 // WHAT I BUILT
          </h2>
          <span className="text-xs font-mono text-[var(--accent-lime)]">solution</span>
        </div>
        <div className="max-w-3xl">
          <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
            {project.whatIBuilt}
          </p>
        </div>
      </section>

      {/* Section 3: System Architecture / How It Works */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            03 // SYSTEM ARCHITECTURE
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">execution pipeline</span>
        </div>

        {/* Abstract Technical SVG Visual Diagram */}
        <div>
          {project.slug === 'anvil' && <AnvilArchitectureDiagram />}
          {project.slug === 'healthwe' && <HealthWeArchitectureDiagram />}
          {project.slug === 'countrees-ai-erp' && <CountreesErpDiagram />}
        </div>

        {/* Step Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {project.architectureDetails.steps.map((step) => (
            <div
              key={step.number}
              className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                <span className="font-bold text-[var(--text-primary)]">{step.number}</span>
                <span>{"//"} {step.title}</span>
              </div>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Stack & Key Decisions */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            04 // STACK & TRADE-OFFS
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">engineering decisions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.stackDecisions.map((decision) => (
            <div
              key={decision.technology}
              className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-full font-mono text-xs bg-[var(--bg-base)] border border-[var(--border-hairline)] font-semibold text-[var(--text-primary)]">
                {decision.technology}
              </span>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                {decision.rationale}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: What I'd Do Next */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[var(--border-hairline)] flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            05 // FUTURE ROADMAP
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">next iterations</span>
        </div>

        <div className="space-y-3">
          {project.whatIDoNext.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-xs md:text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-lime)] shrink-0 mt-0.5" />
              <span className="text-[var(--text-primary)]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Next Project Big Footer Card */}
      <div className="pt-12 border-t border-[var(--border-hairline)]">
        <Link
          href={`/work/${nextProject.slug}`}
          className="group block rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8 md:p-14 hover:border-[var(--text-primary)]/40 hover:bg-[var(--bg-surface-elevated)] transition-all duration-300"
          data-cursor="next"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                NEXT CASE STUDY →
              </span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
                {nextProject.title}{' '}
                <span className="font-serif italic font-normal text-[var(--text-muted)]">
                  — {nextProject.subtitle}
                </span>
              </h3>
              <p className="text-xs md:text-sm font-mono text-[var(--text-muted)] max-w-xl">
                {nextProject.summary}
              </p>
            </div>

            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-base)] flex items-center justify-center group-hover:bg-[var(--accent-lime)] group-hover:text-[var(--accent-lime-text)] group-hover:scale-110 transition-all duration-200">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
