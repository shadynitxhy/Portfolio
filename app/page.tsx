"use client"

import { useState, useCallback } from "react"
import BackgroundEffects from "@/components/background-effects"
import CursorSpotlight from "@/components/cursor-spotlight"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import FeaturedProjects from "@/components/featured-projects"
import CurvedLoop from "@/components/ui/curved-loop"
import SectionReveal from "@/components/ui/section-reveal"
import CinematicLoader from "@/components/ui/cinematic-loader"
import type { TechItem } from "@/components/ui/curved-loop"

const techs: TechItem[] = [
  {
    name: "React",
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="10" ry="3.5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)"/></svg>`
  },
  {
    name: "Tailwind CSS",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 4 5.5 4 8.5c0 3 2 4.5 4 4.5-1.5 0-2.5 1-2.5 2.5S6.5 18 8 18c5.5 0 8-3.5 8-6.5 0-3-2-4.5-4-4.5 1.5 0 2.5-1 2.5-2.5S13.5 2 12 2z"/></svg>`
  },
  {
    name: "TypeScript",
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="3"/><text x="12" y="17" text-anchor="middle" fill="currentColor" stroke="none" font-size="11" font-weight="700" font-family="sans-serif">TS</text></svg>`
  },
  {
    name: "Framer Motion",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 12L12 22L2 12Z"/></svg>`
  },
  {
    name: "Firebase",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C10 5 8 8 8 11c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2-6-4-9z" opacity="0.7"/><path d="M10 15c-1.5 1-2 2.5-2 4 0 1.7 1.8 3 4 3s4-1.3 4-3c0-1.5-.5-3-2-4"/></svg>`
  },
  {
    name: "Python",
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C7 2 6 4 6 6v3c0 2 1 3 3 3h6c2 0 3 1 3 3v3c0 2-1 4-6 4"/><path d="M12 22c5 0 6-2 6-4v-3c0-2-1-3-3-3H9c-2 0-3-1-3-3V6c0-2 1-4 6-4"/><circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1" fill="currentColor" stroke="none"/></svg>`
  },
  {
    name: "TensorFlow",
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5z"/><path d="M12 2v20"/><path d="M12 12l8-5"/><path d="M12 12l-8-5"/><path d="M12 12v10"/></svg>`
  }
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <CinematicLoader onComplete={handleLoaderComplete} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease-in-out" }}>
        <BackgroundEffects />
        <CursorSpotlight />
        <Navbar />
        <main>
          <Hero revealed={loaded} />
          <SectionReveal>
            <section className="relative z-20 pt-8 pb-8 md:pt-12 md:pb-12">
              <div className="text-center mb-4">
                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-mono">
                  CRAFTED WITH
                </span>
              </div>
              <CurvedLoop
                techs={techs}
                speed={8}
              />
            </section>
          </SectionReveal>
          <FeaturedProjects />
        </main>
      </div>
    </>
  )
}
