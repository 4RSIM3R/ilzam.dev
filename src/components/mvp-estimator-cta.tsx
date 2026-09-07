import { Button } from "@/components/ui/button"
import { PhoneCallIcon, MailIcon } from "lucide-react"
import type { EstimateResult } from "@/lib/mvp-estimator"

interface MvpEstimatorCtaProps {
  estimate: EstimateResult
}

// Cal.com prefills the booking form from `name`, `email`, `notes`, etc.,
// used here so a booked call already comes in with what they were scoping.
function buildSummary(estimate: EstimateResult): string {
  const featureList = estimate.selectedFeatures.map((f) => f.label).join(", ") || "none selected yet"
  return [
    `MVP estimate from ilzam.dev/tool/mvp-cost-estimator`,
    `Features: ${featureList}`,
    `Estimated price: $${estimate.priceMin.toLocaleString()}-$${estimate.priceMax.toLocaleString()}`,
    `Estimated timeline: ${estimate.timelineMinWeeks}-${estimate.timelineMaxWeeks} weeks`,
  ].join("\n")
}

export function MvpEstimatorCta({ estimate }: MvpEstimatorCtaProps) {
  const summary = buildSummary(estimate)
  const calHref = `https://cal.com/ilzam/intro?notes=${encodeURIComponent(summary)}`
  const mailtoHref = `mailto:ilzammulkhaq85@gmail.com?subject=${encodeURIComponent(
    `MVP scope: ${estimate.selectedFeatures.length} features`
  )}&body=${encodeURIComponent(summary)}`

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-8 py-10 md:px-12 md:py-14">
      <div className="relative z-10 max-w-lg">
        <h2 className="text-2xl font-light leading-tight tracking-tight text-white md:text-3xl">
          Want this built?
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
          Book a free 30-minute call and I'll walk through this estimate,
          sanity-check the scope, and tell you what I'd actually cut for a v1.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="outline"
            nativeButton={false}
            className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            render={<a href={calHref} target="_blank" rel="noopener noreferrer" />}
          >
            <PhoneCallIcon data-icon="inline-start" />
            Book a Free Intro Call
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            render={<a href={mailtoHref} />}
          >
            <MailIcon data-icon="inline-start" />
            Or Email Me
          </Button>
        </div>
      </div>
    </div>
  )
}
