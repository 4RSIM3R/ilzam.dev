import { useMemo, useState } from "react"
import { DownloadIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MvpEstimatorCta } from "@/components/mvp-estimator-cta"
import { CATEGORIES, FEATURES, estimateProject, type Feature } from "@/lib/mvp-estimator"

const FEATURES_BY_ID = new Map(FEATURES.map((f) => [f.id, f]))

const FEATURES_BY_CATEGORY = new Map<string, Feature[]>(
  CATEGORIES.map((category) => [category.id, FEATURES.filter((f) => f.category === category.id)])
)

const DEPENDENTS_BY_ID = new Map<string, string[]>()
for (const feature of FEATURES) {
  for (const requiredId of feature.requires ?? []) {
    DEPENDENTS_BY_ID.set(requiredId, [...(DEPENDENTS_BY_ID.get(requiredId) ?? []), feature.id])
  }
}

export function MvpCostEstimator() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const estimate = useMemo(() => estimateProject(Array.from(selected)), [selected])
  const hasSelection = estimate.selectedFeatures.length > 0

  function toggleFeature(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        const toRemove = [id]
        while (toRemove.length) {
          const current = toRemove.pop()!
          if (next.delete(current)) {
            toRemove.push(...(DEPENDENTS_BY_ID.get(current) ?? []))
          }
        }
      } else {
        const toAdd = [id]
        while (toAdd.length) {
          const current = toAdd.pop()!
          if (!next.has(current)) {
            next.add(current)
            toAdd.push(...(FEATURES_BY_ID.get(current)?.requires ?? []))
          }
        }
      }
      return next
    })
  }

  function clearAll() {
    setSelected(new Set())
  }

  return (
    <>
      <div className="grid gap-8 print:hidden lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {CATEGORIES.map((category) => (
            <div key={category.id}>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {category.label}
              </h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {(FEATURES_BY_CATEGORY.get(category.id) ?? []).map((feature) => (
                  <label
                    key={feature.id}
                    className="flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 text-sm hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={selected.has(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                      className="mt-0.5"
                    />
                    <span>
                      {feature.label}
                      {feature.requires?.length ? (
                        <span className="block text-xs text-muted-foreground">
                          Requires{" "}
                          {feature.requires.map((id) => FEATURES_BY_ID.get(id)?.label).join(", ")}
                        </span>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border p-5 lg:sticky lg:top-20">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Your estimate
            </p>
            {hasSelection && (
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <XIcon className="size-3" />
                Clear all
              </button>
            )}
          </div>

          {hasSelection ? (
            <>
              <p className="mt-3 text-3xl font-light tracking-tight">
                ${estimate.priceMin.toLocaleString()} - ${estimate.priceMax.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {estimate.timelineMinWeeks}-{estimate.timelineMaxWeeks} weeks ·{" "}
                {estimate.selectedFeatures.length} feature
                {estimate.selectedFeatures.length === 1 ? "" : "s"}
              </p>

              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Timeline
                </p>
                <ol className="mt-2 space-y-1.5 text-sm">
                  {estimate.phases.map((phase, i) => (
                    <li key={phase.phase} className="flex justify-between gap-3">
                      <span>
                        {i + 1}. {phase.phase}
                      </span>
                      <span className="shrink-0 text-muted-foreground">
                        {phase.minWeeks}-{phase.maxWeeks}w
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {estimate.overhead.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Why it's more than the raw sum
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    {estimate.overhead.map((item) => (
                      <li key={item.id}>{item.label}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Recommended stack
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {estimate.recommendedStack.map((stack) => (
                    <Badge key={stack.label} variant="secondary">
                      {stack.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="mt-6 w-full" onClick={() => window.print()}>
                <DownloadIcon data-icon="inline-start" />
                Download scope doc
              </Button>

              <div className="mt-4">
                <MvpEstimatorCta estimate={estimate} />
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Select features on the left to see your price range, timeline, and recommended
              stack.
            </p>
          )}
        </div>
      </div>

      {hasSelection && (
        <div className="hidden print:block">
          <h1 className="text-2xl font-semibold">MVP Scope & Estimate</h1>
          <p className="mt-1 text-sm text-gray-600">
            Prepared by ilzam.dev · {new Date().toLocaleDateString()}
          </p>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider">
            Selected features
          </h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {estimate.selectedFeatures.map((feature) => (
              <li key={feature.id}>{feature.label}</li>
            ))}
          </ul>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider">Estimated price</h2>
          <p className="mt-1 text-sm">
            ${estimate.priceMin.toLocaleString()} - ${estimate.priceMax.toLocaleString()}
          </p>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider">Timeline</h2>
          <ul className="mt-2 text-sm">
            {estimate.phases.map((phase, i) => (
              <li key={phase.phase}>
                {i + 1}. {phase.phase}: {phase.minWeeks}-{phase.maxWeeks} weeks
              </li>
            ))}
          </ul>
          <p className="mt-1 text-sm">
            Total: {estimate.timelineMinWeeks}-{estimate.timelineMaxWeeks} weeks
          </p>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider">
            Recommended stack
          </h2>
          <p className="mt-1 text-sm">
            {estimate.recommendedStack.map((stack) => stack.label).join(", ")}
          </p>

          <p className="mt-8 text-xs text-gray-500">
            Book a call to review this scope: cal.com/ilzam/intro
          </p>
        </div>
      )}
    </>
  )
}
