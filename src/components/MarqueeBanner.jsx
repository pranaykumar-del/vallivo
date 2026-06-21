const items = [
  'Glow Ritual', '/', 'Sleep Ritual', '/', 'Gut Reset', '/',
  'Mountain Vitality', '/', 'Focus Flow', '/', '100 Pyramid Tea Bags', '/',
  'Functional Botanicals', '/', 'No Artificial Flavors', '/',
]

export default function MarqueeBanner() {
  const repeated = [...items, ...items]

  return (
    <div className="bg-black py-4 overflow-hidden border-y border-gold/20">
      <div className="marquee-track flex items-center">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap px-6 font-body text-xs tracking-widest uppercase ${
              item === '/' ? 'text-gold/40' : 'text-gold/80'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
