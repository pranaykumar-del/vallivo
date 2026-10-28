export const products = [
  {
    slug: 'fennette',
    name: 'Fennette',
    sub: 'Fresh · Light · Balanced',
    tag: 'Everyday',
    theme: 'fennette',
    accent: '#2E6B3A',
    soft: '#E4F0E4',
    price: 'Rs.345',
    priceValue: 345,
    unitLabel: '50g',
    img: '/images/fennette.jpg',
    angleImg: '/images/fennette-angle-v2.png',
    pourImg: '/images/fennette-pour.png',
    desc: 'Clean, light, and quietly clarifying — an everyday upgrade for your cup.',
    longDesc:
      'Fennette is the everyday lift — fresh fennel and spearmint meeting Assam tea, tulsi, and butterfly pea. Light enough for any moment, balanced enough to become your default cup.',
    ingredients: [
      'Assam Tea',
      'Fennel Seeds',
      'Spearmint',
      'Tulsi',
      'Lemon Peel',
      'Rosemary',
      'Butterfly Pea',
    ],
    badges: ['100% Natural', 'No Artificial Flavours', 'Plant Based'],
  },
  {
    slug: 'serenette',
    name: 'Serenette',
    sub: 'Calm · Relax · Rejuvenate',
    tag: 'Focus',
    theme: 'serenette',
    accent: '#6B5B9A',
    soft: '#EDE8F6',
    price: 'Rs.345',
    priceValue: 345,
    unitLabel: '50g',
    img: '/images/serenette.jpg',
    angleImg: '/images/serenette-angle-v2.png',
    pourImg: '/images/serenette-pour.png',
    desc: 'Soft lavender and butterfly pea for a calmer, clearer pause.',
    longDesc:
      'Serenette is calm without heaviness — lemongrass, ashwagandha, lavender, and butterfly pea. A cup for clear minds and softer edges.',
    ingredients: [
      'Lemongrass',
      'Spearmint',
      'Tulsi',
      'Lemon Peel',
      'Ashwagandha',
      'Butterfly Pea',
      'Lavender',
    ],
    badges: ['100% Natural', 'No Artificial Flavours', 'Plant Based'],
  },
  {
    slug: 'rosette',
    name: 'Rosette',
    sub: 'Uplift · Soften · Indulge',
    tag: 'Bestseller',
    theme: 'rosette',
    accent: '#A33D5C',
    soft: '#F8E6EC',
    price: 'Rs.345',
    priceValue: 345,
    unitLabel: '50g',
    img: '/images/rosette.jpg',
    angleImg: '/images/rosette-angle.png',
    pourImg: '/images/rosette-pour.png',
    desc: 'Rose and hibiscus — floral, bright, and made to be savoured.',
    longDesc:
      'Rosette is the indulgent bloom — hibiscus, rose, amla, and Assam green tea with apple and lavender. Soften the day. Uplift the mood. Sip something beautiful.',
    ingredients: [
      'Hibiscus',
      'Rose',
      'Amla',
      'Assam Green Tea',
      'Apple',
      'Lavender',
    ],
    badges: ['100% Natural', 'No Artificial Flavours', 'Plant Based'],
  },
  {
    slug: 'nightfall',
    name: 'Nightfall',
    sub: 'Unwind · Soothe · Rest',
    tag: 'Signature',
    theme: 'nightfall',
    accent: '#2A3F6E',
    soft: '#E6EAF4',
    price: 'Rs.345',
    priceValue: 345,
    unitLabel: '50g',
    img: '/images/nightfall.jpg',
    angleImg: '/images/nightfall-angle.png',
    pourImg: '/images/nightfall-pour.png',
    desc: 'Lavender and soft botanicals for a quieter, slower close.',
    longDesc:
      'Nightfall is a softer landing — lemongrass, tulsi, ashwagandha, and lavender. Unwind gently. Soothe the edges. Rest well.',
    ingredients: [
      'Lemongrass',
      'Spearmint',
      'Tulsi',
      'Ashwagandha',
      'Lavender',
    ],
    badges: ['100% Natural', 'No Artificial Flavours', 'Plant Based'],
  },
]

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug)
}

/** Quantity is packs of 50g. Price is per 50g pack. */
export const UNIT_STEP = 1
export const DEFAULT_QTY = 1
export const UNIT_GRAMS = 50

/** @deprecated use UNIT_STEP */
export const BAG_STEP = UNIT_STEP
/** @deprecated use DEFAULT_QTY */
export const DEFAULT_BAGS = DEFAULT_QTY

export function calcPrice(pricePerPack, packs) {
  return Math.round(packs * pricePerPack)
}
