export const products = [
  {
    slug: 'glow-ritual',
    name: 'Glow Ritual Tea',
    sub: 'Glow & Confidence',
    tag: 'Bestseller',
    price: 'Rs.499',
    priceValue: 499,
    img: '/images/glow-ritual.png',
    desc: "Not for people chasing a fix. For people who've already decided they deserve to glow.",
    longDesc:
      'Rosette isn\'t for people chasing a fix. It\'s for people who\'ve already decided they deserve to glow — and brought that decision to their cup too.',
    ingredients: ['Rose', 'Hibiscus', 'Rosehip', 'White Tea', 'Strawberry'],
  },
  {
    slug: 'sleep-ritual',
    name: 'Sleep Ritual Tea',
    sub: 'Calm & Sleep',
    tag: 'Sleep',
    price: 'Rs.499',
    priceValue: 499,
    img: '/images/sleep-ritual.png',
    desc: "Not a fix for bad sleep. What people who've upgraded everything else finally bring to the end of their day.",
    longDesc:
      'Nightfall isn\'t a fix for bad sleep. It\'s what people who\'ve upgraded everything else finally bring to the end of their day too.',
    ingredients: ['Chamomile', 'Lavender', 'Passionflower', 'Spearmint', 'Lemongrass'],
  },
  {
    slug: 'gut-reset',
    name: 'Gut Reset Tea',
    sub: 'Reset & Lightness',
    tag: 'Daily',
    price: 'Rs.499',
    priceValue: 499,
    img: '/images/gut-reset.png',
    desc: "Not about correcting something broken. The upgrade that happens quietly, from the inside.",
    longDesc:
      'Fennette isn\'t about correcting something broken. It\'s about the upgrade that happens quietly, from the inside — for people who\'ve already leveled up everywhere else.',
    ingredients: ['Peppermint', 'Fennel', 'Ginger', 'Lemongrass', 'Licorice Root'],
  },
  {
    slug: 'mountain-vitality',
    name: 'Mountain Vitality Tea',
    sub: 'Energy & Immunity',
    tag: 'Signature Collection',
    price: 'Rs.499',
    priceValue: 499,
    img: '/images/mountain-vitality.png',
    desc: 'Sea buckthorn, apple, orange peel, rosehip, and cinnamon for an energising lift.',
    longDesc:
      'An invigorating blend inspired by high-altitude botanicals. Sea buckthorn delivers a vitamin-rich boost, apple and orange peel add bright sweetness, while rosehip and cinnamon bring warmth and immune support.',
    ingredients: ['Sea Buckthorn', 'Apple', 'Orange Peel', 'Rosehip', 'Cinnamon'],
  },
  {
    slug: 'focus-flow',
    name: 'Focus Flow Tea',
    sub: 'Clarity & Focus',
    tag: 'Focus',
    price: 'Rs.499',
    priceValue: 499,
    img: '/images/focus-flow.png',
    desc: "Not for people looking to calm down. For people who've already decided they move differently now.",
    longDesc:
      'Serenette isn\'t for people looking to calm down. It\'s for people who\'ve already decided they move differently now — steadier, sharper, unbothered.',
    ingredients: ['Sencha', 'Tulsi', 'Spearmint', 'Lemon Peel', 'Butterfly Pea Flower'],
  },
]

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug)
}

// All teas are priced per 100 pyramid bags; bags are sold in steps of BAG_STEP.
export const BAG_STEP = 25
export const DEFAULT_BAGS = 100

export function calcPrice(pricePer100, bags) {
  return Math.round((bags / 100) * pricePer100)
}
