import { useEffect, useRef, useState, type CSSProperties } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRightIcon } from "lucide-react"
import { easeOut } from "@/lib/motion"

const caseStudies = [
  {
    title: "kotakpasir",
    subtitle: "Safe, locked-down workspaces for AI agents, on a $5 server.",
    label: "Open Source / Infra",
    region: "MIT, Pre-1.0",
    year: "2026, ongoing",
    slug: "kotakpasir-agent-sandboxes",
    stack: ["Go", "Docker", "Fiber v3", "SQLite", "MCP", "Prometheus"],
    brief:
      "AI agents that write code need a safe place to run it. kotakpasir gives each agent its own sealed-off container with strict limits on what it can reach, and it runs on a $5 server where other options need paid hosting or special hardware.",
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

const stats = [
  {
    value: "15+",
    label: "Products Launched",
    description:
      "Built and launched across marketplaces, SaaS, AI, and government systems.",
  },
  {
    value: "80%",
    label: "Cost Reduction",
    description:
      "Lower hosting bill for a healthcare network.",
  },
  {
    value: "99%",
    label: "Uptime",
    description:
      "Time online after I rebuilt a platform serving 5,000+ users.",
  },
]

// Counts up as the stat scrolls toward the middle of the screen, and back down on the way up.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const target = Number.parseInt(value, 10)
  const suffix = value.replace(String(target), "")

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.55"] })
  const display = useTransform(scrollYProgress, (progress) =>
    `${Math.round(easeOut(progress) * target)}${suffix}`
  )

  useEffect(() => setMounted(true), [])

  // The server and the first render show the real number, so it is never wrong without JavaScript.
  if (!mounted || reduce) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true" className="tabular-nums">
        {display}
      </motion.span>
    </span>
  )
}

export function CaseStudiesSection() {
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 md:px-10 md:py-24"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="journey-reveal max-w-3xl text-4xl leading-tight font-light tracking-tight md:text-5xl">
          Every product starts as an idea. Not every idea{" "}
          <span className="brand-marker font-normal">ships</span>. These did.
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs tracking-widest uppercase md:inline-flex"
        >
          [ Things I've Shipped ]
        </Badge>
      </div>

      <p className="journey-reveal mt-4 text-sm text-muted-foreground">
        Most details are under NDA. Here's what I can share.
      </p>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {caseStudies.map((study, i) => (
          <a
            key={study.title}
            href={`/work/${study.slug}/`}
            className="group journey-reveal block"
            style={{ "--i": i } as CSSProperties}
          >
            <Card className="h-full gap-0 overflow-hidden border p-0 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-brand/10">
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
                  <ArrowUpRightIcon className="size-4 text-muted-foreground opacity-0 transition duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand group-hover:opacity-100" />
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

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 divide-y border-t md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="journey-reveal py-6 md:px-6 md:first:pl-0 md:last:pr-0"
            style={{ "--i": i } as CSSProperties}
          >
            <p className="text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-brand">
                <CountUp value={stat.value} />
              </span>{" "}
              <span className="text-2xl font-normal md:text-3xl">
                {stat.label}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {stat.description}
            </p>
          </div>
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
