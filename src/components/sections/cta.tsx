import { Button } from "@/components/ui/button"
import { PhoneCallIcon, MailIcon } from "lucide-react"

export function CtaSection() {
  return (
    <section className="snap-start px-6 py-12 md:px-10 md:py-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-8 py-12 md:px-12 md:py-16">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-light leading-tight tracking-tight text-white md:text-4xl">
            Ready to build
            <br />
            <span className="font-normal">something?</span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            Book a free 30-minute intro call. No pitch, no pressure — just a
            real conversation about what you're building and whether I can help.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              render={
                <a
                  href="https://cal.com/ilzam/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <PhoneCallIcon data-icon="inline-start" />
              Book a Free Intro Call
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              render={<a href="mailto:ilzammulkhaq85@gmail.com" />}
            >
              <MailIcon data-icon="inline-start" />
              Or Email Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
