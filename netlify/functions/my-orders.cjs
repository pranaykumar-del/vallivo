const { listOrders } = require('./_tracking-store.cjs')

exports.handler = async function handler(event) {
  const reply = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) })
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed.' })
  const auth = /^Bearer (.+)$/.exec(event.headers?.authorization || event.headers?.Authorization || '')
  if (!auth) return reply(401, { error: 'Please sign in.' })
  const apiKey = process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY
  if (!apiKey) return reply(503, { error: 'Login is not configured.' })
  try {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: auth[1] }) })
    if (!response.ok) return reply(401, { error: 'Please sign in again.' })
    const user = (await response.json()).users?.[0]
    const phone = String(user?.phoneNumber || '').replace(/\D/g, '').slice(-10)
    if (phone.length !== 10) return reply(403, { error: 'A verified phone number is required.' })
    return reply(200, { orders: await listOrders(phone) })
  } catch {
    return reply(503, { error: 'Could not load your orders right now.' })
  }
}
