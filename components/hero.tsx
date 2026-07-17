"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography"
import { generateCardTexture } from "@/components/ui/badge-card"
const Lanyard = dynamic(() => import("@/components/ui/lanyard"), { ssr: false })

const stagger = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    initial: {
      y: 40,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
}

export default function Hero({ revealed = false }: { revealed?: boolean }) {
  const [cardTexture, setCardTexture] = useState<string | null>(null)

  useEffect(() => {
    generateCardTexture().then(setCardTexture)
  }, [])

  return (
    <section className="relative z-20 flex h-screen w-full">
      <div className="flex-1 relative">
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate={revealed ? "animate" : "initial"}
          className="w-full h-full"
        >


          {/* Center left huge text */}
          <motion.div variants={stagger.item} className="absolute top-1/2 left-24 -translate-y-1/2 -mt-48">
            <CursorDrivenParticleTypography
              text={"STAY"}
              fontSize={120}
              fontFamily="Clash Display, system-ui, sans-serif"
              particleSize={1.5}
              particleDensity={4}
              dispersionStrength={8}
              returnSpeed={0.05}
              particleColor="#ffffff"
            />
          </motion.div>
          
          {/* WEIRD text - glitchy pink effect */}
          <motion.div variants={stagger.item} className="absolute top-1/2 left-48 -translate-y-1/2 -mt-12">
            <CursorDrivenParticleTypography
              text={"WEIRD"}
              fontSize={120}
              fontFamily="Clash Display, system-ui, sans-serif"
              particleSize={1.5}
              particleDensity={4}
              dispersionStrength={8}
              returnSpeed={0.05}
              particleColor="#ff00ff"
            />
          </motion.div>

          {/* Bottom Left Description */}
          <motion.div
            variants={stagger.item}
            className="absolute bottom-12 left-8 md:left-16 max-w-md"
          >
            <div className="flex gap-6 text-[10px] tracking-[0.2em] text-white/50 font-bold mb-6">
              <span>AI ENGINEER</span>
              <span>FULL STACK</span>
              <span>OPEN TO WORK</span>
            </div>
            <p className="text-[11px] leading-[1.8] tracking-wide text-white/60 mb-8 max-w-[280px]">
              I build modern AI applications, premium web experiences,
              and developer tools focused on performance, thoughtful
              interaction, and clean design.
            </p>
            <div className="flex items-center gap-6 text-[9px] tracking-[0.2em] text-white/40 font-mono">
              <a href="#projects" className="text-white hover:text-white/80 transition-colors border-b border-white/30 pb-0.5">
                View Projects
              </a>
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch("/Resume.pdf")
                  const blob = await res.blob()
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = "Shadrach_Paul_Resume.pdf"
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                  URL.revokeObjectURL(url)
                }}
                className="hover:text-white/80 transition-colors"
              >
                Download Resume
              </button>
              <a href="https://github.com/shadynitxhy" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
                GitHub
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  const gmailUrl =
                    "https://mail.google.com/mail/?view=cm&fs=1&to=shadrachpaul1605@gmail.com&su=Let%27s%20Build%20Something%20Together"
                  const gmailWindow = window.open(gmailUrl, "_blank")
                  if (!gmailWindow || gmailWindow.closed) {
                    window.location.href =
                      "mailto:shadrachpaul1605@gmail.com?subject=Let%27s%20Build%20Something%20Together"
                  }
                }}
                className="hover:text-white/80 transition-colors"
              >
                Email
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="hidden lg:block w-[45%] h-screen relative">
        <Lanyard
          position={[0, 3, 26]}
          gravity={[0, -40, 0]}
          frontImage={cardTexture}
          backImage={cardTexture}
        />
      </div>
    </section>
  )
}
