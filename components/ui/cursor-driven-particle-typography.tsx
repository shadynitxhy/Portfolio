"use client"

import { useEffect, useRef } from "react"

export interface CursorDrivenParticleTypographyProps {
  text: string
  fontSize?: number
  fontFamily?: string
  particleSize?: number
  particleDensity?: number
  dispersionStrength?: number
  returnSpeed?: number
  particleColor?: string
  className?: string
  align?: CanvasTextAlign
}

class Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  color: string
  dispersion: number
  returnSpd: number

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    dispersion: number,
    returnSpd: number
  ) {
    this.x = x + (Math.random() - 0.5) * 10
    this.y = y + (Math.random() - 0.5) * 10
    this.originX = x
    this.originY = y
    this.vx = (Math.random() - 0.5) * 5
    this.vy = (Math.random() - 0.5) * 5
    this.size = size
    this.color = color
    this.dispersion = dispersion
    this.returnSpd = returnSpd
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    const interactionRadius = 120

    if (distance < interactionRadius && mouseX !== -1000 && mouseY !== -1000) {
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance
      const force = (interactionRadius - distance) / interactionRadius

      this.vx -= forceDirectionX * force * this.dispersion
      this.vy -= forceDirectionY * force * this.dispersion
    }

    this.vx += (this.originX - this.x) * this.returnSpd
    this.vy += (this.originY - this.y) * this.returnSpd

    this.vx *= 0.85
    this.vy *= 0.85

    const distToOrigin = Math.sqrt(
      (this.x - this.originX) ** 2 + (this.y - this.originY) ** 2
    )
    if (distToOrigin < 1 && Math.random() > 0.95) {
      this.vx += (Math.random() - 0.5) * 0.2
      this.vy += (Math.random() - 0.5) * 0.2
    }

    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function CursorDrivenParticleTypography({
  text,
  fontSize = 120,
  fontFamily = "Inter, sans-serif",
  particleSize = 1.5,
  particleDensity = 6,
  dispersionStrength = 15,
  returnSpeed = 0.08,
  particleColor = "#ffffff",
  className,
  align = "left",
}: CursorDrivenParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = -1000
    let mouseY = -1000
    let canvasW = 0
    let canvasH = 0

    const init = () => {
      const dpr = window.devicePixelRatio || 1

      ctx.font = `bold ${fontSize}px ${fontFamily}`
      const lines = text.split("\n")
      const lineHeight = fontSize * 1.2
      let maxWidth = 0
      for (const line of lines) {
        const m = ctx.measureText(line)
        if (m.width > maxWidth) maxWidth = m.width
      }

      const totalHeight = lines.length * lineHeight
      const padding = fontSize * 0.15
      const overflowExtra = fontSize * 0.3

      canvasW = Math.ceil(maxWidth + padding * 2 + overflowExtra * 2)
      canvasH = Math.ceil(totalHeight + padding * 2 + overflowExtra * 2)

      canvas.width = canvasW * dpr
      canvas.height = canvasH * dpr
      canvas.style.width = `${canvasW}px`
      canvas.style.height = `${canvasH}px`
      canvas.style.marginLeft = `-${overflowExtra}px`
      canvas.style.marginTop = `-${overflowExtra}px`

      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, canvasW, canvasH)
      ctx.fillStyle = particleColor
      ctx.font = `bold ${fontSize}px ${fontFamily}`
      ctx.textAlign = align || "left"
      ctx.textBaseline = "middle"

      const startY = (canvasH - totalHeight) / 2 + lineHeight / 2
      let textX = canvasW / 2
      if (ctx.textAlign === "left") textX = padding + overflowExtra
      else if (ctx.textAlign === "right") textX = canvasW - padding - overflowExtra

      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], textX, startY + i * lineHeight)
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      particles = []

      const step = Math.max(1, Math.floor(particleDensity * dpr))
      for (let y = 0; y < imageData.height; y += step) {
        for (let x = 0; x < imageData.width; x += step) {
          const idx = (y * imageData.width + x) * 4
          if (imageData.data[idx + 3] > 128) {
            particles.push(
              new Particle(
                x / dpr,
                y / dpr,
                particleSize,
                particleColor,
                dispersionStrength,
                returnSpeed
              )
            )
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvasW, canvasH)
      for (const p of particles) {
        p.update(mouseX, mouseY)
        p.draw(ctx)
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    let cachedRect: DOMRect | null = null
    const handleMouseMove = (e: MouseEvent) => {
      cachedRect = canvas.getBoundingClientRect()
      mouseX = e.clientX - cachedRect.left
      mouseY = e.clientY - cachedRect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    const timeoutId = setTimeout(() => {
      document.fonts.ready.then(() => {
        init()
        animate()
      })
    }, 50)

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", (e) => {
      if (!e.touches[0]) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.touches[0].clientX - rect.left
      mouseY = e.touches[0].clientY - rect.top
    })
    canvas.addEventListener("touchmove", (e) => {
      if (!e.touches[0]) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.touches[0].clientX - rect.left
      mouseY = e.touches[0].clientY - rect.top
    })
    canvas.addEventListener("touchend", handleMouseLeave)

    return () => {
      clearTimeout(timeoutId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [
    text,
    fontSize,
    fontFamily,
    particleSize,
    particleDensity,
    dispersionStrength,
    returnSpeed,
    particleColor,
    align,
  ])

  return <canvas ref={canvasRef} className={className} />
}
