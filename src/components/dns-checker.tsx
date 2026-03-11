import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const DNS_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'SRV', 'CAA', 'PTR'] as const

interface DnsAnswer {
  name: string
  type: number
  TTL: number
  data: string
}

interface DnsResult {
  domain: string
  type: string
  status: number
  answers: DnsAnswer[]
  authority: DnsAnswer[]
}

function sanitizeDomain(input: string): string | null {
  const cleaned = input.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleaned)) return null
  return cleaned
}

export function DnsChecker() {
  const [domain, setDomain] = useState('')
  const [type, setType] = useState<string>('A')
  const [result, setResult] = useState<DnsResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()

    const sanitized = sanitizeDomain(domain)
    if (!sanitized) {
      setError('Invalid domain format')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(sanitized)}&type=${type}`,
        { headers: { Accept: 'application/dns-json' } }
      )

      if (!res.ok) {
        setError('DNS lookup failed')
        return
      }

      const data = await res.json()

      setResult({
        domain: sanitized,
        type,
        status: data.Status,
        answers: data.Answer ?? [],
        authority: data.Authority ?? [],
      })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const records = result?.answers?.length ? result.answers : result?.authority ?? []

  return (
    <div className="space-y-6">
      <form onSubmit={handleLookup} className="space-y-4">
        <div>
          <label htmlFor="domain" className="mb-1.5 block text-sm font-medium">
            Domain
          </label>
          <Input
            id="domain"
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Record Type</label>
          <div className="flex flex-wrap gap-1.5">
            {DNS_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                  type === t
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={loading || !domain.trim()} className="w-full">
          {loading ? 'Looking up...' : 'Lookup'}
        </Button>
      </form>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium">
              {result.type} records for <span className="font-mono">{result.domain}</span>
            </h2>
            <span className="text-xs text-muted-foreground">
              Status: {result.status === 0 ? 'OK' : `Code ${result.status}`}
            </span>
          </div>

          {records.length > 0 ? (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">TTL</th>
                    <th className="px-3 py-2 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="px-3 py-2 font-mono text-xs">{record.name}</td>
                      <td className="px-3 py-2 text-muted-foreground">{record.TTL}s</td>
                      <td className="break-all px-3 py-2 font-mono text-xs">{record.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
              No {result.type} records found for this domain.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
