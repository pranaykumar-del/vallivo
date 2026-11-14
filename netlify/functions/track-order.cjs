const { getTracking, getCodOrder } = require('./_tracking-store.cjs')

function reply(statusCode, body) {
  return { statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) }
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed.' })
  let input
  try { input = JSON.parse(event.body || '{}') } catch { return reply(400, { error: 'Invalid request.' }) }
  const orderId = String(input.orderId || '').trim()
  const phone = String(input.phone || '').replace(/\D/g, '').slice(-10)
  if (!/^vallivo_[a-zA-Z0-9_]{10,60}$/.test(orderId) || phone.length !== 10) return reply(400, { error: 'Enter a valid order ID and 10-digit phone number.' })

  if (orderId.startsWith('vallivo_cod_')) {
    try {
      const cod = await getCodOrder(orderId, phone)
      return cod ? reply(200, { orderId, ...cod }) : reply(404, { error: 'Order not found for that phone number.' })
    } catch { return reply(503, { error: 'Order lookup is temporarily unavailable.' }) }
  }

  const appId = process.env.CASHFREE_APP_ID
  const secret = process.env.CASHFREE_SECRET_KEY
  if (!appId || !secret) return reply(503, { error: 'Order lookup is unavailable.' })
  const host = process.env.CASHFREE_ENV === 'sandbox' ? 'https://sandbox.cashfree.com' : 'https://api.cashfree.com'
  try {
    const response = await fetch(`${host}/pg/orders/${encodeURIComponent(orderId)}`, {
      headers: { 'x-api-version': '2025-01-01', 'x-client-id': appId, 'x-client-secret': secret },
    })
    if (!response.ok) return reply(response.status === 404 ? 404 : 502, { error: response.status === 404 ? 'Order not found.' : 'Order lookup is temporarily unavailable.' })
    const order = await response.json()
    if (String(order.customer_details?.customer_phone || '').replace(/\D/g, '').slice(-10) !== phone) return reply(404, { error: 'Order not found for that phone number.' })
    const paid = order.order_status === 'PAID'
    const tracking = await getTracking(orderId, paid)
    return reply(200, { orderId, paymentMethod: 'PREPAID', paymentStatus: order.order_status, tracking: paid ? tracking : null })
  } catch (error) {
    return reply(503, { error: error.message === 'Order tracking is not configured.' ? error.message : 'Order lookup is temporarily unavailable.' })
  }
}
