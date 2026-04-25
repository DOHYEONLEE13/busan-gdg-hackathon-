import { NextRequest, NextResponse } from "next/server";
import {
  ARITHMOS_MODELS,
  OPERATION_PRICES,
  type ArithmosModelId,
} from "@/lib/constants";
import {
  getDemoCustomerId,
  getStripe,
  StripeNotConfiguredError,
} from "@/lib/stripe";
import { assertSameOrigin } from "@/lib/security";

export const runtime = "nodejs";

type Body = {
  modelId?: ArithmosModelId;
  expression?: string;
};

export async function POST(req: NextRequest) {
  const blocked = assertSameOrigin(req);
  if (blocked) return blocked;

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const model = body.modelId
    ? ARITHMOS_MODELS.find((m) => m.id === body.modelId)
    : undefined;
  if (!model) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  const amount = OPERATION_PRICES[model.id];

  try {
    const stripe = getStripe();
    // Demo customer carries a pre-attached 4242 test card so the embedded
    // checkout shows "Pay with •••• 4242" as the default option — no card
    // entry, one-click completion. Eliminates the prototype-vote drop-off.
    const demoCustomerId = await getDemoCustomerId(stripe);
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      redirect_on_completion: "never",
      customer: demoCustomerId,
      // Force card-only — Stripe Link is enabled by default and crowds
      // out the saved-card one-click option in embedded checkout.
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "krw",
            product_data: {
              name: `${model.name} · 단건 계산 공개`,
              description: body.expression
                ? `Reveal: ${body.expression}`
                : "ARITHMOS single-calculation reveal.",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        model_id: model.id,
        expression: body.expression ?? "",
        op_type: "single_calculation_reveal",
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    if (err instanceof StripeNotConfiguredError) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 503 },
      );
    }
    console.error("[create-calc-session]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
