import { useEffect, useRef } from 'react'

// Lightweight parallax canvas to evoke 3D feel without heavy libs
export default function Scene({ onMetaphorPick, onSparkCollect }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr)
      canvas.height = Math.floor(canvas.clientHeight * dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
    }))

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height

      // Gradient sky
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#0f172a')
      grad.addColorStop(1, '#1e293b')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Parallax stars
      stars.forEach(s => {
        const sx = s.x * w + Math.sin((t/3000) * s.z) * 20 * s.z
        const sy = s.y * h + Math.cos((t/4000) * s.z) * 15 * s.z
        ctx.fillStyle = `rgba(255,255,255,${0.2 + s.z*0.6})`
        ctx.beginPath()
        ctx.arc(sx, sy, 0.8 + s.z*1.5, 0, Math.PI*2)
        ctx.fill()
      })

      // Floating metaphors
      const metaphors = [
        { label: 'Wolken', key: 'clouds', x: w*0.25 + Math.sin(t/1500)*20, y: h*0.4 },
        { label: 'Lichtfunken', key: 'sparks', x: w*0.5, y: h*0.55 + Math.cos(t/1600)*20 },
        { label: 'Wurzeln', key: 'roots', x: w*0.75 + Math.sin(t/1300)*20, y: h*0.7 },
      ]

      metaphors.forEach(m => {
        ctx.fillStyle = 'rgba(255,255,255,0.08)'
        ctx.beginPath()
        ctx.arc(m.x, m.y, 60, 0, Math.PI*2)
        ctx.fill()
        ctx.fillStyle = '#e2e8f0'
        ctx.font = `${14 * dpr}px Inter, system-ui, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillText(m.label, m.x, m.y + 5)
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    const click = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (window.devicePixelRatio || 1)
      const y = (e.clientY - rect.top) * (window.devicePixelRatio || 1)
      const metas = [
        { key: 'clouds', cx: canvas.width*0.25, cy: canvas.height*0.4 },
        { key: 'sparks', cx: canvas.width*0.5, cy: canvas.height*0.55 },
        { key: 'roots', cx: canvas.width*0.75, cy: canvas.height*0.7 },
      ]
      for (const m of metas) {
        const dx = x - m.cx
        const dy = y - m.cy
        if (dx*dx + dy*dy < (60 * (window.devicePixelRatio || 1))**2) {
          onMetaphorPick?.(m.key)
          if (m.key === 'sparks') {
            onSparkCollect?.(Math.floor(Math.random()*3)+1)
          }
        }
      }
    }
    canvas.addEventListener('click', click)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.removeEventListener('click', click) }
  }, [onMetaphorPick, onSparkCollect])

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden border border-slate-700 shadow-inner">
      <canvas ref={ref} className="w-full h-full" />
    </div>
  )
}
