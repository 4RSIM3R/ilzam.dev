import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question:
      "How do you usually approach a new design project from start to finish?",
    answer:
      "Every project begins with clarity — understanding your goals, target users, and the problem you're solving. From there, I move into UX flow mapping, wireframing, and high-fidelity UI design. Once the concept feels right, I prototype interactions and collaborate with your team until everything aligns perfectly.",
  },
  {
    question:
      "What design tools and platforms do you typically use in your workflow?",
    answer:
      "I primarily use Figma for design and prototyping, paired with tools like Notion for documentation, Slack for communication, and VS Code for any front-end development. For analytics and research, I leverage hotjar, Google Analytics, and user testing platforms.",
  },
  {
    question:
      "How long does it usually take to complete a project or deliver an MVP?",
    answer:
      "It depends on scope, but most projects take 2–6 weeks. A simple landing page or UI audit can be done in a week, while a full MVP design with prototyping typically takes 4–6 weeks. I always set clear timelines upfront so there are no surprises.",
  },
  {
    question: "Do you also handle development, or just design?",
    answer:
      "I'm a full-stack designer and developer. I can take a project from concept through to a working product using modern frameworks like Astro, React, and Tailwind CSS. If you already have a dev team, I'm happy to hand off polished designs with developer-ready specs.",
  },
  {
    question: "How does the payment process work for your services?",
    answer:
      "For subscription plans, billing is monthly with no long-term commitment — you can pause or cancel anytime. For custom projects, I typically work with a 50% upfront deposit and 50% upon completion. All payments are handled through secure invoicing.",
  },
  {
    question:
      "Can I start with a smaller project before committing to a full subscription?",
    answer:
      "Absolutely. Many clients start with a one-off project like a UX audit or a single feature design to see how we work together. If you're happy with the results, you can always move to a subscription plan for ongoing support.",
  },
]

export function FaqSection() {
  return (
    <section
      id="faq"
      className="snap-start px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-lg text-4xl font-light leading-tight tracking-tight md:text-5xl">
          Things You Might{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            Want to Know
          </span>
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Frequently Asked Questions ]
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
