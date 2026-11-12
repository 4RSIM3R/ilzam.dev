import type { CSSProperties } from "react"
import { Badge } from "@/components/ui/badge"

const cells: [number, number, string, string][] = [
  // Row 1
  [1, 1, "PHP", "https://cdn.simpleicons.org/php"], [2, 1, "Go", "https://cdn.simpleicons.org/go"], [3, 1, "Laravel", "https://cdn.simpleicons.org/laravel"], [4, 1, "TypeScript", "https://cdn.simpleicons.org/typescript"], [5, 1, ".NET", "https://cdn.simpleicons.org/dotnet"],
  // Row 2
  [1, 2, "React", "https://cdn.simpleicons.org/react"], [2, 2, "Vue", "https://cdn.simpleicons.org/vuedotjs"], [3, 2, "PostgreSQL", "https://cdn.simpleicons.org/postgresql"], [4, 2, "MySQL", "https://cdn.simpleicons.org/mysql"], [5, 2, "Docker", "https://cdn.simpleicons.org/docker"],
  // Row 3
  [1, 3, "Redis", "https://cdn.simpleicons.org/redis"], [2, 3, "Kafka", "https://cdn.simpleicons.org/apachekafka"], [3, 3, "Google Cloud", "https://cdn.simpleicons.org/googlecloud"], [4, 3, "Kubernetes", "https://cdn.simpleicons.org/kubernetes"], [5, 3, "GitHub", "https://cdn.simpleicons.org/github"],
  // Row 4
  [1, 4, "Tailwind", "https://cdn.simpleicons.org/tailwindcss"], [2, 4, "Cloudflare", "https://cdn.simpleicons.org/cloudflare"], [3, 4, "Node.js", "https://cdn.simpleicons.org/nodedotjs"], [4, 4, "Python", "https://cdn.simpleicons.org/python"], [5, 4, "Flutter", "https://cdn.simpleicons.org/flutter"],
  // Row 5
  [1, 5, "PyTorch", "https://cdn.simpleicons.org/pytorch"], [2, 5, "Claude", "https://cdn.simpleicons.org/claude"], [3, 5, "Datadog", "https://cdn.simpleicons.org/datadog"], [4, 5, "Astro", "https://cdn.simpleicons.org/astro"], [5, 5, "Dart", "https://cdn.simpleicons.org/dart"],
]

// Each tile starts thrown out from the center of the grid and settles into place as the grid scrolls in.
const scatter = (col: number, row: number) =>
  ({
    gridColumn: col,
    gridRow: row,
    "--dx": `${(col - 3) * 2.5}rem`,
    "--dy": `${(row - 3) * 2.5 + 2}rem`,
    "--r": `${(((col * 7 + row * 3) % 5) - 2) * 9}deg`,
  }) as CSSProperties

export function ToolstackSection() {
  return (
    <section
      id="stack"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 md:px-10 md:py-24"
    >
      <div className="grid items-start gap-8 md:grid-cols-[1fr_1.5fr]">
        {/* Left  - heading + description */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-0 font-mono text-xs uppercase tracking-widest"
            >
              [ Stack ]
            </Badge>
            <h2 className="journey-reveal text-4xl font-light leading-tight tracking-tight md:text-5xl">
              What I <span className="brand-marker font-normal">Build</span> With
            </h2>
          </div>

          <div className="journey-reveal mt-12 max-w-sm">
            <p className="text-lg text-brand">*</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I start with the simplest set of tools that does the job, and I
              stick to well-known ones, so any developer you hire later can pick
              up the code.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              When a product needs more, like AI features or millions of rows of
              data, I have built that too.
            </p>
          </div>
        </div>

        {/* Right  - tool grid */}
        <div
          className="journey-assemble grid gap-2 md:gap-3"
          style={{
            gridTemplateColumns: "repeat(5, minmax(0, 80px))",
            gridTemplateRows: "repeat(5, minmax(0, 80px))",
            justifyContent: "center",
          }}
        >
          {cells.map(([col, row, name, icon]) => (
            <div
              key={`${col}-${row}`}
              className="flex items-center justify-center rounded-2xl bg-muted/50 shadow-sm transition-shadow hover:shadow-md"
              style={scatter(col, row)}
              title={name || undefined}
            >
              {icon && (
                <img
                  src={icon}
                  alt={name}
                  width={32}
                  height={32}
                  className="size-8"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
