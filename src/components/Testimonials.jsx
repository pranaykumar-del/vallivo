import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ReviewForm } from '../pages/ReviewsPage'

const ease = [0.22, 1, 0.36, 1]

const reviews = [
  { name: 'Aarav S.', city: 'Bangalore', rating: 5, text: 'Fennette feels clean and light. Beautifully packed — an easy everyday upgrade.' },
  { name: 'Priya M.', city: 'Mumbai', rating: 5, text: 'The packaging feels like a luxury gift. Serenette is soft, calm, and easy to drink daily.' },
  { name: 'Rohan K.', city: 'Delhi', rating: 5, text: 'Rosette and Nightfall are now permanent in my kitchen. Quiet luxury in a cup.' },
  { name: 'Sneha T.', city: 'Pune', rating: 4, text: 'Premium without feeling complicated. The canisters look stunning on the shelf.' },
]

function Stars({ value }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-sm ${star <= value ? 'text-gold' : 'text-forest/15'}`}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="reviews" className="py-24 bg-[#F7F9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
        >
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-fennette font-body mb-3 font-medium">Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl text-forest font-semibold">What they say</h2>
          </div>
          <button
            type="button"
            onClick={() => setFormOpen((open) => !open)}
            className="self-start sm:self-auto px-7 py-3 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body hover:bg-forest-soft transition-colors"
          >
            {formOpen ? 'Close form' : 'Write a review'}
          </button>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {formOpen && (
          <motion.div
            className="max-w-3xl mx-auto px-6 lg:px-0 mb-14"
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
          >
            <ReviewForm onClose={() => setFormOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!formOpen && (
        <div className="flex gap-5 px-6 lg:px-12 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              className="flex-none w-72 md:w-80 bg-white border border-[#D8E6D4] px-7 py-8"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Stars value={r.rating} />
              <p className="font-display text-lg italic text-forest leading-relaxed mb-6">“{r.text}”</p>
              <div className="gold-line w-8 mb-4" />
              <div className="font-body text-sm text-forest font-medium">{r.name}</div>
              <div className="font-body text-[10px] tracking-[0.18em] uppercase text-forest/55 mt-0.5">{r.city}</div>
            </motion.div>
          ))}
        </div>
      )}

      {!formOpen && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase font-body text-forest/55 hover:text-forest transition-colors"
          >
            Read all reviews <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  )
}
