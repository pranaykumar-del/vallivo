import { motion } from 'framer-motion'
import MediaImage from './MediaImage'

const ease = [0.22, 1, 0.36, 1]

const steps = [
  {
    n: '01',
    title: 'Add the leaves',
    desc: 'Spoon loose Serenette leaves into a clean glass pot or infuser.',
    img: '/images/brew-step-1.jpg',
  },
  {
    n: '02',
    title: 'Steep gently',
    desc: 'Pour hot water at about 90°C. Steep 3–4 minutes until the liquor turns soft violet.',
    img: '/images/brew-step-2.jpg',
  },
  {
    n: '03',
    title: 'Sip & settle',
    desc: 'Pour into your cup, breathe in, and sip slowly. Calm, clear, unhurried.',
    img: '/images/brew-step-3.jpg',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-[#F7F9F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-serenette font-body mb-4 font-medium">The Ritual</p>
          <h2 className="font-display text-4xl md:text-5xl text-forest font-semibold mb-3">How to make it</h2>
          <p className="font-body text-sm md:text-[15px] text-forest/70 max-w-md mx-auto">
            Three simple steps with loose leaf.
          </p>
          <div className="gold-line w-14 mx-auto mt-7" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3, ease }}
            >
              <div className="aspect-[4/3] overflow-hidden mb-5 bg-cream-dark">
                <MediaImage
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-serenette mb-2 font-medium">{s.n}</p>
              <h3 className="font-display text-2xl text-forest font-semibold mb-2">{s.title}</h3>
              <p className="font-body text-sm text-forest/75 leading-relaxed">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
