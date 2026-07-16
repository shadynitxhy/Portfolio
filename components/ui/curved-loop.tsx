"use client"

import { useRef, useEffect, useState, useMemo, type FC } from 'react'

export interface TechItem {
  name: string
  logo: string
}

interface CurvedLoopProps {
  techs: TechItem[]
  speed?: number
  className?: string
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  techs,
  speed = 5,
  className
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const halfRef = useRef(0)
  const rafRef = useRef<number>()
  const lastTimeRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [initialOffset, setInitialOffset] = useState(0)

  const items = useMemo(() => [...techs, ...techs], [techs])

  useEffect(() => {
    if (!scrollRef.current) return
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        halfRef.current = scrollRef.current.scrollWidth / 2
        offsetRef.current = -halfRef.current * 0.4
        setInitialOffset(-halfRef.current * 0.4)
        setReady(true)
      }
    })
  }, [techs])

  useEffect(() => {
    if (!ready) return

    const el = scrollRef.current
    if (!el) return

    lastTimeRef.current = performance.now()

    const step = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      if (halfRef.current > 0) {
        offsetRef.current -= delta * speed * 10

        if (offsetRef.current <= -halfRef.current) {
          offsetRef.current += halfRef.current
        }

        el.style.transform = `translateX(${offsetRef.current}px)`
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current!)
  }, [speed, ready])

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex items-center will-change-transform"
        style={{ transform: `translateX(${initialOffset}px)`, opacity: ready ? 1 : 0 }}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className={`flex items-center gap-4 shrink-0 mr-16 md:mr-20 ${className ?? ''}`}
          >
            <span
              className="w-6 h-6 md:w-7 md:h-7 shrink-0"
              dangerouslySetInnerHTML={{ __html: tech.logo }}
            />
            <span className="whitespace-nowrap text-[24px] md:text-[32px] lg:text-[44px] font-medium leading-none text-white/60">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CurvedLoop
