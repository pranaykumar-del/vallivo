import { motion } from 'framer-motion'
import MediaImage from './MediaImage'

const ease = [0.22, 1, 0.36, 1]

export default function Story() {
  return (
    <section id="story" className="py-14 md:py-20 bg-cream-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="text-[11px] tracking-[0.32em] uppercase text-gold-dark font-body mb-3 font-medium">Our Story</p>
            <h2 className="font-display text-3xl md:text-5xl text-forest font-semibold leading-[1.1] mb-4">
              Elevate your<br />everyday.
            </h2>
            <motion.div
              className="gold-line w-14 mb-5 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
            />
            <p className="font-body text-forest/85 text-[15px] leading-[1.75] mb-4">
              Vallivo is lifestyle tea — considered, botanical, and made for the quiet upgrades that shape your day.
            </p>
            <p className="font-body text-forest/75 text-[15px] leading-[1.75] mb-7">
              Not a loud wellness promise. Just four blends in clean cream canisters, for people who want their cup to feel as intentional as everything else.
            </p>
            <motion.a
              href="/#product"
              className="inline-flex text-[11px] tracking-[0.22em] uppercase font-body text-forest font-medium border-b border-gold pb-1"
              whileHover={{ borderColor: '#C9A24A', x: 4 }}
            >
              Begin with a blend →
            </motion.a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
          >
            <motion.div
              className="aspect-[5/4] overflow-hidden rounded-2xl bg-cream"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
            >
              <MediaImage
                src="/images/valleys-bg.jpg"
                alt="Soft landscape"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-3 left-3 md:left-5 bg-white border border-forest/15 rounded-xl px-5 py-3.5 max-w-[230px] shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="font-body text-[0.95rem] sm:text-[1.05rem] text-forest font-semibold leading-snug tracking-tight antialiased">
                “Rituals are not routines.”
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
