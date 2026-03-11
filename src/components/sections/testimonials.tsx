import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

const testimonials = [
  {
    name: "Mara Davana",
    role: "Founder at Protoze",
    image: "https://picsum.photos/seed/mara/400/600",
    tags: ["Fractional CTO", "MVP Build"],
    quote:
      "We needed someone who could make real technical decisions, not just write code. Ilzam became our remote CTO  - he chose our stack, built the first version, and shipped it in under 8 weeks. We went from idea to paying customers.",
  },
  {
    name: "Alex Hartanto",
    role: "CEO at Pentagi",
    image: "https://picsum.photos/seed/alex/400/600",
    tags: ["Technical Advisory", "Architecture"],
    quote:
      "We were about to sign a $60k contract with an agency. Ilzam reviewed the proposal in one session and saved us from a stack choice that would have cost us 6 months. Best advisory call I've ever had.",
  },
  {
    name: "Michael Hartono",
    role: "Co-founder at Montagem",
    image: "https://picsum.photos/seed/michael/400/600",
    tags: ["MVP Development", "Startup CTO"],
    quote:
      "What sets Ilzam apart is he asks 'why are we building this?' before 'how.' That saved us from building three features we didn't need. Our MVP launched lean, and users actually loved it.",
  },
]

const stats = [
  {
    value: "15+",
    label: "MVPs Shipped",
    description:
      "Products built and deployed across marketplaces, SaaS, AI, and government systems.",
  },
  {
    value: "80%",
    label: "Cost Reduction",
    description:
      "Infrastructure cost savings delivered for a healthcare network.",
  },
  {
    value: "99%",
    label: "Uptime",
    description:
      "Platform reliability achieved after rebuilding a system serving 5,000+ users.",
  },
]

export function TestimonialsSection() {
  const [active, setActive] = useState(2)

  const prev = () =>
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () =>
    setActive((i) => (i + 1) % testimonials.length)

  const current = testimonials[active]

  return (
    <section
      id="proof"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-md text-4xl font-light leading-tight tracking-tight md:text-5xl">
          Don't take my
          <br />
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            word
          </span>{" "}
          for it
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Proof ]
        </Badge>
      </div>

      {/* Testimonial carousel */}
      <div className="mt-12 grid items-start gap-8 md:grid-cols-[1fr_1fr]">
        {/* Left  - avatar strip */}
        <div className="flex items-end gap-0">
          {testimonials.map((t, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={t.name}
                onClick={() => setActive(i)}
                className="relative flex flex-col items-start overflow-hidden"
                animate={{
                  zIndex: isActive ? 10 : 0,
                  width: isActive ? "clamp(140px, 40vw, 220px)" : "clamp(80px, 25vw, 140px)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative h-60 w-full overflow-hidden bg-muted md:h-80">
                  <img
                    src={t.image}
                    alt={`${t.name} - ${t.role}`}
                    className="size-full object-cover object-top grayscale"
                    loading="lazy"
                  />
                  {/* Name overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left">
                    <motion.p
                      className="text-sm text-white"
                      animate={{ fontWeight: isActive ? 600 : 400 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t.name}
                    </motion.p>
                    <p className="text-xs text-white/70">{t.role}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Right  - quote */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <blockquote className="text-base leading-relaxed md:text-lg">
                {current.quote}
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ArrowLeftIcon />
            </Button>
            <Button variant="outline" onClick={next}>
              Next <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 divide-y border-t md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0">
            <p className="text-3xl font-semibold tracking-tight md:text-4xl">
              {stat.value}{" "}
              <span className="text-2xl font-normal md:text-3xl">
                {stat.label}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
