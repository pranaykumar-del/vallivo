export const products = [
  {
    slug: 'fennette',
    name: 'Fennette',
    sub: 'Fresh · Light · Balanced',
    tag: 'Everyday',
    theme: 'fennette',
    accent: '#2E6B3A',
    soft: '#E4F0E4',
    price: 'Rs.300',
    priceValue: 300,
    unitLabel: '50g',
    cups: 50,
    img: '/images/fennette-front.jpg',
    gallery: ['/images/fennette-front.jpg', '/images/fennette-label-back.jpg'],
    desc: 'A refreshing herbal infusion with peppermint, fennel, ginger, lemongrass, licorice, and coriander.',
    longDesc:
      'Fennette is a refreshing herbal infusion crafted with peppermint leaves, fennel seeds, ginger root, lemongrass, licorice root, and coriander seeds. Naturally soothing and light, it is an easy everyday cup when you want to feel balanced and refreshed. Each 50g tin is about 50 cups.',
    ingredients: [
      'Peppermint Leaves',
      'Fennel Seeds',
      'Ginger Root',
      'Lemongrass',
      'Licorice Root',
      'Coriander Seeds',
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
    price: 'Rs.300',
    priceValue: 300,
    unitLabel: '50g',
    cups: 50,
    img: '/images/serenette-front.jpg',
    gallery: ['/images/serenette-front.jpg?v=4', '/images/serenette-label-back-v2.jpg?v=4'],
    desc: 'A calming blend of green tea with spearmint, tulsi, lemon peel, rosemary, and butterfly pea.',
    longDesc:
      'Serenette is a calming blend of Assam superfine green tea with spearmint, tulsi, lemon peel, rosemary, and butterfly pea. Soft herbal notes and a clean finish make it an easy cup to return to when you want calm, relax, and rejuvenate. Each 50g tin is about 50 cups.',
    ingredients: [
      'Assam Superfine Green Tea',
      'Spearmint',
      'Tulsi',
      'Lemon Peel',
      'Rosemary',
      'Butterfly Pea',
    ],
    badges: ['No Added Sugar', 'No Preservatives', 'Plant Based'],
  },
  {
    slug: 'rosette',
    name: 'Rosette',
    sub: 'Radiance from Nature',
    tag: 'Bestseller',
    theme: 'rosette',
    accent: '#A33D5C',
    soft: '#F8E6EC',
    price: 'Rs.300',
    priceValue: 300,
    unitLabel: '50g',
    cups: 50,
    img: '/images/rosette-front.jpg',
    gallery: ['/images/rosette-front.jpg', '/images/rosette-label-back.jpg'],
    desc: 'A floral-fruit infusion with hibiscus, rose, amla, Assam green tea, apple, and lavender.',
    longDesc:
      'Rosette is a floral-fruit infusion crafted with hibiscus, rose, amla, Assam green tea, apple, and lavender. Naturally vibrant and refreshing, it is a rejuvenating cup for moments that ask for colour and ease. Each 50g tin is about 50 cups.',
    ingredients: [
      'Hibiscus',
      'Rose',
      'Amla',
      'Assam Green Tea',
      'Apple',
      'Lavender',
    ],
    badges: ['100% Natural', 'No Preservatives', 'Plant Based'],
  },
  {
    slug: 'nightfall',
    name: 'Nightfall',
    sub: 'Unwind · Soothe · Rest',
    tag: 'Signature',
    theme: 'nightfall',
    accent: '#2A3F6E',
    soft: '#E6EAF4',
    price: 'Rs.300',
    priceValue: 300,
    unitLabel: '50g',
    cups: 50,
    img: '/images/nightfall-front.jpg',
    gallery: ['/images/nightfall-front.jpg', '/images/nightfall-label-back.jpg'],
    desc: 'A gentle evening blend of chamomile, lemongrass, spearmint, lemon balm, ashwagandha, and lavender.',
    longDesc:
      'Nightfall brings together chamomile, lemongrass, spearmint, lemon balm, ashwagandha, and lavender into a soft herbal cup for the quieter end of the day. Unwind, soothe, and rest with a blend made for slower evenings. Each 50g tin is about 50 cups.',
    ingredients: [
      'Chamomile',
      'Lemongrass',
      'Spearmint',
      'Lemon Balm',
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
