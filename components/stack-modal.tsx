"use client"

import { useEffect, useCallback } from "react"
import { motion } from "framer-motion"

interface StackModalProps {
  onClose: () => void
}

const stackGroups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "Python", "Firebase", "REST APIs"],
  },
  {
    label: "AI & Tools",
    items: ["AI Applications", "Developer Tools", "Git", "Three.js"],
  },
]

export default function StackModal({ onClose }: StackModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="stack-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.06] bg-[#090909] p-8 md:p-12 shadow-2xl"
      >
        <span className="text-[13px] tracking-[0.25em] text-white/60 uppercase font-mono font-bold">
          — Stack
        </span>
        <h2 id="stack-modal-title" className="mt-6 text-[22px] leading-[1.4] text-white/90 font-medium tracking-tight">
          Tools I use to turn ideas into products.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {stackGroups.map((group) => (
            <div key={group.label}>
              <span className="text-[11px] tracking-[0.2em] text-white/45 uppercase font-mono">
                {group.label}
              </span>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="text-[14px] tracking-wide text-white/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
