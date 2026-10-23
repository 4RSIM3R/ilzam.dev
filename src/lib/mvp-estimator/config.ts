// Tunable business assumptions, kept separate from calculation logic so
// pricing/pace can be adjusted without touching calculator.ts.

import { HOURLY_RATE, MVP_BUILD_FROM } from '../pricing'
import type { FeatureCategory } from './types'

/** [min, max] hourly rate used to turn hours into a price range. Both ends are
 * the site-wide rate, so the range comes from the hours estimate alone. */
export const HOURLY_RATE_RANGE: [number, number] = [HOURLY_RATE, HOURLY_RATE]

/** Share of a feature's pre-AI build hours still needed with AI-assisted
 * development (2026). Routine screens, forms, and admin work speed up most;
 * payments and connections to other systems speed up least because they need
 * careful verification. Overhead and launch hours are not reduced: reviewing
 * and testing AI output is the bottleneck now. Calibrated so a two-sided
 * booking marketplace lands at 6-10 weeks (a real one shipped in 10 weeks with
 * one engineer). */
export const AI_ASSIST_FACTOR: Record<FeatureCategory, number> = {
  foundation: 0.5,
  auth: 0.6,
  payments: 0.75,
  communication: 0.65,
  admin: 0.5,
  data: 0.6,
  ai: 0.7,
  mobile: 0.6,
  integrations: 0.8,
  infra: 0.7,
}

/** Smallest price the estimator shows, matching "MVP Build from" on the homepage. */
export const MINIMUM_PROJECT_PRICE = MVP_BUILD_FROM

/** Effective billable hours per week for a solo dev (accounts for client
 * calls, context switching, etc., not a 40h week). */
export const HOURS_PER_BILLABLE_WEEK = 25

/** Every project needs some QA/deploy pass even with zero infra features picked. */
export const BASELINE_POLISH_HOURS: [number, number] = [4, 8]

/** 3+ AI features means rate limiting, cost controls, and fallback handling
 * start compounding across them. */
export const AI_FEATURE_THRESHOLD = 3
export const AI_FEATURE_OVERHEAD_HOURS: [number, number] = [6, 12]

/** Past ~15 selected features, cross-feature regression surface grows
 * non-linearly (more states to test, more edge cases between features). */
export const FEATURE_COUNT_THRESHOLD = 15
export const FEATURE_COUNT_OVERHEAD_HOURS: [number, number] = [10, 20]

/** Round displayed prices to the nearest this many currency units. */
export const PRICE_ROUNDING = 50
