const CF_HOST = {
  production: 'https://api.cashfree.com',
  sandbox: 'https://sandbox.cashfree.com',
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
    body: JSON.stringify(body),
  }
}

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length >= 10) return digits.slice(-10)
  return digits
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  // Bracket access so esbuild does not inline empty secret values at build time.
  const appId = process.env['CASHFREE_APP_ID']
  const secretKey = process.env['CASHFREE_SECRET_KEY']
  const env = (process.env['CASHFREE_ENV'] || 'production').toLowerCase()
  const host = CF_HOST[env] || CF_HOST.production
  const siteUrl = process.env['URL'] || process.env['DEPLOY_PRIME_URL'] || 'https://www.vallivo.com'

  if (!appId || !secretKey) {
    return json(500, { error: 'Cashfree keys are not configured on the server.' })
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid JSON body.' })
  }

  const { customer = {}, items = [], total } = payload
  const amount = Number(total)
  const phone = normalizePhone(customer.phone)

  if (!customer.name || !phone || phone.length !== 10 || !items.length || !Number.isFinite(amount) || amount <= 0) {
    return json(400, { error: 'Name, 10-digit phone, cart items, and total are required.' })
  }

  const orderId = `vallivo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const orderPayload = {
    order_id: orderId,
    order_amount: Math.round(amount * 100) / 100,
    order_currency: 'INR',
    customer_details: {
      customer_id: `cust_${phone}`,
      customer_name: String(customer.name).trim().slice(0, 100),
      customer_phone: phone,
      customer_email: customer.email ? String(customer.email).trim() : `${phone}@vallivo.customer`,
    },
    order_meta: {
      return_url: `${siteUrl.replace(/\/$/, '')}/payment/status?order_id={order_id}`,
    },
    order_note: items
      .map((item) => `${item.name} x${item.quantity}`)
      .join(', ')
      .slice(0, 200),
  }

  try {
    const response = await fetch(`${host}/pg/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2025-01-01',
        'x-client-id': appId,
        'x-client-secret': secretKey,
      },
      body: JSON.stringify(orderPayload),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return json(response.status, {
        error: data.message || data.error || 'Could not create Cashfree order.',
        details: data,
      })
    }

    return json(200, {
      orderId: data.order_id || orderId,
      paymentSessionId: data.payment_session_id,
      orderAmount: data.order_amount,
      orderStatus: data.order_status,
    })
  } catch (error) {
    return json(500, { error: error.message || 'Cashfree request failed.' })
  }
}
