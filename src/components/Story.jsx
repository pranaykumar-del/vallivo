import { motion } from 'framer-motion'
import MediaImage from './MediaImage'

const ease = [0.22, 1, 0.36, 1]

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-32 bg-cream-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
          >
            <p className="text-[11px] tracking-[0.32em] uppercase text-gold-dark font-body mb-5 font-medium">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-forest font-semibold leading-[1.1] mb-6">
              Elevate your<br />everyday.
            </h2>
            <motion.div
              className="gold-line w-14 mb-8 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.55 }}
            />
            <p className="font-body text-forest/80 text-[15px] leading-[1.85] mb-5">
              Vallivo is lifestyle tea — considered, botanical, and made for the quiet upgrades that shape your day.
            </p>
            <p className="font-body text-forest/75 text-[15px] leading-[1.85] mb-10">
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
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            <motion.div
              className="aspect-[5/4] overflow-hidden bg-cream"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.6 }}
            >
              <MediaImage
                src="/images/valleys-bg.jpg"
                alt="Soft landscape"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 left-4 md:left-6 bg-cream border border-gold/25 px-5 py-4 max-w-[210px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              <p className="font-display text-base italic text-forest leading-snug">
                “Rituals are not routines.”
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
