"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"


const navItems = [
  { label: "Projects", href: "#projects", type: "scroll" as const },
  { label: "Stack", href: "", type: "modal" as const },
  { label: "About", href: "#about", type: "scroll" as const },
  { label: "Contact", href: "#contact", type: "scroll" as const },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [stackOpen, setStackOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > previous && latest > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    setMobileOpen(false)
  }, [])

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -120 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5 bg-black/40 backdrop-blur-xl"
      >
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img src="/assets/shad-lab.svg" alt="Shad's Lab" className="w-10 h-10" />
          <span className="hidden sm:block text-[10px] tracking-[0.2em] text-white/50 uppercase leading-tight">
            AI • Design • Development
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-[10px] tracking-[0.2em] font-medium uppercase">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "")

            if (item.type === "modal") {
              return (
                <button
                  key={item.label}
                  onClick={() => setStackOpen(true)}
                  className="hover:text-white transition-colors relative group text-white/70"
                >
                  <span className="relative flex items-center gap-1">
                    {item.label}
                    <span className="inline-block transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </span>
                </button>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`hover:text-white transition-colors relative group ${
                  isActive ? "text-white" : "text-white/70"
                }`}
              >
                <span className="relative flex items-center gap-1">
                  {item.label}
                  <span className="inline-block transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-current scale-x-100 transition-transform duration-300" />
                  )}
                </span>
              </a>
            )
          })}

          <a
            href="mailto:shadrachpaul1605@gmail.com"
            className="group flex items-center gap-2 text-[9px] tracking-[0.3em] font-mono uppercase border border-white/15 px-3 py-1.5 rounded-sm text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 ml-2"
          >
            <span className="text-white/40">&gt;</span>
            <span>LET&apos;S WORK TOGETHER</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white/60 origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
            className="block w-5 h-px bg-white/60"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white/60 origin-center"
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-surface/95 backdrop-blur-2xl border-l border-white/10 flex flex-col items-start justify-center gap-8 px-12 md:hidden"
          >
            {navItems.map((item) => {
              if (item.type === "modal") {
                return (
                  <button
                    key={item.label}
                    onClick={() => { setStackOpen(true); setMobileOpen(false) }}
                    className="text-sm tracking-[0.25em] font-medium uppercase text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                )
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-sm tracking-[0.25em] font-medium uppercase text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              )
            })}
            <div className="w-full h-px bg-white/10 my-2" />
            <a
              href="mailto:shadrachpaul1605@gmail.com"
              className="text-[10px] tracking-[0.3em] font-mono uppercase text-white/40 hover:text-white transition-colors"
            >
              &gt; LET&apos;S WORK TOGETHER
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
