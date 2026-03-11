import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  BrainCircuitIcon,
  RocketIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from "lucide-react"

const capabilities = [
  {
    icon: BrainCircuitIcon,
    title: "Fractional CTO",
    description:
      "You need someone to own the technical side  - architecture, stack choices, vendor evaluation, hiring  - without committing to a $150k/year executive. I act as your startup CTO on a fractional basis, embedded in your team weekly.",
    card: {
      badge: "Technical Leadership",
      heading: "What You Get",
      message:
        "Senior technical judgment and strategic oversight, without the full-time salary.",
      items: [
        "Architecture and technology decision-making",
        "Code review and technical quality oversight",
        "Sprint planning and async check-ins",
        "Team building from my network of trusted engineers",
        "Honest answers, not consultant fluff",
      ],
      tip: "Rebuilt a KOL platform from 85% to 99% uptime serving 5,000+ users.",
    },
  },
  {
    icon: RocketIcon,
    title: "MVP Development",
    description:
      "I design, build, and ship your product using AI-assisted development. What used to take a 3-person team 3 months, I move through in weeks  - without the technical debt that kills products at scale.",
    card: {
      badge: "Build",
      heading: "What You Get",
      message:
        "A working product shipped to production  - built fast, built right.",
      items: [
        "Core feature scoping and startup tech stack selection",
        "Full-stack development with Go, React, TypeScript, PostgreSQL",
        "Database design and API architecture",
        "Deployment to production infrastructure (AWS/Cloudflare)",
        "Analytics and monitoring from day one",
      ],
      tip: "15+ MVPs shipped. Chef booking marketplace  - two-sided platform, 10 weeks, one engineer.",
    },
  },
  {
    icon: ShieldCheckIcon,
    title: "Technical Advisory",
    description:
      "A one-time or recurring session for founders who need a second opinion  - on a vendor proposal, an agency quote, a build vs buy decision, or a technology choice. I'll tell you what I actually think.",
    card: {
      badge: "Advisory",
      heading: "What You Get",
      message:
        "Clarity on the technical decision in front of you  - before you commit.",
      items: [
        "Vendor and agency proposal review",
        "Build vs buy analysis for your specific case",
        "Stack recommendation based on your constraints",
        "Architecture review for existing systems",
        "Honest assessment  - even if it means 'don't build this yet'",
      ],
      tip: "Reduced infrastructure costs by 80% for a healthcare network.",
    },
  },
]

export function CapabilitiesSection() {
  const [active, setActive] = useState(0)
  const current = capabilities[active]

  return (
    <section
      id="services"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-xl text-4xl font-light leading-tight tracking-tight md:text-5xl">
          Your startup needs a CTO.
          <br />
          You don't need a{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            $200k salary
          </span>
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ What I Do ]
        </Badge>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        I work as an AI-native software engineer and fractional CTO for
        early-stage founders. I make the technical decisions, build the product,
        and help you ship  - so you can focus on customers, not code.
      </p>

      {/* Content grid */}
      <div className="mt-12 grid gap-10 md:grid-cols-[2fr_3fr]">
        {/* Left  - capability list */}
        <div className="flex flex-col">
          {capabilities.map((item, i) => {
            const isActive = i === active
            return (
              <div key={item.title}>
                <button
                  onClick={() => setActive(i)}
                  className={`w-full cursor-pointer py-5 text-left transition-opacity ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <item.icon className="size-4 text-muted-foreground" />
                    <h3 className="text-base font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </button>
                {i < capabilities.length - 1 && (
                  <Separator className="border-dashed" />
                )}
              </div>
            )
          })}
        </div>

        {/* Right  - dynamic card */}
        <div className="flex items-start justify-center md:sticky md:top-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <Badge
                    variant="secondary"
                    className="w-fit text-xs uppercase"
                  >
                    {current.card.badge}
                  </Badge>
                  <CardTitle className="mt-3 text-xl">
                    {current.card.heading}
                  </CardTitle>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {current.card.message}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2.5">
                    {current.card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-xs leading-relaxed text-muted-foreground italic">
                      {current.card.tip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
