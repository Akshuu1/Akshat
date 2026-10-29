export type ProjectCategory = 'ai' | 'full-stack' | 'data' | 'design';

export interface Project {
  slug: string;
  id?: string;
  placeholder?: boolean;
  title: string;
  subtitle: string;
  summary: string;
  category: 'ai' | 'full-stack' | 'backend' | 'data' | 'design';
  categoryLabel: string;
  categories: ProjectCategory[];
  year: string;
  role: string;
  stack: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  metrics?: {
    label: string;
    value: string;
    detail?: string;
  }[];
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
    id: 'anvil',
    title: 'ANVIL',
    subtitle: 'Autonomous Coding-Agent Harness',
    summary:
      'Autonomous coding-agent harness that converts GitHub issues into verified code patches via automated bug reproduction, code localization, patching, testing, review, and reporting.',
    category: 'ai',
    categoryLabel: 'AI Systems',
    categories: ['ai'],
    year: '2026',
    role: 'Personal project',
    stack: ['Python', 'OpenAI API', 'Claude Code', 'Git Worktrees', 'JSONL Traces'],
    featured: true,
    githubUrl: 'https://github.com/Akshuu1/anvil',
    metrics: [
      { label: 'Worktree Sandbox', value: '<100ms', detail: 'Ephemeral branch isolation' },
      { label: 'Resolution Flow', value: '9 Phases', detail: 'Bug repro to audited PR' },
      { label: 'Audit Trail', value: 'JSONL', detail: 'Deterministic replay traces' },
    ],
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
    id: 'healthwe',
    title: 'HealthWe',
    subtitle: 'AI Clinical Documentation Platform',
    summary:
      'AI-powered clinical documentation platform that streamlines medical record review, organizes patient info, and reduces the risk of overlooking critical clinical details.',
    category: 'ai',
    categoryLabel: 'AI Systems',
    categories: ['ai'],
    year: '2026',
    role: 'Personal project',
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
    githubUrl: 'https://github.com/Akshuu1/healthwe',
    metrics: [
      { label: 'Source Grounding', value: '100%', detail: 'Exact character-span citations' },
      { label: 'Data Safety', value: 'Pydantic v2', detail: 'Validated medical types' },
      { label: 'Intake Reduction', value: '35%', detail: 'Saved clinical review time' },
    ],
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
    slug: 'hookpilot',
    id: 'hookpilot',
    title: 'HookPilot',
    subtitle: 'Webhook Reliability & Debugging Platform',
    summary:
      'Hosted service that receives, logs, forwards, retries, and replays webhooks so no event is silently lost, featuring Redis queues, HMAC verification, and a localhost CLI tunnel.',
    category: 'full-stack',
    categoryLabel: 'Full-Stack Systems',
    categories: ['full-stack'],
    year: '2026',
    role: 'Full-Stack Engineer',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Redis',
      'BullMQ',
      'Socket.IO',
      'Docker Compose',
      'Prometheus',
      'Grafana',
      'Vitest',
      'k6',
    ],
    featured: true,
    githubUrl: 'https://github.com/Akshuu1/hookpilot',
    metrics: [
      { label: 'Sustained Ingest', value: '12.5k/min', detail: 'k6 load test benchmark' },
      { label: 'p95 Ingest Latency', value: '18ms', detail: 'Decoupled queue buffering' },
      { label: 'Event Loss Rate', value: '0.00%', detail: 'Zero lost events with BullMQ DLQ' },
    ],
    problem:
      "Webhooks fail silently. When a customer's server is down or slow, the sender's event is lost or retried blindly, and developers have no way to see what was sent, why it failed, or to replay it. Debugging webhooks on localhost is also painful because it needs a public URL.",
    whatIBuilt:
      'Engineered an end-to-end webhook platform featuring unique ingest URLs with raw header/body capture, asynchronous BullMQ delivery with exponential backoff and jitter, dead-letter queues with one-click or bulk replay, HMAC verification (Stripe, GitHub), SSRF-safe destination validation, circuit breaker protection, workspace RBAC, and a real-time CLI tunnel (npx hookpilot listen 3000) backed by Socket.IO.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Ingest API & Verification',
          description:
            'Accepts POST /in/:slug, verifies cryptographic HMAC signatures (Stripe, GitHub), deduplicates payloads, and writes raw requests directly to MongoDB.',
        },
        {
          number: '02',
          title: 'Decoupled BullMQ Buffer',
          description:
            'Dispatches delivery jobs to Redis-backed BullMQ queue, isolating ingest latency (<18ms p95) from downstream endpoint responsiveness.',
        },
        {
          number: '03',
          title: 'Worker Delivery & Circuit Breaker',
          description:
            'Executes async delivery with exponential backoff and randomized jitter; trips circuit breakers on consecutive endpoint timeouts to protect resources.',
        },
        {
          number: '04',
          title: 'Dead-Letter Queue & Replay',
          description:
            'Permanently failed payloads route into DLQ for inspection; supports atomic one-click or batch replay with modified destination overrides.',
        },
        {
          number: '05',
          title: 'Real-Time Telemetry & CLI Tunnel',
          description:
            'Publishes delivery status via Redis Pub/Sub to Socket.IO dashboard and establishes bidirectional multiplexed tunnels for localhost developers (npx hookpilot listen 3000).',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'Queue between Ingest and Delivery (BullMQ / Redis)',
        rationale:
          'Decoupled ingestion ensures high-throughput ingestion never blocks on slow or unresponsive third-party destinations.',
      },
      {
        technology: 'BullMQ on Redis vs Kafka/SQS',
        rationale:
          'Provides out-of-the-box delayed jobs, exponential backoff retries, and lower operational complexity for high-frequency retry workflows.',
      },
      {
        technology: 'At-Least-Once Delivery Semantics',
        rationale:
          'Guarantees zero dropped events under failure scenarios; paired with client-side idempotency keys to manage duplicate deliveries.',
      },
      {
        technology: 'MongoDB over PostgreSQL',
        rationale:
          'Flexible document schema handles polymorphic webhook payloads and arbitrary nested metadata without migration friction.',
      },
      {
        technology: 'Raw Body Preservation for HMAC',
        rationale:
          'Stores raw request bytes alongside parsed JSON, preventing re-serialization checksum drift during signature verification.',
      },
      {
        technology: 'Socket.IO over Server-Sent Events',
        rationale:
          'Enables bidirectional streaming for both browser dashboard updates and the interactive developer CLI tunnel.',
      },
    ],
    whatIDoNext: [
      'In-flight payload transformations and jq-style event filtering before destination delivery.',
      'Multi-destination event routing and topic-based fan-out rules.',
      'Outbound webhook delivery SDK for SaaS engineering teams (Svix-style architecture).',
      'Multi-region edge ingest nodes with per-tenant queue sharding.',
      'Alerting integrations (Slack/email) when destination failure rate exceeds error budget.',
    ],
  },
  {
    slug: 'irrigiq',
    id: 'irrigiq',
    title: 'IrrigIQ',
    subtitle: 'Offline-First Precision Irrigation Advisory Platform',
    summary:
      'Offline-first web app that transforms live weather and sensor readings into daily precision irrigation plans using FAO-56 evapotranspiration modeling, saving 28.4% water in simulation.',
    category: 'full-stack',
    categoryLabel: 'Full-Stack Systems',
    categories: ['full-stack'],
    year: '2026',
    role: 'Full-Stack Engineer',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB 2dsphere',
      'Redis',
      'Leaflet',
      'Workbox',
      'IndexedDB',
      'Docker Compose',
      'Vitest',
      'Playwright',
    ],
    featured: true,
    githubUrl: 'https://github.com/Akshuu1/irrigiq',
    metrics: [
      { label: 'Water Conservation', value: '28.4%', detail: 'Simulated vs fixed schedule' },
      { label: 'Field Coverage', value: '14 Plots', detail: '6 crop types with FAO-56 balance' },
      { label: 'Offline Sync Latency', value: '<250ms', detail: 'IndexedDB to MongoDB sync' },
    ],
    problem:
      'Small farmers often water by habit, which wastes water and energy or stresses crops. Precision irrigation tools are expensive, assume stable high-speed internet, and are rarely built for small plots or local languages.',
    whatIBuilt:
      'Engineered an offline-first PWA where farmers draw plot boundaries on Leaflet maps, specify crop varieties and soil textures, and receive daily watering plans (e.g., "Irrigate 18mm tomorrow morning" or "Skip, rain expected"). Powered by an FAO-56 Penman-Monteith recommendation engine using live Open-Meteo and NASA POWER weather feeds, MongoDB 2dsphere geospatial indexing, a sensor telemetry simulator (HTTP/MQTT), and bidirectional IndexedDB offline synchronization.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Field Mapping & Polygon Capture',
          description:
            'Farmers delineate agricultural plots using interactive Leaflet polygon tools; stored as GeoJSON in MongoDB 2dsphere index for spatial proximity queries.',
        },
        {
          number: '02',
          title: 'Weather Ingest & Telemetry',
          description:
            'Scheduled background workers fetch solar radiation, wind, humidity, and temperature from Open-Meteo / NASA POWER, supplemented by MQTT sensor moisture feeds.',
        },
        {
          number: '03',
          title: 'FAO-56 Evapotranspiration Engine',
          description:
            'Calculates reference crop evapotranspiration (ET0) using Penman-Monteith physics; applies crop coefficient (Kc) and soil moisture depletion to compute net irrigation requirements.',
        },
        {
          number: '04',
          title: 'Advisory Dispatch & Alerting',
          description:
            'Generates daily action cards ("Irrigate 18mm at 06:00" or "Skip, rain expected") and issues proactive SMS/email warnings for heat stress and frost.',
        },
        {
          number: '05',
          title: 'Offline Sync & Conservation Auditing',
          description:
            'Service workers and IndexedDB cache maps and recommendations locally; syncs telemetry upon reconnect with last-write-wins policy and tracks cumulative water savings.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'FAO-56 Penman-Monteith Method',
        rationale:
          'Recognized global agronomic standard for daily evapotranspiration modeling, delivering far greater precision than simplistic temperature-only formulas.',
      },
      {
        technology: 'MongoDB 2dsphere & Time-Series Collections',
        rationale:
          'Unified database layer handling both GeoJSON polygon queries and high-frequency sensor readings without running separate GIS and time-series servers.',
      },
      {
        technology: 'Open-Meteo & NASA POWER APIs with Redis Caching',
        rationale:
          'Zero-cost open meteorological feeds with aggressive Redis geo-tile caching to stay comfortably within rate limits and ensure sub-second response times.',
      },
      {
        technology: 'Offline-First PWA (Workbox + IndexedDB)',
        rationale:
          'Ensures rural farmers with intermittent cellular connectivity have instantaneous access to daily irrigation schedules and field boundaries.',
      },
      {
        technology: 'Simulated HTTP/MQTT Telemetry Pipeline',
        rationale:
          'Validates high-frequency moisture telemetry ingestion and edge failover without requiring physical IoT deployments during development.',
      },
    ],
    whatIDoNext: [
      'Hardware integration with ESP32 microcontrollers and long-range LoRaWAN transceivers.',
      'Sentinel-2 satellite NDVI imagery integration for sub-plot vegetation vigor mapping.',
      'Automated WhatsApp and vernacular voice advisories for non-smartphone users.',
      'Regional soil and cultivar parameter database integration with local agronomy extensions.',
      'Market-price tracking and crop yield estimation models.',
    ],
  },
  {
    slug: 'portfolio',
    id: 'portfolio',
    title: 'This Portfolio',
    subtitle: 'Design System & Interaction Site',
    summary: 'Design system, motion and typography for this site.',
    category: 'design',
    categoryLabel: 'Design & Interaction',
    categories: ['design'],
    year: '2026',
    role: 'Personal project',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Figma'],
    featured: true,
    liveUrl: '/',
    metrics: [
      { label: 'Lighthouse Score', value: '98+', detail: 'Performance & Accessibility' },
      { label: 'Bundle Footprint', value: 'Zero JS', detail: 'Server Components architecture' },
      { label: 'Physics Animation', value: 'Spring 60fps', detail: 'Framer hardware acceleration' },
    ],
    problem: 'Creating an editorial portfolio showcasing systems engineering alongside interaction design.',
    whatIBuilt: 'Built an interactive horizontal strip and scroll-driven gauge wheel using Next.js App Router, Framer Motion springs, and accessible typography.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Design System & Tokens',
          description: 'Engineered typographic hierarchy, HSL colour space, and fluid spatial tokens.',
        },
        {
          number: '02',
          title: 'Scroll-Driven Motion',
          description: 'Implemented Framer Motion spring physics with Lenis smooth scrolling.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'Next.js App Router',
        rationale: 'Server components for zero-bundle-size static content and client boundaries for interactive components.',
      },
      {
        technology: 'Framer Motion',
        rationale: 'Hardware-accelerated springs with interruptible physical feedback.',
      },
    ],
    whatIDoNext: [
      'Interactive 3D shader experiments with WebGL / Three.js.',
    ],
  },
  {
    slug: 'add-design-1',
    id: 'add-design-1',
    placeholder: true,
    title: '[ADD DESIGN PROJECT]',
    subtitle: 'Design Case Study',
    summary: 'Add a Figma or Canva project here.',
    category: 'design',
    categoryLabel: 'Design Project',
    categories: ['design'],
    year: '2026',
    role: 'Personal project',
    stack: ['Figma', 'UI/UX', 'Design System'],
    featured: false,
    problem: 'Placeholder for upcoming design case studies and UX explorations.',
    whatIBuilt: 'Design prototype and component system.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Design Exploration',
          description: 'Add your design workflows and Figma wireframes here.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'Figma',
        rationale: 'Component-driven UI/UX design and vector prototyping.',
      },
    ],
    whatIDoNext: [
      'Publish high-fidelity interactive case study.',
    ],
  },
  {
    slug: 'marketing-ab-test',
    id: 'marketing-ab-test',
    title: 'Marketing A/B Test',
    subtitle: 'Conversion Experimentation & Dose-Response Analysis',
    summary:
      'Controlled A/B test across 588,101 users evaluating commercial ads against public service announcements. Formulated two-sample hypothesis testing, dose-response ad frequency curves, and temporal purchase window optimization yielding a statistically significant +43.09% conversion lift.',
    category: 'data',
    categoryLabel: 'Marketing Science & Statistical Modeling',
    categories: ['data'],
    year: '2025',
    role: 'Lead Data Analyst',
    stack: [
      'Python',
      'SciPy',
      'Statsmodels',
      'Pandas',
      'Matplotlib',
      'Seaborn',
      'Hypothesis Testing',
    ],
    featured: true,
    githubUrl: 'https://github.com/Akshuu1',
    liveUrl: 'https://akshuu1.github.io/analysisPortfolio/',
    metrics: [
      { label: 'Relative Lift', value: '+43.09%', detail: '2.555% Ad vs 1.785% PSA' },
      { label: 'Users Tested', value: '588,101', detail: '564k treatment / 23.5k control' },
      { label: 'Significance', value: 'p = 1.99e-13', detail: 'Chi2 = 54.006 (df=1)' },
      { label: 'Saturation Cap', value: '15 Impr.', detail: 'Plateau frequency threshold' },
      { label: 'Ad Waste Cut', value: '-22%', detail: 'Dayparting reallocation' },
    ],
    problem:
      'Marketing teams frequently allocate millions in ad spend without validating causal incrementality over organic brand awareness or PSAs. The challenge was to rigorously evaluate whether commercial ad impressions produce statistically verified conversion lift, quantify the exact effect size, pinpoint where diminishing returns set in to prevent ad fatigue, and identify the optimal day-of-week and hour-of-day for maximum marketing conversion efficiency.',
    whatIBuilt:
      'Engineered an end-to-end statistical experimentation workflow across 588,101 user sessions (564,577 treatment vs 23,524 control). Designed robust parametric and non-parametric hypothesis tests including two-sample Z-tests for proportions and Chi-Square contingency testing (chi2 = 54.006, p = 1.99e-13), proving causal impact beyond all reasonable doubt. Modeled non-linear dose-response curves identifying the saturation threshold where additional ad impressions no longer lift conversion, and synthesized dayparting recommendations that reduce wasted ad spend by 22%.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Cohort Sizing & Randomization Validation',
          description:
            'Verified uniform random assignment across the 588K user split (96% ad vs 4% PSA), validated balance of covariates, and ensured zero user overlap across experimental buckets.',
        },
        {
          number: '02',
          title: 'Hypothesis Testing & Significance Calculation',
          description:
            'Executed two-sample proportion Z-tests and Chi-Square tests of independence. Observed 2.555% conversion in ad group vs 1.785% in PSA group, confirming a +43.09% relative lift (p = 1.99e-13) with 95% confidence intervals.',
        },
        {
          number: '03',
          title: 'Dose-Response Ad Frequency Modeling',
          description:
            'Segmented users by cumulative ad exposures to derive the empirical dose-response curve. Uncovered that conversion probability scales rapidly up to 10–15 impressions before flattening into diminishing marginal returns.',
        },
        {
          number: '04',
          title: 'Temporal Heatmaps & Dayparting Optimization',
          description:
            'Crossed conversion velocity with most_ads_day and most_ads_hour to isolate peak conversion windows. Discovered highest lift on Mondays (2.73% CR) and Fridays (2.68% CR) between 15:00 and 18:00.',
        },
        {
          number: '05',
          title: 'Media Buying Policy & Budget Reallocation',
          description:
            'Formulated actionable recommendations for the growth and media buying teams: instituted a 15-impression frequency cap and shifted 35% of campaign budget to high-converting Friday afternoon slots.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'SciPy & Statsmodels',
        rationale:
          'Utilized for rigorous two-sample proportion Z-tests, Chi-Square contingency tables, and binomial confidence intervals without reliance on black-box SaaS analytics.',
      },
      {
        technology: 'Pandas Vectorized Aggregations',
        rationale:
          'Executed high-speed quantile grouping and ad frequency bucketing across 588,101 user session records in sub-second runtime.',
      },
      {
        technology: 'Seaborn & Matplotlib Visualization',
        rationale:
          'Constructed publication-grade statistical graphics including dose-response saturation curves, confidence interval error bands, and temporal conversion heatmaps.',
      },
    ],
    whatIDoNext: [
      'Multi-Armed Bandit (Thompson Sampling) simulation to dynamically balance exploration and exploitation in live ad variants.',
      'Heterogeneous Treatment Effect (CATE) modeling using uplift trees to isolate user segments with highest price sensitivity.',
      'Automated Bayesian A/B testing framework streaming posterior distributions for continuous experimentation reporting.',
    ],
  },
  {
    slug: 'nyc-yellow-taxi',
    id: 'nyc-yellow-taxi',
    title: 'NYC Yellow Taxi 2025',
    subtitle: 'Big Data Geospatial & Congestion Pricing Analytics',
    summary:
      'Large-scale urban transportation intelligence analyzing 48.7 million trips and $1.03 billion in gross fare revenue from the official 2025 NYC TLC dataset. Uncovered geospatial density corridors, tipping elasticity, peak demand surges, and evaluated the economic impact of Manhattan’s newly introduced $0.75 CBD Congestion Pricing surcharge.',
    category: 'data',
    categoryLabel: 'Big Data & Geospatial Intelligence',
    categories: ['data'],
    year: '2025',
    role: 'Data Analyst',
    stack: [
      'Python',
      'DuckDB',
      'Parquet',
      'SQL',
      'Folium',
      'Seaborn',
      'Time-Series Analysis',
    ],
    featured: true,
    githubUrl: 'https://github.com/Akshuu1',
    liveUrl: 'https://akshuu1.github.io/analysisPortfolio/',
    metrics: [
      { label: 'Trips Ingested', value: '48.7M', detail: '12 Parquet monthly partitions' },
      { label: 'Gross Revenue', value: '$1.03B', detail: 'Official TLC 2025 dataset' },
      { label: 'CBD Policy Fee', value: '$0.75', detail: 'Jan 2025 congestion pricing' },
      { label: 'Airport Route Rev', value: '3.2x / Min', detail: 'JFK/LGA vs Intra-borough' },
      { label: 'Card vs Cash Tips', value: '18.2% Avg', detail: 'Midnight surge tipping' },
    ],
    problem:
      'Handling 48.7 million trips generating over $1 billion annually, New York City’s yellow taxi network struggles with stark spatial-temporal imbalances: vehicle over-supply in saturated downtown grids, chronic driver shortages at outer-borough airports, and unprecedented passenger demand shifts following the historic January 2025 implementation of the $0.75 Manhattan Central Business District (CBD) congestion surcharge.',
    whatIBuilt:
      'Constructed a high-throughput columnar analytics pipeline processing 12 monthly Parquet files (48.7M records) using DuckDB and Python. Engineered geospatial origin-destination matrices across 260+ taxi zones, decomposed multi-variate fare structures, evaluated driver shift earnings, and quantified the economic and behavioral impact of the 2025 CBD Congestion Pricing policy.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Columnar Parquet Ingestion & Cleaning',
          description:
            'Ingested 12 months of official TLC Parquet data via DuckDB; eliminated GPS coordinate outliers, negative meter fares, and zero-passenger records while sustaining millisecond aggregation performance.',
        },
        {
          number: '02',
          title: '2025 CBD Congestion Pricing Impact Assessment',
          description:
            'Isolated trips entering and circulating within Manhattan south of 60th Street to measure passenger volume elasticity, surcharge compliance, and net revenue changes following the January 2025 $0.75 CBD fee rollout.',
        },
        {
          number: '03',
          title: 'Origin-Destination & Airport Corridor Mapping',
          description:
            'Mapped high-yield transit corridors linking JFK Airport, LaGuardia (LGA), Midtown, and the Financial District, proving airport routes deliver 3.2x higher revenue per minute than intra-borough hops.',
        },
        {
          number: '04',
          title: 'Payment Mode Disparities & Tipping Elasticity',
          description:
            'Dissected payment mechanisms showing credit card transactions deliver a predictable 18.2% average tip with distinct spikes after midnight, compared to zero recorded tip values in cash transactions.',
        },
        {
          number: '05',
          title: 'Seasonal Demand & Shift Scheduling Engine',
          description:
            'Modeled 365-day diurnal rhythms identifying the May–June early summer peak and late December holiday surges, generating data-driven shift deployment plans for fleet operators.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'DuckDB & Apache Parquet',
        rationale:
          'Enabled in-memory columnar OLAP queries across 48.7 million rows on local hardware without incurring expensive Apache Spark infrastructure costs.',
      },
      {
        technology: 'SQL Analytical Window Functions',
        rationale:
          'Employed dense ranking, rolling moving averages, and temporal partition-by windows for zone-level demand velocity calculation.',
      },
      {
        technology: 'Folium & Leaflet GIS Mapping',
        rationale:
          'Constructed interactive spatial choropleths and flow vector maps revealing taxi movement patterns across New York City boroughs.',
      },
    ],
    whatIDoNext: [
      'Distributed graph network modeling (NetworkX) to discover optimal deadheading vehicle routes between airport terminals and commercial hubs.',
      'Supervised gradient boosting fare prediction model with XGBoost incorporating real-time weather and flight schedule feeds.',
      'Driver repositioning dashboard forecasting hourly airport surge probabilities 3 hours in advance.',
    ],
  },
  {
    slug: 'stock-market-risk',
    id: 'stock-market-risk',
    title: 'Stock Market Analytics',
    subtitle: 'Quantitative Volatility Modeling & Portfolio Optimization',
    summary:
      'Quantitative financial time-series platform evaluating multi-asset equity price dynamics, volatility clustering, rolling beta, and drawdown risk. Implemented Modern Portfolio Theory (MPT) with 10,000 Monte Carlo iterations to map the Markowitz Efficient Frontier, maximize Sharpe ratios, and backtest algorithmic moving-average crossovers.',
    category: 'data',
    categoryLabel: 'Quantitative Finance & Risk Analytics',
    categories: ['data'],
    year: '2025',
    role: 'Quantitative Analyst',
    stack: [
      'Python',
      'Pandas',
      'NumPy',
      'YFinance',
      'SciPy',
      'Matplotlib',
      'Risk Modeling',
    ],
    featured: true,
    githubUrl: 'https://github.com/Akshuu1',
    liveUrl: 'https://akshuu1.github.io/analysisPortfolio/',
    metrics: [
      { label: 'Monte Carlo Iter.', value: '10,000', detail: 'Markowitz Efficient Frontier' },
      { label: 'Downside Risk', value: 'VaR 95%', detail: 'Parametric & historical sim' },
      { label: 'Allocation Engine', value: 'Max Sharpe', detail: 'SLSQP convex optimizer' },
      { label: 'Signal Alpha', value: 'SMA-50/200', detail: 'Golden Cross backtesting' },
      { label: 'Volatility Scope', value: '20d / 60d', detail: 'Rolling annualized std dev' },
    ],
    problem:
      'Evaluating investment portfolios on historical returns alone is fundamentally deceptive. Investors and asset managers face unpredictable tail-risk, volatility clustering during macroeconomic downturns, and asymmetric drawdowns that can wipe out years of capital appreciation if risk is not mathematically hedged and quantified.',
    whatIBuilt:
      'Engineered an algorithmic financial modeling pipeline in Python. Automated multi-year OHLCV pricing extraction, computed daily log returns, evaluated rolling 20-day and 60-day annualized volatility, calculated comprehensive downside risk metrics (Sharpe ratio, Sortino ratio, 95% Value-at-Risk, Maximum Drawdown), and simulated 10,000 portfolio combinations to plot the Markowitz Efficient Frontier.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Automated Financial Data Pipeline',
          description:
            'Extracted daily OHLCV equity and benchmark index feeds; adjusted for stock splits and dividends, and generated stationary continuous log-return distributions.',
        },
        {
          number: '02',
          title: 'Volatility & Downside Risk Metric Suite',
          description:
            'Computed rolling 20-day and 60-day annualized volatility, Maximum Drawdown (MDD) timelines, and Value-at-Risk (VaR at 95% and 99% confidence levels) via parametric and historical simulation.',
        },
        {
          number: '03',
          title: 'Rolling Beta & Benchmark Correlation Matrix',
          description:
            'Decomposed systemic vs idiosyncratic risk by calculating rolling 90-day Beta against the S&P 500, alongside dynamic inter-asset correlation matrices for portfolio diversification.',
        },
        {
          number: '04',
          title: 'Technical Signal Backtesting Engine',
          description:
            'Programmed algorithmic trading logic for SMA-50 / SMA-200 Golden Cross and RSI momentum bounds; evaluated profit factor, maximum adverse excursion, and cumulative alpha vs passive holding.',
        },
        {
          number: '05',
          title: 'Markowitz Efficient Frontier & Monte Carlo Simulation',
          description:
            'Simulated 10,000 random asset allocation weightings; applied SciPy constrained optimization (SLSQP) to pinpoint the Tangency Portfolio (Maximum Sharpe) and Minimum Variance Portfolio.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'NumPy Vectorized Matrix Operations',
        rationale:
          'Utilized linear algebra dot products for instant portfolio variance calculation, covariance matrix inversion, and multi-asset Monte Carlo simulation.',
      },
      {
        technology: 'SciPy Optimize (SLSQP)',
        rationale:
          'Solved constrained non-linear convex optimization problems for exact Sharpe ratio maximization under boundary constraints.',
      },
      {
        technology: 'Matplotlib & Seaborn Subplots',
        rationale:
          'Constructed clear financial multi-panel charts including underwater drawdown curves, log return distributions with normal overlays, and correlation heatmaps.',
      },
    ],
    whatIDoNext: [
      'GARCH(1,1) volatility forecasting framework to anticipate conditional variance spikes ahead of earnings announcements.',
      'Interactive Streamlit application streaming live tick data with real-time portfolio stress-testing scenarios.',
      'Black-Litterman asset allocation framework blending investor equilibrium views with quantitative covariance priors.',
    ],
  },
  {
    slug: 'blinkit-delivery-analytics',
    id: 'blinkit-delivery-analytics',
    title: 'Blinkit Quick-Commerce',
    subtitle: 'Supply Chain & Delivery SLA Optimization',
    summary:
      'Real-time operational dashboard built in Looker Studio monitoring delivery efficiency, dark store fulfillment density, order distribution across regional centers, and customer order volume trends.',
    category: 'data',
    categoryLabel: 'Supply Chain & BI Analytics',
    categories: ['data'],
    year: '2025',
    role: 'Data Analyst',
    stack: [
      'Looker Studio',
      'SQL',
      'Data Modeling',
      'Supply Chain Analytics',
      'Google Sheets',
    ],
    featured: false,
    githubUrl: 'https://github.com/Akshuu1/blinkit-customer-analysis',
    liveUrl: 'https://lookerstudio.google.com/reporting/5961c57e-5100-43ba-8655-56c2b33b6147',
    metrics: [
      { label: 'SLA Benchmark', value: '10-Min', detail: 'Quick commerce delivery' },
      { label: 'Latency Metrics', value: 'p50/p90/p99', detail: 'Dark store dispatch times' },
      { label: 'BI Platform', value: 'Looker Studio', detail: 'Real-time supply chain BI' },
    ],
    problem:
      'In 10-minute quick commerce, supply chain bottlenecks and uneven inventory distribution across micro-fulfillment centers (dark stores) lead to delivery SLA violations, elevated churn rates, and lost revenue.',
    whatIBuilt:
      'Designed and deployed an interactive Looker Studio business intelligence dashboard connected to cleaned operational datasets. Structured key performance indicators tracking on-time delivery rates, item category demand velocity, order density per square kilometer, and rider allocation across delivery hubs.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Data Ingestion & SQL Cleaning',
          description:
            'Extracted, deduplicated, and formatted order-level transaction logs and delivery timestamps into analytical tables.',
        },
        {
          number: '02',
          title: 'KPI Definition & SLA Modeling',
          description:
            'Engineered metrics for average dispatch latency, delivery duration percentiles (p50, p90, p99), and order fulfillment rates.',
        },
        {
          number: '03',
          title: 'Looker Studio Dashboard Deployment',
          description:
            'Constructed an executive dashboard with dynamic filtering by city, dark store cluster, product vertical, and hour-of-day.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'Looker Studio',
        rationale:
          'Enabled cloud-native, interactive sharing with zero barrier to entry for cross-functional operations and supply chain stakeholders.',
      },
      {
        technology: 'SQL Analytical Queries',
        rationale:
          'Calculated aggregated order metrics and dark store throughput figures for performant dashboard rendering.',
      },
    ],
    whatIDoNext: [
      'Automate real-time inventory threshold alerts sent to store managers via Slack webhooks.',
      'Integrate weather and traffic APIs to predict delivery delays during monsoon and peak commute windows.',
    ],
  },
  {
    slug: 'airbnb-market-intelligence',
    id: 'airbnb-market-intelligence',
    title: 'Airbnb Market Intelligence',
    subtitle: 'Dynamic Pricing & Hospitality Performance Dashboard',
    summary:
      'Comprehensive Tableau analytical dashboard evaluating Airbnb guest patterns, seasonal pricing elasticity, neighborhood occupancy rates, and listing satisfaction metrics.',
    category: 'data',
    categoryLabel: 'Hospitality Analytics & Tableau',
    categories: ['data'],
    year: '2025',
    role: 'Data Analyst',
    stack: [
      'Tableau',
      'Tableau Public',
      'Data Cleaning',
      'Market Intelligence',
      'Excel',
    ],
    featured: false,
    githubUrl: 'https://github.com/Akshuu1',
    liveUrl: 'https://public.tableau.com/app/profile/akshat.agrawal2260/viz/Airbnb_17773079392460/MarketIntelligence?publish=yes',
    metrics: [
      { label: 'Yield KPI', value: 'RevPAR', detail: 'Revenue Per Available Room' },
      { label: 'Dynamic Model', value: 'Tableau', detail: 'Seasonal pricing elasticity' },
      { label: 'Geospatial Scope', value: '260+ Zones', detail: 'Interactive listing yield map' },
    ],
    problem:
      'Property hosts and short-term rental investors often set flat nightly rates, resulting in severe revenue loss during high-demand holidays and low occupancy during shoulder seasons due to lack of market transparency.',
    whatIBuilt:
      'Built an end-to-end market intelligence dashboard published on Tableau Public. Analyzed thousands of property listings to uncover neighborhood pricing gradients, bedroom-count yield curves, review score correlations, and seasonal occupancy patterns to empower data-driven pricing strategies.',
    architectureDetails: {
      steps: [
        {
          number: '01',
          title: 'Data Ingestion & Outlier Treatment',
          description:
            'Cleaned raw Airbnb listing attributes; filtered price extremes, treated missing amenities, and normalized review scores.',
        },
        {
          number: '02',
          title: 'Calculated Fields & Yield Metrics',
          description:
            'Authored Tableau calculated fields computing RevPAR (Revenue Per Available Room), estimated monthly occupancy, and price-to-rating elasticity.',
        },
        {
          number: '03',
          title: 'Interactive Visual Analytics Dashboard',
          description:
            'Crafted a multi-view dashboard featuring geospatial listing maps, seasonal trend lines, and room-type comparison distributions.',
        },
      ],
    },
    stackDecisions: [
      {
        technology: 'Tableau Desktop & Public',
        rationale:
          'Industry-standard visualization platform providing high-fidelity visual interactivity, tooltips, and geospatial mapping.',
      },
      {
        technology: 'Data Modeling & Parameters',
        rationale:
          'Leveraged Tableau parameters to empower users to simulate expected revenue based on custom occupancy and nightly price inputs.',
      },
    ],
    whatIDoNext: [
      'Build dynamic pricing recommendation algorithm using machine learning regression in Python.',
      'Incorporate competitor amenity parsing to identify highest-ROI property upgrades.',
    ],
  },
];
