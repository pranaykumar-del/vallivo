export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-cream">
      <div className="absolute inset-0">
        <img
          src="/images/valleys-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-cream/40 to-cream/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35)_10%,transparent_70%)]" />
      </div>

      {/* Monogram — left of hero, blended into valleys (no plate / sticker) */}
      <img
        src="/images/vallivo-monogram.png"
        alt=""
        aria-hidden="true"
        className="hero-in pointer-events-none absolute z-[5] left-[4%] sm:left-[7%] md:left-[9%] top-[26%] sm:top-[28%] md:top-[30%] w-[34vw] sm:w-[26vw] md:w-[20vw] max-w-[240px] min-w-[110px] h-auto select-none"
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.92,
          filter: 'contrast(1.05) saturate(1.05)',
        }}
        loading="eager"
        decoding="async"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        <h1
          className="hero-in font-display text-forest font-semibold leading-none mb-6 select-none drop-shadow-[0_2px_24px_rgba(255,255,255,0.55)] text-[clamp(3.25rem,14vw,9.5rem)] tracking-[0.08em] sm:tracking-[0.12em]"
          aria-label="VALLIVO"
        >
          VALLIVO
        </h1>

        <div className="hero-in hero-in-delay-1 gold-line w-24 mx-auto mb-6" />

        <p className="hero-in hero-in-delay-1 font-display text-2xl sm:text-3xl md:text-4xl italic text-forest mb-6">
          Elevate Your Everyday.
        </p>

        <div className="hero-in hero-in-delay-2 flex justify-center">
          <p className="label-rule font-body text-[11px] tracking-[0.36em] uppercase text-forest/75 font-medium">
            Lifestyle Tea
          </p>
        </div>
      </div>
    </section>
  )
}
