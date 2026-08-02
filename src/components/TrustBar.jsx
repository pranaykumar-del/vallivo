const ITEMS = [
  {
    label: 'Free shipping above Rs.999',
    icon: (
      <path d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    ),
  },
  {
    label: 'Cash on delivery',
    icon: (
      <path d="M3 6h18v12H3V6Zm9 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 9v.01M19 15v.01" />
    ),
  },
  {
    label: '100% natural botanicals',
    icon: (
      <path d="M12 21c-4-3-7-6.5-7-10.5A5 5 0 0 1 12 6a5 5 0 0 1 7 4.5c0 4-3 7.5-7 10.5Z" />
    ),
  },
  {
    label: 'Secure checkout',
    icon: (
      <path d="M6 10V8a6 6 0 1 1 12 0v2m-13 0h14v10H5V10Z" />
    ),
  },
]

export default function TrustBar({ className = '' }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 ${className}`}>
      {ITEMS.map((item) => (
        <div key={item.label} className="flex flex-col items-center text-center gap-2.5">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {item.icon}
          </svg>
          <span className="text-[10px] tracking-wide text-cream/50 font-body leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
