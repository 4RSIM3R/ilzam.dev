// Kawakib (plural of kaukab, "star"): a constellation of software by Ilzam.
// The /kawakib page renders from this list, so adding a product is one entry
// here. Write taglines for non-technical founders: what it does for them, not
// how it's built.

export type ProductStatus = 'live' | 'building' | 'idea'

export type ProductType = 'Free tool' | 'Open source' | 'SaaS' | 'Software'

export interface Product {
  name: string
  tagline: string
  status: ProductStatus
  type: ProductType
  /** Internal path (e.g. /tool/dns-checker) or a full external URL. */
  href?: string
}

export const STATUS_LABELS: Record<ProductStatus, string> = {
  live: 'Live',
  building: 'In progress',
  idea: 'Ideas',
}

export const STATUS_ORDER: ProductStatus[] = ['live', 'building', 'idea']

export const PRODUCTS: Product[] = [
  {
    name: 'App & Software Development Cost Calculator',
    tagline: 'Tick the features your product needs and get a price range and timeline in two minutes.',
    status: 'live',
    type: 'Free tool',
    href: '/tool/mvp-cost-estimator',
  },
  {
    name: 'DNS Checker',
    tagline: "Check your domain's settings when your website or email isn't working as expected.",
    status: 'live',
    type: 'Free tool',
    href: '/tool/dns-checker',
  },
  {
    name: 'Kotak Pasir',
    tagline: 'Safe, self-hosted spaces where AI agents can run code without touching anything important.',
    status: 'building',
    type: 'Open source',
    href: '/work/kotakpasir-agent-sandboxes',
  },
]
