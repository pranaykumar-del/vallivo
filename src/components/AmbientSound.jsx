import { useState, useRef } from 'react'

export default function AmbientSound() {
  const [active, setActive] = useState(false)
  const audioCtxRef = useRef(null)
  const nodesRef = useRef([])

  const start = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioCtxRef.current = ctx

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2)
    master.connect(ctx.destination)

    const freqs = [55, 82.5, 110, 165]
    const oscs = freqs.map((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.value = freq
      gain.gain.value = i === 0 ? 1 : 0.3
      osc.connect(gain)
      gain.connect(master)
      osc.start()
      return { osc, gain }
    })

    nodesRef.current = oscs
  }

  const stop = () => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.06, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
    setTimeout(() => {
      nodesRef.current.forEach(({ osc }) => { try { osc.stop() } catch (_) {} })
      ctx.close()
      audioCtxRef.current = null
      nodesRef.current = []
    }, 1600)
  }

  const toggle = () => {
    if (active) { stop(); setActive(false) }
    else { start(); setActive(true) }
  }

  return (
    <button
      onClick={toggle}
      title={active ? 'Mute ambient sound' : 'Play ambient sound'}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-forest flex items-center justify-center shadow-lg"
      style={{ boxShadow: '0 4px 24px rgba(31,51,40,0.2)' }}
    >
      {active && (
        <span className="pulse-ring absolute inset-0 rounded-full border border-gold/60" />
      )}
      <span className="relative text-cream text-lg">
        {active ? '♪' : '♩'}
      </span>
    </button>
  )
}
