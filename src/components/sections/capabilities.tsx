import { useEffect, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
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
import { RESCUE_AUDIT, RETAINER_TIERS, formatUsd } from "@/lib/pricing"
import { EASE_OUT } from "@/lib/motion"

const capabilities = [
  {
    icon: RocketIcon,
    title: "Idea to Launch",
    description:
      "You have an idea and you're ready to test it with real customers. I build the first version (your MVP) and get it live. AI agents write most of the code while I make every call that matters, so a build that used to need a 3-person team for 3 months takes weeks.",
    card: {
      badge: "Launch",
      heading: "What you get",
      message:
        "A live product real customers can use, on code you own from day one.",
      items: [
        "Scope cut down to what your first customers will pay for",
        "Built on common, proven tools that any future developer can take over",
        "A working demo every week, so you always see real progress",
        "Launched on reliable hosting (AWS or Cloudflare)",
        "Usage tracking and error alerts from launch day",
      ],
      tip: "A two-sided chef booking marketplace, built by one engineer in 10 weeks.",
    },
  },
  {
    icon: LifeBuoyIcon,
    title: "Vibe-Code Rescue",
    description:
      "You built it fast with Lovable, Bolt, Cursor, or a cheap freelancer, and now real users are breaking it. I find what could hurt you and fix the most urgent problems first. A rewrite only happens if the code truly needs one.",
    card: {
      badge: "Rescue",
      heading: "What you get",
      message:
        "A plain-English report on what is broken, then the fixes, most urgent first.",
      items: [
        "Security check for leaked keys, open databases, and missing logins",
        "Fixes for the bugs and slow pages your users actually hit",
        "Tests around sign-up, payments, and every flow that must not break",
        "A straight answer on whether to fix it or rebuild it",
        `Starts with a ${formatUsd(RESCUE_AUDIT.price)} audit, taken off the fix price`,
      ],
      tip: "Rebuilt an influencer marketing platform with 5,000+ users, taking it from 85% to 99% uptime.",
    },
  },
  {
    icon: BrainCircuitIcon,
    title: "Engineer on Retainer",
    description:
      `You have developers or an agency, but nobody senior checking the work. I join your team by the month to make the technical calls, and I build alongside them when you need more hands. Plans run from ${RETAINER_TIERS[0].hoursPerMonth} to ${RETAINER_TIERS[RETAINER_TIERS.length - 1].hoursPerMonth} hours a month.`,
    card: {
      badge: "Retainer",
      heading: "What you get",
      message:
        "Senior judgment every week, on a plan you can cancel with 2 weeks' notice.",
      items: [
        "Decisions on how to build it and which tools to use",
        "A senior check on your developers' or agency's work",
        "A weekly call, plus answers to your messages between calls",
        "Help hiring developers you can trust",
        "Honest answers, even when the answer is 'don't build this yet'",
      ],
      tip: "Cut a healthcare network's hosting bill by 80%.",
    },
  },
]

// On desktop the service crossing the middle of the screen becomes the active one,
// so scrolling walks through all three without a click.
function useScrollSpy(onActive: (index: number) => void) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!window.matchMedia("(min-width: 48rem)").matches) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onActive(itemRefs.current.indexOf(entry.target as HTMLDivElement))
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )
    for (const item of itemRefs.current) if (item) observer.observe(item)
    return () => observer.disconnect()
  }, [])

  return itemRefs
}

export function CapabilitiesSection() {
  const [active, setActive] = useState(0)
  const current = capabilities[active]
  const itemRefs = useScrollSpy(setActive)
  const reduce = useReducedMotion()

  return (
    <section
      id="services"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 md:px-10 md:py-24"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="journey-reveal max-w-xl text-4xl leading-tight font-light tracking-tight md:text-5xl">
          Where is your product{" "}
          <span className="brand-marker font-normal">right now</span>?
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs tracking-widest uppercase md:inline-flex"
        >
          [ What I Do ]
        </Badge>
      </div>

      {/* Content grid */}
      <div className="mt-12 grid gap-10 md:grid-cols-5">
        {/* Left  - capability list */}
        <div className="flex flex-col md:col-span-2">
          {capabilities.map((item, i) => {
            const isActive = i === active
            return (
              <div
                key={item.title}
                ref={(node) => {
                  itemRefs.current[i] = node
                }}
                className="journey-reveal"
                style={{ "--i": i } as CSSProperties}
              >
                <button
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`relative w-full cursor-pointer py-5 pl-5 text-left transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-indicator"
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      className="absolute inset-y-5 left-0 w-0.5 rounded-full bg-brand"
                    />
                  )}
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
        <div className="relative md:sticky md:top-24 md:col-span-3 md:self-start">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: reduce ? 0 : 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: reduce ? 0 : -8, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="w-full"
            >
              <Card className="shadow-lg shadow-brand/5">
                <CardHeader>
                  <Badge
                    variant="secondary"
                    className="w-fit bg-brand-tint text-xs text-brand-ink uppercase"
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
                        <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-brand" />
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
