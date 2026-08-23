import { motion } from 'framer-motion'
import MediaImage from './MediaImage'

const STATS = [
  { value: '3', label: 'Valleys We Source From' },
  { value: '0', label: 'Artificial Flavors' },
  { value: '5', label: 'Rituals For Every Hour' },
]

export default function Story() {
  return (
    <section id="story" className="py-32 bg-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-widest2 text-gold uppercase font-body mb-6">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream leading-[1.15] mb-8">
              You don't stay<br />
              <em className="text-gold not-italic">on the bike.</em>
            </h2>
            <div className="gold-line w-20 mb-8" />
            <p className="font-body text-cream/50 text-base leading-relaxed mb-6">
              Somewhere along the way, you upgraded. Better car. Better clothes.
              Better everything. It wasn't about fixing what was wrong — it was
              about choosing what fits who you've become.
            </p>
            <p className="font-body text-cream/50 text-base leading-relaxed mb-10">
              Vallivo is that same choice, in a cup. Not a remedy. Not a routine.
              Just the version of tea that matches the version of you now.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl md:text-4xl text-gold mb-1">{s.value}</div>
                  <div className="text-[10px] tracking-wide text-cream/40 font-body leading-tight uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            <a href="/#product"
              className="inline-flex items-center gap-3 text-xs tracking-widest text-gold uppercase font-body border-b border-gold/40 pb-1 hover:border-gold transition-colors">
              Begin Your Ritual -&gt;
            </a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="aspect-[3/4] overflow-hidden relative bg-black">
              <MediaImage
                src="/images/vallivo-collection.png"
                alt="Vallivo wellness tea collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-display text-xl text-white italic">"Rituals are not routines."</p>
                <div className="gold-line w-12 mt-4" />
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-gold/60" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-gold/60" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
