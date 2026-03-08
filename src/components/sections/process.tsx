import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MessageCircleQuestionIcon,
  GitForkIcon,
  CodeIcon,
  BarChart3Icon,
} from "lucide-react"

const steps = [
  {
    icon: MessageCircleQuestionIcon,
    title: "Understand the Problem",
    description:
      "Before touching any code, I ask the question most developers skip: 'Why are we building this?' I dig into your business goals, user needs, and constraints. This is where 80% of bad technical decisions get prevented.",
  },
  {
    icon: GitForkIcon,
    title: "Make the Hard Calls",
    description:
      "Stack selection. Build vs buy. Monolith vs microservices. I make these decisions with you based on your stage, budget, and timeline — not based on what's trendy. I've seen what works at startup scale and what becomes technical debt by month six.",
  },
  {
    icon: CodeIcon,
    title: "Ship It",
    description:
      "I build with AI-assisted development — moving at 2-3x the speed of a traditional agency while writing production-quality code. Go, React, TypeScript, PostgreSQL. You get weekly updates, working demos, and zero surprises.",
  },
  {
    icon: BarChart3Icon,
    title: "Measure and Improve",
    description:
      "Launch isn't the finish line. I set up monitoring, review real user data, and help you prioritize what to build next. The goal is a product that works in production — not just in a demo.",
  },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-lg text-4xl font-light leading-tight tracking-tight md:text-5xl">
          How I take you from
          <br />
          idea to{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            shipped product
          </span>
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ How I Work ]
        </Badge>
      </div>

      {/* Steps */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-col">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                {i + 1}
              </span>
              <step.icon className="size-4 text-muted-foreground" />
              <h3 className="text-base font-semibold">{step.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
            {i < steps.length - 1 && (
              <Separator className="mt-8 border-dashed md:hidden" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
