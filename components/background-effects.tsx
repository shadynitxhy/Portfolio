export default function BackgroundEffects() {
  return (
    <>
      {/* Ambient glow - top right */}
      <div
        className="pointer-events-none fixed -top-40 -right-40 z-0 h-[600px] w-[600px] opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Ambient glow - bottom left */}
      <div
        className="pointer-events-none fixed -bottom-40 -left-40 z-0 h-[500px] w-[500px] opacity-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Center glow */}
      <div
        className="pointer-events-none fixed top-1/2 left-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.2) 0%, transparent 60%)",
        }}
      />

      {/* Grid overlay */}
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" />

      {/* Noise texture */}
      <div className="bg-noise pointer-events-none fixed inset-0 z-0" />
    </>
  )
}
