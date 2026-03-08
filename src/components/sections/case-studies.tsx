import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const caseStudies = [
  {
    title: "Arctic Cream",
    subtitle: "E-commerce Redesign",
    year: "2025",
    image: "https://picsum.photos/seed/case1/800/600",
    href: "#",
  },
  {
    title: "Cargo Express",
    subtitle: "Logistics Dashboard",
    year: "2024",
    image: "https://picsum.photos/seed/case2/800/600",
    href: "#",
  },
]

export function CaseStudiesSection() {
  return (
    <section
      id="result"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-tight md:text-5xl">
        Every product starts as an idea, but not every idea becomes a{" "}
        <span className="rounded-sm bg-amber-100 px-1 font-normal">
          product
        </span>
        . Through research, testing, and iteration, I help that idea find its
        form
      </h2>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {caseStudies.map((study) => (
          <Card
            key={study.title}
            className="group gap-0 overflow-hidden border-0 bg-muted/30 p-0"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={study.image}
                  alt={`${study.title} — ${study.subtitle}`}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="text-xs text-white/60">{study.year}</p>
                    <h3 className="text-lg font-semibold text-white">
                      {study.title}
                    </h3>
                    <p className="text-sm text-white/70">{study.subtitle}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="shrink-0 rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                    render={<a href={study.href} />}
                  >
                    See Study Case
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer link */}
      <p className="mt-8 text-center text-sm">
        <a
          href="/case-studies"
          className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Want to see more magic?
        </a>
      </p>
    </section>
  )
}
