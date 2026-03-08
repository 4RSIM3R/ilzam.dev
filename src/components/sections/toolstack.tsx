import { Badge } from "@/components/ui/badge"

const cells: [number, number, string, string][] = [
  // Row 1
  [1, 1, "", ""], [2, 1, "Go", "https://cdn.simpleicons.org/go"], [3, 1, "", ""], [4, 1, "TypeScript", "https://cdn.simpleicons.org/typescript"], [5, 1, "", ""],
  // Row 2
  [1, 2, "React", "https://cdn.simpleicons.org/react"], [2, 2, "", ""], [3, 2, "PostgreSQL", "https://cdn.simpleicons.org/postgresql"], [4, 2, "", ""], [5, 2, "Docker", "https://cdn.simpleicons.org/docker"],
  // Row 3
  [1, 3, "Redis", "https://cdn.simpleicons.org/redis"], [2, 3, "AWS", "https://cdn.simpleicons.org/amazonaws"], [3, 3, "", ""], [4, 3, "Kubernetes", "https://cdn.simpleicons.org/kubernetes"], [5, 3, "GitHub", "https://cdn.simpleicons.org/github"],
  // Row 4
  [1, 4, "Tailwind", "https://cdn.simpleicons.org/tailwindcss"], [2, 4, "", ""], [3, 4, "Node.js", "https://cdn.simpleicons.org/nodedotjs"], [4, 4, "", ""], [5, 4, "Flutter", "https://cdn.simpleicons.org/flutter"],
  // Row 5
  [1, 5, "", ""], [2, 5, "Claude", "https://cdn.simpleicons.org/claude"], [3, 5, "", ""], [4, 5, "Astro", "https://cdn.simpleicons.org/astro"], [5, 5, "", ""],
]

export function ToolstackSection() {
  return (
    <section
      id="stack"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      <div className="grid items-start gap-8 md:grid-cols-[1fr_1.5fr]">
        {/* Left — heading + description */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-0 font-mono text-xs uppercase tracking-widest"
            >
              [ Stack ]
            </Badge>
            <h2 className="text-4xl font-light leading-tight tracking-tight md:text-5xl">
              What I{" "}
              <span className="rounded-sm bg-amber-100 px-1 font-normal">
                Build
              </span>{" "}
              With
            </h2>
          </div>

          <div className="mt-12 max-w-sm">
            <p className="text-lg">*</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I pick the right tool for the job, not the trendiest one. Go for
              performance-critical backends. React for interactive frontends.
              PostgreSQL for data that matters.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Event-driven architectures, microservices, REST APIs, RAG
              pipelines — the infrastructure that makes products work at scale.
            </p>
          </div>
        </div>

        {/* Right — tool grid */}
        <div
          className="grid gap-2 md:gap-3"
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
              style={{ gridColumn: col, gridRow: row }}
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
