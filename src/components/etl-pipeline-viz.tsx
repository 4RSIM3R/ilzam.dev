import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { motion, useInView } from "motion/react"

// 7 balai colors
const BALAI_COLORS = [
	"#ef4444", // red
	"#f97316", // orange
	"#eab308", // yellow
	"#22c55e", // green
	"#3b82f6", // blue
	"#8b5cf6", // violet
	"#ec4899", // pink
]

const CLEAN_COLOR = "#3b82f6"

interface Particle {
	id: number
	x: number
	y: number
	size: number
	color: string
	speed: number
	offset: number
	opacity: number
}

function generateChaosParticles(count: number): Particle[] {
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		size: Math.random() * 4 + 2,
		color: BALAI_COLORS[Math.floor(Math.random() * BALAI_COLORS.length)],
		speed: Math.random() * 2 + 0.5,
		offset: Math.random() * Math.PI * 2,
		opacity: Math.random() * 0.5 + 0.3,
	}))
}

function generateCleanParticles(count: number): Particle[] {
	const cols = 10
	const rows = Math.ceil(count / cols)
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		x: (i % cols) * (100 / cols) + 100 / cols / 2,
		y: Math.floor(i / cols) * (100 / rows) + 100 / rows / 2,
		size: 3,
		color: CLEAN_COLOR,
		speed: 0,
		offset: 0,
		opacity: 0.8,
	}))
}

function AnimatedCounter({
	target,
	duration = 2000,
	started,
	suffix = "",
	prefix = "",
}: {
	target: number
	duration?: number
	started: boolean
	suffix?: string
	prefix?: string
}) {
	const [value, setValue] = useState(0)

	useEffect(() => {
		if (!started) return
		const startTime = performance.now()
		const animate = (now: number) => {
			const elapsed = now - startTime
			const progress = Math.min(elapsed / duration, 1)
			// ease out cubic
			const eased = 1 - Math.pow(1 - progress, 3)
			setValue(Math.floor(eased * target))
			if (progress < 1) requestAnimationFrame(animate)
		}
		requestAnimationFrame(animate)
	}, [started, target, duration])

	return (
		<span>
			{prefix}
			{value.toLocaleString()}
			{suffix}
		</span>
	)
}

function ChaosCloud({ particles }: { particles: Particle[] }) {
	const [tick, setTick] = useState(0)

	useEffect(() => {
		let frame: number
		const animate = () => {
			setTick((t) => t + 1)
			frame = requestAnimationFrame(animate)
		}
		frame = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(frame)
	}, [])

	return (
		<svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
			{particles.map((p) => {
				const time = tick * 0.02
				const dx = Math.sin(time * p.speed + p.offset) * 3
				const dy = Math.cos(time * p.speed * 0.7 + p.offset) * 3
				return (
					<circle
						key={p.id}
						cx={p.x + dx}
						cy={p.y + dy}
						r={p.size}
						fill={p.color}
						opacity={p.opacity}
					/>
				)
			})}
		</svg>
	)
}

function CleanGrid({ particles, visible }: { particles: Particle[]; visible: boolean }) {
	return (
		<svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
			{particles.map((p, i) => (
				<motion.circle
					key={p.id}
					cx={p.x}
					cy={p.y}
					r={p.size}
					fill={p.color}
					initial={{ opacity: 0, scale: 0 }}
					animate={visible ? { opacity: p.opacity, scale: 1 } : {}}
					transition={{ delay: i * 0.01, duration: 0.3, ease: "easeOut" }}
				/>
			))}
		</svg>
	)
}

function FunnelAnimation({ active }: { active: boolean }) {
	const [dots, setDots] = useState<{ id: number; x: number; y: number; color: string; progress: number }[]>([])
	const nextId = useRef(0)

	useEffect(() => {
		if (!active) return
		const interval = setInterval(() => {
			setDots((prev) => {
				// spawn new dots from top
				const newDots = Array.from({ length: 3 }, () => ({
					id: nextId.current++,
					x: Math.random() * 80 + 10,
					y: 0,
					color: BALAI_COLORS[Math.floor(Math.random() * BALAI_COLORS.length)],
					progress: 0,
				}))
				// advance existing dots
				const updated = prev
					.map((d) => ({
						...d,
						progress: d.progress + 0.03,
						// converge x toward center as they fall
						x: d.x + (50 - d.x) * 0.04,
						y: d.progress * 100,
					}))
					.filter((d) => d.progress < 1)
				return [...updated, ...newDots].slice(-60)
			})
		}, 50)
		return () => clearInterval(interval)
	}, [active])

	return (
		<svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
			{/* funnel shape */}
			<path
				d="M 10 0 L 90 0 L 60 50 L 60 100 L 40 100 L 40 50 Z"
				fill="none"
				stroke="currentColor"
				strokeWidth="0.5"
				opacity="0.15"
			/>
			{/* processing glow at narrows */}
			<motion.ellipse
				cx="50"
				cy="50"
				rx="12"
				ry="4"
				fill="none"
				stroke={CLEAN_COLOR}
				strokeWidth="0.8"
				animate={{ opacity: active ? [0.2, 0.6, 0.2] : 0 }}
				transition={{ duration: 1.5, repeat: Infinity }}
			/>
			{dots.map((d) => (
				<circle
					key={d.id}
					cx={d.x}
					cy={d.y}
					r={d.progress > 0.5 ? 1.5 : 2.5 - d.progress * 2}
					fill={d.progress > 0.5 ? CLEAN_COLOR : d.color}
					opacity={0.7}
				/>
			))}
		</svg>
	)
}

export function EtlPipelineViz() {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-100px" })
	const [phase, setPhase] = useState(0) // 0: idle, 1: chaos visible, 2: funnel active, 3: clean visible

	const chaosParticles = useMemo(() => generateChaosParticles(80), [])
	const cleanParticles = useMemo(() => generateCleanParticles(40), [])

	useEffect(() => {
		if (!isInView) return
		// stagger the phases
		const t1 = setTimeout(() => setPhase(1), 300)
		const t2 = setTimeout(() => setPhase(2), 1200)
		const t3 = setTimeout(() => setPhase(3), 3500)
		return () => {
			clearTimeout(t1)
			clearTimeout(t2)
			clearTimeout(t3)
		}
	}, [isInView])

	return (
		<div ref={ref} className="mt-8 overflow-hidden rounded-lg border bg-muted/20 p-6 md:p-8">
			{/* counters */}
			<div className="mb-6 flex items-center justify-between">
				<div className="text-center">
					<motion.div
						className="text-2xl font-semibold tabular-nums md:text-3xl"
						initial={{ opacity: 0 }}
						animate={phase >= 1 ? { opacity: 1 } : {}}
					>
						<AnimatedCounter
							target={20000000}
							started={phase >= 1}
							duration={2500}
						/>
					</motion.div>
					<p className="mt-1 text-xs text-muted-foreground">Raw teaching records</p>
				</div>

				<motion.div
					className="flex items-center gap-2 text-muted-foreground"
					initial={{ opacity: 0 }}
					animate={phase >= 2 ? { opacity: 1 } : {}}
					transition={{ duration: 0.5 }}
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
					<span className="hidden text-xs md:block">ETL Pipeline</span>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</motion.div>

				<div className="text-center">
					<motion.div
						className="text-2xl font-semibold tabular-nums md:text-3xl"
						initial={{ opacity: 0 }}
						animate={phase >= 3 ? { opacity: 1 } : {}}
					>
						<AnimatedCounter
							target={300000}
							started={phase >= 3}
							duration={2000}
							suffix="+"
						/>
					</motion.div>
					<p className="mt-1 text-xs text-muted-foreground">Clean teacher records</p>
				</div>
			</div>

			{/* visualization */}
			<div className="grid grid-cols-3 gap-4">
				{/* chaos cloud */}
				<motion.div
					className="aspect-square rounded-lg border border-dashed bg-muted/30 p-2"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
					transition={{ duration: 0.5 }}
				>
					<ChaosCloud particles={chaosParticles} />
				</motion.div>

				{/* funnel */}
				<motion.div
					className="aspect-square rounded-lg border bg-muted/10 p-2"
					initial={{ opacity: 0 }}
					animate={phase >= 2 ? { opacity: 1 } : {}}
					transition={{ duration: 0.5 }}
				>
					<FunnelAnimation active={phase >= 2} />
				</motion.div>

				{/* clean grid */}
				<motion.div
					className="aspect-square rounded-lg border border-dashed bg-muted/30 p-2"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
					transition={{ duration: 0.5 }}
				>
					<CleanGrid particles={cleanParticles} visible={phase >= 3} />
				</motion.div>
			</div>

			{/* labels */}
			<div className="mt-3 grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
				<motion.p
					initial={{ opacity: 0 }}
					animate={phase >= 1 ? { opacity: 1 } : {}}
				>
					Scattered data from 7 balai
				</motion.p>
				<motion.p
					initial={{ opacity: 0 }}
					animate={phase >= 2 ? { opacity: 1 } : {}}
				>
					Identity & competency resolution
				</motion.p>
				<motion.p
					initial={{ opacity: 0 }}
					animate={phase >= 3 ? { opacity: 1 } : {}}
				>
					Verified teacher profiles
				</motion.p>
			</div>

			{/* balai legend */}
			<motion.div
				className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1"
				initial={{ opacity: 0 }}
				animate={phase >= 1 ? { opacity: 1 } : {}}
				transition={{ delay: 0.5 }}
			>
				{["BOE", "BMTI", "BBL", "Pertanian", "Bispar", "Senbud", "KPTK"].map((name, i) => (
					<div key={name} className="flex items-center gap-1.5">
						<span
							className="inline-block size-2 rounded-full"
							style={{ backgroundColor: BALAI_COLORS[i] }}
						/>
						<span className="text-xs text-muted-foreground">{name}</span>
					</div>
				))}
			</motion.div>
		</div>
	)
}
