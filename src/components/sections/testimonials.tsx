import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

const testimonials = [
  {
    name: "Mara Davana",
    role: "Founding Design at Protoze",
    image: "https://picsum.photos/seed/mara/400/600",
    tags: ["UX Audit", "UI Design"],
    quote:
      "Working with Ilzam was a game-changer. He took our rough wireframes and turned them into a polished, user-friendly product that our customers love.",
  },
  {
    name: "Alex Hartanto",
    role: "Founding Design at Pentagi",
    image: "https://picsum.photos/seed/alex/400/600",
    tags: ["Prototyping", "User Research"],
    quote:
      "Ilzam has a rare ability to understand both the business and the user. His design process is thorough, and the results speak for themselves.",
  },
  {
    name: "Michael Hartono",
    role: "Head Of Officer at Montagem",
    image: "https://picsum.photos/seed/michael/400/600",
    tags: ["UX Audit", "UIX Design", "Prototyping"],
    quote:
      "What impressed me most was how Ilzam simplified complexity. He turned our messy product idea into a clear, intuitive flow that investors instantly understood during our demo.",
  },
]

const stats = [
  {
    value: "40+",
    label: "Products",
    description:
      "Products, dashboards, etc designed across startups and SaaS companies.",
  },
  {
    value: "3x",
    label: "Faster",
    description: "Avg. design-to-launch time compared to traditional agency.",
  },
  {
    value: "+30%",
    label: "Conversion",
    description:
      "Average uplift in product conversions and sign-ups.",
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
      id="testimonials"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-md text-4xl font-light leading-tight tracking-tight md:text-5xl">
          Results That Speak
          <br />
          for{" "}
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            Themselves
          </span>
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ What They Said ]
        </Badge>
      </div>

      {/* Testimonial carousel */}
      <div className="mt-12 grid items-start gap-8 md:grid-cols-[1fr_1fr]">
        {/* Left — avatar strip */}
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
                  width: isActive ? 220 : 140,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative h-[320px] w-full overflow-hidden bg-muted">
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

        {/* Right — quote */}
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
