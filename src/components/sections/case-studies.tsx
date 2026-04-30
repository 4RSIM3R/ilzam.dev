import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRightIcon } from "lucide-react"

const caseStudies = [
  {
    title: "kotakpasir",
    subtitle: "Self-hosted sandboxes for AI agents, on a $5 VPS.",
    label: "Open Source / Infra",
    region: "MIT, Pre-1.0",
    year: "2026, ongoing",
    slug: "kotakpasir-agent-sandboxes",
    stack: ["Go", "Docker", "Fiber v3", "SQLite", "MCP", "Prometheus"],
    brief:
      "Hardened Docker containers wrapped in a Go control plane with HTTP, MCP, CLI, and SDK surfaces. YAML policy, per-sandbox egress proxy, warm pool, and Prometheus metrics. The middle path between hosted sandboxes and microVM stacks that need KVM.",
  },
  {
    title: "Dapo Vokasi",
    subtitle: "Unifying vocational teacher data across 7 national training centers.",
    label: "Government Tech",
    region: "Indonesia",
    year: "2024 - 2025",
    slug: "dapo-vokasi-data-platform",
    stack: ["Laravel", "Inertia.js", "React.js", "SQL Server", "ETL Pipeline"],
    brief:
      "Built a unified data platform for Indonesia's vocational education directorate. Distilled 20 million rows of teaching records into 300,000+ clean teacher profiles across 7 national training centers.",
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
        Working on something that could be the next case study?{" "}
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
