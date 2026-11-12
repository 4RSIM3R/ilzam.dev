import { Button } from "@/components/ui/button"
import { PhoneCallIcon, MailIcon } from "lucide-react"

export function CtaSection() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 md:px-10 md:py-24"
    >
      <div className="journey-reveal relative overflow-hidden rounded-3xl bg-brand-call lg:flex lg:aspect-16/5 lg:items-center">
        <div className="relative z-10 px-8 pt-12 md:px-12 md:pt-16 lg:py-6">
          <h2 className="text-3xl leading-tight font-light tracking-tight text-white md:text-5xl">
            Tell me what
            <br />
            <span className="font-normal">you're building</span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/85 lg:mt-4">
            Book a free 30-minute call and leave with a rough idea of the
            timeline and cost. If I'm the wrong person for the job, I'll tell
            you, and all it cost you was half an hour.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-6">
            <Button
              variant="inverse"
              size="lg"
              className="h-11 rounded-full px-5"
              render={
                <a
                  href="https://cal.com/ilzam/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <PhoneCallIcon data-icon="inline-start" />
              Book a free 30-minute call
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-white/30 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              render={<a href="mailto:ilzammulkhaq85@gmail.com" />}
            >
              <MailIcon data-icon="inline-start" />
              Or email me
            </Button>
          </div>
        </div>

        {/* The box shares the illustration's background, so it sits in the box with no frame.
            The elbow runs off the image's left edge two thirds of the way down, so the box's
            bottom edge always cuts above it. Below lg the frame keeps the top two thirds. From lg the
            picture is 60% of the box's width, anchored bottom-right and pushed down a third; with the
            box at 16:5 that puts the head near the top and keeps the hand clear of the text. */}
        <div className="-mt-4 flex justify-end lg:mt-0">
          <img
            src="/call.jpeg"
            alt="Illustration of Ilzam making a call-me gesture"
            width={1031}
            height={1024}
            loading="lazy"
            className="aspect-3/2 w-full max-w-md object-cover object-top lg:absolute lg:right-0 lg:bottom-0 lg:aspect-auto lg:w-3/5 lg:max-w-none lg:translate-y-1/3"
          />
        </div>
      </div>
    </section>
  )
}
