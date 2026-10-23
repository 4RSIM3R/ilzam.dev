import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// The homepage FAQPage structured data reads this list too, so the answers
// Google sees always match the page.
export const faqs = [
  {
    question: "What does \"AI-native\" actually mean for my product?",
    answer:
      "AI coding agents write most of the first draft: features, tests, and the boring glue code. I decide what gets built, how it fits together, and I review every change before it ships, the way a senior engineer reviews a junior's work. The AI is where the speed comes from. The review is why the next engineer who opens your codebase can still understand it. You own all of the code.",
  },
  {
    question:
      "How is this different from hiring an agency or freelance developer?",
    answer:
      "With an agency, a project manager, a designer, and a few developers sit between you and the code. With me, the person on the call is the person building it. I'll also ask 'should we even build this?' before writing a single line, which is the question that saves founders the most money.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "Most MVPs ship in 6-10 weeks. I use AI-assisted development to move at 2-3x traditional speed, but I don't cut corners on architecture. A chef booking marketplace took 10 weeks. A RAG pipeline took 6. The timeline depends on scope, and I'll be honest if your scope needs trimming.",
  },
  {
    question: "My app was built with AI and it keeps breaking. Can you fix it?",
    answer:
      "Usually, yes. I start by reading the code and checking security, your data, and the flows your users depend on. Then you get a plain-English list of what to fix first and one fixed price for the work. If the prototype isn't worth saving, I'll tell you why before you spend anything on fixes.",
  },
  {
    question:
      "I'm a non-technical founder. Do I need a technical co-founder, or can I just hire you?",
    answer:
      "If you're pre-product, exploring ideas, and want someone with skin in the game, look for a co-founder. If you have a validated idea and funding or revenue, and you need the product built well and fast, hiring me gets you moving without giving up equity. Most of my clients are in the second camp.",
  },
  {
    question: "What tech stack do you recommend for an early-stage startup?",
    answer:
      "It depends on what you're building, but my default stack for most startups is Go + React + PostgreSQL on AWS. It's fast, scales well, and doesn't lock you in. I've also shipped production apps with TypeScript, .NET, Flutter, and Laravel, and I pick the stack that fits your constraints.",
  },
  {
    question: "You're based in Indonesia. How does the remote work?",
    answer:
      "I've been working remotely with US, European, and Southeast Asian clients for years. I'm currently embedded in a San Francisco AI company as an AI-native software engineer, fully remote from East Java. Async by default, with live sessions when they matter. Time zone overlap has never been an issue.",
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
