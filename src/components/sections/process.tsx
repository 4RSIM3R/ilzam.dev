import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Badge } from "@/components/ui/badge"
const steps = [
  {
    title: "A free intro call",
    description:
      "Thirty minutes to tell me what you're building and where you're stuck. I'll ask why before we get to how, and I'll tell you straight away if I'm the wrong person for the job.",
  },
  {
    title: "A clear plan and price",
    description:
      "I cut the scope down to what your first customers will actually use and pick the simplest tools that fit. You get a clear price before any work starts.",
  },
  {
    title: "Working software every week",
    description:
      "AI agents write the first draft and I review every change before it ships. Each week you see a working demo, so you can change course early and nothing surprises you at the end.",
  },
  {
    title: "Launch, then you decide",
    description:
      "I put it live with error alerts and usage tracking in place, and new product builds include 30 days of support after launch. After that, keep me on a monthly plan or hand the code to any developer you like.",
  },
]

// A step lights up when the line drawing down the timeline reaches it.
function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "start 0.45"] })
  const opacity = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.35, 1])
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.8, 1])

  return (
    <li ref={ref} className="relative pb-12 pl-14 last:pb-0">
      <span className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border bg-background text-sm font-semibold">
        <motion.span
          aria-hidden="true"
          style={{ opacity: fill, scale }}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-brand text-white"
        >
          {index + 1}
        </motion.span>
        {index + 1}
      </span>
      <motion.div style={{ opacity }}>
        <h3 className="pt-2 text-lg font-semibold">{step.title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </motion.div>
    </li>
  )
}

export function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.45"] })

  return (
    <section
      id="process"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 md:px-10 md:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Header */}
        <div className="lg:sticky lg:top-28 lg:col-span-2 lg:self-start">
          <Badge
            variant="outline"
            className="mb-6 rounded-none border-0 px-0 font-mono text-xs tracking-widest uppercase"
          >
            [ Working Together ]
          </Badge>
          <h2 className="text-4xl leading-tight font-light tracking-tight md:text-5xl">
            How I take you from idea to{" "}
            <span className="brand-marker font-normal">shipped product</span>
          </h2>
        </div>

        {/* Steps */}
        <ol ref={listRef} className="relative lg:col-span-3">
          <span aria-hidden="true" className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 bg-border" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute top-5 bottom-5 left-5 w-0.5 -translate-x-1/2 origin-top rounded-full bg-brand"
          />
          {steps.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
