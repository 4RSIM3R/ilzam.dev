// Field notes registry. The /notes index, topic hubs, related-notes lists,
// RSS feed, sitemap lastmod and each note's structured data all read from
// here, so publishing a note is one entry in NOTES plus its page in
// src/pages/notes/. astro.config.mjs imports this file, so keep it free of
// `@/` imports. Hub copy is visitor-facing: write it for non-technical
// founders.

export type HubSlug = 'ai-native-development' | 'mvp-development-cost' | 'founder-decisions' | 'engineering'

export interface Hub {
  slug: HubSlug
  name: string
  /** Meta title and description for the hub page. */
  title: string
  description: string
  /** Paragraphs at the top of the hub page. */
  intro: string[]
  /** The service or tool page this topic leads readers to. */
  cta: { href: string; label: string }
}

export interface Note {
  slug: string
  /** Card and structured-data headline. The page keeps its own meta title. */
  title: string
  description: string
  hub: HubSlug
  /** Date the note went live, YYYY-MM-DD. */
  published: string
  /** Date of the last meaningful content change. Leave out for typo fixes. */
  updated?: string
  /** BCP 47 language tag, 'en' when left out. */
  lang?: string
}

export const AUTHOR = {
  name: 'Muhammad Ilzam Mulkhaq',
  url: 'https://ilzam.dev/',
}

export const NOTES_PER_PAGE = 12

/** Hubs with fewer notes than this are noindexed and left out of the sitemap. */
export const MIN_NOTES_TO_INDEX_HUB = 3

/** Notes most related-notes lists show, hand-picked ones included. */
const MAX_RELATED = 4

export const HUBS: Hub[] = [
  {
    slug: 'ai-native-development',
    name: 'AI-Native Development',
    title: 'AI-Native Software Development Notes | Ilzam',
    description: 'How I build software with AI agents on real projects: which tools are worth paying for, benchmarks I ran myself, and where a human still has to check the work.',
    intro: [
      'Most code in 2026 is written with AI help. Whether that makes a project fast or a mess comes down to who checks the output, and how.',
      'These notes are from my own work building with AI agents: what the tools cost, how they compare when I measure them, and what it takes to let an agent run code safely.',
    ],
    cta: { href: '/pricing/', label: 'Hire an engineer who works this way' },
  },
  {
    slug: 'mvp-development-cost',
    name: 'MVP & Development Cost',
    title: 'MVP Development and Software Cost Guides | Ilzam',
    description: 'How to plan, price, and build the first version of your product in 2026, and how to choose who builds it.',
    intro: [
      'An MVP (minimum viable product) is the smallest version of your product that real customers can use and pay for. Getting it right mostly comes down to deciding what to leave out and who builds it.',
      'AI tools changed how fast software gets built, so a lot of older advice on timelines and prices no longer holds. These notes use 2026 numbers.',
    ],
    cta: { href: '/tool/mvp-cost-estimator/', label: 'Estimate what your app will cost' },
  },
  {
    slug: 'founder-decisions',
    name: 'Founder Decisions',
    title: 'Technical Decisions for Startup Founders | Ilzam',
    description: 'Practical frameworks for the technical calls founders make without an engineer on the team, like how much process a team needs and how to build a startup website.',
    intro: [
      'In an early startup, most technical decisions get made by someone who is not technical. These notes are for that person.',
      'Each one takes a single decision, like how much process a small team needs or how to build your website, and walks through how I would make it and why.',
    ],
    cta: { href: '/pricing/', label: 'Talk a decision through in a Strategy Session' },
  },
  {
    slug: 'engineering',
    name: 'Engineering',
    title: 'Engineering Notes from Production Systems | Ilzam',
    description: 'Technical deep dives from real production work: event ingestion, Elasticsearch, and concurrency.',
    intro: [
      'Write-ups from systems I have built and run in production, including the parts that broke. They are written for engineers and go deep into the details.',
      'Founders do not need to read these to work with me, but they show how I think about reliability and cost when the stakes are real.',
    ],
    cta: { href: '/work/', label: 'See the projects behind these notes' },
  },
]

export const NOTES: Note[] = [
  {
    slug: 'langfuse-ai-agent-observability',
    title: 'Langfuse: Stop Guessing Whether Your AI Agent Works',
    description: 'Five clean test runs only rule out a failure rate above 45%. The reliability math behind agents, how Langfuse ingests and stores traces (and why v4 went observation-first), LLM judges you can calibrate, and a CI gate that fails on regressions instead of noise.',
    hub: 'ai-native-development',
    published: '2026-10-24',
  },
  {
    slug: 'how-to-choose-a-software-development-company',
    title: 'How to Choose a Software Development Company as a Startup',
    description: 'Eight questions to ask before you sign, including how they use AI, the red flags to look for in a proposal, and how to compare quotes fairly, even if you are not technical.',
    hub: 'mvp-development-cost',
    published: '2026-10-11',
  },
  {
    slug: 'c-level-ngoding-lagi',
    title: 'Ketika C-level Kembali Ngoding, Lalu Bagaimana Nasib Software Engineer?',
    description: 'sudah benar yang punya cita - cita ternak ayam, ke sawah dan buka kolam lele',
    hub: 'founder-decisions',
    published: '2026-09-15',
    lang: 'id',
  },
  {
    slug: 'process-theater-vs-shipping-code',
    title: 'Most of Your Software Process Is Cosplay',
    description: 'A project was 5 CRUD screens and 1 screen reading a materialized view. It still took tickets, story points, sprint ceremony, design review, and a pipeline before anyone wrote a line of code. Where that process actually comes from, and when it earns its place.',
    hub: 'founder-decisions',
    published: '2026-09-11',
  },
  {
    slug: 'elasticsearch-prod-is-not-a-youtube-tutorial',
    title: 'Elasticsearch in Production Is Not a YouTube Tutorial',
    description: "Every YouTube tutorial makes Elasticsearch look easy. Then you run it in production. A node pegged its CPU and stopped answering queries, holding just 4.2 GB at 39% heap. It hadn't failed. The setup around it had: a schema never shaped for its queries, and storage that was never bounded. Here's what the tutorials leave out.",
    hub: 'engineering',
    published: '2026-07-13',
  },
  {
    slug: 'million-cctv-events-512mb-container',
    title: 'One Million CCTV Events a Day in a 512 MB Container',
    description: 'A million camera events a day is only twelve a second. The real work is keeping one fragile NVR stream alive on the smallest container on a shared box. Why Go and the actor model fit the shape of the problem.',
    hub: 'engineering',
    published: '2026-07-03',
  },
  {
    slug: 'work-stealing',
    title: 'Work-Stealing from First Principles',
    description: "Tokio, Go, and Java's ForkJoinPool all use work-stealing. I learned the algorithm by implementing the Chase-Lev variant from scratch in Rust, building up from load distribution to per-worker deques, CAS, and memory ordering.",
    hub: 'engineering',
    published: '2026-04-12',
  },
  {
    slug: 'cursor-vs-claude-code-founder-pricing',
    title: "Cursor vs Claude Code: A Founder's Pricing Teardown",
    description: 'Cursor pays Anthropic $650M/year while earning $500M. I break down pricing, trust, business model risk, and why I chose the $100/month option with no middleman.',
    hub: 'ai-native-development',
    published: '2026-03-15',
  },
  {
    slug: 'gitnexus-codebase-rag-benchmark',
    title: "GitNexus Benchmark: Graph-Indexed Retrieval vs Claude Code's Native Exploration",
    description: "Does graph-indexed retrieval actually beat Claude Code's native codebase exploration? I ran the same architectural question both ways. $0.52 vs $0.39, 38 tool calls vs 12, and the KuzuDB internals that explain the difference.",
    hub: 'ai-native-development',
    published: '2026-03-14',
  },
  {
    slug: 'ai-security-scanner-upstash-box',
    title: 'I Built an AI Agent That Runs Untrusted Code to Find Security Threats',
    description: '877,000 malicious packages and counting. I used Upstash Box to build a sandboxed AI security scanner that does both static and dynamic analysis.',
    hub: 'ai-native-development',
    published: '2026-03-12',
  },
  {
    slug: 'how-to-build-startup-website-2026',
    title: "How to Build Your Startup's Website in 2026",
    description: 'WordPress, Webflow, Next.js, or Astro? A real comparison, and how this site was actually built.',
    hub: 'founder-decisions',
    published: '2026-03-08',
  },
]

// Paths end in a slash because that is what Cloudflare serves; links without
// one cost a redirect.
export const NOTES_PATH = '/notes/'
export const notePath = (slug: string) => `/notes/${slug}/`
export const hubPath = (slug: HubSlug) => `/notes/topic/${slug}/`
export const notesPagePath = (page: number) => (page === 1 ? NOTES_PATH : `/notes/page/${page}/`)

export const notesByDate = () =>
  [...NOTES].sort((a, b) => b.published.localeCompare(a.published))

export function getNote(slug: string): Note {
  const note = NOTES.find((n) => n.slug === slug)
  if (!note) throw new Error(`No note "${slug}" in src/lib/notes.ts`)
  return note
}

/** The note a page under /notes/ belongs to, from its URL path. */
export const noteFromPath = (pathname: string) =>
  getNote(pathname.replace(/^\/notes\//, '').replace(/\/$/, ''))

export function getHub(slug: HubSlug): Hub {
  const hub = HUBS.find((h) => h.slug === slug)
  if (!hub) throw new Error(`No hub "${slug}" in src/lib/notes.ts`)
  return hub
}

export const notesInHub = (slug: HubSlug) => notesByDate().filter((n) => n.hub === slug)

/** Hubs with at least one note. Empty hubs get no page. */
export const activeHubs = () => HUBS.filter((h) => notesInHub(h.slug).length > 0)

export const isHubIndexable = (slug: HubSlug) => notesInHub(slug).length >= MIN_NOTES_TO_INDEX_HUB

export const notesPageCount = () => Math.max(1, Math.ceil(NOTES.length / NOTES_PER_PAGE))

export function notesOnPage(page: number) {
  const start = (page - 1) * NOTES_PER_PAGE
  return notesByDate().slice(start, start + NOTES_PER_PAGE)
}

/**
 * Hand-picked notes first, then the newest notes from the same hub and
 * language until the list is full.
 */
export function relatedNotes(note: Note, picks: string[] = []) {
  const picked = picks.map(getNote)
  const lang = note.lang ?? 'en'
  const fill = notesInHub(note.hub).filter(
    (n) => n.slug !== note.slug && !picks.includes(n.slug) && (n.lang ?? 'en') === lang,
  )
  return [...picked, ...fill].slice(0, Math.max(MAX_RELATED, picked.length))
}

/** Dates are East Java local time (WIB, UTC+7). */
export const toDateTime = (date: string) => `${date}T00:00:00+07:00`

export const formatNoteDate = (date: string) =>
  new Date(toDateTime(date)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  })

export function breadcrumbSchema(site: URL, crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: new URL(crumb.path, site).href,
    })),
  }
}
