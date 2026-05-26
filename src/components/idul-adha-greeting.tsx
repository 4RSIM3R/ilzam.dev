"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { SparklesCore } from "@/components/ui/sparkles"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export function IdulAdhaGreeting({ name }: { name: string }) {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-700 to-emerald-100">
      {/* Sparkles background */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          particleColor="#ffffff"
          particleDensity={40}
          minSize={1}
          maxSize={2}
          speed={1}
        />
      </div>

      {/* Main greeting */}
      <div className="relative z-10 flex flex-1 w-full max-w-2xl flex-col items-center justify-center px-8 md:px-6">
        <motion.p
          className="mb-2 text-xl font-light text-white md:mb-3 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          عيد أضحى مبارك
        </motion.p>

        <motion.h1
          className="text-center text-3xl font-light leading-snug tracking-tight text-white md:text-7xl md:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Happy Idul Adha{name ? `, ${name}` : ""}
        </motion.h1>

        {showMessage && (
          <div className="mt-6 max-w-sm text-center md:mt-8 md:max-w-md">
            <TextGenerateEffect
              words="Idul Adha asks what we are willing to let go of to draw closer to what truly matters. Ibrahim's story is not about loss, it is about trust deep enough to release what we hold tightest. May today leave you lighter, and closer."
              className="text-xs leading-relaxed text-white/90 md:text-base"
              duration={0.4}
            />
          </div>
        )}
      </div>

    </div>
  )
}
