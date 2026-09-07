import type { CategoryMeta, Feature } from './types'

export const CATEGORIES: CategoryMeta[] = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'auth', label: 'Auth & Users' },
  { id: 'payments', label: 'Payments & Billing' },
  { id: 'communication', label: 'Communication' },
  { id: 'admin', label: 'Admin & Ops' },
  { id: 'data', label: 'Data & Files' },
  { id: 'ai', label: 'AI Features' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'infra', label: 'Infra & Production Readiness' },
]

export const FEATURES: Feature[] = [
  // Foundation
  { id: 'landing-page', label: 'Marketing landing page', category: 'foundation', minHours: 8, maxHours: 16, stackTags: [] },
  { id: 'onboarding-flow', label: 'Guided onboarding / setup wizard', category: 'foundation', minHours: 10, maxHours: 20, stackTags: [] },
  { id: 'responsive-design', label: 'Mobile-responsive UI', category: 'foundation', minHours: 6, maxHours: 12, stackTags: [] },

  // Auth & Users
  { id: 'email-auth', label: 'Email/password sign up & login', category: 'auth', minHours: 8, maxHours: 14, stackTags: ['postgres'] },
  { id: 'social-login', label: 'Social login (Google/Apple/GitHub)', category: 'auth', minHours: 6, maxHours: 10, stackTags: ['oauth'] },
  { id: 'magic-link', label: 'Passwordless / magic link login', category: 'auth', minHours: 5, maxHours: 8, stackTags: ['email'] },
  { id: 'rbac', label: 'Role-based permissions', category: 'auth', minHours: 10, maxHours: 18, stackTags: ['postgres'], requires: ['email-auth'] },
  { id: 'user-profiles', label: 'User profile management', category: 'auth', minHours: 6, maxHours: 10, stackTags: [] },
  { id: 'multi-tenant', label: 'Team / organization accounts', category: 'auth', minHours: 20, maxHours: 36, stackTags: ['postgres'], requires: ['rbac'] },

  // Payments & Billing
  { id: 'one-time-payments', label: 'One-time payments checkout', category: 'payments', minHours: 8, maxHours: 14, stackTags: ['stripe'] },
  { id: 'subscriptions', label: 'Subscription billing & plans', category: 'payments', minHours: 16, maxHours: 28, stackTags: ['stripe'] },
  { id: 'usage-billing', label: 'Usage-based / metered billing', category: 'payments', minHours: 20, maxHours: 32, stackTags: ['stripe', 'queue'] },
  { id: 'invoicing', label: 'Invoices & receipts', category: 'payments', minHours: 8, maxHours: 14, stackTags: ['stripe'] },
  { id: 'marketplace-payouts', label: 'Marketplace payouts (split payments)', category: 'payments', minHours: 24, maxHours: 40, stackTags: ['stripe-connect'] },

  // Communication
  { id: 'realtime-chat', label: 'In-app real-time chat', category: 'communication', minHours: 20, maxHours: 36, stackTags: ['websocket', 'redis'] },
  { id: 'comments', label: 'Comments & threaded discussions', category: 'communication', minHours: 10, maxHours: 18, stackTags: ['postgres'] },
  { id: 'push-notifications', label: 'Push notifications', category: 'communication', minHours: 10, maxHours: 16, stackTags: ['push'] },
  { id: 'email-notifications', label: 'Transactional email notifications', category: 'communication', minHours: 6, maxHours: 10, stackTags: ['email'] },
  { id: 'sms-notifications', label: 'SMS notifications', category: 'communication', minHours: 8, maxHours: 12, stackTags: ['sms'] },

  // Admin & Ops
  { id: 'admin-dashboard', label: 'Admin dashboard (CRUD panel)', category: 'admin', minHours: 16, maxHours: 28, stackTags: ['postgres'] },
  { id: 'analytics-dashboard', label: 'Analytics dashboard with charts', category: 'admin', minHours: 14, maxHours: 24, stackTags: ['postgres'] },
  { id: 'cms', label: 'Content management system', category: 'admin', minHours: 16, maxHours: 28, stackTags: ['cms', 'postgres'] },
  { id: 'audit-logs', label: 'Audit logs & activity history', category: 'admin', minHours: 8, maxHours: 14, stackTags: ['postgres'] },
  { id: 'feature-flags', label: 'Feature flags / A-B testing', category: 'admin', minHours: 8, maxHours: 14, stackTags: [] },

  // Data & Files
  { id: 'full-text-search', label: 'Full-text search', category: 'data', minHours: 10, maxHours: 18, stackTags: ['search-index'] },
  { id: 'advanced-filtering', label: 'Advanced filtering & sorting', category: 'data', minHours: 6, maxHours: 12, stackTags: ['postgres'] },
  { id: 'file-upload', label: 'File upload & storage', category: 'data', minHours: 8, maxHours: 14, stackTags: ['s3'] },
  { id: 'data-export', label: 'Data export (CSV/PDF)', category: 'data', minHours: 6, maxHours: 10, stackTags: [] },
  { id: 'bulk-import', label: 'Bulk data import', category: 'data', minHours: 8, maxHours: 14, stackTags: ['queue'] },

  // AI Features
  { id: 'ai-chatbot', label: 'AI chatbot / assistant', category: 'ai', minHours: 16, maxHours: 28, stackTags: ['llm-api'] },
  { id: 'rag-search', label: 'RAG over user documents', category: 'ai', minHours: 24, maxHours: 40, stackTags: ['llm-api', 'vector-db'] },
  { id: 'ai-content-gen', label: 'AI content generation', category: 'ai', minHours: 12, maxHours: 20, stackTags: ['llm-api'] },
  { id: 'ai-image-gen', label: 'AI image/video generation', category: 'ai', minHours: 14, maxHours: 24, stackTags: ['llm-api'] },
  { id: 'voice-transcription', label: 'Voice transcription', category: 'ai', minHours: 10, maxHours: 18, stackTags: ['llm-api'] },

  // Mobile
  { id: 'cross-platform-app', label: 'Cross-platform mobile app (Expo/React Native)', category: 'mobile', minHours: 60, maxHours: 100, stackTags: ['react-native'] },
  { id: 'native-ios', label: 'Native iOS app', category: 'mobile', minHours: 80, maxHours: 140, stackTags: [] },
  { id: 'native-android', label: 'Native Android app', category: 'mobile', minHours: 80, maxHours: 140, stackTags: [] },
  { id: 'pwa-offline', label: 'PWA / offline support', category: 'mobile', minHours: 12, maxHours: 20, stackTags: ['pwa'] },

  // Integrations
  { id: 'third-party-integration', label: 'Generic third-party API integration', category: 'integrations', minHours: 8, maxHours: 16, stackTags: [] },
  { id: 'webhooks', label: 'Webhooks (inbound/outbound)', category: 'integrations', minHours: 8, maxHours: 14, stackTags: ['queue'] },
  { id: 'calendar-sync', label: 'Calendar sync (Google/Outlook)', category: 'integrations', minHours: 10, maxHours: 18, stackTags: ['oauth'] },
  { id: 'maps-geolocation', label: 'Maps & geolocation', category: 'integrations', minHours: 8, maxHours: 14, stackTags: ['maps'] },
  { id: 'i18n', label: 'Multi-language support', category: 'integrations', minHours: 10, maxHours: 20, stackTags: ['i18n'] },

  // Infra & Production Readiness
  { id: 'seo', label: 'SEO optimization', category: 'infra', minHours: 6, maxHours: 10, stackTags: [] },
  { id: 'ci-cd', label: 'CI/CD pipeline', category: 'infra', minHours: 6, maxHours: 10, stackTags: ['ci-cd'] },
  { id: 'monitoring', label: 'Error tracking & monitoring', category: 'infra', minHours: 4, maxHours: 8, stackTags: ['monitoring'] },
]
