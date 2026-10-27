'use client';

import React from 'react';

export function AnvilArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)]" />
            <span className="font-semibold text-[var(--text-primary)]">ANVIL HARNESS PIPELINE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)]">
              SANDBOXED · AST-AWARE · DETERMINISTIC
            </span>
          </div>
          <span>TRACE: JSONL</span>
        </div>

        <svg viewBox="0 0 760 220" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--text-muted)" />
            </marker>
          </defs>

          {/* Node 1: Issue Intake */}
          <g transform="translate(10, 40)">
            <rect width="130" height="70" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--text-muted)" fontSize="10">PHASE 01</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">Issue Intake</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">GitHub Webhook</text>
          </g>

          {/* Line 1 -> 2 */}
          <line x1="140" y1="75" x2="175" y2="75" stroke="var(--border-hairline)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />

          {/* Node 2: Git Worktree */}
          <g transform="translate(180, 40)">
            <rect width="130" height="70" rx="10" fill="var(--bg-base)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--accent-lime-text)" fontSize="10" fontWeight="bold">PHASE 02 · ISOLATION</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">Git Worktree</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">&lt;100ms ephemeral</text>
          </g>

          {/* Line 2 -> 3 */}
          <line x1="310" y1="75" x2="345" y2="75" stroke="var(--border-hairline)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />

          {/* Node 3: Localization & Repro */}
          <g transform="translate(350, 40)">
            <rect width="130" height="70" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--text-muted)" fontSize="10">PHASE 03–04</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">Localization</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">Failing Test Synth</text>
          </g>

          {/* Line 3 -> 4 */}
          <line x1="480" y1="75" x2="515" y2="75" stroke="var(--border-hairline)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />

          {/* Node 4: LLM Synthesis */}
          <g transform="translate(520, 25)">
            <rect width="220" height="100" rx="12" fill="var(--bg-base)" stroke="var(--text-primary)" strokeWidth="1.5" />
            <text x="16" y="24" fill="var(--text-muted)" fontSize="10">PHASE 05 · BUDGET GUARD</text>
            <text x="16" y="44" fill="var(--text-primary)" fontWeight="bold" fontSize="13">Agent Reasoning Loop</text>
            <text x="16" y="62" fill="var(--text-muted)" fontSize="11">Claude Code / OpenAI API</text>
            <text x="16" y="78" fill="var(--accent-tomato)" fontSize="10">Loop Detection + Checkpoint</text>
          </g>

          {/* Bottom Verification & Output branch */}
          <path d="M 630 125 L 630 160 L 370 160" fill="none" stroke="var(--border-hairline)" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <g transform="translate(180, 135)">
            <rect width="180" height="52" rx="10" fill="var(--accent-lime)" stroke="black" strokeWidth="1" />
            <text x="14" y="22" fill="#111111" fontWeight="bold" fontSize="11">PHASE 06–09: VERIFIED PATCH</text>
            <text x="14" y="38" fill="#111111" fontSize="10">Repo Test Green · JSONL Trace</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function HealthWeArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-[var(--text-primary)]">HEALTHWE CLINICAL PIPELINE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)]">
              PYDANTIC V2 · GROUNDED CITATIONS · FASTAPI
            </span>
          </div>
          <span>EHR EXTRACTION ENGINE</span>
        </div>

        <svg viewBox="0 0 760 200" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--text-muted)" />
            </marker>
          </defs>

          {/* Step 1: Input */}
          <g transform="translate(10, 40)">
            <rect width="150" height="70" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--text-muted)" fontSize="10">01. INGESTION</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">Clinical Records</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">PDFs, EHR Notes & Labs</text>
          </g>

          <line x1="160" y1="75" x2="200" y2="75" stroke="var(--border-hairline)" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          {/* Step 2: Extraction */}
          <g transform="translate(205, 40)">
            <rect width="165" height="70" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--text-muted)" fontSize="10">02. EXTRACTION</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">Anthropic Claude</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">Entity & Allergen Parsing</text>
          </g>

          <line x1="370" y1="75" x2="410" y2="75" stroke="var(--border-hairline)" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          {/* Step 3: Grounded Validation */}
          <g transform="translate(415, 30)">
            <rect width="170" height="90" rx="10" fill="var(--bg-base)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="14" y="24" fill="var(--accent-lime-text)" fontSize="10" fontWeight="bold">03. CITATION VERIFY</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">Pydantic v2 Models</text>
            <text x="14" y="60" fill="var(--text-muted)" fontSize="10">Character Offset Check</text>
            <text x="14" y="74" fill="emerald-500" fontSize="10">Strict Safety Filter</text>
          </g>

          <line x1="585" y1="75" x2="615" y2="75" stroke="var(--border-hairline)" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          {/* Step 4: Output */}
          <g transform="translate(620, 40)">
            <rect width="130" height="70" rx="10" fill="var(--bg-base)" stroke="var(--text-primary)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--text-muted)" fontSize="10">04. TIMELINE</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">PostgreSQL</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">Patient Summaries</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function CountreesErpDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-semibold text-[var(--text-primary)]">COUNTREES AI ERP ARCHITECTURE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)]">
              FASTAPI · POSTGRESQL · INDEX OPTIMIZATION · DOCKER
            </span>
          </div>
          <span>HIGH-THROUGHPUT PIPELINE</span>
        </div>

        <svg viewBox="0 0 760 180" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--text-muted)" />
            </marker>
          </defs>

          {/* Step 1 */}
          <g transform="translate(20, 35)">
            <rect width="150" height="70" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--text-muted)" fontSize="10">01. INGESTION</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">Transactional APIs</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">FastAPI Async Layer</text>
          </g>

          <line x1="170" y1="70" x2="220" y2="70" stroke="var(--border-hairline)" strokeWidth="1.5" markerEnd="url(#arrow3)" />

          {/* Step 2 */}
          <g transform="translate(225, 35)">
            <rect width="180" height="70" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--text-muted)" fontSize="10">02. QUERY PLANNING</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">PostgreSQL Optimizer</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">B-Tree & Composite Indexes</text>
          </g>

          <line x1="405" y1="70" x2="455" y2="70" stroke="var(--border-hairline)" strokeWidth="1.5" markerEnd="url(#arrow3)" />

          {/* Step 3 */}
          <g transform="translate(460, 35)">
            <rect width="160" height="70" rx="10" fill="var(--bg-base)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="14" y="26" fill="var(--accent-lime-text)" fontSize="10" fontWeight="bold">03. ISOLATION</text>
            <text x="14" y="44" fill="var(--text-primary)" fontWeight="600" fontSize="12">ACID Transactions</text>
            <text x="14" y="58" fill="var(--text-muted)" fontSize="10">Zero-Deadlock Pooling</text>
          </g>

          <line x1="620" y1="70" x2="660" y2="70" stroke="var(--border-hairline)" strokeWidth="1.5" markerEnd="url(#arrow3)" />

          {/* Step 4 */}
          <g transform="translate(665, 35)">
            <rect width="80" height="70" rx="10" fill="var(--bg-base)" stroke="var(--text-primary)" strokeWidth="1.5" />
            <text x="12" y="32" fill="var(--text-muted)" fontSize="10">DEPLOY</text>
            <text x="12" y="52" fill="var(--text-primary)" fontWeight="bold" fontSize="12">Docker</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
