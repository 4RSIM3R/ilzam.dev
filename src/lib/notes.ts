// Field notes registry. The /notes index, topic hubs, related-notes lists,
// RSS feed, sitemap lastmod and each note's structured data all read from
// here, so publishing a note is one entry in NOTES plus its page in
// src/pages/notes/. astro.config.mjs imports this file, so keep it free of
// `@/` imports. Hub copy is visitor-facing: write it for non-technical
// founders.

export type HubSlug = 'fractional-cto' | 'mvp-development-cost' | 'founder-decisions' | 'engineering'

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
    slug: 'fractional-cto',
    name: 'Fractional CTO',
    title: 'Fractional CTO Guides for Startup Founders | Ilzam',
    description: 'What a fractional CTO does, what one costs, and how to tell whether your startup needs one yet. Written by a working fractional CTO.',
    intro: [
      'A fractional CTO is a senior technical leader who works with your startup part time. They make the big technical decisions, check the work your developers ship, and help you hire, for a fraction of what a full-time executive costs.',
      'These notes cover when that arrangement makes sense, what it should cost, and how it compares to hiring a full-time CTO or finding a technical co-founder.',
    ],
    cta: { href: '/fractional-cto/pricing/', label: 'See fractional CTO pricing' },
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
    description: 'Practical frameworks for the technical calls founders make without a CTO, like which AI coding tool to pay for, how much process a team needs, and how to build a startup website.',
    intro: [
      'In an early startup, most technical decisions get made by someone who is not technical. These notes are for that person.',
      'Each one takes a single decision, like which AI coding tool to pay for or how much process a small team needs, and walks through how I would make it and why.',
    ],
    cta: { href: '/fractional-cto/pricing/', label: 'Talk a decision through in a Strategy Session' },
  },
  {
    slug: 'engineering',
    name: 'Engineering',
    title: 'Engineering Notes from Production Systems | Ilzam',
    description: 'Technical deep dives from real production work: event ingestion, Elasticsearch, concurrency, sandboxed AI agents, and codebase retrieval benchmarks.',
    intro: [
      'Write-ups from systems I have built and run in production, including the parts that broke. They are written for engineers and go deep into the details.',
      'Founders do not need to read these to work with me, but they show how I think about reliability and cost when the stakes are real.',
    ],
    cta: { href: '/work/', label: 'See the projects behind these notes' },
  },
]

export const NOTES: Note[] = [
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
    hub: 'founder-decisions',
    published: '2026-03-15',
  },
  {
    slug: 'gitnexus-codebase-rag-benchmark',
    title: "GitNexus Benchmark: Graph-Indexed Retrieval vs Claude Code's Native Exploration",
    description: "Does graph-indexed retrieval actually beat Claude Code's native codebase exploration? I ran the same architectural question both ways. $0.52 vs $0.39, 38 tool calls vs 12, and the KuzuDB internals that explain the difference.",
    hub: 'engineering',
    published: '2026-03-14',
  },
  {
    slug: 'ai-security-scanner-upstash-box',
    title: 'I Built an AI Agent That Runs Untrusted Code to Find Security Threats',
    description: '877,000 malicious packages and counting. I used Upstash Box to build a sandboxed AI security scanner that does both static and dynamic analysis.',
    hub: 'engineering',
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
