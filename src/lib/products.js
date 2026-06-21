export const products = [
  {
    slug: 'glow-ritual',
    name: 'Glow Ritual Tea',
    sub: 'Glow & Confidence',
    tag: 'Bestseller',
    price: 'Rs.499',
    priceValue: 499,
    img: '/images/glow-ritual.png',
    desc: 'Rose, hibiscus, rosehip, white tea, and strawberry for a floral evening ritual.',
    longDesc:
      'A floral evening blend designed to help skin and spirit unwind together. Rose and hibiscus bring antioxidants, rosehip adds a gentle vitamin C lift, and white tea rounds it out with a soft, sweet finish.',
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
    desc: 'Chamomile, lavender, passionflower, spearmint, and lemongrass for a calm night ritual.',
    longDesc:
      'A caffeine-free nightcap blend to ease the body into rest. Chamomile and lavender calm the mind, passionflower supports deeper sleep, and spearmint with lemongrass keeps every sip light and soothing.',
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
    desc: 'Peppermint, fennel, ginger, lemongrass, and licorice root for inner balance.',
    longDesc:
      'A daily digestive reset blend that brings lightness after meals. Peppermint and fennel ease bloating, ginger adds warmth, and licorice root rounds the cup with a naturally sweet finish.',
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
    desc: 'Sencha, tulsi, spearmint, lemon peel, and butterfly pea flower for clean focus.',
    longDesc:
      'A clean-energy morning blend for clear, sustained focus. Sencha offers gentle caffeine, tulsi supports calm alertness, and lemon peel with butterfly pea flower gives the cup a bright, vivid character.',
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
