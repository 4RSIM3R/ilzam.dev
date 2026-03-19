"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

const ACCOUNT_NUMBER = "101035770682"

export function EidGreeting({ name }: { name: string }) {
  const [showMessage, setShowMessage] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ACCOUNT_NUMBER)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-800 via-blue-700 to-sky-100">
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
          عيد مبارك
        </motion.p>

        <motion.h1
          className="text-center text-3xl font-light leading-snug tracking-tight text-white md:text-7xl md:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Happy Eid Mubarak{name ? `, ${name}` : ""}
        </motion.h1>

        {showMessage && (
          <div className="mt-6 max-w-sm text-center md:mt-8 md:max-w-md">
            <TextGenerateEffect
              words="Ramadan strips away everything we hide behind until only what matters remains. Today marks the moment you step forward, lighter and closer to who you were always meant to be. Carry that clarity with you."
              className="text-xs leading-relaxed text-white/90 md:text-base"
              duration={0.4}
            />
          </div>
        )}
      </div>

      {/* THR section */}
      <motion.div
        className="relative z-10 w-full shrink-0 px-8 pb-6 md:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <div className="mx-auto max-w-xs text-center">
          <div className="mx-auto mb-3 h-px w-12 bg-blue-900/30" />
          <p className="text-sm text-blue-900/70 md:text-base">
            If this greeting moved you, my bank account is also open to receiving blessings.
          </p>
          <button
            onClick={handleCopy}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-900/15 bg-blue-900/5 px-4 py-2 text-sm text-blue-900/70 transition-colors hover:bg-blue-900/10"
          >
            <span className="font-medium">Bank Jago</span>
            <span className="font-mono">{ACCOUNT_NUMBER}</span>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          {copied && (
            <p className="mt-1.5 text-xs text-blue-600">Copied!</p>
          )}
          <p className="mt-1.5 text-xs text-blue-900/50">
            A/N Muhammad Ilzam Mulkhaq
          </p>
        </div>
      </motion.div>
    </div>
  )
}
