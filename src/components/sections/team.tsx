import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Cursor, type TeamMember } from "@/components/journey/cursor";
import { StarMark } from "@/components/journey/star-mark";
import { easeInOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

const columns = ["To do", "Agents writing", "Ilzam reviewing", "Live"];

const stages = [
  {
    title: "You tell me what you need",
    body: "Describe it in plain words, no technical brief needed. I turn it into a small, clear task.",
    chip: "To do",
    chipClass: "bg-muted text-muted-foreground",
  },
  {
    title: "Two AI agents write it",
    body: "One writes the feature, the other writes tests that prove it works. This part is fast, and it's why you don't pay for a whole team.",
    chip: "Drafting",
    chipClass: "bg-sky-100 text-sky-800",
  },
  {
    title: "I review every change",
    body: "This is the part you pay for. I read the work, fix what needs fixing, and nothing ships until I approve it.",
    chip: "In review",
    chipClass: "bg-brand-tint text-brand-ink",
  },
  {
    title: "It goes live",
    body: "You see it working in that week's demo. The code is yours, so you're never tied to me.",
    chip: "Live",
    chipClass: "bg-green-100 text-green-800",
  },
];

const tasks = [
  { label: "Sign-up page", at: 0.27 },
  { label: "Google login", at: 0.31 },
  { label: "Welcome email", at: 0.35 },
];

// Where each stage starts along the scroll, and the frame shown for it when motion is reduced.
const STAGE_STARTS = [0, 0.12, 0.47, 0.8];
const STAGE_FRAMES = [0.05, 0.42, 0.74, 1];

const stageAt = (progress: number) =>
  STAGE_STARTS.findLastIndex((start) => progress >= start);

// Each cursor's route across the card. x is a share of the card's width, y is in pixels.
const routes: Record<
  TeamMember,
  {
    input: number[];
    x: number[];
    y: number[];
    visible: [number, number, number, number];
  }
> = {
  agent1: {
    input: [0.2, 0.27, 0.31, 0.35, 0.39, 0.47],
    x: [-0.3, 0.1, 0.1, 0.1, 0.3, 1.1],
    y: [300, 96, 122, 148, 120, -20],
    visible: [0.2, 0.23, 0.43, 0.47],
  },
  agent2: {
    input: [0.3, 0.37, 0.41, 0.47],
    x: [1.2, 0.5, 0.6, 1.3],
    y: [260, 178, 182, 280],
    visible: [0.3, 0.33, 0.43, 0.47],
  },
  ilzam: {
    input: [0.57, 0.62, 0.66, 0.7, 0.75, 0.8],
    x: [-0.4, 0.3, 0.35, 0.8, 0.8, -0.3],
    y: [340, 212, 214, 30, 34, 320],
    visible: [0.57, 0.6, 0.76, 0.8],
  },
};

function RouteCursor({
  member,
  progress,
  cardWidth,
}: {
  member: TeamMember;
  progress: MotionValue<number>;
  cardWidth: MotionValue<number>;
}) {
  const route = routes[member];
  const share = useTransform(progress, route.input, route.x, {
    ease: easeInOut,
  });
  const x = useTransform(() => share.get() * cardWidth.get());
  const y = useTransform(progress, route.input, route.y, { ease: easeInOut });
  const opacity = useTransform(progress, route.visible, [0, 1, 1, 0]);
  return <Cursor member={member} style={{ x, y, opacity }} />;
}

function TaskCheck({
  progress,
  at,
}: {
  progress: MotionValue<number>;
  at: number;
}) {
  const opacity = useTransform(progress, [at, at + 0.02], [0, 1]);
  const scale = useTransform(progress, [at, at + 0.02], [0.6, 1]);
  return (
    <motion.span
      style={{ opacity, scale }}
      className="absolute -inset-px flex items-center justify-center rounded bg-brand text-white"
    >
      <CheckIcon className="size-3" strokeWidth={3} />
    </motion.span>
  );
}

const useBeat = (progress: MotionValue<number>, start: number, end: number) =>
  useTransform(progress, [start, end], [0, 1]);

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const laneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // With reduced motion the scene jumps between its four frames instead of animating.
  const progress = useTransform(scrollYProgress, (value) =>
    reduce ? STAGE_FRAMES[stageAt(value)] : value,
  );

  const [stage, setStage] = useState(0);
  useMotionValueEvent(progress, "change", (value) => setStage(stageAt(value)));

  const headerStep = useMotionValue(0);
  const laneStep = useMotionValue(0);
  const cardWidth = useMotionValue(240);

  useEffect(() => {
    const measure = () => {
      const [header, nextHeader] = headerRefs.current;
      const [lane, nextLane] = laneRefs.current;
      if (header && nextHeader)
        headerStep.set(nextHeader.offsetLeft - header.offsetLeft);
      // The lanes are hidden below laptop width, where the card stays put.
      if (lane && nextLane)
        laneStep.set(
          nextLane.offsetParent ? nextLane.offsetLeft - lane.offsetLeft : 0,
        );
      if (cardRef.current) cardWidth.set(cardRef.current.offsetWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const column = useTransform(
    progress,
    [0, 0.1, 0.2, 0.47, 0.57, 0.8, 0.9, 1],
    [0, 0, 1, 1, 2, 2, 3, 3],
    { ease: easeInOut },
  );
  const highlightX = useTransform(() => column.get() * headerStep.get());
  const cardX = useTransform(() => column.get() * laneStep.get());

  const tests = useBeat(progress, 0.38, 0.41);
  const comment = useBeat(progress, 0.62, 0.65);
  const stamp = useBeat(progress, 0.69, 0.71);
  const stampScale = useTransform(progress, [0.69, 0.72], [1.4, 1]);

  const current = stages[stage];

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative mx-auto h-scene-team w-full max-w-6xl px-6 md:px-10"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-5 pt-20 pb-4 md:gap-10 md:pb-6">
        <div className="grid gap-3 md:grid-cols-2 md:items-end md:gap-10">
          <div>
            <Badge
              variant="outline"
              className="mb-4 hidden rounded-none border-0 px-0 font-mono text-xs tracking-widest uppercase md:inline-flex"
            >
              [ How It Works ]
            </Badge>
            <h2 className="text-3xl leading-tight font-light tracking-tight md:text-5xl">
              Meet the team of{" "}
              <span className="brand-marker font-normal">three</span>
            </h2>
          </div>

          <div className="grid" aria-live="polite">
            {stages.map((item, i) => (
              <div
                key={item.title}
                aria-hidden={i !== stage}
                className={cn(
                  "col-start-1 row-start-1 transition duration-300 ease-out-strong",
                  i === stage ? "opacity-100" : "translate-y-2 opacity-0",
                )}
              >
                <p className="font-mono text-xs text-muted-foreground">
                  0{i + 1} / 04
                </p>
                <h3 className="mt-1 text-lg font-medium md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Below laptop width the four lanes get too narrow, so the card stays put and only the header moves. */}
        <div className="mx-auto w-full max-w-xl rounded-2xl border bg-background p-3 shadow-sm md:p-4 lg:max-w-none">
          <div className="relative grid grid-cols-4 gap-2 md:gap-3">
            <motion.div
              aria-hidden="true"
              style={{ x: highlightX }}
              className="col-start-1 row-start-1 rounded-full bg-brand-tint"
            />
            {columns.map((name, i) => (
              <div
                key={name}
                ref={(node) => {
                  headerRefs.current[i] = node;
                }}
                className={cn(
                  "relative row-start-1 rounded-full px-1 py-1.5 text-center text-xs leading-tight font-medium transition-colors duration-300 md:text-sm",
                  ["col-start-1", "col-start-2", "col-start-3", "col-start-4"][
                    i
                  ],
                  i === stage ? "text-brand-ink" : "text-muted-foreground",
                )}
              >
                {name}
              </div>
            ))}
          </div>

          <div className="relative mt-3 grid grid-cols-1 gap-3 lg:grid-cols-4">
            {columns.map((name, i) => (
              <div
                key={name}
                ref={(node) => {
                  laneRefs.current[i] = node;
                }}
                className={cn(
                  "row-start-1 hidden min-h-72 rounded-xl border border-dashed bg-muted/40 lg:block",
                  [
                    "lg:col-start-1",
                    "lg:col-start-2",
                    "lg:col-start-3",
                    "lg:col-start-4",
                  ][i],
                )}
              />
            ))}

            <motion.div
              ref={cardRef}
              style={{ x: cardX }}
              className="relative z-10 col-start-1 row-start-1 self-start rounded-xl border bg-card p-4 shadow-lg shadow-brand/10"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-300",
                  current.chipClass,
                )}
              >
                {stage === 3 && (
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
                  </span>
                )}
                {current.chip}
              </span>
              <p className="mt-3 font-semibold">Sign-up with Google</p>

              <ul className="mt-3 space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="relative size-4 shrink-0 rounded border">
                      <TaskCheck progress={progress} at={task.at} />
                    </span>
                    {task.label}
                  </li>
                ))}
              </ul>

              <motion.p
                style={{ opacity: tests }}
                className="mt-3 flex items-center gap-1.5 text-xs font-medium text-green-700"
              >
                <span className="size-1.5 rounded-full bg-green-500" />
                All tests passing
              </motion.p>

              <motion.div
                style={{ opacity: comment }}
                className="mt-3 flex items-start gap-2 rounded-lg bg-muted p-2 text-xs leading-relaxed"
              >
                <img
                  src="/wave.png"
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 shrink-0 rounded-full"
                />
                <p>
                  <span className="font-medium">Ilzam:</span> Reuse the login
                  button we have.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: stamp, scale: stampScale, rotate: -8 }}
                className="absolute top-3 right-3 flex items-center gap-1 rounded-md border-2 border-brand-ink bg-background px-1.5 py-0.5 text-xs font-bold tracking-wide text-brand-ink uppercase"
              >
                <StarMark className="size-3" />
                Approved
              </motion.div>

              <RouteCursor
                member="agent1"
                progress={progress}
                cardWidth={cardWidth}
              />
              <RouteCursor
                member="agent2"
                progress={progress}
                cardWidth={cardWidth}
              />
              <RouteCursor
                member="ilzam"
                progress={progress}
                cardWidth={cardWidth}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
