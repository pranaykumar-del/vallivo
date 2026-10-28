import { useState } from 'react'

export default function MediaImage({ src, alt, className = '', imgClassName = '', style, priority = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-cream-dark ${className}`}>
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-gold/40" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" strokeLinejoin="round" />
          <path d="M9 8a3 3 0 1 1 6 0" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${imgClassName}`}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  )
}
