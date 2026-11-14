const { randomBytes } = require('node:crypto')
const { createCodOrder, checkTrackingStore, checkCodWrite } = require('./_tracking-store.cjs')

// Keep these server-side prices in sync with src/lib/products.js; never trust a client total.
const prices = { fennette: 345, serenette: 345, rosette: 345, nightfall: 345 }
const reply = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) })

exports.handler = async function handler(event) {
  if (event.httpMethod === 'GET' && event.queryStringParameters?.health === '1') {
    try { await checkTrackingStore(); return reply(200, { ready: true }) }
    catch (error) { return reply(503, { ready: false, code: /^FIREBASE_|^FIRESTORE_/.test(error.message) ? error.message : 'STORE_UNAVAILABLE' }) }
  }
  if (event.httpMethod === 'GET' && event.queryStringParameters?.health === 'write') {
    try { await checkCodWrite(); return reply(200, { writeReady: true }) }
    catch (error) { return reply(503, { writeReady: false, code: /^COD_|^FIREBASE_|^FIRESTORE_/.test(error.message) ? error.message : 'STORE_UNAVAILABLE' }) }
  }
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed.' })
  let input
  try { input = JSON.parse(event.body || '{}') } catch { return reply(400, { error: 'Invalid request.' }) }
  const customer = input.customer || {}
  const phone = String(customer.phone || '').replace(/\D/g, '').slice(-10)
  const name = String(customer.name || '').trim()
  const address = String(customer.address || '').trim()
  const pincode = String(customer.pincode || '').trim()
  const items = input.items
  if (name.length < 2 || name.length > 100 || phone.length !== 10 || address.length < 10 || address.length > 500 || !/^110\d{3}$/.test(pincode)) return reply(400, { error: 'COD is available only for Delhi delivery PIN codes. Check your name, phone, and address.' })
  if (!Array.isArray(items) || !items.length || items.length > 20 || items.some((item) => !Object.hasOwn(prices, item.slug) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20)) return reply(400, { error: 'Invalid cart items.' })
  const amount = items.reduce((sum, item) => sum + prices[item.slug] * item.quantity, 0)
  const orderId = `vallivo_cod_${Date.now()}_${randomBytes(4).toString('hex')}`
  try {
    await createCodOrder({ orderId, phone, name, address, pincode, items, amount })
    return reply(201, { orderId, amount, paymentMethod: 'COD' })
  } catch (error) {
    console.error('COD order save failed:', error.message)
    const configProblem = /^FIREBASE_/.test(error.message)
    return reply(503, { error: configProblem ? 'COD setup is incomplete. Please contact Vallivo support or choose online payment.' : 'COD ordering is temporarily unavailable. Please choose online payment.' })
  }
}
