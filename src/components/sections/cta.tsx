import { Button } from "@/components/ui/button"
import { PhoneCallIcon } from "lucide-react"

export function CtaSection() {
  return (
    <section className="snap-start px-6 py-12 md:px-10 md:py-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-8 py-12 md:px-12 md:py-16">
        {/* Background decorative image */}
        <img
          src="https://picsum.photos/seed/flowers/800/400"
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-30 mix-blend-overlay"
          loading="lazy"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-light leading-tight tracking-tight text-white md:text-4xl">
            Let's Turn Your Idea Into
            <br />
            a Product That{" "}
            <span className="font-normal">Works</span>.
          </h2>

          <Button
            variant="outline"
            className="mt-6 rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            render={
              <a
                href="https://cal.com/ilzam/intro"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <PhoneCallIcon data-icon="inline-start" />
            Book 15 Mins Call
          </Button>

          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/70">
            Whether it's your first MVP or a full redesign, I'll help you move
            from concept to launch with purpose and precision.
          </p>
        </div>
      </div>
    </section>
  )
}
