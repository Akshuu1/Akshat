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

export function MarketingAbTestDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5CE1E6]" />
            <span className="font-semibold text-[var(--text-primary)]">MARKETING A/B EXPERIMENTATION PIPELINE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[#5CE1E6]">
              588,101 SESSIONS · CHI-SQUARE · DOSE-RESPONSE
            </span>
          </div>
          <span className="text-[#5CE1E6] font-bold">+43.09% CONVERSION LIFT</span>
        </div>

        <svg viewBox="0 0 760 160" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow-ab" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#5CE1E6" />
            </marker>
          </defs>

          {/* Node 1: Traffic Allocation */}
          <g transform="translate(10, 25)">
            <rect width="135" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">01. RANDOM SPLIT</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">588,101 Users</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">Ad 96% vs PSA 4%</text>
          </g>

          <line x1="145" y1="62" x2="185" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-ab)" />

          {/* Node 2: Hypothesis Testing */}
          <g transform="translate(190, 25)">
            <rect width="155" height="75" rx="10" fill="var(--bg-base)" stroke="#5CE1E6" strokeWidth="1.5" />
            <text x="12" y="24" fill="#5CE1E6" fontSize="9" fontWeight="bold">02. SIGNIFICANCE</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">Chi-Square & Z-Test</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">Chi2=54.006 · p=1.99e-13</text>
          </g>

          <line x1="345" y1="62" x2="385" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-ab)" />

          {/* Node 3: Dose Response */}
          <g transform="translate(390, 25)">
            <rect width="165" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">03. DOSE-RESPONSE</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">Ad Frequency Curve</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">Saturation at 15 impressions</text>
          </g>

          <line x1="555" y1="62" x2="595" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-ab)" />

          {/* Node 4: Dayparting & Spend */}
          <g transform="translate(600, 25)">
            <rect width="150" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">04. DAYPARTING</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">Mon/Fri 15:00-18:00</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">-22% Waste Spend</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function NycTaxiAnalyticsDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5CE1E6]" />
            <span className="font-semibold text-[var(--text-primary)]">NYC TLC BIG DATA ANALYTICS PIPELINE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[#5CE1E6]">
              48.7M TRIPS · $1.03B GROSS · DUCKDB COLUMNAR
            </span>
          </div>
          <span className="text-[#5CE1E6] font-bold">2025 CBD CONGESTION PRICING</span>
        </div>

        <svg viewBox="0 0 760 160" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow-taxi" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#5CE1E6" />
            </marker>
          </defs>

          {/* Node 1: Parquet Ingestion */}
          <g transform="translate(10, 25)">
            <rect width="140" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">01. INGESTION</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">12 Parquet Partitions</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">DuckDB OLAP Engine</text>
          </g>

          <line x1="150" y1="62" x2="185" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-taxi)" />

          {/* Node 2: CBD Congestion Surcharge */}
          <g transform="translate(190, 25)">
            <rect width="160" height="75" rx="10" fill="var(--bg-base)" stroke="#5CE1E6" strokeWidth="1.5" />
            <text x="12" y="24" fill="#5CE1E6" fontSize="9" fontWeight="bold">02. POLICY EVALUATION</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">$0.75 Manhattan CBD</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">Fare & Elasticity Shift</text>
          </g>

          <line x1="350" y1="62" x2="385" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-taxi)" />

          {/* Node 3: Geospatial Corridors */}
          <g transform="translate(390, 25)">
            <rect width="165" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">03. GEOSPATIAL GIS</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">JFK / LGA / Midtown</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">3.2x Revenue / Min Corridor</text>
          </g>

          <line x1="555" y1="62" x2="590" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-taxi)" />

          {/* Node 4: Tipping & Seasonal Surge */}
          <g transform="translate(595, 25)">
            <rect width="155" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">04. OPTIMIZATION</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">18.2% Card Tip vs Cash</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">May-Jun & Dec Peak Surges</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function StockMarketAnalyticsDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5CE1E6]" />
            <span className="font-semibold text-[var(--text-primary)]">QUANTITATIVE RISK & MPT PIPELINE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)] text-[#5CE1E6]">
              10K MONTE CARLO · EFFICIENT FRONTIER · VOLATILITY
            </span>
          </div>
          <span className="text-[#5CE1E6] font-bold">MAX SHARPE RATIO TANGENCY</span>
        </div>

        <svg viewBox="0 0 760 160" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow-stock" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#5CE1E6" />
            </marker>
          </defs>

          {/* Node 1: OHLCV Feed */}
          <g transform="translate(10, 25)">
            <rect width="135" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">01. OHLCV DATA</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">Time-Series Feed</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">Daily Log-Returns</text>
          </g>

          <line x1="145" y1="62" x2="185" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-stock)" />

          {/* Node 2: Volatility & Downside Risk */}
          <g transform="translate(190, 25)">
            <rect width="165" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">02. RISK METRICS</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">VaR 95% & Sortino</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">Max Drawdown & Beta</text>
          </g>

          <line x1="355" y1="62" x2="390" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-stock)" />

          {/* Node 3: Signal Backtest */}
          <g transform="translate(395, 25)">
            <rect width="160" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--text-muted)" fontSize="9">03. STRATEGY TEST</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">SMA 50/200 & RSI</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">Golden Cross Alpha</text>
          </g>

          <line x1="555" y1="62" x2="590" y2="62" stroke="#5CE1E6" strokeWidth="1.5" markerEnd="url(#arrow-stock)" />

          {/* Node 4: Modern Portfolio Theory */}
          <g transform="translate(595, 25)">
            <rect width="155" height="75" rx="10" fill="var(--bg-base)" stroke="#5CE1E6" strokeWidth="1.5" />
            <text x="12" y="24" fill="#5CE1E6" fontSize="9" fontWeight="bold">04. PORTFOLIO OPT</text>
            <text x="12" y="42" fill="var(--text-primary)" fontWeight="600" fontSize="11">Efficient Frontier</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">10k Monte Carlo SLSQP</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function HookPilotArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)]" />
            <span className="font-semibold text-[var(--text-primary)]">HOOKPILOT INGESTION & DISPATCH PIPELINE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)]">
              HMAC DEDUPE · BULLMQ QUEUE · ZERO-LOSS DLQ
            </span>
          </div>
          <span>12.5K/MIN SUSTAINED</span>
        </div>

        <svg viewBox="0 0 760 180" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow-hook" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent-lime)" />
            </marker>
          </defs>

          {/* Node 1: Ingest API */}
          <g transform="translate(10, 30)">
            <rect width="135" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="22" fill="var(--text-muted)" fontSize="9">01. INGEST API</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">POST /in/:slug</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">HMAC Verify &amp; Raw Log</text>
          </g>

          <line x1="145" y1="67" x2="185" y2="67" stroke="var(--accent-lime)" strokeWidth="1.5" markerEnd="url(#arrow-hook)" />

          {/* Node 2: Queue Buffering */}
          <g transform="translate(190, 30)">
            <rect width="150" height="75" rx="10" fill="var(--bg-base)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="12" y="22" fill="var(--accent-lime-text)" fontSize="9" fontWeight="bold">02. BUFFER QUEUE</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">Redis + BullMQ</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">&lt;18ms p95 Ingest</text>
          </g>

          <line x1="340" y1="67" x2="380" y2="67" stroke="var(--accent-lime)" strokeWidth="1.5" markerEnd="url(#arrow-hook)" />

          {/* Node 3: Workers & Retries */}
          <g transform="translate(385, 30)">
            <rect width="165" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="22" fill="var(--text-muted)" fontSize="9">03. WORKER CLUSTER</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">Backoff &amp; Jitter</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">Circuit Breaker &amp; DLQ</text>
          </g>

          <line x1="550" y1="67" x2="590" y2="67" stroke="var(--accent-lime)" strokeWidth="1.5" markerEnd="url(#arrow-hook)" />

          {/* Node 4: Delivery & Tunnel */}
          <g transform="translate(595, 30)">
            <rect width="155" height="75" rx="10" fill="var(--bg-base)" stroke="var(--text-primary)" strokeWidth="1.5" />
            <text x="12" y="22" fill="var(--text-muted)" fontSize="9">04. DISPATCH TARGETS</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">Customer / CLI Tunnel</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">Socket.IO &amp; Prometheus</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function IrrigIQArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="min-w-[680px]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-[var(--text-primary)]">IRRIGIQ PRECISION WATER ENGINE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border-hairline)]">
              FAO-56 MODEL · MONGODB 2DSPHERE · OFFLINE PWA
            </span>
          </div>
          <span className="text-emerald-500 font-bold">28.4% WATER SAVED</span>
        </div>

        <svg viewBox="0 0 760 180" className="w-full h-auto text-xs font-mono select-none">
          <defs>
            <marker id="arrow-irrig" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
            </marker>
          </defs>

          {/* Node 1: Ingest & Weather */}
          <g transform="translate(10, 30)">
            <rect width="140" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="22" fill="var(--text-muted)" fontSize="9">01. DATA INGEST</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">Weather &amp; Sensors</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">Open-Meteo + MQTT</text>
          </g>

          <line x1="150" y1="67" x2="190" y2="67" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-irrig)" />

          {/* Node 2: FAO-56 Engine */}
          <g transform="translate(195, 30)">
            <rect width="160" height="75" rx="10" fill="var(--bg-base)" stroke="#10B981" strokeWidth="1.5" />
            <text x="12" y="22" fill="#10B981" fontSize="9" fontWeight="bold">02. FAO-56 ENGINE</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">Penman-Monteith</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">ET0 Evapotranspiration</text>
          </g>

          <line x1="355" y1="67" x2="395" y2="67" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-irrig)" />

          {/* Node 3: Geospatial Store */}
          <g transform="translate(400, 30)">
            <rect width="160" height="75" rx="10" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="12" y="22" fill="var(--text-muted)" fontSize="9">03. GEOSPATIAL / TS</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">MongoDB 2dsphere</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">Plot Polygons + Readings</text>
          </g>

          <line x1="560" y1="67" x2="600" y2="67" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-irrig)" />

          {/* Node 4: Offline PWA */}
          <g transform="translate(605, 30)">
            <rect width="145" height="75" rx="10" fill="var(--bg-base)" stroke="var(--text-primary)" strokeWidth="1.5" />
            <text x="12" y="22" fill="var(--text-muted)" fontSize="9">04. OFFLINE PWA</text>
            <text x="12" y="40" fill="var(--text-primary)" fontWeight="600" fontSize="11">Leaflet &amp; IndexedDB</text>
            <text x="12" y="56" fill="var(--text-muted)" fontSize="9">Daily Plans &amp; SMS Alert</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
