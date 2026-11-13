# Order tracking setup

The customer page is `/track`. Customers enter the Cashfree order ID and the phone number used at checkout. The server checks both against Cashfree before showing fulfillment status. The page checks for changes every 30 seconds.

Set `FIREBASE_SERVICE_ACCOUNT_JSON` in the Netlify site's environment variables to the complete JSON for a Firebase service account with Firestore read/write access to the same project as the storefront. Keep this value server-side; do not prefix it with `VITE_` or commit it. The service account's `project_id` selects the Firestore project.

Enable Firestore in that Firebase project and deploy `firestore.rules`. The `orderTracking` collection is intentionally closed to browser clients. A paid order gets an `orderTracking/{cashfreeOrderId}` document with `status: "confirmed"` on the first successful tracking lookup.

To update fulfillment, edit that document in the Firebase console. Set `status` to one of `confirmed`, `packing`, `shipped`, `out_for_delivery`, `delivered`, or `cancelled`. Set `updatedAt` to the current timestamp when changing status. Optional string fields: `carrier`, `trackingNumber`, and `trackingUrl` (an HTTPS courier tracking page). The customer page reflects these updates within 30 seconds while open.

This tracks the fulfillment status you enter in Firebase. Courier scan events and live location need an integration with the courier's API; they are not available from Cashfree.
