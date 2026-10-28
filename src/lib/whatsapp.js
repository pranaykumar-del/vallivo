import { calcPrice, UNIT_GRAMS } from './products'

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '916304207706'

export function buildOrderMessage(items, totalPrice, customer = {}) {
  if (!items.length) {
    return "Hi! I'd like to know more about Vallivo teas. Please share details."
  }

  const lines = items.map(
    (item) =>
      `• ${item.name} — ${item.quantity * UNIT_GRAMS}g (Rs.${calcPrice(item.pricePer100, item.quantity)})`
  )

  const details = [
    customer.name && `Name: ${customer.name}`,
    customer.phone && `Phone: ${customer.phone}`,
    customer.address && `Address: ${customer.address}`,
  ].filter(Boolean)

  return [
    'Hi Vallivo! I would like to place an order:',
    '',
    ...lines,
    '',
    `Total: Rs.${totalPrice}`,
    details.length ? '' : null,
    ...details,
    '',
    'Please confirm availability and delivery.',
  ]
    .filter((line) => line !== null)
    .join('\n')
}

export function whatsappOrderUrl(items, totalPrice, customer) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildOrderMessage(items, totalPrice, customer)
  )}`
}
