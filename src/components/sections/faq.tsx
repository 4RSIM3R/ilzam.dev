import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What exactly does a fractional CTO do?",
    answer:
      "I act as your startup's technical leader on a part-time basis. That means I make architecture decisions, choose your tech stack, review code, plan sprints, and hire engineers  - everything a full-time CTO would do, without the $150k+ salary. I'm embedded in your team, not hovering above it.",
  },
  {
    question:
      "How is this different from hiring an agency or freelance developer?",
    answer:
      "An agency builds what you tell them to build. A freelancer writes the code you spec out. I ask 'should we even build this?' before writing a single line. You get strategic thinking and technical execution from the same person  - no game of telephone between a project manager, designer, and three junior developers.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "Most MVPs ship in 6-10 weeks. I use AI-assisted development to move at 2-3x traditional speed, but I don't cut corners on architecture. A chef booking marketplace took 10 weeks. A RAG pipeline took 6. The timeline depends on scope  - and I'll be honest if your scope needs trimming.",
  },
  {
    question:
      "I'm a non-technical founder. Do I need a fractional CTO or a technical co-founder?",
    answer:
      "If you're pre-product, exploring ideas, and need someone with skin in the game  - look for a co-founder. If you have a validated idea, funding (or revenue), and need someone to build it right and fast  - a fractional CTO gets you moving without giving up equity. Most of my clients are in the second camp.",
  },
  {
    question: "What tech stack do you recommend for an early-stage startup?",
    answer:
      "It depends on what you're building, but my default stack for most startups is Go + React + PostgreSQL on AWS. It's fast, scales well, and doesn't lock you in. I've also shipped production apps with TypeScript, .NET, Flutter, and Laravel  - I pick the stack based on your constraints, not my preferences.",
  },
  {
    question: "You're based in Indonesia  - how does the remote work?",
    answer:
      "I've been working remotely with US, European, and Southeast Asian clients for years. I'm currently embedded in a San Francisco AI company as an AI-native software engineer  - fully remote from East Java. Async by default, with live sessions when they matter. Time zone overlap has never been an issue.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="snap-start px-6 py-12 md:px-10 md:py-16">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-lg text-4xl font-light leading-tight tracking-tight md:text-5xl">
          Questions founders{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            usually ask
          </span>
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ FAQ ]
        </Badge>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="mt-12">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
