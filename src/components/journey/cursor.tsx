import { motion, type MotionStyle } from "motion/react";
import { cn } from "@/lib/utils";

// The team of three, drawn as collaborator cursors.
export const TEAM = {
  agent1: { name: "Agent 1", color: "bg-brand", fill: "var(--brand)" },
  agent2: {
    name: "Agent 2",
    color: "bg-sky-500",
    fill: "var(--color-sky-500)",
  },
  ilzam: { name: "Ilzam", color: "bg-brand-ink", fill: "var(--brand-ink)" },
} as const;

export type TeamMember = keyof typeof TEAM;

export function Cursor({
  member,
  style,
  className,
}: {
  member: TeamMember;
  style?: MotionStyle;
  className?: string;
}) {
  const { name, color, fill } = TEAM[member];

  return (
    <motion.div
      aria-hidden="true"
      style={style}
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-10",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="size-5 drop-shadow-sm">
        <path
          d="M1.5 1.2 14 6.3 8.4 8.1 6.3 14.2Z"
          fill={fill}
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "absolute top-4 left-4 flex w-max items-center gap-1 rounded-full py-0.5 pr-2 text-xs font-medium whitespace-nowrap text-white shadow-sm",
          color,
          member === "ilzam" ? "pl-0.5" : "pl-2",
        )}
      >
        {member === "ilzam" && (
          <img
            src="/wave.png"
            alt=""
            width={16}
            height={16}
            className="size-4 rounded-full"
          />
        )}
        {name}
      </span>
    </motion.div>
  );
}
