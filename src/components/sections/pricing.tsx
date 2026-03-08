import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PhoneCallIcon, MailIcon } from "lucide-react"

const plans = [
  {
    label: "Fractional CTO",
    price: "Starting at $3,000",
    period: "/ Month",
    description:
      "Ongoing technical leadership for your startup. I embed in your team, make architecture decisions, review code, and keep your product on track.",
    features: [
      "Weekly async or live check-ins",
      "Architecture and stack decisions",
      "Code review and quality oversight",
      "Team hiring from my trusted network",
      "Sprint planning and prioritization",
      "Slack/async access between sessions",
    ],
    bestFor: "Pre-seed to seed startups. Non-technical founders. Companies between CTOs.",
    actions: [
      {
        label: "Book Intro Call",
        href: "https://cal.com/ilzam/intro",
        variant: "default" as const,
        full: true,
        icon: PhoneCallIcon,
      },
    ],
  },
  {
    label: "MVP Build",
    price: "From $8,000",
    period: "",
    description:
      "I scope, build, and ship your MVP to production. AI-assisted development means startup speed without agency prices. Most MVPs ship in 6-10 weeks.",
    features: [
      "Feature scoping and tech stack selection",
      "Full-stack development (Go, React, TypeScript)",
      "Database design and API architecture",
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
    label: "Technical Advisory",
    price: "$500",
    period: "/ Session",
    description:
      "A focused session where I review your vendor proposal, evaluate your tech stack, or give you a second opinion on a big technical decision.",
    features: [
      "60-minute deep-dive session",
      "Written summary with recommendations",
      "Follow-up async Q&A (48 hours)",
      "Vendor/agency proposal review",
      "Build vs buy analysis",
    ],
    bestFor: "Founders evaluating options. CTOs wanting peer review. Big decisions ahead.",
    actions: [
      {
        label: "Book Advisory Session",
        href: "https://cal.com/ilzam/advisory",
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
          Three ways to{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            work together
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
        Whether you need ongoing CTO-level support, a product built from
        scratch, or a one-time technical gut check — there's a clear path.
      </p>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
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
    </section>
  )
}
