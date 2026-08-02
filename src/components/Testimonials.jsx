import { motion } from 'framer-motion'

const reviews = [
  { name: 'Aarav S.', city: 'Bangalore', text: 'Focus Flow has become my morning desk ritual. Clean, calm, and beautifully packed.' },
  { name: 'Priya M.', city: 'Mumbai', text: 'The packaging feels like a luxury gift. Gut Reset is light, refreshing, and genuinely easy to drink daily.' },
  { name: 'Rohan K.', city: 'Delhi', text: 'I ordered the collection first. Glow Ritual and Focus Flow are now permanent in my kitchen.' },
  { name: 'Sneha T.', city: 'Pune', text: 'The edible pyramid bags are such a good detail. Premium without feeling complicated.' },
  { name: 'Vikram N.', city: 'Chennai', text: 'Gifted this to a friend and they asked for the link immediately. The box presentation is excellent.' },
]

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 fill-gold">
      <path d="M10 1.5l2.59 5.62 6.18.6-4.67 4.21 1.34 6.07L10 14.9l-5.44 3.1 1.34-6.07-4.67-4.21 6.18-.6L10 1.5z" />
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-xs tracking-widest2 text-gold uppercase font-body mb-3">Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream">What they say</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-cream/30 text-xs font-body tracking-widest uppercase">
            Scroll
          </div>
        </motion.div>
      </div>

      <div className="flex gap-6 px-6 lg:px-12 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}>
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="flex-none w-80 bg-black p-8 snap-start border border-gold/10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="flex gap-0.5 mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} />
              ))}
            </div>
            <p className="font-display text-cream text-lg italic leading-relaxed mb-8">
              "{r.text}"
            </p>
            <div className="gold-line w-10 mb-5" />
            <div>
              <div className="font-body text-sm font-medium text-cream">{r.name}</div>
              <div className="font-body text-xs text-cream/40 tracking-widest uppercase mt-0.5">{r.city}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
