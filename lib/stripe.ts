import Stripe from "stripe";

export class StripeNotConfiguredError extends Error {
  constructor() {
    super(
      "STRIPE_SECRET_KEY is not set. Add sk_test_... to .env.local to enable checkout.",
    );
    this.name = "StripeNotConfiguredError";
  }
}

let stripeInstance: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe(): Stripe {
  if (stripeInstance) return stripeInstance;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new StripeNotConfiguredError();

  if (key.startsWith("sk_live_")) {
    throw new Error(
      "ARITHMOS™ operates in TEST MODE only. Live Stripe keys are strictly prohibited.",
    );
  }

  stripeInstance = new Stripe(key, {
    typescript: true,
    // Cloudflare Workers has no Node http/https — Stripe's default
    // NodeHttpClient throws ECONNRESET / "request was retried" on
    // every call. Swap to the fetch-based client so the SDK uses
    // the Workers global fetch instead.
    httpClient: Stripe.createFetchHttpClient(),
  });
  return stripeInstance;
}

/* ─── Demo customer with a pre-attached test card ─────────────────────────────
 *
 * For the prototype contest demo we pre-create a Stripe Customer with
 * `pm_card_visa` (the 4242 4242 4242 4242 test card) attached as the
 * default payment method. When this customer is passed to a Checkout
 * Session, the embedded checkout shows "Pay with •••• 4242" as the
 * default option — judges click one button and the payment completes.
 * No card entry screen, no friction, no drop-off at the payment step.
 *
 * The customer is looked up by a fixed email and cached at module scope,
 * so within a Worker isolate the lookup happens only on first request.
 * Across cold starts we do one extra `customers.list` (~150ms).
 */

const DEMO_CUSTOMER_EMAIL = "demo@arithmos.test";

let cachedDemoCustomerId: string | null = null;

/* Get-or-create the demo customer AND ensure they have a saved card.
   Idempotent — safe to run on every cold start. The check is two list
   calls + (rarely) one create + one attach + one update. */
export async function getDemoCustomerId(stripe: Stripe): Promise<string> {
  if (cachedDemoCustomerId) return cachedDemoCustomerId;

  const envOverride = process.env.STRIPE_DEMO_CUSTOMER_ID;
  if (envOverride) {
    cachedDemoCustomerId = envOverride;
    return envOverride;
  }

  // 1. Look up or create the customer
  const existing = await stripe.customers.list({
    email: DEMO_CUSTOMER_EMAIL,
    limit: 1,
  });
  const customerId = existing.data[0]
    ? existing.data[0].id
    : (
        await stripe.customers.create({
          email: DEMO_CUSTOMER_EMAIL,
          name: "ARITHMOS Demo Subscriber",
          description: "Auto-provisioned for prototype demo (test mode only).",
        })
      ).id;

  // 2. Ensure they have a saved card. If none, create a real PaymentMethod
  //    from the `tok_visa` test token, attach it, and set as default.
  const pms = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
    limit: 1,
  });

  if (pms.data.length === 0) {
    const pm = await stripe.paymentMethods.create({
      type: "card",
      card: { token: "tok_visa" },
    });
    await stripe.paymentMethods.attach(pm.id, { customer: customerId });
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: pm.id },
    });
  }

  cachedDemoCustomerId = customerId;
  return customerId;
}
