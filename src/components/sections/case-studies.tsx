import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRightIcon } from "lucide-react"

const caseStudies = [
  {
    title: "Chef Booking Marketplace",
    subtitle: "Two-sided marketplace, 10 weeks, one engineer.",
    label: "Marketplace",
    region: "Scandinavia",
    year: "2024",
    slug: "chef-booking-marketplace",
    stack: ["Go", "React", "PostgreSQL", "Stripe Connect", "Redis"],
    brief:
      "Built a complete chef booking platform from zero — matching customers with private chefs, handling payments through Stripe Connect, and managing real-time availability.",
  },
  {
    title: "AI Knowledge Pipeline",
    subtitle: "RAG that actually retrieves the right thing.",
    label: "AI / RAG",
    region: "San Francisco, US",
    year: "2025",
    slug: "ai-knowledge-pipeline",
    stack: ["Go", "PostgreSQL", "pgvector", "BM25", "Markdown AST"],
    brief:
      "Designed and built a retrieval-augmented generation pipeline with hybrid search — combining vector similarity and BM25 keyword matching for accurate document retrieval.",
  },
  {
    title: "KOL Platform Rebuild",
    subtitle: "85% to 99% uptime. 5,000+ users. One team.",
    label: "Platform Rebuild",
    region: "Jakarta, Indonesia",
    year: "2024",
    slug: "kol-platform-rebuild",
    stack: ["Full-stack rebuild", "Team lead"],
    brief:
      "Led the technical rebuild of a KOL management platform. Took uptime from 85% to 99%, introduced proper architecture, and scaled to serve 5,000+ daily active users.",
  },
  {
    title: "Vocational Dashboard",
    subtitle: "Centralizing education data for a national directorate.",
    label: "Government Tech",
    region: "Indonesia",
    year: "2023",
    slug: "vocational-dashboard",
    stack: ["REST API", "Recommender system", "Data dashboard"],
    brief:
      "Built a centralized dashboard for Indonesia's vocational education directorate — pulling data from multiple sources into a single view with a recommendation engine.",
  },
]

export function CaseStudiesSection() {
  return (
    <section
      id="work"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-tight md:text-5xl">
          Every product starts as an idea. Not every idea{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            ships
          </span>
          . These did.
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Things I've Shipped ]
        </Badge>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Most details are under NDA. Here's what I can share.
      </p>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {caseStudies.map((study) => (
          <a
            key={study.title}
            href={`/work/${study.slug}`}
            className="group"
          >
            <Card className="gap-0 overflow-hidden border p-0 transition-shadow group-hover:shadow-md">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs uppercase">
                    {study.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {study.region} / {study.year}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{study.title}</h3>
                  <ArrowUpRightIcon className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {study.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {study.brief}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="rounded-full text-xs font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Working on something that could be case study #5?{" "}
        <a
          href="https://cal.com/ilzam/intro"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Book a call
        </a>
      </p>
    </section>
  )
}
