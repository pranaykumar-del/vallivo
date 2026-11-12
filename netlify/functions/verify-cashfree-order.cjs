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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
    body: JSON.stringify(body),
  }
}

function env(name, fallback) {
  const value = process.env[name]
  return value == null || value === '' ? fallback : value
}

exports.handler = async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' })

  const orderId = event.queryStringParameters && event.queryStringParameters.order_id
  if (!orderId) return json(400, { error: 'order_id is required.' })

  const appId = env('CASHFREE_APP_ID')
  const secretKey = env('CASHFREE_SECRET_KEY')
  const cashfreeEnv = String(env('CASHFREE_ENV', 'production')).toLowerCase()
  const host = CF_HOST[cashfreeEnv] || CF_HOST.production

  if (!appId || !secretKey) {
    return json(500, { error: 'Cashfree keys are not configured on the server.' })
  }

  try {
    const response = await fetch(host + '/pg/orders/' + encodeURIComponent(orderId), {
      method: 'GET',
      headers: {
        'x-api-version': '2025-01-01',
        'x-client-id': appId,
        'x-client-secret': secretKey,
      },
    })
    const data = await response.json().catch(function () {
      return {}
    })
    if (!response.ok) {
      return json(response.status, { error: data.message || 'Could not verify order.', details: data })
    }
    return json(200, {
      orderId: data.order_id,
      orderStatus: data.order_status,
      orderAmount: data.order_amount,
      orderCurrency: data.order_currency,
      paymentStatus: data.order_status,
    })
  } catch (error) {
    return json(500, { error: error.message || 'Verification failed.' })
  }
}
