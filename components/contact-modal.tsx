"use client"

import { useEffect, useCallback, useState } from "react"
import { motion } from "framer-motion"

interface ContactModalProps {
  onClose: () => void
}

const contactMethods = [
  {
    label: "Email",
    value: "Shadrachpaul1605@gmail.com",
    href: "mailto:Shadrachpaul1605@gmail.com",
    external: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>`,
  },
  {
    label: "GitHub",
    value: "github.com/shadynitxhy",
    href: "https://github.com/shadynitxhy",
    external: true,
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shadrach-paul",
    href: "https://www.linkedin.com/in/shadrach-paul",
    external: true,
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    label: "Phone",
    value: "+91 89393 41061",
    href: "tel:+918939341061",
    external: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
  },
  {
    label: "Location",
    value: "Chennai, TamilNadu",
    href: "",
    external: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
]

export default function ContactModal({ onClose }: ContactModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

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

  const copyToClipboard = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(label)
      setTimeout(() => setCopiedField(null), 2000)
    } catch {}
  }

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
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.06] bg-[#090909] p-10 md:p-14 shadow-2xl"
      >
        <span className="text-[13px] tracking-[0.25em] text-white/60 uppercase font-mono font-bold">
          — Contact
        </span>

        <div className="mt-6">
          <p className="text-[22px] leading-[1.4] text-white/90 font-medium tracking-tight">
            Let&apos;s build something meaningful together.
          </p>
          <p className="mt-4 text-[16px] leading-[1.8] tracking-wide text-white/65">
            Whether it&apos;s an internship, collaboration, freelance opportunity,
            or simply sharing ideas, I&apos;m always happy to connect with people
            who enjoy creating great products.
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.04] mt-10" />

        <div className="mt-10 space-y-4">
          {contactMethods.map((method) => {
            const isCopied = copiedField === method.label

            if (method.label === "Email") {
              return (
                <button
                  key={method.label}
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
                  className="group flex items-center justify-between py-3 px-4 rounded-lg border border-white/[0.04] hover:border-white/[0.12] transition-all duration-150 w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-150 shrink-0"
                      dangerouslySetInnerHTML={{ __html: method.icon }}
                    />
                    <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono">
                      {method.label}
                    </span>
                  </div>
                </button>
              )
            }

            if (method.label === "Phone") {
              return (
                <div
                  key={method.label}
                  className="group flex items-center justify-between py-3 px-4 rounded-lg border border-white/[0.04] hover:border-white/[0.12] transition-all duration-150"
                >
                  <a
                    href={method.href}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <span
                      className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-150 shrink-0"
                      dangerouslySetInnerHTML={{ __html: method.icon }}
                    />
                    <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono">
                      {method.label}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(method.label, method.value)
                    }}
                    className="shrink-0 ml-3 text-white/30 hover:text-white/60 transition-colors duration-150"
                  >
                    {isCopied ? (
                      <span className="text-[11px] tracking-wide text-white/60">
                        Copied!
                      </span>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              )
            }

            if (method.label === "Location") {
              return (
                <div
                  key={method.label}
                  className="flex items-center justify-between py-3 px-4 rounded-lg border border-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 text-white/40 shrink-0"
                      dangerouslySetInnerHTML={{ __html: method.icon }}
                    />
                    <div>
                      <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono block leading-none">
                        {method.label}
                      </span>
                      <span className="text-[15px] leading-none tracking-wide text-white/70 mt-1.5 block">
                        {method.value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <a
                key={method.label}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between py-3 px-4 rounded-lg border border-white/[0.04] hover:border-white/[0.12] transition-all duration-150"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-150 shrink-0"
                    dangerouslySetInnerHTML={{ __html: method.icon }}
                  />
                  <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono">
                    {method.label}
                  </span>
                </div>
                <span className="text-white/30 group-hover:text-white/60 transition-all duration-150 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            )
          })}
        </div>

        <div className="w-full h-px bg-white/[0.04] mt-10" />

        <div className="mt-10">
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
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] font-mono uppercase border border-white/15 px-4 py-2 rounded-sm text-white/50 hover:text-white hover:border-white/30 transition-all duration-150"
          >
            <span className="text-white/40">&gt;</span>
            <span>LET&apos;S WORK TOGETHER</span>
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </div>

        <p className="mt-10 text-[14px] leading-relaxed tracking-wide text-white/40 font-mono italic">
          Looking forward to creating something meaningful together.
        </p>
      </motion.div>
    </motion.div>
  )
}
