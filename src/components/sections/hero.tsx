import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowDownIcon, PhoneCallIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// The waving clip of the portrait. Put the files in public/hero/ and fill this in;
// until then the still portrait shows on its own.
const WAVE_VIDEO: { mp4: string; webm: string } | null = null;

const STATUS = "Available for new projects";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function useEastJavaTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const time = useEastJavaTime();

  function wave() {
    const video = videoRef.current;
    if (!video || reduce) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-svh w-full max-w-6xl items-center px-6 pt-28 pb-20 md:px-10"
    >
      <div className="grid w-full items-center gap-10 md:grid-cols-5 md:gap-12">
        <div className="md:col-span-3">
          <p
            className="journey-enter inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium"
            style={step(0)}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            {STATUS}
          </p>

          <h1
            className="journey-enter mt-6 text-sm font-medium text-muted-foreground"
            style={step(0)}
          >
            Muhammad Ilzam Mulkhaq, AI-native software engineer for early-stage
            founders
          </h1>

          <p
            className="journey-enter mt-4 text-5xl leading-none font-light tracking-tight text-balance lg:text-7xl"
            style={step(1)}
          >
            Two AI agents and me. You{" "}
            <span className="brand-marker brand-marker-now font-normal">
              only pay for me
            </span>
            .
          </p>

          <p
            className="journey-enter mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
            style={step(2)}
          >
            I build new products for founders and fix apps that were rushed out
            with AI tools. The agents handle the typing, which keeps your bill
            low. Nothing ships until I have reviewed it, so your product holds
            up when real customers arrive.
          </p>

          <div
            className="journey-enter mt-8 flex flex-wrap gap-3"
            style={step(3)}
          >
            <Button
              variant="brand"
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
              className="h-11 rounded-full px-5"
              render={<a href="#team" />}
            >
              See how it works
            </Button>
          </div>

          <div
            className="journey-enter mt-8 text-sm text-muted-foreground"
            style={step(4)}
          >
            <p>
              15+ products launched. Clients in the US, Europe, and Southeast
              Asia.
            </p>
            {/* Always rendered, so the column doesn't jump when the clock fills in. */}
            <p className="mt-1 min-h-4 font-mono text-xs">
              {time && `${time} in East Java`}
            </p>
          </div>
        </div>

        <div
          className="journey-enter order-first mx-auto aspect-square w-56 md:order-none md:col-span-2 md:w-full md:max-w-md"
          style={step(1)}
        >
          {/* The portrait is cut out of its background, so the card's blue shows around it and
              the card's own bottom and right edges crop the jacket. */}
          <div
            onClick={wave}
            className="relative size-full overflow-hidden rounded-3xl bg-brand-tint shadow-2xl ring-1 shadow-brand/15 ring-brand/10 md:rounded-4xl"
          >
            <img
              src="/wave-full.webp"
              alt="Illustrated portrait of Ilzam waving hello"
              width={1024}
              height={1024}
              fetchPriority="high"
              className="size-full object-cover"
            />
            {WAVE_VIDEO && !reduce && (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster="/wave-full.webp"
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover"
              >
                <source src={WAVE_VIDEO.webm} type="video/webm" />
                <source src={WAVE_VIDEO.mp4} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>

      <a
        href="#team"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-muted-foreground md:flex"
      >
        Scroll to meet the team
        <ArrowDownIcon className="journey-nudge size-3.5" />
      </a>
    </section>
  );
}
