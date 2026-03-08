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
  SearchIcon,
  UsersIcon,
  PenToolIcon,
  RocketIcon,
  CheckCircleIcon,
} from "lucide-react"

const capabilities = [
  {
    icon: SearchIcon,
    title: "UX Audit",
    description:
      "Identify what's holding your product back. I analyze usability, flow, and interaction patterns to uncover friction points and turn them into opportunities for better user experience.",
    card: {
      badge: "UX Audit",
      heading: "What You'll Get",
      message:
        "A detailed report that pinpoints exactly where users drop off and what to fix first.",
      items: [
        "Usability & clarity findings report",
        "Accessibility & WCAG compliance check",
        "Design consistency & pattern review",
        "Prioritized action plan with quick wins",
      ],
      tip: "A thorough audit typically uncovers 15–30 actionable improvements that directly impact user retention and conversion.",
    },
  },
  {
    icon: UsersIcon,
    title: "User Segmentation & Insights",
    description:
      "Define who your users truly are. I help you develop clear user segments and behavioral insights to make every design decision data-driven and human-centered.",
    card: {
      badge: "User Research",
      heading: "What You'll Get",
      message:
        "Clear user profiles and behavioral maps so every design decision is backed by real data.",
      items: [
        "User persona documents with goals & pain points",
        "Behavioral segment mapping & journey flows",
        "Data-driven design recommendations",
        "Prioritized opportunities by business impact",
      ],
      tip: "Mapping segments to specific user journeys increases feature adoption by up to 40%.",
    },
  },
  {
    icon: PenToolIcon,
    title: "UI/UX Design & Prototyping",
    description:
      "From concept to clickable prototype — I design interfaces that don't just look good but feel intuitive, efficient, and on-brand.",
    card: {
      badge: "Design",
      heading: "What You'll Get",
      message:
        "Pixel-perfect screens and a clickable prototype you can test with real users before writing code.",
      items: [
        "Wireframes & information architecture",
        "High-fidelity UI mockups in Figma",
        "Interactive prototype with real user flows",
        "Design system with reusable components",
      ],
      tip: "Clickable prototypes reduce development rework by 60% by catching issues before a single line of code is written.",
    },
  },
  {
    icon: RocketIcon,
    title: "MVP Product Development",
    description:
      "Turn your idea into a working product fast. I help you design, build, and launch your MVP with just the right features to validate your vision and attract early users.",
    card: {
      badge: "Development",
      heading: "What You'll Get",
      message:
        "A working product shipped to production, ready for real users and feedback from day one.",
      items: [
        "Core feature scoping & tech stack selection",
        "Rapid development with modern frameworks",
        "Deployment to production infrastructure",
        "Analytics setup for launch-day insights",
      ],
      tip: "The best MVPs ship in 4–6 weeks. Anything longer usually means the scope needs trimming, not the timeline extending.",
    },
  },
]

export function CapabilitiesSection() {
  const [active, setActive] = useState(0)
  const current = capabilities[active]

  return (
    <section
      id="capability"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-xl text-4xl font-light leading-tight tracking-tight md:text-5xl">
          I don't bring dreams,
          <br />
          I bring{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            solutions
          </span>{" "}
          for your Business
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Capabilities ]
        </Badge>
      </div>

      {/* Content grid */}
      <div className="mt-12 grid gap-10 md:grid-cols-[2fr_3fr]">
        {/* Left — capability list */}
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

        {/* Right — dynamic card */}
        <div className="hidden items-start justify-center md:flex">
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
