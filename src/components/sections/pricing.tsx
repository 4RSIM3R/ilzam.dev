import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRightIcon, PhoneCallIcon, MailIcon } from "lucide-react"
import {
  HOURLY_RATE,
  MVP_BUILD_FROM,
  RESCUE_AUDIT,
  RETAINER_TIERS,
  STRATEGY_SESSION,
  formatUsd,
} from "@/lib/pricing"

const plans = [
  {
    label: "Retainer",
    price: `From ${formatUsd(RETAINER_TIERS[0].monthlyPrice)}`,
    period: "/ Month",
    description:
      `A senior engineer on your team every week, in plans from ${RETAINER_TIERS[0].hoursPerMonth} to ${RETAINER_TIERS[RETAINER_TIERS.length - 1].hoursPerMonth} hours a month. I make the technical calls, review your developers' work, and build when you need it.`,
    features: [
      "Weekly check-ins, live or async",
      "Architecture and stack decisions",
      "Code review and quality oversight",
      "Hands-on building when you need it",
      "Help hiring developers you can trust",
      "Slack/async access between sessions",
    ],
    bestFor: "Pre-seed to seed startups. Non-technical founders. Teams without a senior engineer.",
    actions: [
      {
        label: "See Plans",
        href: "/pricing/",
        variant: "outline" as const,
        full: false,
        icon: ArrowRightIcon,
      },
      {
        label: "Book Intro Call",
        href: "https://cal.com/ilzam/intro",
        variant: "default" as const,
        full: false,
        icon: PhoneCallIcon,
      },
    ],
  },
  {
    label: "MVP Build",
    price: `From ${formatUsd(MVP_BUILD_FROM)}`,
    period: "",
    description:
      "I scope, build, and ship your MVP to production. AI agents do the heavy lifting and I review every change, so you get startup speed at a fraction of agency prices. Most MVPs ship in 6-10 weeks.",
    features: [
      "Feature scoping and tech stack selection",
      "Full-stack development (Go, React, TypeScript)",
      "A working demo every week",
      "Production deployment (AWS/Cloudflare)",
      "30 days of post-launch support",
    ],
    bestFor: "Founders ready to build. Validated ideas that need to become real products.",
    actions: [
      {
        label: "Discuss Your Build",
        href: "https://cal.com/ilzam/intro",
        variant: "default" as const,
        full: true,
        icon: PhoneCallIcon,
      },
    ],
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
    actions: [
      {
        label: "Get a Quote",
        href: "https://cal.com/ilzam/intro",
        variant: "default" as const,
        full: true,
        icon: PhoneCallIcon,
      },
    ],
  },
  {
    label: STRATEGY_SESSION.name,
    price: formatUsd(STRATEGY_SESSION.price),
    period: "/ Session",
    description:
      "A focused session where I review your vendor proposal, evaluate your tech stack, or give you a second opinion on a big technical decision.",
    features: STRATEGY_SESSION.includes,
    bestFor: "Founders evaluating options. Engineering leads wanting a peer review. Big decisions ahead.",
    actions: [
      {
        label: "Book Session",
        href: "https://cal.com/ilzam/intro",
        variant: "outline" as const,
        full: false,
        icon: PhoneCallIcon,
      },
      {
        label: "Email Me",
        href: "mailto:ilzammulkhaq85@gmail.com",
        variant: "default" as const,
        full: false,
        icon: MailIcon,
      },
    ],
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-md text-4xl font-light leading-tight tracking-tight md:text-5xl">
          Four ways to{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            work with me
          </span>
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Pricing ]
        </Badge>
      </div>

      <p className="mt-4 max-w-xl text-sm text-muted-foreground">
        A senior engineer by the month, a product built from scratch, a rescue
        for the prototype that is falling over, or a one-time gut check. Every
        option is billed at the same {formatUsd(HOURLY_RATE)} an hour, with a
        clear price before we start.
      </p>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.label} className="flex flex-col">
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
                    <span className="size-1.5 shrink-0 rounded-full bg-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground italic">
                Best for: {plan.bestFor}
              </p>
            </CardContent>
            <CardFooter className="flex gap-3">
              {plan.actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  className={action.full ? "w-full" : "flex-1"}
                  render={
                    action.href.startsWith("/") ? (
                      <a href={action.href} />
                    ) : (
                      <a
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    )
                  }
                >
                  <action.icon data-icon="inline-start" />
                  {action.label}
                </Button>
              ))}
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
