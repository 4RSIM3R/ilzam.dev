import {
  AI_FEATURE_OVERHEAD_HOURS,
  AI_FEATURE_THRESHOLD,
  BASELINE_POLISH_HOURS,
  FEATURE_COUNT_OVERHEAD_HOURS,
  FEATURE_COUNT_THRESHOLD,
  HOURLY_RATE_RANGE,
  HOURS_PER_BILLABLE_WEEK,
  PRICE_ROUNDING,
} from './config'
import { FEATURES } from './features'
import { BASE_STACK, INTERACTION_RULES, STACK_CATALOG } from './rules'
import type { Feature, FeatureCategory, StackCatalogEntry } from './types'

const FEATURES_BY_ID = new Map(FEATURES.map((f) => [f.id, f]))

const PHASE_ORDER = ['Setup & Architecture', 'Core Build', 'Integration & QA', 'Polish & Launch'] as const
export type Phase = (typeof PHASE_ORDER)[number]

const PHASE_BY_CATEGORY: Record<FeatureCategory, Phase> = {
  foundation: 'Setup & Architecture',
  auth: 'Setup & Architecture',
  payments: 'Core Build',
  communication: 'Core Build',
  admin: 'Core Build',
  data: 'Core Build',
  ai: 'Core Build',
  mobile: 'Core Build',
  integrations: 'Integration & QA',
  infra: 'Polish & Launch',
}

export interface OverheadItem {
  id: string
  label: string
  minHours: number
  maxHours: number
}

export interface PhaseBreakdown {
  phase: Phase
  minHours: number
  maxHours: number
  minWeeks: number
  maxWeeks: number
}

export interface TimelineEntry {
  phase: Phase
  weeks: number
  startWeek: number
  endWeek: number
}

export interface EstimateOptions {
  hourlyRateRange?: [number, number]
  hoursPerWeek?: number
}

export interface EstimateResult {
  selectedFeatures: Feature[]
  totalMinHours: number
  totalMaxHours: number
  /** Extra hours from feature combinations and category thresholds, for a
   * "why is this more than the raw feature sum" breakdown in the UI. */
  overhead: OverheadItem[]
  phases: PhaseBreakdown[]
  /** Cumulative week ranges assuming everything goes the fast way. */
  fastTimeline: TimelineEntry[]
  /** Cumulative week ranges assuming everything takes the slow end. */
  conservativeTimeline: TimelineEntry[]
  timelineMinWeeks: number
  timelineMaxWeeks: number
  priceMin: number
  priceMax: number
  recommendedStack: StackCatalogEntry[]
}

/** Follows `requires` transitively so a dependency can't be selected without
 * the feature it depends on (the UI should also reflect this by auto-checking
 * and disabling the dependency, not just rely on this expansion). */
function expandWithRequirements(rawSelectedIds: string[]): Set<string> {
  const result = new Set(rawSelectedIds)
  let changed = true
  while (changed) {
    changed = false
    for (const id of result) {
      for (const req of FEATURES_BY_ID.get(id)?.requires ?? []) {
        if (!result.has(req)) {
          result.add(req)
          changed = true
        }
      }
    }
  }
  return result
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step
}

function hoursToWeeks(hours: number, hoursPerWeek: number): number {
  return hours === 0 ? 0 : Math.max(1, Math.ceil(hours / hoursPerWeek))
}

function buildTimeline(phases: PhaseBreakdown[], key: 'minWeeks' | 'maxWeeks'): TimelineEntry[] {
  let cursor = 0
  return phases.map((p) => {
    const weeks = p[key]
    const startWeek = cursor + 1
    cursor += weeks
    return { phase: p.phase, weeks, startWeek, endWeek: cursor }
  })
}

function deriveStack(features: Feature[]): StackCatalogEntry[] {
  const tags = new Set(features.flatMap((f) => f.stackTags))
  return [...BASE_STACK, ...Array.from(tags).map((tag) => STACK_CATALOG[tag])]
}

export function estimateProject(rawSelectedIds: string[], options: EstimateOptions = {}): EstimateResult {
  const [rateMin, rateMax] = options.hourlyRateRange ?? HOURLY_RATE_RANGE
  const hoursPerWeek = options.hoursPerWeek ?? HOURS_PER_BILLABLE_WEEK

  const selectedIds = expandWithRequirements(rawSelectedIds)
  const selectedFeatures = FEATURES.filter((f) => selectedIds.has(f.id))

  const phaseHours: Record<Phase, [number, number]> = {
    'Setup & Architecture': [0, 0],
    'Core Build': [0, 0],
    'Integration & QA': [0, 0],
    'Polish & Launch': [0, 0],
  }
  for (const feature of selectedFeatures) {
    const bucket = phaseHours[PHASE_BY_CATEGORY[feature.category]]
    bucket[0] += feature.minHours
    bucket[1] += feature.maxHours
  }

  // Interaction-rule overhead is integration cost by definition.
  const overhead: OverheadItem[] = []
  for (const rule of INTERACTION_RULES) {
    if (rule.when.every((id) => selectedIds.has(id))) {
      overhead.push({ id: rule.id, label: rule.reason, minHours: rule.addHours[0], maxHours: rule.addHours[1] })
    }
  }

  const aiCount = selectedFeatures.filter((f) => f.category === 'ai').length
  if (aiCount >= AI_FEATURE_THRESHOLD) {
    overhead.push({
      id: 'ai-feature-set-overhead',
      label: `${aiCount} AI features selected — rate limiting, cost controls, and fallback handling compound across them`,
      minHours: AI_FEATURE_OVERHEAD_HOURS[0],
      maxHours: AI_FEATURE_OVERHEAD_HOURS[1],
    })
  }
  if (selectedFeatures.length >= FEATURE_COUNT_THRESHOLD) {
    overhead.push({
      id: 'feature-count-overhead',
      label: `${selectedFeatures.length} features selected — cross-feature regression surface grows non-linearly past ~${FEATURE_COUNT_THRESHOLD}`,
      minHours: FEATURE_COUNT_OVERHEAD_HOURS[0],
      maxHours: FEATURE_COUNT_OVERHEAD_HOURS[1],
    })
  }

  for (const item of overhead) {
    phaseHours['Integration & QA'][0] += item.minHours
    phaseHours['Integration & QA'][1] += item.maxHours
  }

  phaseHours['Polish & Launch'][0] += BASELINE_POLISH_HOURS[0]
  phaseHours['Polish & Launch'][1] += BASELINE_POLISH_HOURS[1]

  const phases: PhaseBreakdown[] = PHASE_ORDER.map((phase) => {
    const [minHours, maxHours] = phaseHours[phase]
    return {
      phase,
      minHours,
      maxHours,
      minWeeks: hoursToWeeks(minHours, hoursPerWeek),
      maxWeeks: hoursToWeeks(maxHours, hoursPerWeek),
    }
  }).filter((p) => p.maxHours > 0)

  const totalMinHours = phases.reduce((sum, p) => sum + p.minHours, 0)
  const totalMaxHours = phases.reduce((sum, p) => sum + p.maxHours, 0)

  const fastTimeline = buildTimeline(phases, 'minWeeks')
  const conservativeTimeline = buildTimeline(phases, 'maxWeeks')

  return {
    selectedFeatures,
    totalMinHours,
    totalMaxHours,
    overhead,
    phases,
    fastTimeline,
    conservativeTimeline,
    timelineMinWeeks: fastTimeline.at(-1)?.endWeek ?? 0,
    timelineMaxWeeks: conservativeTimeline.at(-1)?.endWeek ?? 0,
    priceMin: roundTo(totalMinHours * rateMin, PRICE_ROUNDING),
    priceMax: roundTo(totalMaxHours * rateMax, PRICE_ROUNDING),
    recommendedStack: deriveStack(selectedFeatures),
  }
}
