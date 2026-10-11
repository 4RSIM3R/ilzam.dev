// Single source of truth for service prices. The homepage pricing section and
// /fractional-cto/pricing both read from here, so update prices only in this file.
// public/llms.txt is static and repeats these prices: update it by hand too.

export interface CtoTier {
  id: string
  name: string
  monthlyPrice: number
  hoursPerMonth: number
  summary: string
  includes: string[]
  bestFor: string
}

// Copy here is written for non-technical founders: describe outcomes, not jargon.
export const STRATEGY_SESSION = {
  name: 'Strategy Session',
  price: 300,
  minutes: 90,
  includes: [
    'A 90-minute call about your biggest technical question',
    'A written recommendation within 48 hours',
    'A second opinion on a developer or agency quote',
    'Advice on building custom software vs using an existing tool',
  ],
}

export const CTO_TIERS: CtoTier[] = [
  {
    id: 'advisor',
    name: 'Advisor',
    monthlyPrice: 1000,
    hoursPerMonth: 8,
    summary: 'A senior tech expert you can call on, while you stay in charge.',
    includes: [
      'A 30-minute call every week',
      'Message me questions anytime between calls',
      'A second opinion on quotes from developers or agencies',
    ],
    bestFor: 'Founders who already have a developer or agency and want someone senior checking the decisions.',
  },
  {
    id: 'fractional',
    name: 'Fractional CTO',
    monthlyPrice: 3000,
    hoursPerMonth: 40,
    summary: 'I take charge of the technical side of your company, part time.',
    includes: [
      'Decide what to build first and which technology to use',
      'Plan the work with your developers every week or two',
      "Check the quality of your developers' work",
      'Help you hire developers and manage outside agencies',
    ],
    bestFor: 'Early-stage startups without a technical leader.',
  },
  {
    id: 'hands-on',
    name: 'Hands-on CTO',
    monthlyPrice: 5500,
    hoursPerMonth: 80,
    summary: 'Everything in Fractional CTO, and I build the product with you.',
    includes: [
      'Everything in Fractional CTO',
      'I write code and build features myself, alongside your team',
    ],
    bestFor: 'Founders who need one person to lead and build the product.',
  },
]

export const MVP_BUILD_FROM = 2500

/** Full-time CTO salary used for comparisons across the site. */
export const FULL_TIME_CTO_SALARY = 150_000

export const ENGAGEMENT_TERMS = "Month-to-month. Cancel with 2 weeks' notice."

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString('en-US')}`
}

export function effectiveHourlyRate(tier: CtoTier) {
  return Math.round(tier.monthlyPrice / tier.hoursPerMonth)
}
