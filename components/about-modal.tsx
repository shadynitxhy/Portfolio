"use client"

import { useEffect, useCallback } from "react"
import { motion } from "framer-motion"

interface AboutModalProps {
  onClose: () => void
}

const buildingItems = ["ShipSafe AI", "AI Developer Tools", "Exploring AI Agents"]

const socialLinks = [
  { label: "GitHub", href: "https://github.com/shadynitxhy" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shadrach-paul" },
]

export default function AboutModal({ onClose }: AboutModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
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
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.06] bg-[#090909] p-10 md:p-14 shadow-2xl"
      >
        <span className="text-[13px] tracking-[0.25em] text-white/60 uppercase font-mono font-bold">
          — About
        </span>

        <div className="mt-6 space-y-5">
          <p className="text-[22px] leading-[1.4] text-white/90 font-medium tracking-tight">
            Hi, I&apos;m SHADRACH PAUL PHINEHAS S.
          </p>
          <p className="text-[16px] leading-[1.8] tracking-wide text-white/65">
            I&apos;m a final-year Information Technology student passionate about AI engineering,
            developer tools, and creating thoughtful digital products.
          </p>
          <p className="text-[16px] leading-[1.8] tracking-wide text-white/65">
            I enjoy solving real-world problems through clean engineering, intuitive design,
            and continuous learning.
          </p>
          <p className="text-[16px] leading-[1.8] tracking-wide text-white/65">
            Every project I build is an opportunity to explore new ideas and challenge myself
            to create something better than before.
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.04] mt-10" />

        <div className="mt-10">
          <span className="text-[13px] tracking-[0.25em] text-white/60 uppercase font-mono font-bold">
            Currently Building
          </span>
          <ul className="mt-4 space-y-2.5">
            {buildingItems.map((item) => (
              <li
                key={item}
                className="text-[16px] leading-[1.8] tracking-wide text-white/65 flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-white/[0.04] mt-10" />

        <div className="mt-10">
          <span className="text-[13px] tracking-[0.25em] text-white/60 uppercase font-mono font-bold">
            What Drives Me
          </span>
          <p className="mt-4 text-[16px] leading-[1.8] tracking-wide text-white/65">
            Curiosity is what keeps me building. I enjoy learning new technologies,
            experimenting with ideas, and transforming them into products that are useful,
            thoughtful, and enjoyable to use.
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.04] mt-10" />

        <div className="mt-10 flex items-center gap-10">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[14px] tracking-[0.2em] font-medium uppercase text-white/60 hover:text-white transition-colors duration-150 border-b border-transparent hover:border-current pb-0.5"
            >
              {link.label}
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          ))}
        </div>

        <p className="mt-10 text-[14px] leading-relaxed tracking-wide text-white/40 font-mono italic">
          Always building. Always learning.
        </p>
      </motion.div>
    </motion.div>
  )
}
