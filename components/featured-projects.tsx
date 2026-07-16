"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import DecryptedText from "@/components/ui/decrypted-text"

interface ProjectStatus {
  label: string
}

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  featured: boolean
  status?: ProjectStatus[]
  liveHref: string | null
  githubHref: string | null
  liveLabel?: string
  githubLabel?: string
}

const projects: Project[] = [
  {
    id: "ship-safe-ai",
    title: "ShipSafe AI",
    subtitle: "Production Readiness Verification Platform",
    description:
      "ShipSafe AI helps developers verify production readiness before deployment by scanning projects for security issues, architecture problems, configuration risks, deployment mistakes, and best-practice violations.",
    tech: ["React", "TypeScript", "Node.js", "TurboRepo", "pnpm", "CLI", "AI Rules Engine"],
    featured: true,
    status: [{ label: "FEATURED" }, { label: "UNDER DEVELOPMENT" }],
    liveHref: null,
    githubHref: null,
    liveLabel: "In Active Development",
    githubLabel: "Under Production",
  },
  {
    id: "revival-ministries",
    title: "Revival Ministries",
    subtitle: "Modern Digital Ministry Platform",
    description:
      "A cinematic ministry website built to deliver worship music, sermons, prayer requests, and church community experiences with a premium modern interface.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Firebase", "Vercel"],
    featured: false,
    status: [{ label: "LIVE" }],
    liveHref: "https://revival-ministries.vercel.app/",
    githubHref: "https://github.com/shadynitxhy/Revival-Ministries.git",
  },
  {
    id: "prompt-pilot",
    title: "PromptPilot",
    subtitle: "AI Prompt Enhancement Extension",
    description:
      "A browser extension that improves prompts across multiple AI models, helping users write clearer, richer, and more effective prompts with a single click.",
    tech: ["React", "TypeScript", "Chrome Extension", "OpenRouter", "Tailwind CSS"],
    featured: false,
    status: [{ label: "CONCEPT" }],
    liveHref: "https://prompt-pilot-webpage-three.vercel.app/",
    githubHref: "https://github.com/shadynitxhy/PromptPilot.git",
  },
  {
    id: "space-odyssey",
    title: "Space Odyssey",
    subtitle: "Immersive Frontend Experience",
    description:
      "A cinematic interactive web experience inspired by deep space exploration, built to showcase advanced frontend animations, smooth scrolling, and modern visual storytelling.",
    tech: ["React", "Three.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    featured: false,
    status: [{ label: "SHOWCASE" }],
    liveHref: "https://space-odesey.vercel.app/",
    githubHref: "https://github.com/shadynitxhy/Space-Odesey.git",
  },
]

const projectImages: Record<string, string> = {
  "revival-ministries": "/assets/projects/RevivalMinistries.png",
  "prompt-pilot": "/assets/projects/PromptPilot.png",
  "space-odyssey": "/assets/projects/SpaceOdessey.jpg",
}

const stagger = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    initial: { y: 60, opacity: 0, filter: "blur(6px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
}

export default function FeaturedProjects() {
  const [cursorActive, setCursorActive] = useState(false)
  const [cursorProject, setCursorProject] = useState("")
  const cursorRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }
  }, [])

  const onMouseEnter = useCallback((e: React.MouseEvent, id: string) => {
    setCursorActive(true)
    setCursorProject(id)
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    setCursorActive(false)
  }, [])

  return (
    <section id="projects" className="relative z-20 w-full px-8 md:px-16 pt-24 pb-32">
      <motion.div
        variants={stagger.container}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-container"
      >
        <motion.div variants={stagger.item} className="mb-6">
          <span className="text-[9px] tracking-[0.25em] text-white/40 uppercase font-mono">
            — Selected Projects
          </span>
        </motion.div>

        <motion.div variants={stagger.item} className="mb-4">
          <h2 className="text-3xl md:text-4xl text-white font-medium leading-none tracking-tight uppercase">
            <DecryptedText
              text="Featured Work"
              animateOn="view"
              sequential
              revealDirection="start"
              speed={40}
              maxIterations={8}
            />
          </h2>
        </motion.div>

        <motion.div variants={stagger.item} className="mb-20">
          <div className="w-full h-px bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
          {projects.map((project) => {
            const imageSrc = projectImages[project.id]

            return (
              <motion.div
                key={project.id}
                variants={stagger.item}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="group"
              >
                <div
                  onMouseEnter={(e) => onMouseEnter(e, project.id)}
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  onClick={() => {
                    const url = project.liveHref || project.githubHref
                    if (url) window.open(url, "_blank", "noopener noreferrer")
                  }}
                  className="relative mb-6 overflow-hidden rounded-sm border border-white/[0.06] group-hover:border-white/20 transition-all duration-500 ease-out shadow-[0_2px_12px_rgba(0,0,0,0.35)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] cursor-none"
                >
                  {imageSrc ? (
                    <div className="aspect-[16/10] w-full relative overflow-hidden bg-surface-50">
                      <Image
                        src={imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-white/[0.015] pointer-events-none" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#060606] via-surface to-[#0a0a0a] relative overflow-hidden">
                      <style>{`
                        @keyframes ship-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(calc(100% + 2px)); } }
                        @keyframes ship-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                        @keyframes ship-progress { 0% { width: 0%; } 40% { width: 78%; } 80% { width: 82%; } 100% { width: 0%; } }
                        @keyframes ship-dot1 { 0%, 70%, 100% { opacity: 0.15; } 35% { opacity: 0.8; } }
                        @keyframes ship-dot2 { 0%, 70%, 100% { opacity: 0.15; } 35% { opacity: 0.8; } }
                        @keyframes ship-dot3 { 0%, 70%, 100% { opacity: 0.15; } 35% { opacity: 0.8; } }
                        @keyframes ship-glow { 0%, 100% { opacity: 0.06; } 50% { opacity: 0.18; } }
                        .ship-safe-scan { animation: ship-scan 6s linear infinite; }
                        .ship-safe-blink { animation: ship-blink 1.2s step-end infinite; }
                        .ship-safe-progress { animation: ship-progress 4s ease-in-out infinite; }
                        .ship-safe-dot1 { animation: ship-dot1 1.8s ease-in-out infinite; }
                        .ship-safe-dot2 { animation: ship-dot2 1.8s ease-in-out 0.3s infinite; }
                        .ship-safe-dot3 { animation: ship-dot3 1.8s ease-in-out 0.6s infinite; }
                        .ship-safe-glow { animation: ship-glow 3s ease-in-out infinite; }
                        .group:hover .ship-safe-scan { animation-duration: 3s; }
                        .group:hover .ship-safe-glow { opacity: 0.15; }
                      `}</style>

                      <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />

                      <div className="absolute top-2.5 left-3 text-white/[0.06] font-mono text-[6px] leading-none select-none">
                        ┌─
                      </div>
                      <div className="absolute top-2.5 right-3 text-white/[0.06] font-mono text-[6px] leading-none select-none">
                        ─┐
                      </div>
                      <div className="absolute bottom-2.5 left-3 text-white/[0.06] font-mono text-[6px] leading-none select-none">
                        └─
                      </div>
                      <div className="absolute bottom-2.5 right-3 text-white/[0.06] font-mono text-[6px] leading-none select-none">
                        ─┘
                      </div>

                      <div className="absolute left-4 right-4 top-1/2 h-px opacity-[0.04] bg-white" />

                      <div className="absolute left-0 right-0 top-0 h-px bg-white/10 opacity-60 ship-safe-scan" />

                      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
                        <span className="text-[7px] tracking-[0.35em] text-white/60 uppercase font-mono mb-2.5">
                          COMING SOON
                        </span>

                        <span className="text-[8px] tracking-[0.25em] text-white/50 uppercase font-mono mb-4">
                          Production Readiness Platform
                        </span>

                        <div className="w-36 h-1 bg-white/[0.04] rounded overflow-hidden mb-4">
                          <div className="h-full bg-white/20 rounded ship-safe-progress" />
                        </div>

                        <div className="space-y-1 mb-2.5">
                          {["Initializing Scanner", "Loading Rules", "Preparing AI Engine"].map((line, i) => (
                            <p key={i} className="text-[7px] tracking-[0.15em] text-white/45 font-mono">
                              {line}
                              {i === 2 && (
                                <span className="ml-1.5 text-white/60">
                                  <span className="ship-safe-dot1">●</span>
                                  <span className="ship-safe-dot2 ml-px">●</span>
                                  <span className="ship-safe-dot3 ml-px">●</span>
                                </span>
                              )}
                            </p>
                          ))}
                        </div>

                        <span className="text-[9px] text-white/50 font-mono ship-safe-blink">|</span>

                        <span className="text-[6px] tracking-[0.2em] text-white/25 uppercase font-mono mt-3">
                          Release 2026
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent ship-safe-glow pointer-events-none" />

                      <div className="absolute inset-0 bg-white/[0.015] pointer-events-none z-[3]" />
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2.5 mb-3">
                  <h3 className="text-lg md:text-xl text-white font-medium leading-tight tracking-tight uppercase group-hover:text-white/90 transition-colors duration-150">
                    <DecryptedText
                      text={project.title}
                      animateOn="view"
                      sequential
                      revealDirection="start"
                      speed={25}
                      maxIterations={6}
                    />
                  </h3>
                  {project.status?.map((s) => (
                    <span
                      key={s.label}
                      className="shrink-0 mt-1 border border-white/15 text-white/45 px-2 py-0.5 rounded-sm text-[7px] tracking-[0.15em] uppercase font-mono leading-none"
                    >
                      {s.label}
                    </span>
                  ))}
                </div>

                <p className="text-[9px] tracking-[0.25em] text-white/40 uppercase font-mono mb-4">
                  {project.subtitle}
                </p>

                <p className="text-[11px] leading-[1.8] tracking-wide text-white/70 font-medium mb-6 max-w-[90%]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-white/10 px-3 py-1 rounded-sm text-[8px] tracking-[0.15em] text-white/40 uppercase font-mono leading-none"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {project.liveHref ? (
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-mono text-white/40 hover:text-white transition-all duration-150 border-b border-transparent hover:border-white/20 pb-0.5"
                    >
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live Preview
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-mono text-white/30">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      {project.liveLabel}
                    </span>
                  )}
                  {project.githubHref ? (
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-mono text-white/40 hover:text-white transition-all duration-150 border-b border-transparent hover:border-white/20 pb-0.5"
                    >
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-mono text-white/30">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      {project.githubLabel}
                    </span>
                  )}
                </div>

              </motion.div>
            )
          })}
        </div>

        <motion.div
          ref={cursorRef}
          animate={{ opacity: cursorActive ? 1 : 0, scale: cursorActive ? 1 : 0.85 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          <div className="w-14 h-14 rounded-full border backdrop-blur-sm flex items-center justify-center border-white/15 bg-white/[0.04]">
            <span className={`text-[7px] tracking-[0.25em] font-mono uppercase ${
              cursorProject === "revival-ministries"
                ? "text-[#1a1a1a]"
                : "text-white/70"
            }`}>
              VIEW
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
