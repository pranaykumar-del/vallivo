import { motion } from 'framer-motion'

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
              Vallivo is not just tea.<br />
              <em className="text-gold not-italic">It is a daily ritual.</em>
            </h2>
            <div className="gold-line w-20 mb-8" />
            <p className="font-body text-cream/50 text-base leading-relaxed mb-6">
              Vallivo blends functional botanicals with a premium tea ritual:
              elegant boxes, individually wrapped pyramid bags, and ingredients
              selected for the way each day actually feels.
            </p>
            <p className="font-body text-cream/50 text-base leading-relaxed mb-10">
              From Focus Flow to Glow Ritual, every blend is made to return you
              to yourself without making wellness feel clinical.
            </p>
            <a href="#order"
              className="inline-flex items-center gap-3 text-xs tracking-widest text-gold uppercase font-body border-b border-gold/40 pb-1 hover:border-gold transition-colors">
              Begin Your Ritual ->
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
              <img
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
