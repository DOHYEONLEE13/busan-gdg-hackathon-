export const ARITHMOS_MODELS = [
  {
    id: "one",
    name: "ARITHMOS One",
    tagline: "The entry point to computational excellence.",
    price: 49000,
    priceLabel: "₩49,000",
    period: "/mo",
    tier: "Entry",
    color: "#8e8e93",
    material: "Matte Aluminum",
    geminiModel: "gemini-1.5-flash",
    features: [
      "Four-Operation Arithmetic Engine™",
      "Gemini 1.5 Flash Precision Core™",
      "Standard Numeric Display (10 digits)",
      "ARITHMOS Cloud Sync™ (Basic)",
      "Email Support (72h SLA)",
    ],
    specs: {
      accuracy: "99.71%",
      latency: "< 2.4s per operation",
      operations: "Addition, Subtraction, Multiplication, Division",
      display: "10-digit monochrome",
      support: "Email (72h)",
    },
    stripePriceId: "price_one_test",
    available: true,
    badge: null,
  },
  {
    id: "pro",
    name: "ARITHMOS Pro",
    tagline: "For professionals who demand visible reasoning.",
    price: 149000,
    priceLabel: "₩149,000",
    period: "/mo",
    tier: "Professional",
    color: "#5e5ce6",
    material: "Anodized Titanium",
    geminiModel: "gemini-2.5-flash",
    features: [
      "Thinking Mode™ Visualization Pipeline",
      "Gemini 2.0 Flash Extended Reasoning",
      "Negative Number Support",
      "Decimal Precision Mode™ (up to 8 decimal places)",
      "ARITHMOS Cloud Sync™ (Pro)",
      "Priority Support (24h SLA)",
      "Calculation History Ledger™ (90 days)",
    ],
    specs: {
      accuracy: "99.89%",
      latency: "< 8.2s per operation",
      operations: "Addition, Subtraction, Multiplication, Division, Negative, Decimal",
      display: "16-digit HD monochrome",
      support: "Priority Email (24h)",
    },
    stripePriceId: "price_pro_test",
    available: true,
    badge: "Most Popular",
  },
  {
    id: "ultra",
    name: "ARITHMOS Ultra",
    tagline: "Liquid Glass. Dolby Atmos. Flaghsip precision.",
    price: 499000,
    priceLabel: "₩499,000",
    period: "/mo",
    tier: "Flagship",
    color: "#c9a961",
    material: "Liquid Glass",
    geminiModel: "gemini-2.5-pro",
    features: [
      "Liquid Glass Chassis™ with Dynamic Refraction",
      "Dolby Atmos™ Calculation Sound Design",
      "Gemini 2.5 Pro Deep Reasoning Engine",
      "Unlimited Decimal Precision Mode™",
      "ARITHMOS Cloud Sync™ (Ultra — Real-time)",
      "Dedicated Account Manager",
      "Calculation History Ledger™ (Unlimited)",
      "White-Glove Onboarding™ (3 sessions)",
    ],
    specs: {
      accuracy: "99.97%",
      latency: "< 18.5s per operation",
      operations: "Full arithmetic suite + parenthetical grouping",
      display: "32-digit OLED equivalent",
      support: "Dedicated Account Manager",
    },
    stripePriceId: "price_ultra_test",
    available: true,
    badge: "Flagship",
  },
  {
    id: "quantum",
    name: "ARITHMOS Quantum Edition",
    tagline: "Computation transcends certainty.",
    price: 2490000,
    priceLabel: "₩2,490,000",
    period: "/mo",
    tier: "Halo",
    color: "holographic",
    material: "Holographic Iridescent",
    geminiModel: "gemini-2.5-pro",
    features: [
      "Probabilistic Calculation Engine™ v3",
      "Gemini 2.5 Pro with Extended Thinking (32k tokens)",
      "NFT Certificate of Computation™ (per operation)",
      "Quantum Uncertainty Visualization™",
      "ARITHMOS Concierge™ AI Agent (24/7)",
      "Dedicated Infrastructure Cluster",
      "White-Glove Onboarding™ (Unlimited)",
      "C-Suite Briefing Deck™ (Quarterly)",
      "Physical Gold-Plated Result Card™ (Monthly)",
    ],
    specs: {
      accuracy: "97.3%–99.99%* (probabilistic)",
      latency: "< 45s per operation",
      operations: "Full suite + probabilistic outputs + uncertainty bands",
      display: "Holographic projection-ready",
      support: "Concierge AI + Dedicated Human (24/7)",
    },
    stripePriceId: "price_quantum_test",
    available: true,
    badge: "Halo Product",
  },
  {
    id: "zero",
    name: "ARITHMOS Zero",
    tagline: "No buttons. No compromise. No interface.",
    price: 990000,
    priceLabel: "₩990,000",
    period: "/mo",
    tier: "Limited",
    color: "#f5f5f7",
    material: "Buttonless Void Aluminum",
    geminiModel: "gemini-2.0-flash",
    features: [
      "Zero-Button Interface™ (spatial gesture input)",
      "Intentional Minimalism Engine™",
      "Gemini 2.0 Flash Ambient Reasoning",
      "ARITHMOS Cloud Sync™ (Zero — gesture-activated)",
      "Priority Support (12h SLA)",
    ],
    specs: {
      accuracy: "99.83%",
      latency: "< 12s per operation",
      operations: "Full arithmetic suite (gesture-input only)",
      display: "Zero-emission monochrome",
      support: "Priority Email (12h)",
    },
    stripePriceId: "price_zero_test",
    available: true,
    badge: "Discontinuing Soon",
  },
] as const;

export type ArithmosModelId = (typeof ARITHMOS_MODELS)[number]["id"];

/* Per-operation reveal fee. Each "=" press triggers a one-time Stripe
   charge of this amount in KRW. */
export const OPERATION_PRICES: Record<ArithmosModelId, number> = {
  one: 1_000,
  pro: 10_000,
  ultra: 50_000,
  quantum: 200_000,
  zero: 9_900,
};

/* Per-tier Gemini thinking budget (token cap). 0 = no thinking (model
   doesn't support it; UI streams cosmetic phase lines only). Kept tight
   to bound per-call cost — the show is in the *visible* streaming, not
   in burning tokens. */
export const THINKING_BUDGET: Record<ArithmosModelId, number> = {
  one: 0,
  zero: 0,
  pro: 512,
  ultra: 1024,
  quantum: 2048,
};

/* Per-tier theatrical "phase" lines streamed before Gemini. More tier =
   longer pre-roll. Each line is held ~250ms server-side. */
export const REASONING_PHASES: Record<ArithmosModelId, readonly string[]> = {
  one: [
    "Establishing secure compute envelope",
    "Initializing Precision Core",
  ],
  zero: [
    "Spatial gesture acquisition complete",
    "Resolving zero-button intent vector",
  ],
  pro: [
    "Establishing secure compute envelope",
    "Loading ARITHMOS Internal Accuracy Standard v2.1",
    "Initializing Thinking Mode Visualization Pipeline",
  ],
  ultra: [
    "Establishing secure compute envelope",
    "Loading ARITHMOS Internal Accuracy Standard v2.1",
    "Engaging Liquid Glass refraction layer",
    "Spinning up Deep Reasoning Engine",
  ],
  quantum: [
    "Establishing secure compute envelope",
    "Loading ARITHMOS Internal Accuracy Standard v2.1",
    "Calibrating Probabilistic Calculation Engine v3",
    "Allocating dedicated infrastructure cluster",
    "Initiating Quantum Reasoning Pipeline",
  ],
};

export function formatKrw(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`;
}

export const COMPANY_NAME = "ARITHMOS™";
export const COMPANY_TAGLINE = "Beyond Numbers. 계산, 그 이상의 계산.";
export const COMPANY_LEGAL = "ARITHMOS Inc.";
export const FOUNDED_YEAR = 2024;

export const ACCURACY_DISCLAIMER =
  "*Certified under ARITHMOS Internal Accuracy Standard v2.1. Results may vary under concurrent multi-user enterprise load conditions. Probabilistic accuracy applies to Quantum Edition only.";

export const TEST_CARD_NOTICE =
  "This is a demonstration project. No real charges will be made. Test card: 4242 4242 4242 4242";
