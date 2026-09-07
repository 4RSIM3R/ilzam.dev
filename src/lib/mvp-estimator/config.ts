// Tunable business assumptions, kept separate from calculation logic so
// pricing/pace can be adjusted without touching calculator.ts.

/** Blended [min, max] hourly rate used to turn hours into a price range. */
export const HOURLY_RATE_RANGE: [number, number] = [25, 45]

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
