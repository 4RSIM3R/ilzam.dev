import type { InteractionRule, StackCatalogEntry, StackTag } from './types'

// Extra cost for combinations where integration overhead isn't captured by
// summing the two features' own hours.
export const INTERACTION_RULES: InteractionRule[] = [
  {
    id: 'billing-per-org',
    when: ['multi-tenant', 'subscriptions'],
    addHours: [8, 16],
    reason: 'Per-organization billing, seats, and plan limits add coordination work beyond either feature alone.',
  },
  {
    id: 'permission-aware-admin',
    when: ['rbac', 'admin-dashboard'],
    addHours: [4, 8],
    reason: 'Admin views need to respect roles instead of assuming full access.',
  },
  {
    id: 'chat-push-delivery',
    when: ['realtime-chat', 'push-notifications'],
    addHours: [4, 8],
    reason: 'Presence state has to decide when to fall back from a live socket to a push notification.',
  },
  {
    id: 'usage-metrics-in-admin',
    when: ['usage-billing', 'admin-dashboard'],
    addHours: [4, 8],
    reason: 'Metered usage needs to be surfaced and reconciled in the admin view, not just billed.',
  },
  {
    id: 'doc-ingestion-pipeline',
    when: ['rag-search', 'file-upload'],
    addHours: [6, 12],
    reason: 'Uploaded files need a parsing/chunking/embedding pipeline before RAG can use them.',
  },
]

// Always recommended regardless of selected features.
export const BASE_STACK: StackCatalogEntry[] = [
  { label: 'Astro / Next.js' },
  { label: 'Cloudflare (hosting + edge)' },
]

export const STACK_CATALOG: Record<StackTag, StackCatalogEntry> = {
  postgres: { label: 'PostgreSQL (Neon/Supabase)' },
  redis: { label: 'Redis (Upstash)', note: 'presence & rate limiting' },
  oauth: { label: 'OAuth (Clerk / Auth.js)' },
  stripe: { label: 'Stripe (Checkout & Billing)' },
  'stripe-connect': { label: 'Stripe Connect', note: 'marketplace payouts' },
  s3: { label: 'Object storage (Cloudflare R2)' },
  websocket: { label: 'WebSockets (Durable Objects / Pusher)' },
  push: { label: 'Push notifications (OneSignal / FCM)' },
  email: { label: 'Transactional email (Resend)' },
  sms: { label: 'SMS (Twilio)' },
  'search-index': { label: 'Search index (Meilisearch / Algolia)' },
  'vector-db': { label: 'Vector DB (pgvector / Pinecone)' },
  'llm-api': { label: 'LLM API (Claude / OpenAI)' },
  'react-native': { label: 'Expo / React Native' },
  pwa: { label: 'Service worker + web manifest' },
  cms: { label: 'Headless CMS (Sanity / Payload)' },
  i18n: { label: 'i18n (next-intl / Paraglide)' },
  monitoring: { label: 'Error tracking (Sentry)' },
  'ci-cd': { label: 'CI/CD (GitHub Actions)' },
  maps: { label: 'Maps (Mapbox / Google Maps)' },
  queue: { label: 'Background jobs / queue (Cloudflare Queues)' },
}
