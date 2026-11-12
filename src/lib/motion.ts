import { cubicBezier } from "motion/react"

// The same curves as --curve-out and --curve-in-out in global.css.
export const EASE_OUT = [0.23, 1, 0.32, 1] as const
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

export const easeOut = cubicBezier(...EASE_OUT)
export const easeInOut = cubicBezier(...EASE_IN_OUT)
