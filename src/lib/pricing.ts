// Single source of truth for service prices. The homepage pricing section and
// /pricing both read from here, so update prices only in this file.
// public/llms.txt is static and repeats these prices: update it by hand too.

export interface RetainerTier {
  id: string
  name: string
  monthlyPrice: number
  hoursPerMonth: number
  summary: string
  includes: string[]
  bestFor: string
}

/** One rate for all work: retainers, builds, and rescue fixes. */
export const HOURLY_RATE = 30

/** Client hours available per week. The biggest plan takes all of it. */
export const WEEKLY_CAPACITY_HOURS = 20

// Copy here is written for non-technical founders: describe outcomes, not jargon.
export const STRATEGY_SESSION = {
  name: 'Strategy Session',
  // The call plus prep and the written recommendation, about 5 hours of work.
  price: 5 * HOURLY_RATE,
  minutes: 90,
  includes: [
    'A 90-minute call about your biggest technical question',
    'A written recommendation within 48 hours',
    'A second opinion on a developer or agency quote',
    'Advice on building custom software vs using an existing tool',
    'Fully credited if you book a plan or build within 30 days',
  ],
}

/** Paid first step of a Vibe-Code Rescue. The fee comes off the fix price. */
export const RESCUE_AUDIT = {
  name: 'Rescue Audit',
  price: 10 * HOURLY_RATE,
  businessDays: 5,
  includes: [
    'I read the code and test the flows your users depend on',
    'Security check for leaked keys, open data, and missing logins',
    'A plain-English report, most urgent problems first',
    'One fixed price for the fixes, with the audit fee taken off',
  ],
}

export const RETAINER_TIERS: RetainerTier[] = [
  {
    id: 'advisor',
    name: 'Advisor',
    monthlyPrice: 20 * HOURLY_RATE,
    hoursPerMonth: 20,
    summary: 'A senior engineer on call, checking decisions and fixing the small stuff.',
    includes: [
      'A 30-minute call every week',
      'Message me questions anytime between calls',
      "Review of your developers' code and agency quotes",
      'Small fixes and improvements, done by me',
    ],
    bestFor: 'Founders who already have a developer or agency and want someone senior checking the work.',
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead',
    monthlyPrice: 40 * HOURLY_RATE,
    hoursPerMonth: 40,
    summary: 'I take charge of the technical side of your company, part time.',
    includes: [
      'Everything in Advisor',
      'Decide what to build first and which technology to use',
      'Plan the work with your developers every week or two',
      'Build features myself when the team needs more hands',
    ],
    bestFor: 'Early-stage startups without a technical leader.',
  },
  {
    id: 'embedded',
    name: 'Embedded Engineer',
    monthlyPrice: 80 * HOURLY_RATE,
    hoursPerMonth: 80,
    summary: `About ${WEEKLY_CAPACITY_HOURS} hours a week building your product with you. I take one Embedded client at a time.`,
    includes: [
      'Everything in Tech Lead',
      'I build the product with you, every week',
      'First call on my time over every other plan',
    ],
    bestFor: 'Founders who need one person to lead and build the product.',
  },
]

/** Smallest build: about 50 hours of work. */
export const MVP_BUILD_FROM = 50 * HOURLY_RATE

/** US senior software engineer salary used for comparisons across the site. */
export const FULL_TIME_ENGINEER_SALARY = 150_000

export const ENGAGEMENT_TERMS = "Month-to-month. Cancel with 2 weeks' notice."

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString('en-US')}`
}
