"use client"

import { useEffect, useRef } from "react"

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number | null = null
    let currentX = 0
    let currentY = 0

    const update = () => {
      if (!spotlightRef.current) return
      spotlightRef.current.style.setProperty("--x", `${currentX}px`)
      spotlightRef.current.style.setProperty("--y", `${currentY}px`)
      rafId = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      currentX = e.clientX
      currentY = e.clientY
      if (rafId === null) {
        rafId = requestAnimationFrame(update)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(124,58,237,0.04) 0%, transparent 40%)",
      }}
    />
  )
}
