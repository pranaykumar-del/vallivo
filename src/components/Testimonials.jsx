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
  const [page, setPage] = useState(0)
  const total = reviews.length
  const review = reviews[page]

  const go = (next) => setPage((current) => (current + next + total) % total)

  return (
    <section id="reviews" className="py-24 bg-cream overflow-hidden">
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
        <div className="max-w-md mx-auto px-6">
          <div className="relative flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex-none w-9 h-9 border border-forest/15 text-forest/50 hover:text-forest hover:border-forest/35 transition-colors font-body text-lg leading-none"
              aria-label="Previous review"
            >
              ‹
            </button>

            <div className="relative flex-1 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={review.name}
                  className="absolute inset-0 bg-cream-soft border border-forest/10 px-6 py-7 flex flex-col"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <Stars value={review.rating} />
                  <p className="font-display text-base sm:text-lg italic text-forest leading-relaxed flex-1">
                    “{review.text}”
                  </p>
                  <div className="gold-line w-8 mb-4 mt-5" />
                  <div className="font-body text-sm text-forest font-medium">{review.name}</div>
                  <div className="font-body text-[10px] tracking-[0.18em] uppercase text-forest/55 mt-0.5">
                    {review.city}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex-none w-9 h-9 border border-forest/15 text-forest/50 hover:text-forest hover:border-forest/35 transition-colors font-body text-lg leading-none"
              aria-label="Next review"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mt-7" role="tablist" aria-label="Review pages">
            {reviews.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === page}
                aria-label={`Review ${index + 1} of ${total}`}
                onClick={() => setPage(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === page ? 'w-6 bg-forest' : 'w-1.5 bg-forest/20 hover:bg-forest/40'
                }`}
              />
            ))}
          </div>
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
