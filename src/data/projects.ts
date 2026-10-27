export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: 'ai' | 'full-stack' | 'backend';
  categoryLabel: string;
  year: string;
  role: string;
  stack: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  problem: string;
  whatIBuilt: string;
  architectureDetails: {
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  stackDecisions: {
    technology: string;
    rationale: string;
  }[];
  whatIDoNext: string[];
}

export const projects: Project[] = [
  {
    slug: 'anvil',
    title: 'ANVIL',
    subtitle: 'Autonomous Coding-Agent Harness',
    summary:
      'Autonomous coding-agent harness that converts GitHub issues into verified code patches via automated bug reproduction, code localization, patching, testing, review, and reporting.',
    category: 'ai',
    categoryLabel: 'AI Systems',
    year: '2026',
    role: 'Lead Systems Architect & Developer',
    stack: ['Python', 'OpenAI API', 'Claude Code', 'Git Worktrees', 'JSONL Traces'],
    featured: true,
    githubUrl: 'https://github.com/placeholder/anvil',
    problem:
      'Standard LLM coding assistants struggle with repository-scale problems. When attempting real bugfixes, they hallucinate imports, break existing tests, cycle in endless reasoning loops, and lack safe sandboxed execution environments.',
    whatIBuilt:
      'ANVIL is a 9-phase autonomous harness engineered for end-to-end bug resolution. Given a raw GitHub issue, it spins up an isolated Git worktree, localizes relevant source files, writes a failing reproduction test, synthesizes candidate patches, executes test suites, performs sanity checks, and produces an audited JSONL execution trace for offline replay.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Intake & Context Gathering',
          description:
            'Parses GitHub issue body, comments, and commit history. Gathers environment specs and project dependencies.',
        },
        {
          number: '02',
          title: 'Worktree Sandbox Setup',
          description:
            'Spins up an isolated Git worktree branch in <100ms, ensuring zero pollution of the main repository state.',
        },
        {
          number: '03',
          title: 'Code Localization',
          description:
            'AST-aware indexing and vector similarity ranking identify the exact culprit functions and lines.',
        },
        {
          number: '04',
          title: 'Reproduction Test Generation',
          description:
            'Synthesizes a minimal unit/integration test that confirms the bug exists (fails on current code).',
        },
        {
          number: '05',
          title: 'Patch Synthesis & Budgets',
          description:
            'Phased LLM execution with token budgets, tool-call parsers, and loop-detection guards to prevent agent cycling.',
        },
        {
          number: '06',
          title: 'Test Verification & Rollback',
          description:
            'Runs repo test suites. If the reproduction test passes and no regressions occur, the patch is locked; otherwise rolls back to checkpoint.',
        },
        {
          number: '07',
          title: 'Trace Replay & PR Report',
          description:
            'Emits deterministic JSONL execution traces and compiles a verified PR summary with before/after diffs.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'Git Worktrees',
        rationale:
          'Chosen over heavy Docker containers for local sandbox creation. Provides instant branch isolation (<100ms) with zero container overhead.',
      },
      {
        technology: 'JSONL Execution Traces',
        rationale:
          'Structured streaming log format enabling full offline replay, step-by-step token auditing, and deterministic debugging of agent decision trees.',
      },
      {
        technology: 'OpenAI-Compatible LLM Layer',
        rationale:
          'Abstracted model gateway allowing dynamic routing between Claude 3.5 Sonnet for deep code reasoning and faster models for sanity checks.',
      },
    ],
    whatIDoNext: [
      'Multi-language benchmark harness extending evaluation from Python to Rust, TypeScript, and Go.',
      'Parallel patch candidate synthesis with automated consensus scoring and differential fuzzing.',
      'Native GitHub Action integration for automated nightly repo issue triage.',
    ],
  },
  {
    slug: 'healthwe',
    title: 'HealthWe',
    subtitle: 'AI Clinical Documentation Platform',
    summary:
      'AI-powered clinical documentation platform that streamlines medical record review, organizes patient info, and reduces the risk of overlooking critical clinical details.',
    category: 'ai',
    categoryLabel: 'AI Systems / Full-Stack',
    year: '2026',
    role: 'Full-Stack & AI Engineer',
    stack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'Pydantic',
      'Claude API',
      'Streamlit',
    ],
    featured: true,
    githubUrl: 'https://github.com/placeholder/healthwe',
    problem:
      'Physicians and clinical staff spend upwards of 35% of their working hours parsing fragmented electronic health records, PDFs, lab reports, and handwritten notes. The cognitive overload leads to missed critical details like cross-drug allergies and abnormal blood markers.',
    whatIBuilt:
      'HealthWe automates clinical documentation intake. It extracts structured clinical entities (medications, active allergies, vital trends, and lab anomalies) into strictly validated Pydantic models. Crucially, every extracted insight features verifiable citations back to the exact passage in the source document.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Multi-Format Ingestion',
          description:
            'Extracts clean text and OCR tokens from scanned medical PDFs, clinical discharge summaries, and EHR exports.',
        },
        {
          number: '02',
          title: 'Entity Extraction Engine',
          description:
            'Anthropic Claude API parses raw unstructured text into structured diagnostic summaries, dosages, and contraindications.',
        },
        {
          number: '03',
          title: 'Strict Pydantic Validation',
          description:
            'Guarantees medical type safety. Ambiguous values trigger confidence warnings rather than hallucinated estimates.',
        },
        {
          number: '04',
          title: 'Citation & Source Grounding',
          description:
            'Maps every bullet point to an exact character span in the uploaded document, so physicians can verify in one click.',
        },
        {
          number: '05',
          title: 'Relational Health Store',
          description:
            'Persists timeline-indexed patient profiles in PostgreSQL via SQLAlchemy with full Alembic schema migration support.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'FastAPI + Pydantic v2',
        rationale:
          'High performance asynchronous execution with rock-solid data validation crucial for life-critical medical entity parsing.',
      },
      {
        technology: 'Anthropic Claude API',
        rationale:
          'Superior long-context comprehension and low hallucination rate on dense, multi-page clinical records.',
      },
      {
        technology: 'PostgreSQL + SQLAlchemy',
        rationale:
          'ACID compliance for historical health metrics, relational patient record modeling, and reproducible Alembic migrations.',
      },
    ],
    whatIDoNext: [
      'Automated patient post-discharge WhatsApp reminders with dosage schedules and symptom checklists.',
      'ABDM (Ayushman Bharat Digital Mission) compliance for national digital health ecosystem integration.',
      'FHIR-compliant HL7 standard data exchange for multi-hospital interoperability.',
    ],
  },
  {
    slug: 'countrees-ai-erp',
    title: 'Countrees AI ERP',
    subtitle: 'Enterprise Data Processing & Scalable Backend',
    summary:
      'Enterprise data processing and scalable backend system managing structured business workflows, database optimizations, and high-throughput data pipelines.',
    category: 'backend',
    categoryLabel: 'Backend & Data',
    year: '2025',
    role: 'Software Developer Intern',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'SQL Optimization'],
    featured: true,
    problem:
      'Growing transaction volumes across enterprise resource planning workflows resulted in slow analytical queries, lock contention on ledger tables, and unoptimized relational storage patterns.',
    whatIBuilt:
      'Engineered core backend logic and structured data pipelines for enterprise-grade ERP modules. Optimized relational database operations, query execution plans, and schema storage patterns for maximum throughput and reliability.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'API Layer Architecture',
          description:
            'Built modular RESTful endpoints in FastAPI with clean dependency injection and role-based access control.',
        },
        {
          number: '02',
          title: 'Query Plan & Index Tuning',
          description:
            'Analyzed EXPLAIN ANALYZE traces in PostgreSQL to replace sequential scans with targeted compound and partial indexes.',
        },
        {
          number: '03',
          title: 'Connection Pooling & Transactions',
          description:
            'Tuned connection pooling thresholds and isolation levels to avoid deadlocks during peak concurrent batch operations.',
        },
        {
          number: '04',
          title: 'Containerized Deployment',
          description:
            'Dockerized the backend application environment for reproducible, consistent staging and production rollouts.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'PostgreSQL Indexing Strategies',
        rationale:
          'Carefully designed composite and B-tree indexes slashed query runtimes on heavy enterprise reporting joins.',
      },
      {
        technology: 'FastAPI Micro-services',
        rationale:
          'Python async ecosystem provided high concurrency and automatic OpenAPI specification documentation for frontend consumers.',
      },
      {
        technology: 'Docker & Docker Compose',
        rationale:
          'Guaranteed environment parity between local development machines and production staging instances.',
      },
    ],
    whatIDoNext: [
      'Event-driven transaction processing via distributed Redis streams / Apache Kafka.',
      'Automated audit log changelogging with zero performance overhead on transactional writes.',
    ],
  },
];
