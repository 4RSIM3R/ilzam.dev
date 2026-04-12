import { useEffect, useRef, useState } from "react"

interface MermaidProps {
  chart: string
  className?: string
}

export function Mermaid({ chart, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid")

        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "default",
          fontFamily: "inherit",
        })

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
        const { svg: rendered } = await mermaid.render(id, chart.trim())

        if (!cancelled) {
          setSvg(rendered)
          setError("")
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram")
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart])

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </pre>
    )
  }

  if (!svg) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-muted p-8 text-sm text-muted-foreground ${className ?? ""}`}>
        Loading diagram...
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto rounded-lg bg-muted p-4 [&_svg]:mx-auto [&_svg]:max-w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
