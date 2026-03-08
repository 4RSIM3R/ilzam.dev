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
    label: "Pro Plan",
    price: "$4,500",
    period: "/ Month",
    description:
      "Perfect for startups and teams who want ongoing design and product support without the hassle of hiring full-time.",
    features: [
      "Up to 2 active requests at a time",
      "UX Audit & Design Improvements",
      "UI/UX Design for Web or App",
      "Clickable Prototype (Figma)",
      "Weekly Progress Updates",
      "Priority Revisions & Support",
    ],
    actions: [
      {
        label: "Go to with my projects",
        href: "https://cal.com/ilzam/intro",
        variant: "default" as const,
        full: true,
      },
    ],
  },
  {
    label: "Custom Pricing",
    price: "Contact Me",
    period: "",
    description:
      "Perfect for startups and teams who want ongoing design and product support without the hassle of hiring full-time.",
    features: [
      "Unlimited active requests",
      "Dedicated Slack / Notion workspace",
      "Product Strategy & UX Research",
      "Full MVP or Feature Design",
      "Developer Handoff & QA Support",
      "Monthly Strategy Session with Ilzam",
    ],
    actions: [
      {
        label: "Book 15 Mins Call",
        href: "https://cal.com/ilzam/intro",
        variant: "outline" as const,
        full: false,
        icon: PhoneCallIcon,
      },
      {
        label: "Contact Me",
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
          From Idea to Launch
          <br />
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            Pick Your Track
          </span>
          .
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Pricing Package ]
        </Badge>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
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
                <p className="text-4xl font-light tracking-tight md:text-5xl">
                  {plan.price}
                  {plan.period && (
                    <span className="text-lg font-normal text-muted-foreground">
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
                  {"icon" in action && action.icon && (
                    <action.icon data-icon="inline-start" />
                  )}
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
