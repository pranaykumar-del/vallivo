const VALUES = [
  {
    label: 'Plant Based',
    icon: (
      <path d="M12 21c-4-3-7-6.5-7-10.5A5 5 0 0 1 12 6a5 5 0 0 1 7 4.5c0 4-3 7.5-7 10.5Z" />
    ),
  },
  {
    label: 'Thoughtfully Blended',
    icon: (
      <>
        <path d="M8 4h8v2a4 4 0 0 1-4 4 4 4 0 1-4-4V4Z" />
        <path d="M12 10v7" />
        <path d="M8 21h8" />
      </>
    ),
  },
  {
    label: 'Naturally Sourced',
    icon: (
      <>
        <path d="M12 20c0-6 4-9 8-10-1 5-4 8-8 10Z" />
        <path d="M12 20c0-6-4-9-8-10 1 5 4 8 8 10Z" />
        <path d="M12 20V9" />
      </>
    ),
  },
  {
    label: 'Sustainably Crafted',
    icon: (
      <>
        <path d="M4 12a8 8 0 0 1 13-6.2" />
        <path d="M20 12a8 8 0 0 1-13 6.2" />
        <path d="M17 3v4h-4" />
        <path d="M7 21v-4h4" />
      </>
    ),
  },
]

export default function HomeValues() {
  return (
    <section className="bg-cream border-y border-forest/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ul className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-forest/10">
          {VALUES.map((item) => (
            <li key={item.label} className="flex flex-col items-center justify-center gap-3 py-7 px-4 text-center">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
              <span className="font-display text-sm sm:text-base text-forest tracking-wide">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
