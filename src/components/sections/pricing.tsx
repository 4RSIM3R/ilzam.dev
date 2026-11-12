import type { CSSProperties } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRightIcon, PhoneCallIcon } from "lucide-react"
import {
  HOURLY_RATE,
  MVP_BUILD_FROM,
  RESCUE_AUDIT,
  RETAINER_TIERS,
  STRATEGY_SESSION,
  formatUsd,
} from "@/lib/pricing"
import { StarMark } from "@/components/journey/star-mark"

const plans = [
  {
    label: "Retainer",
    price: `From ${formatUsd(RETAINER_TIERS[0].monthlyPrice)}`,
    period: "/ Month",
    description:
      `A senior engineer on your team every week, in plans from ${RETAINER_TIERS[0].hoursPerMonth} to ${RETAINER_TIERS[RETAINER_TIERS.length - 1].hoursPerMonth} hours a month. Pick the plan that matches how much help you need.`,
    features: [
      "A weekly call, plus messages between calls",
      "Decisions on how to build and which tools to use",
      "A senior check on your developers' work",
      "Hands-on building when you need it",
      "Help hiring developers you can trust",
    ],
    bestFor: "Pre-seed to seed startups. Non-technical founders. Teams without a senior engineer.",
    action: { label: "See retainer plans", href: "/pricing/", icon: ArrowRightIcon },
  },
  {
    label: "Idea to Launch",
    price: `From ${formatUsd(MVP_BUILD_FROM)}`,
    period: "",
    description:
      "Your first version, built and launched. AI agents do the heavy lifting and I review every change, so you get a small team's speed at a fraction of agency prices. Most products launch in 6-10 weeks.",
    features: [
      "Scope cut to what your first customers need",
      "The whole product built, screens to database",
      "A working demo every week",
      "Launched on reliable hosting (AWS or Cloudflare)",
      "30 days of support after launch",
    ],
    bestFor: "Founders ready to build. Validated ideas that need to become real products.",
    action: { label: "Discuss your build", href: "https://cal.com/ilzam/intro", icon: PhoneCallIcon },
  },
  {
    label: "Vibe-Code Rescue",
    price: formatUsd(RESCUE_AUDIT.price),
    period: "/ Audit",
    description:
      `Your AI-built prototype works until real users show up. A ${RESCUE_AUDIT.businessDays}-day audit finds what is broken, then you get one fixed price to make it secure and stable, with the audit fee taken off.`,
    features: [
      "Security check for leaked keys and open data",
      "Fixes for the bugs users actually hit",
      "Tests on sign-up, payments, and core flows",
      "An honest fix-or-rebuild call",
    ],
    bestFor: "Founders who built with Lovable, Bolt, Cursor, or a cheap freelancer and now have paying users.",
    action: { label: "Get a quote", href: "https://cal.com/ilzam/intro", icon: PhoneCallIcon },
  },
  {
    label: STRATEGY_SESSION.name,
    price: formatUsd(STRATEGY_SESSION.price),
    period: "/ Session",
    description:
      "A second opinion before you spend money on a big technical decision, like an agency quote or which tools to build on.",
    features: STRATEGY_SESSION.includes,
    bestFor: "Founders evaluating options. Engineering leads wanting a peer review. Big decisions ahead.",
    action: { label: "Book a session", href: "https://cal.com/ilzam/intro", icon: PhoneCallIcon },
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 md:px-10 md:py-24"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="journey-reveal max-w-md text-4xl font-light leading-tight tracking-tight md:text-5xl">
          The AI agents{" "}
          <span className="brand-marker font-normal">come free</span>
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Pricing ]
        </Badge>
      </div>

      <p className="journey-reveal mt-4 max-w-xl text-sm text-muted-foreground">
        Every option is billed at the same {formatUsd(HOURLY_RATE)} an hour for
        my time, and you get a clear price before any work starts. Not sure
        which one fits? Start with a {STRATEGY_SESSION.name}. It comes off the
        bill if you go ahead within 30 days.
      </p>

      {/* Cards. On wide screens they fan out from a stack as the section scrolls in. */}
      <div className="journey-deal mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, i) => (
          <Card
            key={plan.label}
            className="journey-reveal flex flex-col"
            style={{ "--i": i } as CSSProperties}
          >
            <CardHeader className="space-y-4">
              <Badge
                variant="secondary"
                className="w-fit rounded-sm text-xs uppercase tracking-wider"
              >
                {plan.label}
              </Badge>
              <div>
                <p className="text-3xl font-light tracking-tight md:text-4xl">
                  {plan.price}
                  {plan.period && (
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}{plan.period}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 pt-6">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <StarMark className="size-2.5 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground italic">
                Best for: {plan.bestFor}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="brand"
                size="lg"
                className="h-10 w-full rounded-full"
                render={
                  plan.action.href.startsWith("/") ? (
                    <a href={plan.action.href} />
                  ) : (
                    <a
                      href={plan.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  )
                }
              >
                <plan.action.icon data-icon="inline-start" />
                {plan.action.label}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Need something else, like a larger build or extra hands for your team?{" "}
        <a
          href="https://cal.com/ilzam/intro"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Book a call
        </a>{" "}
        and we'll scope it together.
      </p>
    </section>
  )
}
