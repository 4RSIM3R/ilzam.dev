// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import { HUBS, NOTES, hubPath, isHubIndexable, notePath, toDateTime } from './src/lib/notes.ts';

// Noindexed hubs stay out of the sitemap, and notes report when they last changed.
const noindexPaths = new Set(HUBS.filter((hub) => !isHubIndexable(hub.slug)).map((hub) => hubPath(hub.slug)));
const noteLastmod = new Map(NOTES.map((note) => [notePath(note.slug), toDateTime(note.updated ?? note.published)]));

// https://astro.build/config
export default defineConfig({
  site: 'https://ilzam.dev',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !noindexPaths.has(new URL(page).pathname),
      serialize(item) {
        const lastmod = noteLastmod.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    // Old pricing URL from before the rebrand, kept so existing links and rankings carry over.
    '/fractional-cto/pricing': '/pricing/',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});