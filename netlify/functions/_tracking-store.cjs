const { createSign } = require('node:crypto')

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url')
}

async function accessToken() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('Order tracking is not configured.')
  const account = JSON.parse(raw)
  if (!account.project_id || !account.client_email || !account.private_key) throw new Error('Invalid Firebase service account.')
  const now = Math.floor(Date.now() / 1000)
  const claim = encode({ iss: account.client_email, scope: 'https://www.googleapis.com/auth/datastore', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })
  const unsigned = `${encode({ alg: 'RS256', typ: 'JWT' })}.${claim}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  const assertion = `${unsigned}.${signer.sign(account.private_key).toString('base64url')}`
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
  const data = await response.json()
  if (!response.ok || !data.access_token) throw new Error('Could not connect to order tracking.')
  return { projectId: account.project_id, token: data.access_token }
}

const allowedStatuses = new Set(['confirmed', 'packing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'])

async function getTracking(orderId, paid) {
  const { projectId, token } = await accessToken()
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/orderTracking/${encodeURIComponent(orderId)}`
  const headers = { Authorization: `Bearer ${token}` }
  let response = await fetch(url, { headers })
  if (response.status === 404 && paid) {
    response = await fetch(url, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { status: { stringValue: 'confirmed' }, updatedAt: { timestampValue: new Date().toISOString() } } }),
    })
  }
  if (response.status === 404) return null
  if (!response.ok) throw new Error('Could not load order tracking.')
  const document = await response.json()
  const status = document.fields?.status?.stringValue
  return {
    status: allowedStatuses.has(status) ? status : 'confirmed',
    updatedAt: document.fields?.updatedAt?.timestampValue || document.updateTime,
    carrier: document.fields?.carrier?.stringValue || '',
    trackingNumber: document.fields?.trackingNumber?.stringValue || '',
    trackingUrl: document.fields?.trackingUrl?.stringValue || '',
  }
}

module.exports = { getTracking }
