import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getHub, notePath, notesByDate, toDateTime } from '@/lib/notes'

export function GET(context: APIContext) {
  return rss({
    title: 'Field Notes by Ilzam',
    description: "Things I've figured out in production, written down so you don't have to figure them out the hard way.",
    site: context.site ?? 'https://ilzam.dev',
    items: notesByDate().map((note) => ({
      title: note.title,
      description: note.description,
      link: notePath(note.slug),
      pubDate: new Date(toDateTime(note.published)),
      categories: [getHub(note.hub).name],
    })),
    customData: '<language>en</language>',
  })
}
