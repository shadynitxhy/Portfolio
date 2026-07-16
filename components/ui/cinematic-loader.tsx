"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DinosaurLoader from "@/components/ui/dinosaur-loader"

const KEYFRAMES = [
  { t: 0, v: 0 },
  { t: 400, v: 20 },
  { t: 1000, v: 55 },
  { t: 1600, v: 80 },
  { t: 2200, v: 95 },
  { t: 2500, v: 100 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getProgress(elapsed: number) {
  for (let i = 1; i < KEYFRAMES.length; i++) {
    if (elapsed <= KEYFRAMES[i].t) {
      const seg = KEYFRAMES[i - 1]
      const next = KEYFRAMES[i]
      const t = (elapsed - seg.t) / (next.t - seg.t)
      return lerp(seg.v, next.v, t)
    }
  }
  return 100
}

export default function CinematicLoader({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)
  const raf = useRef(0)
  const start = useRef(0)

  useEffect(() => {
    start.current = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start.current
      const raw = getProgress(elapsed)
      const rounded = Math.min(100, Math.floor(raw))
      setPct(rounded)
      if (elapsed < 2600) {
        raf.current = requestAnimationFrame(tick)
      }
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const dismiss = useCallback(() => {
    setVisible(false)
    setTimeout(onComplete, 500)
  }, [onComplete])

  useEffect(() => {
    if (pct >= 100) {
      const hold = setTimeout(dismiss, 250)
      return () => clearTimeout(hold)
    }
  }, [pct, dismiss])

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000]"
        >
          <DinosaurLoader />

          <div className="mt-16 flex flex-col items-center gap-6">
            <div
              className="text-white font-bold tabular-nums"
              style={{
                fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "0.12em",
                fontVariantNumeric: "tabular-nums",
                minWidth: "4ch",
                textAlign: "center",
              }}
            >
              {String(pct).padStart(2, "0")}%
            </div>

            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(140px, 30vw, 200px)",
                height: "1px",
                background: "rgba(255,255,255,0.15)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${pct}%`,
                  background: "#ffffff",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            <div
              className="text-white/40 uppercase"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.35em",
              }}
            >
              WELCOME TO THE LAB
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
