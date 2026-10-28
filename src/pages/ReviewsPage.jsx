import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../lib/products'
import { getReviews, submitReview } from '../lib/supabase'

const starterReviews = [
  {
    id: 'starter-1',
    name: 'Aarav S.',
    city: 'Bengaluru',
    product: 'Fennette',
    rating: 5,
    text: 'Smooth, fragrant and easy to make part of everyday. The fennel note is beautifully balanced.',
    date: '18 Oct 2026',
    verified: true,
    media: [{ type: 'image', url: '/images/fennette.jpg' }],
  },
  {
    id: 'starter-2',
    name: 'Priya M.',
    city: 'Mumbai',
    product: 'Serenette',
    rating: 5,
    text: 'Serenette is delicate without being bland. A quiet pause that feels considered and premium.',
    date: '12 Oct 2026',
    verified: true,
    media: [{ type: 'image', url: '/images/serenette.jpg' }],
  },
  {
    id: 'starter-3',
    name: 'Rohan K.',
    city: 'New Delhi',
    product: 'Nightfall',
    rating: 5,
    text: 'The aroma is wonderful. Even the canister feels considered — quiet luxury in a cup.',
    date: '04 Oct 2026',
    verified: true,
    media: [{ type: 'image', url: '/images/nightfall.jpg' }],
  },
  {
    id: 'starter-4',
    name: 'Sneha T.',
    city: 'Pune',
    product: 'Rosette',
    rating: 4,
    text: 'Lovely colour, fresh flavour and no fussy preparation. I would happily gift this.',
    date: '28 Sep 2026',
    verified: true,
    media: [],
  },
]

function Stars({ value, interactive = false, onChange }) {
  return (
    <div className="flex gap-1" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`text-xl leading-none ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${star <= value ? 'text-gold' : 'text-forest/15'}`}
          aria-label={interactive ? `Rate ${star} stars` : undefined}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  const [activeMedia, setActiveMedia] = useState(0)
  const item = review.media?.[activeMedia]

  return (
    <article className="bg-cream-soft border border-forest/10 overflow-hidden flex flex-col h-full">
      {item && (
        <div className="relative aspect-[16/10] bg-forest/5 overflow-hidden">
          {item.type === 'video' ? (
            <video src={item.url} controls preload="metadata" className="w-full h-full object-cover" aria-label={`Video review by ${review.name}`} />
          ) : (
            <img src={item.url} alt={`${review.product} shared by ${review.name}`} className="w-full h-full object-cover" />
          )}
          {review.media.length > 1 && (
            <div className="absolute right-3 bottom-3 flex gap-1.5">
              {review.media.map((media, index) => (
                <button
                  key={`${media.url}-${index}`}
                  type="button"
                  onClick={() => setActiveMedia(index)}
                  className={`w-2 h-2 rounded-full border border-cream ${index === activeMedia ? 'bg-cream' : 'bg-forest/40'}`}
                  aria-label={`Show media ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-4 mb-5">
          <Stars value={review.rating} />
          <span className="text-[9px] tracking-[0.16em] uppercase text-forest/35 font-body">{review.date || 'Recently'}</span>
        </div>
        <p className="font-body text-sm text-forest/60 leading-relaxed flex-1">“{review.text}”</p>
        <div className="border-t border-forest/10 mt-7 pt-5 flex justify-between items-end gap-4">
          <div>
            <div className="font-body text-sm text-forest">{review.name}</div>
            <div className="font-body text-[10px] uppercase tracking-[0.15em] text-forest/35 mt-1">{review.city}</div>
          </div>
          <div className="text-right">
            <div className="font-body text-[10px] uppercase tracking-[0.15em] text-gold">{review.product}</div>
            {review.verified && <div className="font-body text-[9px] text-forest/35 mt-1">✓ Verified purchase</div>}
          </div>
        </div>
      </div>
    </article>
  )
}

export function ReviewForm({ onClose }) {
  const inputRef = useRef(null)
  const [form, setForm] = useState({ name: '', city: '', product: products[0]?.name || '', rating: 5, text: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files])
  useEffect(() => () => previews.forEach((preview) => URL.revokeObjectURL(preview.url)), [previews])

  const chooseFiles = (event) => {
    setError('')
    const incoming = Array.from(event.target.files || [])
    const combined = [...files, ...incoming]
    const videos = combined.filter((file) => file.type.startsWith('video/'))
    const invalid = combined.find((file) => !file.type.startsWith('image/') && !file.type.startsWith('video/'))
    const oversized = combined.find((file) => file.size > (file.type.startsWith('video/') ? 50 : 10) * 1024 * 1024)

    if (invalid) return setError('Please choose image or video files only.')
    if (combined.length > 4 || videos.length > 1) return setError('Add up to 4 files, including a maximum of 1 video.')
    if (oversized) return setError('Images must be under 10 MB and video under 50 MB.')
    setFiles(combined)
    event.target.value = ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await submitReview({ ...form, files })
      setStatus('success')
    } catch (submitError) {
      console.error(submitError)
      setStatus('error')
      setError('We could not submit your review. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-cream-soft border border-gold/25 p-8 md:p-12 text-center">
        <div className="w-12 h-12 rounded-full border border-gold text-gold flex items-center justify-center mx-auto mb-6 text-xl">✓</div>
        <h2 className="font-display text-3xl text-forest mb-3">Thank you for sharing</h2>
        <p className="font-body text-sm text-forest/55 max-w-md mx-auto mb-7">Your review has been received and will appear here after a quick moderation check.</p>
        <button type="button" onClick={onClose} className="px-7 py-3 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body">Back to reviews</button>
      </div>
    )
  }

  const fieldClass = 'w-full bg-transparent border-b border-forest/20 py-3 text-sm font-body text-forest placeholder:text-forest/30 focus:outline-none focus:border-gold transition-colors'

  return (
    <form onSubmit={handleSubmit} className="bg-cream-soft border border-forest/10 p-6 md:p-10">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-body mb-2">Your experience</p>
          <h2 className="font-display text-3xl text-forest">Write a review</h2>
        </div>
        <button type="button" onClick={onClose} className="text-forest/40 hover:text-forest text-2xl" aria-label="Close review form">×</button>
      </div>

      <div className="mb-7">
        <label className="block text-[10px] tracking-[0.18em] uppercase text-forest/45 font-body mb-3">Your rating</label>
        <Stars value={form.rating} interactive onChange={(rating) => setForm({ ...form, rating })} />
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        <input className={fieldClass} required maxLength="60" placeholder="Your name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className={fieldClass} required maxLength="60" placeholder="City *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <select className={`${fieldClass} md:col-span-2`} required value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
          {products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}
        </select>
      </div>
      <textarea className={`${fieldClass} mt-5 min-h-28 resize-y`} required minLength="20" maxLength="700" placeholder="Share your experience *" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
      <div className="text-right text-[9px] font-body text-forest/30 mt-1">{form.text.length}/700</div>

      <div className="mt-7">
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime" multiple onChange={chooseFiles} className="sr-only" />
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full border border-dashed border-gold/45 bg-gold/5 p-6 text-center hover:bg-gold/10 transition-colors">
          <span className="block text-2xl text-gold mb-2">＋</span>
          <span className="block text-xs font-body text-forest">Add photos or a video</span>
          <span className="block text-[9px] tracking-wide font-body text-forest/35 mt-1">Up to 4 files · 10 MB per image · 50 MB video</span>
        </button>
        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {previews.map(({ file, url }, index) => (
              <div key={`${file.name}-${file.lastModified}`} className="relative aspect-square bg-forest/5 overflow-hidden">
                {file.type.startsWith('video/') ? <video src={url} className="w-full h-full object-cover" /> : <img src={url} alt="Upload preview" className="w-full h-full object-cover" />}
                <button type="button" onClick={() => setFiles(files.filter((_, i) => i !== index))} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-forest/80 text-cream text-sm" aria-label={`Remove ${file.name}`}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p role="alert" className="font-body text-xs text-red-700 mt-5">{error}</p>}
      <button disabled={status === 'loading'} type="submit" className="mt-7 px-8 py-3.5 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body hover:bg-forest-soft transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Uploading…' : 'Submit review'}
      </button>
      <p className="font-body text-[9px] text-forest/35 mt-3">Uploads are reviewed before they are published.</p>
    </form>
  )
}

const PAGE_SIZE = 6

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(starterReviews)
  const [filter, setFilter] = useState('All')
  const [formOpen, setFormOpen] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    let active = true
    getReviews()
      .then((remoteReviews) => {
        if (active && remoteReviews.length) setReviews([...remoteReviews, ...starterReviews])
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  useEffect(() => {
    setPage(0)
  }, [filter])

  const productNames = ['All', ...products.map((product) => product.name)]
  const visibleReviews = filter === 'All' ? reviews : reviews.filter((review) => review.product === filter)
  const pageCount = Math.max(1, Math.ceil(visibleReviews.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const pagedReviews = visibleReviews.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)
  const average = reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length

  return (
    <div className="bg-cream min-h-screen pt-24 pb-24">
      <section className="px-6 lg:px-12 py-16 md:py-24 cream-veil border-b border-forest/10">
        <motion.div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-10 items-end" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div>
            <p className="text-[10px] tracking-[0.32em] uppercase text-gold font-body mb-4">The Vallivo community</p>
            <h1 className="font-display text-5xl md:text-7xl text-forest leading-[0.95] mb-6">Rituals, shared.</h1>
            <p className="font-body text-sm md:text-base leading-relaxed text-forest/55 max-w-xl">Real notes, photographs and sips from people who have made Vallivo part of their everyday.</p>
          </div>
          <div className="flex items-center gap-5 lg:border-l lg:border-gold/25 lg:pl-10">
            <div className="font-display text-6xl text-forest">{average.toFixed(1)}</div>
            <div><Stars value={Math.round(average)} /><div className="text-[10px] tracking-[0.16em] uppercase text-forest/35 font-body mt-2">Based on {reviews.length} reviews</div></div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12">
        {formOpen ? (
          <div className="max-w-3xl mx-auto mb-16"><ReviewForm onClose={() => setFormOpen(false)} /></div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {productNames.map((name) => (
                <button key={name} type="button" onClick={() => setFilter(name)} className={`flex-none px-4 py-2 border text-[9px] tracking-[0.15em] uppercase font-body transition-colors ${filter === name ? 'bg-forest border-forest text-cream' : 'border-forest/15 text-forest/50 hover:border-gold'}`}>{name}</button>
              ))}
            </div>
            <button type="button" onClick={() => setFormOpen(true)} className="flex-none px-7 py-3 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body hover:bg-forest-soft transition-colors">Share your ritual</button>
          </div>
        )}

        {!formOpen && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pagedReviews.map((review, index) => (
                <motion.div key={review.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.05, 0.2) }}>
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>

            {visibleReviews.length > PAGE_SIZE && (
              <div className="flex items-center justify-center gap-3 mt-12">
                <button
                  type="button"
                  disabled={safePage === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="w-9 h-9 border border-forest/15 text-forest/50 hover:text-forest hover:border-forest/35 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Previous page"
                >
                  ‹
                </button>
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPage(index)}
                    className={`min-w-9 h-9 px-2 border text-[10px] tracking-[0.12em] uppercase font-body transition-colors ${
                      index === safePage
                        ? 'bg-forest border-forest text-cream'
                        : 'border-forest/15 text-forest/50 hover:border-forest/35'
                    }`}
                    aria-label={`Page ${index + 1}`}
                    aria-current={index === safePage ? 'page' : undefined}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={safePage >= pageCount - 1}
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                  className="w-9 h-9 border border-forest/15 text-forest/50 hover:text-forest hover:border-forest/35 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}

        {!formOpen && visibleReviews.length === 0 && (
          <div className="text-center py-20 border border-forest/10 bg-cream-soft">
            <h2 className="font-display text-3xl text-forest mb-3">Be the first to share</h2>
            <p className="font-body text-sm text-forest/45 mb-6">No reviews for this blend yet.</p>
            <button type="button" onClick={() => setFormOpen(true)} className="text-[10px] tracking-[0.2em] uppercase font-body text-gold">Write a review →</button>
          </div>
        )}

        <div className="mt-20 text-center">
          <div className="gold-line max-w-xs mx-auto mb-8" />
          <p className="font-display text-3xl text-forest mb-6">Find your own everyday ritual.</p>
          <Link to="/#product" className="inline-flex px-8 py-3.5 border border-forest text-forest text-[10px] tracking-[0.2em] uppercase font-body hover:bg-forest hover:text-cream transition-colors">Explore the collection</Link>
        </div>
      </section>
    </div>
  )
}
