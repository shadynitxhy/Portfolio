"use client"

import { useState, useCallback, useRef } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

const AboutModal = dynamic(() => import("@/components/about-modal"), { ssr: false })
const ContactModal = dynamic(() => import("@/components/contact-modal"), { ssr: false })

const navItems = [
  { label: "Projects", href: "#projects", type: "scroll" as const },
  { label: "About", href: "", type: "modal" as const },
  { label: "Contact", href: "", type: "modal" as const },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const hiddenRef = useRef(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > previous && latest > 100) {
      if (!hiddenRef.current) {
        hiddenRef.current = true
        setHidden(true)
      }
    } else {
      if (hiddenRef.current) {
        hiddenRef.current = false
        setHidden(false)
      }
    }
  })

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
            if (item.type === "modal") {
              const toggleModal = () => {
                if (item.label === "About") setAboutOpen((p) => !p)
                if (item.label === "Contact") setContactOpen((p) => !p)
              }
              return (
                <button
                  key={item.label}
                  onClick={toggleModal}
                  className="hover:text-white transition-colors duration-150 relative group text-white/70 uppercase"
                >
                  <span className="relative flex items-center gap-1">
                    {item.label}
                    <span className="inline-block transition-all duration-150 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
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
                onClick={(e) => handleScroll(e, item.href!)}
                className="hover:text-white transition-colors duration-150 relative group text-white/70"
              >
                <span className="relative flex items-center gap-1">
                  {item.label}
                  <span className="inline-block transition-all duration-150 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </a>
            )
          })}

          <button
            type="button"
            onClick={() => {
              const gmailUrl =
                "https://mail.google.com/mail/?view=cm&fs=1&to=shadrachpaul1605@gmail.com&su=Let%27s%20Build%20Something%20Together"
              const gmailWindow = window.open(gmailUrl, "_blank")
              if (!gmailWindow || gmailWindow.closed) {
                window.location.href =
                  "mailto:shadrachpaul1605@gmail.com?subject=Let%27s%20Build%20Something%20Together"
              }
            }}
            className="group flex items-center gap-2 text-[9px] tracking-[0.3em] font-mono uppercase border border-white/15 px-3 py-1.5 rounded-sm text-white/50 hover:text-white hover:border-white/30 transition-all duration-150 ml-2"
          >
            <span className="text-white/40">&gt;</span>
            <span>LET&apos;S WORK TOGETHER</span>
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </button>
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
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-surface/95 backdrop-blur-2xl border-l border-white/10 flex flex-col items-start justify-center gap-8 px-12 md:hidden"
          >
            {navItems.map((item) => {
              if (item.type === "modal") {
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.label === "About") setAboutOpen((p) => !p)
                      if (item.label === "Contact") setContactOpen((p) => !p)
                      setMobileOpen(false)
                    }}
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
                  onClick={(e) => handleScroll(e, item.href!)}
                  className="text-sm tracking-[0.25em] font-medium uppercase text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              )
            })}
            <div className="w-full h-px bg-white/10 my-2" />
            <button
              type="button"
              onClick={() => {
                const gmailUrl =
                  "https://mail.google.com/mail/?view=cm&fs=1&to=shadrachpaul1605@gmail.com&su=Let%27s%20Build%20Something%20Together"
                const gmailWindow = window.open(gmailUrl, "_blank")
                if (!gmailWindow || gmailWindow.closed) {
                  window.location.href =
                    "mailto:shadrachpaul1605@gmail.com?subject=Let%27s%20Build%20Something%20Together"
                }
              }}
              className="text-[10px] tracking-[0.3em] font-mono uppercase text-white/40 hover:text-white transition-colors"
            >
              &gt; LET&apos;S WORK TOGETHER
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
