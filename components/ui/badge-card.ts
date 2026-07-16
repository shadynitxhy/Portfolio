"use client"

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function addGrain(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const noiseCanvas = document.createElement("canvas")
  noiseCanvas.width = 192
  noiseCanvas.height = 192
  const nctx = noiseCanvas.getContext("2d")!
  const imageData = nctx.createImageData(192, 192)
  const d = imageData.data
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255
    d[i] = v
    d[i + 1] = v
    d[i + 2] = v
    d[i + 3] = Math.random() < 0.92 ? 0 : Math.random() * 60
  }
  nctx.putImageData(imageData, 0, 0)

  ctx.save()
  ctx.globalAlpha = 0.035
  ctx.drawImage(noiseCanvas, x, y, w, h)
  ctx.restore()
}

function addInkImperfections(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save()
  ctx.globalAlpha = 0.04
  for (let i = 0; i < 12; i++) {
    const ix = x + Math.random() * w
    const iy = y + Math.random() * h
    const ir = 0.5 + Math.random() * 2
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.arc(ix, iy, ir, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

function spaceText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number
) {
  ctx.textAlign = "left"
  const chars = text.split("")
  let totalWidth = 0
  const widths = chars.map((c) => {
    const w = ctx.measureText(c).width
    totalWidth += w + spacing
    return w
  })
  let sx = x - totalWidth / 2 + spacing / 2
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], sx, y)
    sx += widths[i] + spacing
  }
}

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const bars = [
    4, 2, 6, 2, 2, 4, 2, 6, 2, 2, 4, 6, 2, 2, 2, 4, 6, 2, 4, 2,
    2, 6, 4, 2, 2, 4, 2, 6, 2, 4, 2, 2, 6, 2, 4, 6, 2, 2, 4, 2,
    2, 4, 6, 2, 4, 2, 6, 2, 2, 4, 2, 6, 4, 2, 2, 2, 4, 6, 2, 4,
    2, 4, 2, 6, 4, 2, 2, 2,
  ]
  const totalWidth = bars.reduce((a, b) => a + b, 0)
  const scale = w / totalWidth
  ctx.fillStyle = "#111"
  let bx = x
  for (let i = 0; i < bars.length; i++) {
    if (i % 2 === 0) {
      ctx.fillRect(bx, y, bars[i] * scale, h)
    }
    bx += bars[i] * scale
  }
}

export async function generateCardTexture(): Promise<string> {
  const W = 800
  const H = 1208
  const S = 3
  const r = 20
  const pad = 14
  const bg = "#F8F8F6"
  const headerH = 230

  const hi = document.createElement("canvas")
  hi.width = W * S
  hi.height = H * S
  const ctx = hi.getContext("2d")!
  ctx.scale(S, S)

  const portrait = await loadImage("/assets/Human.png")
  const pH = H * 0.46
  const pW = pH * (portrait.naturalWidth / portrait.naturalHeight)
  const pX = (W - pW) / 2
  const pY = headerH - 12
  const pBottom = pY + pH

  ctx.save()
  roundRect(ctx, pad, 0, W - pad * 2, H, r)
  ctx.clip()

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = "#111"
  ctx.fillRect(0, 0, W, headerH)

  ctx.textBaseline = "middle"
  ctx.textAlign = "center"

  const holeR = 10
  const holeY = 18
  ctx.fillStyle = bg
  ctx.beginPath()
  ctx.arc(W / 2, holeY, holeR, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "#fff"
  ctx.font = "700 46px Arial, Helvetica, sans-serif"
  spaceText(ctx, "SHAD'S LAB", W / 2, headerH / 2 + 2, 12)

  ctx.fillStyle = "rgba(255,255,255,0.6)"
  ctx.font = "500 22px Arial, Helvetica, sans-serif"
  spaceText(ctx, "AI  \u00B7  DESIGN  \u00B7  DEVELOPMENT", W / 2, headerH / 2 + 44, 5)

  ctx.drawImage(portrait, pX, pY, pW, pH)

  const nameY = pBottom + 30
  ctx.fillStyle = "#111"
  ctx.font = "700 60px Arial, Helvetica, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "top"
  spaceText(ctx, "SHADRACH", W / 2, nameY, 4)
  spaceText(ctx, "PAUL", W / 2, nameY + 68, 4)

  const roleY = nameY + 145
  ctx.fillStyle = "#111"
  ctx.font = "500 32px Arial, Helvetica, sans-serif"
  spaceText(ctx, "AI ENGINEER", W / 2, roleY, 10)

  const dividerY = roleY + 50

  ctx.strokeStyle = "rgba(0,0,0,0.08)"
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(W * 0.14, dividerY)
  ctx.lineTo(W * 0.86, dividerY)
  ctx.stroke()

  const infoY = dividerY + 28
  const colLeft = W * 0.18
  const colRight = W * 0.82
  const rowHeight = 62

  ctx.textBaseline = "top"

  ctx.textAlign = "left"
  ctx.fillStyle = "rgba(0,0,0,0.85)"
  ctx.font = "500 18px Arial, Helvetica, sans-serif"
  ctx.fillText("ID", colLeft, infoY)
  ctx.fillStyle = "#111"
  ctx.font = "700 30px Arial, Helvetica, sans-serif"
  ctx.fillText("SL-026", colLeft, infoY + 24)

  ctx.fillStyle = "rgba(0,0,0,0.85)"
  ctx.font = "500 18px Arial, Helvetica, sans-serif"
  ctx.fillText("ROLE", colLeft, infoY + rowHeight)
  ctx.fillStyle = "#111"
  ctx.font = "700 30px Arial, Helvetica, sans-serif"
  ctx.fillText("AI ENGINEER", colLeft, infoY + rowHeight + 24)

  ctx.textAlign = "right"
  ctx.fillStyle = "rgba(0,0,0,0.85)"
  ctx.font = "500 18px Arial, Helvetica, sans-serif"
  ctx.fillText("STATUS", colRight, infoY)
  ctx.fillStyle = "#111"
  ctx.font = "700 30px Arial, Helvetica, sans-serif"
  ctx.fillText("AVAILABLE", colRight, infoY + 24)

  ctx.fillStyle = "rgba(0,0,0,0.85)"
  ctx.font = "500 18px Arial, Helvetica, sans-serif"
  ctx.fillText("YEAR", colRight, infoY + rowHeight)
  ctx.fillStyle = "#111"
  ctx.font = "700 30px Arial, Helvetica, sans-serif"
  ctx.fillText("2026", colRight, infoY + rowHeight + 24)

  const barcodeW = 110
  const barcodeH = 34
  const barcodeY = H - 52

  drawBarcode(ctx, pad + 14, barcodeY, barcodeW, barcodeH)

  ctx.fillStyle = "rgba(0,0,0,0.4)"
  ctx.font = "400 16px Arial, Helvetica, sans-serif"
  ctx.textAlign = "left"
  ctx.fillText("SL-2026-001", pad + 14, barcodeY + barcodeH + 12)

  ctx.fillStyle = "rgba(0,0,0,0.45)"
  ctx.font = "400 20px Arial, Helvetica, sans-serif"
  ctx.textAlign = "right"
  ctx.fillText("SL-2026", W - pad - 14, barcodeY + barcodeH / 2 + 6)

  ctx.restore()

  ctx.strokeStyle = "#000"
  ctx.lineWidth = 3
  roundRect(ctx, pad + 1.5, 1.5, W - pad * 2 - 3, H - 3, r)
  ctx.stroke()

  addInkImperfections(ctx, pad, 0, W - pad * 2, H)

  addGrain(ctx, pad, 0, W - pad * 2, H)

  const out = document.createElement("canvas")
  out.width = W
  out.height = H
  const octx = out.getContext("2d")!
  octx.imageSmoothingEnabled = true
  octx.imageSmoothingQuality = "high"
  octx.drawImage(hi, 0, 0, W, H)

  return out.toDataURL("image/png")
}
