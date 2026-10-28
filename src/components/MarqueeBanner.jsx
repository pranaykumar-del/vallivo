const items = [
  'Fennette', '·', 'Serenette', '·', 'Rosette', '·', 'Nightfall', '·',
  '100% Natural', '·', 'Plant Based', '·', 'No Artificial Flavours', '·',
  'Elevate Your Everyday', '·',
]

export default function MarqueeBanner() {
  const repeated = [...items, ...items]
  return (
    <div className="bg-forest py-3 overflow-hidden">
      <div className="marquee-track flex items-center">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap px-4 font-body text-[11px] tracking-[0.2em] uppercase font-medium ${
              item === '·' ? 'text-gold' : 'text-white'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
