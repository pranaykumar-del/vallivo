# Order tracking setup

The customer page is `/track`. Customers enter the Cashfree order ID and the phone number used at checkout. The server checks both against Cashfree before showing fulfillment status. The page checks for changes every 30 seconds.

The `/account` page provides mobile number plus SMS code login. Enable **Phone** under Firebase Authentication → Sign-in method, and add `vallivo.com`, `www.vallivo.com`, and `vallivo.netlify.app` to Authentication → Authorized domains. Firebase phone login uses reCAPTCHA and sends SMS; review Firebase's current SMS pricing and quotas before production use. A signed-in customer can see new orders for the verified checkout number. Orders placed before this feature may still need an order ID for tracking.

Set `FIREBASE_SERVICE_ACCOUNT_JSON` in the Netlify site's environment variables to the complete JSON for a Firebase service account with Firestore read/write access to the same project as the storefront. Keep this value server-side; do not prefix it with `VITE_` or commit it. The service account's `project_id` selects the Firestore project. The server also needs `VITE_FIREBASE_API_KEY` or `FIREBASE_API_KEY` to validate signed-in Firebase users.

Enable Firestore in that Firebase project and deploy `firestore.rules`. The `orderTracking` collection is intentionally closed to browser clients. A new Cashfree order gets an `orderTracking/{cashfreeOrderId}` document containing its checkout phone and total. If Firebase is unavailable, checkout still proceeds but that order will not appear in the account until it is added manually. A paid legacy order without a document gets one on its first successful order ID lookup.

To update fulfillment, edit that document in the Firebase console. Set `status` to one of `confirmed`, `packing`, `shipped`, `out_for_delivery`, `delivered`, or `cancelled`. Set `updatedAt` to the current timestamp when changing status. Optional string fields: `carrier`, `trackingNumber`, and `trackingUrl` (an HTTPS courier tracking page). The customer page reflects these updates within 30 seconds while open.

This tracks the fulfillment status you enter in Firebase. Courier scan events and live location need an integration with the courier's API; they are not available from Cashfree.
