import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowDownIcon, PhoneCallIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// The waving clip of the portrait. It plays once on load and again on click; the still
// underneath covers loading and reduced motion.
const WAVE_VIDEO = { mp4: "/hero/wave.mp4", webm: "/hero/wave.webm" };

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

const PORTRAIT_SRC = "/wave-full.webp";

// The nav avatar (36px) plus the gap before the name.
const SLOT_WIDTH = 46;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
 * As the page scrolls, the hero portrait shrinks and flies into the nav avatar.
 * A fixed clone does the flying (portalled to <body>, since the hero's entrance
 * transform would trap a fixed child), while the real card and the nav avatar
 * hide. Styles are written straight to the DOM, so scrolling never re-renders.
 */
function usePortraitMorph(
  cardRef: React.RefObject<HTMLDivElement | null>,
  flyRef: React.RefObject<HTMLDivElement | null>,
  shadowRef: React.RefObject<HTMLDivElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  frameRef: React.RefObject<HTMLCanvasElement | null>,
  reduce: boolean | null,
) {
  const { scrollY } = useScroll();

  function update(y: number) {
    const card = cardRef.current;
    const fly = flyRef.current;
    const shadow = shadowRef.current;
    const target = document.getElementById("nav-avatar");
    const slot = document.getElementById("nav-avatar-slot");
    if (!card || !fly || !shadow || !target || !slot) return;

    if (reduce) {
      slot.style.width = `${SLOT_WIDTH}px`;
      card.style.opacity = "";
      fly.style.visibility = "hidden";
      target.style.opacity = "1";
      return;
    }

    const start = card.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    // Lands when the card's centre would have scrolled up to the avatar's centre.
    const distance = Math.max(
      240,
      start.top + y + start.height / 2 - (end.top + end.height / 2),
    );
    const t = Math.min(1, Math.max(0, y / distance));

    // The name gives up its spot to the portrait as it arrives, and takes it back on the way up.
    slot.style.width = `${SLOT_WIDTH * t}px`;

    const flying = t > 0 && t < 1;
    card.style.opacity = t > 0 ? "0" : "";
    target.style.opacity = t >= 1 ? "1" : "0";
    fly.style.visibility = flying ? "visible" : "hidden";
    if (!flying) return;

    const size = lerp(start.width, end.width, t);
    const scale = size / start.width;
    const startRadius = parseFloat(getComputedStyle(card).borderTopLeftRadius);
    const radius = lerp(startRadius, end.width / 2, t);

    fly.style.width = `${start.width}px`;
    fly.style.height = `${start.height}px`;
    fly.style.transform = `translate3d(${lerp(start.left, end.left, t)}px, ${lerp(start.top, end.top, t)}px, 0) scale(${scale})`;
    fly.style.borderRadius = `${radius / scale}px`;
    shadow.style.borderRadius = fly.style.borderRadius;
    shadow.style.opacity = `${1 - t}`;

    // The clip ends on a different pose than the still, so the clone carries the frame on screen.
    const video = videoRef.current;
    const frame = frameRef.current;
    if (
      video &&
      frame &&
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      if (frame.width !== video.videoWidth) {
        frame.width = video.videoWidth;
        frame.height = video.videoHeight;
      }
      frame.getContext("2d")?.drawImage(video, 0, 0);
      frame.style.visibility = "visible";
    }
  }

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const sync = () => update(window.scrollY);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  usePortraitMorph(cardRef, flyRef, shadowRef, videoRef, frameRef, reduce);
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
            ref={cardRef}
            onClick={wave}
            className="relative size-full overflow-hidden rounded-3xl bg-brand-tint shadow-2xl ring-1 shadow-brand/15 ring-brand/10 md:rounded-4xl"
          >
            <img
              src={PORTRAIT_SRC}
              alt="Illustrated portrait of Ilzam waving hello"
              width={1024}
              height={1024}
              fetchPriority="high"
              className="size-full object-cover"
            />
            {!reduce && (
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

      {mounted &&
        createPortal(
          <div
            ref={flyRef}
            aria-hidden="true"
            style={{ visibility: "hidden" }}
            className="pointer-events-none fixed top-0 left-0 z-50 origin-top-left bg-brand-tint ring-1 ring-brand/10 will-change-transform"
          >
            <div
              ref={shadowRef}
              className="absolute inset-0 -z-10 shadow-2xl shadow-brand/15"
            />
            <img
              src={PORTRAIT_SRC}
              alt=""
              className="relative size-full rounded-[inherit] object-cover"
            />
            <canvas
              ref={frameRef}
              style={{ visibility: "hidden" }}
              className="absolute inset-0 size-full rounded-[inherit]"
            />
          </div>,
          document.body,
        )}

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
