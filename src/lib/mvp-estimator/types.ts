export type FeatureCategory =
  | 'foundation'
  | 'auth'
  | 'payments'
  | 'communication'
  | 'admin'
  | 'data'
  | 'ai'
  | 'mobile'
  | 'integrations'
  | 'infra'

// One tag per real infra/service decision a feature forces. Used to derive
// the "recommended stack" output by unioning tags across selected features,
// not to model the feature itself.
export type StackTag =
  | 'postgres'
  | 'redis'
  | 'oauth'
  | 'stripe'
  | 'stripe-connect'
  | 's3'
  | 'websocket'
  | 'push'
  | 'email'
  | 'sms'
  | 'search-index'
  | 'vector-db'
  | 'llm-api'
  | 'react-native'
  | 'pwa'
  | 'cms'
  | 'i18n'
  | 'monitoring'
  | 'ci-cd'
  | 'maps'
  | 'queue'

export interface Feature {
  id: string
  label: string
  category: FeatureCategory
  /** Solo mid-level dev effort, MVP-grade (not enterprise-hardened). */
  minHours: number
  maxHours: number
  stackTags: StackTag[]
  /** Feature ids that get auto-checked (and disabled) when this one is checked. */
  requires?: string[]
  helpText?: string
}

export interface CategoryMeta {
  id: FeatureCategory
  label: string
  description?: string
}

// Extra hours for a *combination* of features whose integration cost is
// more than the sum of the parts. All ids in `when` must be selected.
// Category-wide thresholds (e.g. "3+ AI features") are cheap to compute
// directly in the calculator and don't need a rule shape here.
export interface InteractionRule {
  id: string
  when: string[]
  addHours: [number, number]
  reason: string
}

export interface StackCatalogEntry {
  label: string
  note?: string
}
