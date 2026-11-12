import { load } from '@cashfreepayments/cashfree-js'

const mode = import.meta.env.VITE_CASHFREE_MODE === 'sandbox' ? 'sandbox' : 'production'

export async function createCashfreeOrder({ customer, items, total }) {
  const response = await fetch('/.netlify/functions/create-cashfree-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, items, total }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'Could not start payment.')
  }
  if (!data.paymentSessionId) {
    throw new Error('Cashfree did not return a payment session.')
  }
  return data
}

export async function openCashfreeCheckout(paymentSessionId) {
  const cashfree = await load({ mode })
  return cashfree.checkout({
    paymentSessionId,
    redirectTarget: '_self',
  })
}

export async function verifyCashfreeOrder(orderId) {
  const response = await fetch(
    `/.netlify/functions/verify-cashfree-order?order_id=${encodeURIComponent(orderId)}`
  )
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'Could not verify payment.')
  }
  return data
}
