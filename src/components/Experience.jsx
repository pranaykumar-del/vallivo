import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MediaImage from './MediaImage'

const moments = [
  {
    time: '07:00',
    title: 'Focus Flow',
    desc: 'Sencha, tulsi, spearmint, lemon peel, and butterfly pea flower for clear mornings.',
    img: '/images/focus-flow.png',
    icon: '01',
    slug: 'focus-flow',
  },
  {
    time: '13:00',
    title: 'Gut Reset',
    desc: 'Peppermint, fennel, ginger, lemongrass, and licorice root for a lighter reset.',
    img: '/images/gut-reset.png',
    icon: '02',
    slug: 'gut-reset',
  },
  {
    time: '19:00',
    title: 'Glow Ritual',
    desc: 'Rose, hibiscus, rosehip, white tea, and strawberry for a floral close to the day.',
    img: '/images/glow-ritual.png',
    icon: '03',
    slug: 'glow-ritual',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-widest2 text-gold/70 uppercase font-body mb-4">The Experience</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">Find Your Ritual</h2>
          <div className="gold-line w-20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {moments.map((m, i) => (
            <motion.div
              key={m.title}
              className="group relative overflow-hidden card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.65 }}
            >
              <div className="h-80 overflow-hidden relative">
                <MediaImage
                  src={m.img}
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute top-5 left-5 w-10 h-10 border border-gold/40 flex items-center justify-center">
                  <span className="text-gold text-[10px] tracking-widest">{m.icon}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] tracking-widest text-gold/70 uppercase font-body">{m.time}</span>
                  <h3 className="font-display text-2xl text-cream mt-1 mb-1">{m.title}</h3>
                  <p className="font-body text-sm text-cream/60 leading-relaxed">{m.desc}</p>
                </div>
              </div>

              <div className="bg-navy-dark px-6 py-4 flex items-center justify-between border-t border-gold/10">
                <div className="h-px bg-gold/30 flex-1 mr-4 transition-all duration-500 group-hover:bg-gold/60" />
                <Link to={`/product/${m.slug}`} className="text-[10px] tracking-widest text-gold uppercase font-body whitespace-nowrap">
                  Make it yours -&gt;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
