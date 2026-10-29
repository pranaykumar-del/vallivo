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
  { name: 'Meera L.', city: 'Hyderabad', rating: 5, text: 'Nightfall is my evening ritual now. Soft, floral, and the box feels like something you’d gift.' },
]

const PER_PAGE = 3

function Stars({ value }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-[13px] ${star <= value ? 'text-gold' : 'text-forest/15'}`}>★</span>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <article className="h-full bg-white border border-[#D8E6D4] rounded-2xl px-5 py-5 flex flex-col">
      <Stars value={review.rating} />
      <p className="font-display text-[1.02rem] italic text-forest leading-relaxed flex-1">
        “{review.text}”
      </p>
      <div className="gold-line w-8 mt-4 mb-3" />
      <div className="font-body text-sm text-forest font-medium">{review.name}</div>
      <div className="font-body text-[10px] tracking-[0.18em] uppercase text-forest/55 mt-0.5">
        {review.city}
      </div>
    </article>
  )
}

export default function Testimonials() {
  const [formOpen, setFormOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const pageCount = Math.ceil(reviews.length / PER_PAGE)

  const goTo = (next) => {
    const clamped = ((next % pageCount) + pageCount) % pageCount
    if (clamped === page) return
    setDirection(clamped > page ? 1 : -1)
    setPage(clamped)
  }

  const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section id="reviews" className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 mb-8">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-fennette font-body mb-2 font-medium">Reviews</p>
            <h2 className="font-display text-3xl md:text-5xl text-forest font-semibold">What they say</h2>
          </div>
          <button
            type="button"
            onClick={() => setFormOpen((open) => !open)}
            className="self-start sm:self-auto px-6 py-2.5 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body rounded-xl hover:bg-forest-soft transition-colors"
          >
            {formOpen ? 'Close form' : 'Write a review'}
          </button>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {formOpen && (
          <motion.div
            className="max-w-3xl mx-auto px-5 mb-10"
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <ReviewForm onClose={() => setFormOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!formOpen && (
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="relative flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              className="flex-none w-9 h-9 rounded-xl border border-forest/15 text-forest/50 hover:text-forest hover:border-forest/35 transition-colors flex items-center justify-center text-lg"
              aria-label="Previous reviews"
            >
              ‹
            </button>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0, x: direction >= 0 ? 36 : -36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -36 : 36 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {visible.map((review) => (
                    <ReviewCard key={review.name} review={review} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => goTo(page + 1)}
              className="flex-none w-9 h-9 rounded-xl border border-forest/15 text-forest/50 hover:text-forest hover:border-forest/35 transition-colors flex items-center justify-center text-lg"
              aria-label="Next reviews"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Review pages">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === page}
                aria-label={`Reviews page ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === page ? 'w-6 bg-forest' : 'w-1.5 bg-forest/20 hover:bg-forest/40'
                }`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase font-body text-forest/60 hover:text-forest transition-colors"
            >
              Read all reviews <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
