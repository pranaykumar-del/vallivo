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
    desc: 'Fresh fennel and spearmint meet Assam tea and tulsi. A light, balanced cup for a familiar daily ritual.',
    longDesc:
      'Fennette starts with the familiar warmth of Assam tea, then opens into fennel, spearmint, tulsi, lemon peel, rosemary, and butterfly pea. The result is a fresh, layered cup with a gentle herbal finish. Brew it when you want something easy to return to, whether you are beginning the day or taking a pause between plans.',
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
    desc: 'Lavender, lemongrass, and butterfly pea make a soft floral cup with a bright citrus edge.',
    longDesc:
      'Serenette brings together lemongrass, spearmint, tulsi, lemon peel, ashwagandha, butterfly pea, and lavender. Citrus and mint brighten the first sip while the florals give the blend its gentle finish. Make it part of a slower afternoon, or take a few minutes with it whenever the day feels full.',
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
    desc: 'Hibiscus and rose lead this vivid blend, with apple and amla adding a lively, tart note.',
    longDesc:
      'Rosette is a colourful meeting of hibiscus, rose, amla, Assam green tea, apple, and lavender. Floral aroma meets a lively tartness, making it a distinctive cup to share with a friend or keep for your own afternoon break. Enjoy it hot and take a moment to notice how the ingredients unfold as it steeps.',
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
    desc: 'A gentle blend of lavender, tulsi, and lemongrass for the quieter moments of the day.',
    longDesc:
      'Nightfall layers lemongrass, spearmint, tulsi, ashwagandha, and lavender into a soft herbal cup. Its floral notes and fresh finish make it an inviting choice when the pace of the day begins to ease. Brew a pot, put your phone aside for a few minutes, and let the evening have its own rhythm.',
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
