import { Badge } from "@/components/ui/badge"
import { ArrowUpRightIcon } from "lucide-react"

const testimonials = [
  {
    name: "Eko Dedy Purnomo",
    role: "Co-Founder & CTO, Sekawan Media",
    image: "/testimonials/eko-dedy-purnomo.jpg",
    quote:
      "Ilzam is a rare combination: a deep grasp of technical detail, paired with sharp business sense. Execution is fast and systematic, and always focused on solutions that make a real impact.",
    // Written in Indonesian; the quote above is a translation.
    original:
      "Ilzam itu kombinasi yang langka: paham detail teknis secara mendalam, tapi tetap punya business sense yang tajam. Eksekusinya cepat, sistematis, dan selalu berfokus pada solusi yang memberikan impact nyata.",
  },
  {
    name: "Berlian Triatma",
    role: "Business Intelligence & Human Capital Manager",
    relationship: "Direct manager",
    date: "March 2025",
    image: "/testimonials/berlian-triatma.jpg",
    quote:
      "Ilzam is a well-rounded programmer: excellent coding skills, strong leadership, and a quick grasp of business processes. With his high learning enthusiasm, I'm confident he will be a superstar in the future.",
  },
  {
    name: "Misbakhul Mustofin",
    role: "Technical Program Manager",
    relationship: "Direct manager",
    date: "July 2021",
    image: "/testimonials/misbakhul-mustofin.jpg",
    quote:
      "Has good programming skills and knowledge, and a very high enthusiasm for learning.",
    // Written in Indonesian; the quote above is a translation.
    original:
      "Punya skill & pengetahuan di bidang programming yang bagus, serta punya semangat belajar yang sangat tinggi.",
  },
]

// Shown in place of a photo until one is added to public/testimonials/.
const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")

export function TestimonialsSection() {
  return (
    <section id="proof" className="snap-start px-6 py-12 md:px-10 md:py-16">
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

      {/* Quotes */}
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col justify-between">
            <div>
              <blockquote className="text-lg font-light leading-relaxed md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              {t.original && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Translated from Indonesian:{" "}
                  <span lang="id" className="italic">
                    &ldquo;{t.original}&rdquo;
                  </span>
                </p>
              )}
            </div>
            <figcaption className="mt-8 flex items-center gap-4">
              {t.image ? (
                <img
                  src={t.image}
                  alt={t.name}
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded-full bg-muted object-cover"
                  loading="lazy"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium"
                >
                  {initials(t.name)}
                </span>
              )}
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
                {t.relationship && (
                  <p className="text-xs text-muted-foreground">
                    {t.relationship} / {t.date}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Footer */}
      <a
        href="https://www.linkedin.com/in/ilzam-mulkhaq/details/recommendations/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-1 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        Read it on LinkedIn <ArrowUpRightIcon className="size-3.5" />
      </a>
    </section>
  )
}
