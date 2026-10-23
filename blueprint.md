# ilzam.dev — Site Content Blueprint

---

## Core Positioning

**Name:** Ilzam
**Title:** AI-Native Software Engineer
**Location:** East Java, Indonesia, working remotely with clients worldwide

**Positioning in one line:** One engineer, AI agents doing the typing, a human signing off on every change. Speed of a small team, code you can keep for years.

**What the brand stands on (show these, never list them as buzzwords):**
- AI-native: AI agents write most of the first draft. I make the decisions and review everything before it ships.
- Pragmatic: the simplest stack that works, and "don't build this yet" when that is the honest answer. Never call it "pragmatic" in copy; "The Pragmatic Engineer" is someone else's brand.
- Fast feedback: working software every week. Never say "agile" in copy; founders hear Jira and ceremonies.

**Retired:** "Fractional CTO" is no longer used anywhere on the site (dropped 2026-10-23).

---

## Tagline

Primary (homepage hero):
> "I ship like a team of three. You pay for one."

Support lines:
> "AI agents handle the typing. I make the calls and review every change."
> "Building from East Java. Shipping to the world." (footer)

---

## Hero Section (above the fold)

**Headline:**
> I ship like a team of three. You pay for one.

**Subheadline:**
> I'm Ilzam, an AI-native software engineer working from East Java with founders everywhere. AI agents handle the typing while I make the decisions and review every change before it ships. That is how one engineer moves at the pace of a small team, and the code stays yours.

**Social proof line (under CTA):**
> 15+ MVPs shipped. Clients in the US, Europe, and Southeast Asia.

**CTA:**
> Book a free intro call → cal.com/ilzam/intro

---

## About / Who I Am

**Short version (for header/bio):**
> AI-native software engineer. I've shipped 15+ MVPs, led platform rebuilds for 5,000+ user systems, and currently work embedded in a San Francisco AI company — remotely from East Java, Indonesia. I build with Go, React, TypeScript, .NET, and PostgreSQL. I think in systems, not tickets.

**Long version (for about page):**

I started as an Android developer intern, became a freelance lead, then built and shipped products across healthcare, government, education, fintech, and SaaS — mostly in Indonesia, now increasingly for international clients.

I've reduced infrastructure costs by 80% for a healthcare network. I've led a team that rebuilt a KOL management platform from 85% uptime to 99% serving 5,000+ users. I've guided 60+ vocational teachers through technical upskilling. I've shipped booking marketplaces, RAG pipelines, POS systems, and social monitoring platforms.

Most of my production work is under NDA. What I can offer is the thinking behind the patterns — and references on request.

I'm not a ticket-taker. I'm the person who asks "why are we building this?" before "how do we build this?" — and then actually builds it.

Currently based in Pasuruan, East Java. Graduated D4 Teknik Informatika from Politeknik Negeri Malang. Contributing to the BlankOn Linux Revival Project.

---

## What I Offer (Services)

### 1. MVP Build
**Tagline:** "From whiteboard to deployed. Fast."

I design, build, and ship the first version of your product. AI agents write most of the code while I make every call that matters, so a build that used to need a 3-person team for 3 months takes weeks. A working demo every week.

What I've built: marketplaces, SaaS platforms, mobile apps (iOS + Android), RAG/AI pipelines, government dashboards, booking systems, POS systems, social monitoring tools.

Stack: Go, React, TypeScript, Node.js, .NET, PostgreSQL, Redis, Stripe, AWS.

Best for: Founders with a validated idea ready to build.

---

### 2. Vibe-Code Rescue
**Tagline:** "Your AI-built prototype works until real users show up."

For founders who built fast with Lovable, Bolt, Cursor, or a cheap freelancer and are now watching it break. I find what is dangerous, fix what matters first, and get it ready for growth. A rewrite only happens if the code truly needs one.

What's included:
- Security check for leaked keys, open databases, and missing logins
- Fixes for the bugs and slow pages users actually hit
- Tests around sign-up, payments, and every flow that must not break
- A straight answer on whether to fix it or rebuild it
- One fixed price, agreed before any work starts

Best for: Founders with paying users on a prototype that was never built for them.

---

### 3. Engineer on Retainer
**Tagline:** "A senior engineer on your team, by the month."

I make the technical calls, review what your developers or agency ship, and build alongside them when you need more hands. Plans: Advisor (~8 h), Tech Lead (~40 h), Embedded Engineer (~80 h, includes building). Prices live in `src/lib/pricing.ts`.

Best for: Pre-seed to seed startups. Non-technical founders. Teams without a senior engineer.

One-off option: the 90-minute Strategy Session for a single big decision (vendor proposal, agency quote, build vs buy).

---

## Proof Points (scatter across the site)

- 15+ MVPs shipped, generating ~IDR 2 billion in revenue
- Reduced infrastructure costs by 80% for a healthcare network
- Rebuilt a KOL platform from 85% to 99% uptime, serving 5,000+ users
- Introduced methodology that cut requirement analysis time by 75%
- Guided 60+ vocational teachers through Flutter and web development upskilling
- Shipped government systems, marketplace platforms, and AI pipelines
- Currently embedded in a San Francisco AI company as an AI-native software engineer
- 3rd place, LKS Cloud Computing Regional Competition
- Founded first hackathon in a religious boarding school (Hackathon Santri)

---

## Tech Stack Section

**Headline:** "What I work with"

Languages: Go, TypeScript, JavaScript, PHP, C#, Dart
Frontend: React, .NET, Flutter, Inertia.js, Tailwind CSS
Backend: Go Fiber, Node.js, Express, Laravel, .NET
Data & Infra: PostgreSQL, MySQL, Redis, Docker, Kubernetes, AWS
Architecture: Event-driven, microservices, REST APIs, RAG pipelines, hybrid search

---

## Writing / Notes Section (pSEO layer)

**Section headline:** "Field Notes"
**Subheadline:** "Things I've figured out in production — written down so you don't have to figure them out the hard way."

### pSEO URL Patterns

**Pattern 1: Technical problem → real solution**
URL: `/notes/[problem-in-stack]`

- `/notes/pgvector-hybrid-search-go` ✅ drafted
- `/notes/maui-memory-optimization-dotnet`
- `/notes/rag-chunking-markdown-ast`
- `/notes/playwright-cloudflare-graphql`
- `/notes/stripe-connect-marketplace-gotchas`
- `/notes/go-monolith-vs-microservices-v1-startup`
- `/notes/bm25-vector-rrf-retrieval-quality`
- `/notes/localstack-sqs-local-development`
- `/notes/pgvector-install-config-mac`

**Pattern 2: Decision framework for founders**
URL: `/notes/[decision-founders-face]`

- `/notes/how-to-rescue-an-ai-built-prototype`
- `/notes/build-vs-buy-early-stage-startup`
- `/notes/how-to-evaluate-agency-proposal`
- `/notes/mvp-stack-choice-2026`
- `/notes/how-much-does-mvp-cost`
- `/notes/technical-co-founder-vs-hiring-an-engineer`
- `/notes/when-to-rewrite-vs-refactor`

**Pattern 3: Stack comparison (search traffic)**
URL: `/notes/[tech]-vs-[tech]-[use-case]`

- `/notes/go-vs-node-rest-api-startup`
- `/notes/pgvector-vs-pinecone-rag`
- `/notes/nextjs-vs-astro-content-site`
- `/notes/flutter-vs-maui-cross-platform`
- `/notes/laravel-vs-go-api-performance`

---

## Case Studies Section

**Section headline:** "Things I've Shipped"
**Subheadline:** "Most details are under NDA. Here's what I can share."

### Case Study 1: Chef Booking Marketplace ✅ drafted
Tagline: "Two-sided marketplace, 10 weeks, one engineer."
Stack: Go, React, PostgreSQL, Stripe Connect, Redis
Region: Scandinavia

### Case Study 2: AI Knowledge Pipeline
Tagline: "RAG that actually retrieves the right thing."
Stack: Go, PostgreSQL, pgvector, BM25, markdown AST
Region: US — San Francisco

### Case Study 3: KOL Management Platform Rebuild
Tagline: "85% to 99% uptime. 5,000+ users. One team."
Stack: Full-stack rebuild, led team of developers
Region: Indonesia — Jakarta

### Case Study 4: Government Vocational Dashboard
Tagline: "Centralizing education data for a national directorate."
Stack: REST API, recommender system, data dashboard
Region: Indonesia — Remote

---

## CTA Blocks (use throughout the site)

**Primary — hero and end of service pages:**
```
Ready to build something?
Book a free 30-minute intro call. No pitch, no pressure —
just a real conversation about what you're building.

→ cal.com/ilzam/intro
```

**Technical — end of notes/field notes:**
```
Working on something similar?
I've shipped this in production. If you want a second
opinion on your approach, book a technical call.

→ cal.com/ilzam/technical
```

**Founder — end of decision framework posts:**
```
Not sure what to build or how to build it?
That's exactly what the advisory session is for.

→ cal.com/ilzam/advisory
```

---

## Footer Tagline Options

> "Building from East Java. Shipping to the world."
> "Pasuruan → San Francisco → everywhere."
> "Remote by choice. Reliable by nature."

---

## SEO Defaults

Site title: `Muhammad Ilzam Mulkhaq | AI-Native Software Engineer for Founders`

Meta description:
`I ship like a team of three, and you pay for one. AI-native software engineer for early-stage founders: MVP builds, vibe-code rescue, and a senior engineer on retainer. Based in Indonesia, working globally.`

OG image text: `Ilzam.dev | I ship like a team of three. You pay for one.`

---

## Tone Rules (for writing consistency)

- Write like you're talking to a smart non-technical founder
- Direct, no fluff — say the thing
- Specific over vague — "10 weeks" beats "fast"
- Show the thinking, not just the outcome
- Confident but not arrogant — let the proof points do the bragging
- Indonesian context is a feature, not something to hide — lean into it