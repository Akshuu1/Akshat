# Akshat Agrawal — Personal Portfolio & Systems Showcase

A studio-quality, award-site editorial portfolio engineered for **Akshat Agrawal**, Full-Stack Developer & AI Systems Builder.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lenis Smooth Scroll**. Designed with an indie product zine aesthetic balancing quiet confidence with playful Gen Z micro-delights.

---

## ✦ Design Philosophy & Aesthetic

- **Tactile Paper Palette**: Warm paper default (`#F3F0E8`, rich ink `#111111`, muted `#6B6B66`, hairline borders `#DAD6CB`).
- **Obsidian Dark Mode**: Deep warm charcoal (`#0E0E0C`, warm paper text `#F3F0E8`), switchable via the floating navbar with smooth physics and `localStorage` persistence.
- **Electric Lime Accent (`#D6FF3D`)**: Sparingly applied for high-contrast sticker badges, highlighter effects, and celebratory micro-interactions.
- **Editorial Typography**: Crisp sans display (**Space Grotesk**), contrasted with elegant italic serif emphasis (**Instrument Serif**), and technical monospace data labels (**JetBrains Mono**).
- **Playful Micro-Moments**:
  - Interactive draggable sticker pile with physics-like tossing and spring constraints.
  - Floating pill navigation that gracefully auto-hides on scroll down and reveals on scroll up.
  - Live IST (Indian Standard Time) status clock in the footer.
  - Sibling project row dimming on hover with floating preview states.
  - Context-aware custom cursor with interactive capsule labels (`view`, `open`, `copy`, `drag`), disabled on touch devices.
  - Confetti celebration upon contact form dispatch.

---

## ✦ Project Directory Structure

```text
├── src/
│   ├── app/
│   │   ├── page.tsx               # Home: Hero, Sticker Canvas, Selected Work, Discipline, CTA
│   │   ├── work/
│   │   │   ├── page.tsx           # Work Index: Filterable project list with row-dimming
│   │   │   └── [slug]/page.tsx    # Case Studies: ANVIL, HealthWe, Blinkit Analytics
│   │   ├── about/
│   │   │   └── page.tsx           # About: Narrative, Polaroid frame, Experience, Skills, Education
│   │   ├── contact/
│   │   │   └── page.tsx           # Contact: Instant copy channels + Zod-validated form
│   │   ├── api/contact/route.ts   # Contact API handler with Resend integration & fallback
│   │   ├── opengraph-image.tsx    # Dynamic Open Graph preview (1200x630)
│   │   ├── icon.tsx               # Dynamic Favicon in electric lime
│   │   ├── sitemap.ts             # Search engine XML sitemap
│   │   ├── robots.ts              # Crawler permissions
│   │   ├── not-found.tsx          # Custom 404: "this page took a gap year"
│   │   ├── globals.css            # Tailwind v4 theme variables, grain overlay & scrollbars
│   │   └── layout.tsx             # Root layout with fonts, providers & navigation
│   ├── components/
│   │   ├── home/                  # DraggableStickers, RoleWordSwap
│   │   ├── work/                  # WorkIndexView, ProjectPreviewCard, SystemArchitectureSvg
│   │   ├── contact/               # ContactForm, ContactSignals
│   │   ├── layout/                # Navbar, Footer
│   │   ├── providers/             # SmoothScroll (Lenis)
│   │   └── ui/                    # CustomCursor, ThemeToggle, MagneticButton, Marquee, Icons
│   ├── context/
│   │   └── ThemeContext.tsx       # Paper / Obsidian theme provider
│   └── data/                      # Strictly typed content data store
│       ├── projects.ts            # Detailed case studies, architectures & tradeoffs
│       ├── experience.ts          # Software engineering experience & campus leadership
│       ├── skills.ts              # 4 skill clusters & marquee tech list
│       ├── education.ts           # Academic credentials (B.Tech, Class XII, Class X)
│       └── siteConfig.ts          # Contact details, bio, and social channels
└── public/
    ├── resume-ai.pdf              # AI & Machine Learning specialized resume
    ├── resume-fullstack.pdf       # Full-Stack Engineering specialized resume
    └── resume.pdf                 # General Curriculum Vitae fallback
```

---

## ✦ Content Management Guide

All content is cleanly decoupled from presentation components inside `src/data/`:

### 1. Adding or Editing a Project (`src/data/projects.ts`)
To add a new project, simply append an object to the `projects` array:

```typescript
{
  slug: 'my-new-project',
  title: 'PROJECT NAME',
  subtitle: 'One-line descriptive subtitle',
  summary: 'Concise editorial summary of what this system does.',
  category: 'ai', // 'ai' | 'full-stack' | 'backend'
  categoryLabel: 'AI Systems',
  year: '2026',
  role: 'Lead Architect',
  stack: ['Python', 'FastAPI', 'Next.js'],
  featured: true, // Display on Home page
  githubUrl: 'https://github.com/...',
  problem: 'What exact challenge did this solve?',
  whatIBuilt: 'Detailed explanation of the solution.',
  architectureDetails: {
    steps: [
      { number: '01', title: 'Step Name', description: 'Step details...' },
    ]
  },
  stackDecisions: [
    { technology: 'FastAPI', rationale: 'Why this technology was selected over alternatives.' }
  ],
  whatIDoNext: [
    'Future roadmap item 1',
    'Future roadmap item 2'
  ]
}
```
Next.js will automatically generate the static case study page at `/work/my-new-project` and include it in `sitemap.xml`!

### 2. Updating Experience or Leadership (`src/data/experience.ts`)
Edit `experiences` for work history/internships and `leadershipAndActivities` for extracurricular leadership, hackathon finishes, or mentoring roles.

### 3. Modifying Skills (`src/data/skills.ts`)
Update the 4 minimal clusters (`ai-agents`, `backend-data`, `frontend-design`, `cloud-tools`) or modify `toolsMarqueeList` to customize the slow-scrolling marquee strip on the home page.

### 4. Updating Education or Bio (`src/data/education.ts` & `src/data/siteConfig.ts`)
Change your email, phone, location, status badge text, or academic scores directly in these files.

---

## ✦ Environment Variables & Email Setup

The contact form is configured to send emails using **Resend**.

1. Copy `.env.example` to `.env.local` (or create `.env.local`):
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```
2. When `RESEND_API_KEY` is set, inquiries submitted via `/contact` will automatically forward to `akshat.agrawal2024@nst.rishihood.edu.in`.
3. If no key is set, the endpoint runs gracefully in **offline demo mode**, logging inquiries to the console while returning a valid success status to the user.

---

## ✦ Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

### Production Build & Verification
```bash
# Compile and verify static generation across all routes
npm run build

# Start the optimized production server
npm run start
```

---

## ✦ Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Akshat Agrawal personal portfolio"
   git push origin main
   ```
2. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. In **Environment Variables**, add:
   - `RESEND_API_KEY` = your Resend API key (optional)
6. Click **Deploy**. Your portfolio will be live worldwide in under 60 seconds with full edge caching and zero configuration.

---

## ✦ License
Crafted with precision and care for Akshat Agrawal. All rights reserved.
