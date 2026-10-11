import type { CategoryMeta, Feature } from './types'

// Labels and help text are written for non-technical founders. Keep jargon out
// of `label`; if a technical term helps (e.g. when talking to a developer),
// put it in parentheses or in `helpText`.

export const CATEGORIES: CategoryMeta[] = [
  { id: 'foundation', label: 'The Basics' },
  { id: 'auth', label: 'User Accounts' },
  { id: 'payments', label: 'Payments' },
  { id: 'communication', label: 'Messages & Notifications' },
  { id: 'admin', label: 'Managing Your Business' },
  { id: 'data', label: 'Search, Files & Data' },
  { id: 'ai', label: 'AI Features' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'integrations', label: 'Connecting to Other Tools' },
  { id: 'infra', label: 'Launch Readiness' },
]

export const FEATURES: Feature[] = [
  // The Basics
  { id: 'landing-page', label: 'Marketing website', category: 'foundation', minHours: 8, maxHours: 16, stackTags: [], helpText: 'The public page that explains your product and collects sign-ups.' },
  { id: 'onboarding-flow', label: 'Guided first-time setup', category: 'foundation', minHours: 10, maxHours: 20, stackTags: [], helpText: 'Walks new users through getting started, step by step.' },
  { id: 'responsive-design', label: 'Works well on phones', category: 'foundation', minHours: 6, maxHours: 12, stackTags: [], helpText: 'Your web app adjusts to fit any screen size.' },

  // User Accounts
  { id: 'email-auth', label: 'Sign up and log in with email', category: 'auth', minHours: 8, maxHours: 14, stackTags: ['postgres'] },
  { id: 'social-login', label: 'Log in with Google, Apple, or GitHub', category: 'auth', minHours: 6, maxHours: 10, stackTags: ['oauth'], helpText: 'One-click sign-in with an account people already have.' },
  { id: 'magic-link', label: 'Log in with an email link', category: 'auth', minHours: 5, maxHours: 8, stackTags: ['email'], helpText: 'No password to remember. Users click a link sent to their inbox.' },
  { id: 'rbac', label: 'Different access levels', category: 'auth', minHours: 10, maxHours: 18, stackTags: ['postgres'], requires: ['email-auth'], helpText: 'For example, admins can change everything while staff can only view.' },
  { id: 'user-profiles', label: 'User profiles', category: 'auth', minHours: 6, maxHours: 10, stackTags: [], helpText: 'Users can edit their name, photo, and settings.' },
  { id: 'multi-tenant', label: 'Company accounts with teammates', category: 'auth', minHours: 20, maxHours: 36, stackTags: ['postgres'], requires: ['rbac'], helpText: 'Customers sign up as a company and invite their colleagues.' },

  // Payments
  { id: 'one-time-payments', label: 'Accept one-time payments', category: 'payments', minHours: 8, maxHours: 14, stackTags: ['stripe'] },
  { id: 'subscriptions', label: 'Monthly or yearly subscriptions', category: 'payments', minHours: 16, maxHours: 28, stackTags: ['stripe'], helpText: 'Customers choose a plan and are charged automatically.' },
  { id: 'usage-billing', label: 'Charge by usage', category: 'payments', minHours: 20, maxHours: 32, stackTags: ['stripe', 'queue'], helpText: 'Bill customers for how much they use, for example per message or per order.' },
  { id: 'invoicing', label: 'Invoices and receipts', category: 'payments', minHours: 8, maxHours: 14, stackTags: ['stripe'] },
  { id: 'marketplace-payouts', label: 'Pay sellers or providers (marketplace)', category: 'payments', minHours: 24, maxHours: 40, stackTags: ['stripe-connect'], helpText: 'Split each payment between your platform and the seller.' },

  // Messages & Notifications
  { id: 'realtime-chat', label: 'Live chat between users', category: 'communication', minHours: 20, maxHours: 36, stackTags: ['websocket', 'redis'] },
  { id: 'comments', label: 'Comments and replies', category: 'communication', minHours: 10, maxHours: 18, stackTags: ['postgres'] },
  { id: 'push-notifications', label: 'Phone notifications', category: 'communication', minHours: 10, maxHours: 16, stackTags: ['push'], helpText: "Alerts that pop up on a user's phone, even when the app is closed." },
  { id: 'email-notifications', label: 'Automatic emails', category: 'communication', minHours: 6, maxHours: 10, stackTags: ['email'], helpText: 'Welcome emails, receipts, password resets, and similar.' },
  { id: 'sms-notifications', label: 'Text message (SMS) alerts', category: 'communication', minHours: 8, maxHours: 12, stackTags: ['sms'] },

  // Managing Your Business
  { id: 'admin-dashboard', label: 'Admin panel', category: 'admin', minHours: 16, maxHours: 28, stackTags: ['postgres'], helpText: 'A back office where your team views and edits users, orders, and content.' },
  { id: 'analytics-dashboard', label: 'Reports and charts', category: 'admin', minHours: 14, maxHours: 24, stackTags: ['postgres'], helpText: 'See sign-ups, sales, and usage at a glance.' },
  { id: 'cms', label: 'Edit website content yourself', category: 'admin', minHours: 16, maxHours: 28, stackTags: ['cms', 'postgres'], helpText: 'Update text, blog posts, and images without a developer.' },
  { id: 'audit-logs', label: 'Activity history', category: 'admin', minHours: 8, maxHours: 14, stackTags: ['postgres'], helpText: 'A record of who changed what, and when.' },
  { id: 'feature-flags', label: 'Try new features on some users first', category: 'admin', minHours: 8, maxHours: 14, stackTags: [], helpText: 'Turn a feature on for a small group, or compare two versions (A/B testing).' },

  // Search, Files & Data
  { id: 'full-text-search', label: 'Search bar', category: 'data', minHours: 10, maxHours: 18, stackTags: ['search-index'], helpText: 'Users type a word and find matching products, posts, or records.' },
  { id: 'advanced-filtering', label: 'Filters and sorting', category: 'data', minHours: 6, maxHours: 12, stackTags: ['postgres'], helpText: 'For example, filter by price, date, or category.' },
  { id: 'file-upload', label: 'Upload files and photos', category: 'data', minHours: 8, maxHours: 14, stackTags: ['s3'] },
  { id: 'data-export', label: 'Download data as Excel or PDF', category: 'data', minHours: 6, maxHours: 10, stackTags: [] },
  { id: 'bulk-import', label: 'Import data from a spreadsheet', category: 'data', minHours: 8, maxHours: 14, stackTags: ['queue'], helpText: 'Add hundreds of records at once instead of one by one.' },

  // AI Features
  { id: 'ai-chatbot', label: 'AI assistant or chatbot', category: 'ai', minHours: 16, maxHours: 28, stackTags: ['llm-api'] },
  { id: 'rag-search', label: 'AI that answers from your documents', category: 'ai', minHours: 24, maxHours: 40, stackTags: ['llm-api', 'vector-db'], helpText: 'Users ask questions and get answers based on your files, manuals, or help articles.' },
  { id: 'ai-content-gen', label: 'AI writing', category: 'ai', minHours: 12, maxHours: 20, stackTags: ['llm-api'], helpText: 'Drafts descriptions, emails, or summaries for your users.' },
  { id: 'ai-image-gen', label: 'AI image or video creation', category: 'ai', minHours: 14, maxHours: 24, stackTags: ['llm-api'] },
  { id: 'voice-transcription', label: 'Turn voice recordings into text', category: 'ai', minHours: 10, maxHours: 18, stackTags: ['llm-api'] },

  // Mobile Apps
  { id: 'cross-platform-app', label: 'Mobile app for iPhone and Android', category: 'mobile', minHours: 60, maxHours: 100, stackTags: ['react-native'], helpText: 'One app built once for both. The most cost-effective way to be in both app stores.' },
  { id: 'native-ios', label: 'iPhone-only app', category: 'mobile', minHours: 80, maxHours: 140, stackTags: [], helpText: 'Built specifically for iPhone, separate from Android.' },
  { id: 'native-android', label: 'Android-only app', category: 'mobile', minHours: 80, maxHours: 140, stackTags: [], helpText: 'Built specifically for Android, separate from iPhone.' },
  { id: 'pwa-offline', label: 'Works offline, installs like an app', category: 'mobile', minHours: 12, maxHours: 20, stackTags: ['pwa'], helpText: 'Your website can be added to a phone home screen and used without internet.' },

  // Connecting to Other Tools
  { id: 'third-party-integration', label: 'Connect to a tool you already use', category: 'integrations', minHours: 8, maxHours: 16, stackTags: [], helpText: 'For example, your CRM, accounting software, or a shipping provider.' },
  { id: 'webhooks', label: 'Automatic updates between systems', category: 'integrations', minHours: 8, maxHours: 14, stackTags: ['queue'], helpText: 'When something happens in one tool, your app hears about it right away, and the other way around.' },
  { id: 'calendar-sync', label: 'Sync with Google or Outlook Calendar', category: 'integrations', minHours: 10, maxHours: 18, stackTags: ['oauth'] },
  { id: 'maps-geolocation', label: 'Maps and location', category: 'integrations', minHours: 8, maxHours: 14, stackTags: ['maps'] },
  { id: 'i18n', label: 'Multiple languages', category: 'integrations', minHours: 10, maxHours: 20, stackTags: ['i18n'] },

  // Launch Readiness
  { id: 'seo', label: 'Set up to be found on Google', category: 'infra', minHours: 6, maxHours: 10, stackTags: [], helpText: 'Page titles, descriptions, and structure that help search engines list you (SEO).' },
  { id: 'ci-cd', label: 'Automatic testing before each update', category: 'infra', minHours: 6, maxHours: 10, stackTags: ['ci-cd'], helpText: 'Every change is checked and released automatically, so updates are safer.' },
  { id: 'monitoring', label: 'Alerts when something breaks', category: 'infra', minHours: 4, maxHours: 8, stackTags: ['monitoring'], helpText: 'You find out about errors right away, often before users report them.' },
]
