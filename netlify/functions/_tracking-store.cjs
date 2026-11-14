const { createSign } = require('node:crypto')
let selectedDatabaseId

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url')
}

async function accessToken() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('FIREBASE_CONFIG_MISSING')
  let account
  try { account = JSON.parse(raw) } catch { throw new Error('FIREBASE_CONFIG_INVALID_JSON') }
  if (!account.project_id || !account.client_email || !account.private_key) throw new Error('FIREBASE_CONFIG_INCOMPLETE')
  const now = Math.floor(Date.now() / 1000)
  const claim = encode({ iss: account.client_email, scope: 'https://www.googleapis.com/auth/datastore', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })
  const unsigned = `${encode({ alg: 'RS256', typ: 'JWT' })}.${claim}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  let signature
  try { signature = signer.sign(account.private_key).toString('base64url') } catch { throw new Error('FIREBASE_PRIVATE_KEY_INVALID') }
  const assertion = `${unsigned}.${signature}`
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
  const data = await response.json()
  if (!response.ok || !data.access_token) throw new Error('FIREBASE_AUTH_FAILED')
  return { projectId: account.project_id, token: data.access_token, databaseId: await databaseId(account.project_id, data.access_token) }
}

async function databaseId(projectId, token) {
  if (selectedDatabaseId) return selectedDatabaseId
  const candidates = process.env.FIREBASE_DATABASE_ID ? [process.env.FIREBASE_DATABASE_ID] : ['default', '(default)']
  for (const candidate of candidates) {
    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(candidate)}`
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (response.ok) { selectedDatabaseId = candidate; return candidate }
    if (response.status !== 404) throw new Error(response.status === 403 ? 'FIRESTORE_ACCESS_DENIED' : 'FIRESTORE_UNAVAILABLE')
  }
  throw new Error('FIRESTORE_DATABASE_MISSING')
}

const allowedStatuses = new Set(['confirmed', 'packing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'])

async function getTracking(orderId, paid) {
  const { projectId, token, databaseId } = await accessToken()
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/orderTracking/${encodeURIComponent(orderId)}`
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

async function saveOrder(orderId, phone, amount) {
  const { projectId, token, databaseId } = await accessToken()
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/orderTracking/${encodeURIComponent(orderId)}`
  const response = await fetch(url, { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: { phone: { stringValue: phone }, amount: { doubleValue: amount }, status: { stringValue: 'pending_payment' }, createdAt: { timestampValue: new Date().toISOString() }, updatedAt: { timestampValue: new Date().toISOString() } } }) })
  if (!response.ok) throw new Error('Could not save order record.')
}

async function listOrders(phone) {
  const { projectId, token, databaseId } = await accessToken()
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents:runQuery`
  const response = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ structuredQuery: { from: [{ collectionId: 'orderTracking' }], where: { fieldFilter: { field: { fieldPath: 'phone' }, op: 'EQUAL', value: { stringValue: phone } } }, limit: 50 } }) })
  if (!response.ok) throw new Error('Could not load orders.')
  const rows = await response.json()
  return rows.filter((row) => row.document).map(({ document }) => ({ orderId: document.name.split('/').pop(), status: document.fields?.status?.stringValue || 'confirmed', amount: Number(document.fields?.amount?.doubleValue || 0), createdAt: document.fields?.createdAt?.timestampValue || document.createTime })).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}

module.exports.saveOrder = saveOrder
module.exports.listOrders = listOrders

async function createCodOrder({ orderId, phone, name, address, pincode, items, amount }) {
  const { projectId, token, databaseId } = await accessToken()
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/orderTracking/${encodeURIComponent(orderId)}`
  const now = new Date().toISOString()
  const response = await fetch(url, { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: {
    phone: { stringValue: phone }, name: { stringValue: name }, address: { stringValue: address }, pincode: { stringValue: pincode },
    items: { arrayValue: { values: items.map((item) => ({ mapValue: { fields: { slug: { stringValue: item.slug }, quantity: { integerValue: item.quantity } } } })) } },
    amount: { doubleValue: amount }, paymentMethod: { stringValue: 'COD' }, paymentStatus: { stringValue: 'DUE' },
    status: { stringValue: 'confirmed' }, createdAt: { timestampValue: now }, updatedAt: { timestampValue: now },
  } }) })
  if (!response.ok) throw new Error(`COD_STORE_${response.status}`)
}

async function getCodOrder(orderId, phone) {
  const { projectId, token, databaseId } = await accessToken()
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/orderTracking/${encodeURIComponent(orderId)}`
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (response.status === 404) return null
  if (!response.ok) throw new Error('Could not load order.')
  const document = await response.json()
  if (document.fields?.paymentMethod?.stringValue !== 'COD' || document.fields?.phone?.stringValue !== phone) return null
  return { paymentStatus: document.fields?.paymentStatus?.stringValue || 'DUE', tracking: await getTracking(orderId, true) }
}

module.exports.createCodOrder = createCodOrder
module.exports.getCodOrder = getCodOrder
