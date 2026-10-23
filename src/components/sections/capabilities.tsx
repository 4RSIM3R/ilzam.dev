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
  LifeBuoyIcon,
  CheckCircleIcon,
} from "lucide-react"

const capabilities = [
  {
    icon: RocketIcon,
    title: "MVP Build",
    description:
      "I design, build, and ship the first version of your product. AI agents write most of the code while I make every call that matters, so a build that used to need a 3-person team for 3 months takes weeks.",
    card: {
      badge: "Build",
      heading: "What You Get",
      message:
        "A working product in production, on code you own from day one.",
      items: [
        "Scope cut down to what your first customers will pay for",
        "Full-stack development with Go, React, TypeScript, PostgreSQL",
        "A working demo every week, so you always see real progress",
        "Deployment to production infrastructure (AWS/Cloudflare)",
        "Analytics and monitoring from launch day",
      ],
      tip: "15+ MVPs shipped. Chef booking marketplace, two-sided platform, 10 weeks, one engineer.",
    },
  },
  {
    icon: LifeBuoyIcon,
    title: "Vibe-Code Rescue",
    description:
      "You built it fast with Lovable, Bolt, Cursor, or a cheap freelancer, and now real users are breaking it. I find what is dangerous, fix what matters first, and get it ready for growth. A rewrite only happens if the code truly needs one.",
    card: {
      badge: "Rescue",
      heading: "What You Get",
      message:
        "A plain-English report on what is broken, then the fixes, most urgent first.",
      items: [
        "Security check for leaked keys, open databases, and missing logins",
        "Fixes for the bugs and slow pages your users actually hit",
        "Tests around sign-up, payments, and every flow that must not break",
        "A straight answer on whether to fix it or rebuild it",
        "One fixed price, agreed before any work starts",
      ],
      tip: "Rebuilt a KOL platform from 85% to 99% uptime serving 5,000+ users.",
    },
  },
  {
    icon: BrainCircuitIcon,
    title: "Engineer on Retainer",
    description:
      "A senior engineer on your team by the month. I make the technical calls, review what your developers or agency ship, and build alongside them when you need more hands. Plans run from 8 to 80 hours a month.",
    card: {
      badge: "Retainer",
      heading: "What You Get",
      message:
        "Senior judgment every week, on a plan you can cancel with 2 weeks' notice.",
      items: [
        "Architecture and technology decisions",
        "Code review for your developers or agency",
        "Weekly check-ins, with async access in between",
        "Help hiring developers you can trust",
        "Honest answers, even when the answer is 'don't build this yet'",
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
          I ship like a team of three.
          <br />
          You{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            pay for one
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
        I'm Ilzam, an AI-native software engineer working from East Java with
        founders everywhere. AI agents handle the typing while I make the
        decisions and review every change before it ships. That is how one
        engineer moves at the pace of a small team, and the code stays yours.
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
