import { Badge } from "@/components/ui/badge"

// Each cell: [col, row, name, icon]
// Full 5x5 grid — empty strings = grey placeholder
const cells: [number, number, string, string][] = [
  // Row 1
  [1, 1, "", ""], [2, 1, "Google Drive", "https://cdn.simpleicons.org/googledrive"], [3, 1, "", ""], [4, 1, "Slack", "https://cdn.simpleicons.org/slack"], [5, 1, "", ""],
  // Row 2
  [1, 2, "Astro", "https://cdn.simpleicons.org/astro"], [2, 2, "", ""], [3, 2, "Google Meet", "https://cdn.simpleicons.org/googlemeet"], [4, 2, "", ""], [5, 2, "Notion", "https://cdn.simpleicons.org/notion"],
  // Row 3
  [1, 3, "GitLab", "https://cdn.simpleicons.org/gitlab"], [2, 3, "Figma", "https://cdn.simpleicons.org/figma"], [3, 3, "", ""], [4, 3, "Claude", "https://cdn.simpleicons.org/claude"], [5, 3, "GitHub", "https://cdn.simpleicons.org/github"],
  // Row 4
  [1, 4, "Messages", "https://cdn.simpleicons.org/imessage"], [2, 4, "", ""], [3, 4, "Vercel", "https://cdn.simpleicons.org/vercel"], [4, 4, "", ""], [5, 4, "Tailwind", "https://cdn.simpleicons.org/tailwindcss"],
  // Row 5
  [1, 5, "", ""], [2, 5, "Trello", "https://cdn.simpleicons.org/trello"], [3, 5, "", ""], [4, 5, "Git", "https://cdn.simpleicons.org/git"], [5, 5, "", ""],
]

export function ToolstackSection() {
  return (
    <section
      id="toolstack"
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
              [ Toolstack ]
            </Badge>
            <h2 className="text-4xl font-light leading-tight tracking-tight md:text-5xl">
              The Arsenal Behind
              <br />
              <span className="rounded-sm bg-amber-100 px-1 font-normal">
                Every Pixel
              </span>{" "}
              &amp; Line of Code
            </h2>
          </div>

          <div className="mt-12 max-w-sm">
            <p className="text-lg">✳</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Each tool plays a role, from research and wireframing to
              prototyping and launch. Together, they make my process fast,
              precise, and scalable.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              From design to development, these are the apps that power my
              workflow and bring clarity to complex ideas.
            </p>
          </div>
        </div>

        {/* Right — tool grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(5, 80px)",
            gridTemplateRows: "repeat(5, 80px)",
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
