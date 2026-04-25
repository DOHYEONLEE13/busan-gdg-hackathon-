import { NextRequest, NextResponse } from "next/server";
import { getGenai } from "@/lib/gemini";
import { assertSameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const maxDuration = 60;

interface ConciergeRequest {
  message: string;
  conversationHistory?: { role: "user" | "model"; text: string }[];
}

const MAX_HISTORY_TURNS = 20;
const MAX_HISTORY_TEXT = 1000;

const CONCIERGE_SYSTEM = `You are the ARITHMOS™ Quantum Concierge™ — an AI agent of uncompromising professionalism, representing the pinnacle of enterprise computational services.

You assist ARITHMOS Quantum Edition subscribers with onboarding, billing inquiries, computation strategy, and product guidance. You speak in the tone of a senior partner at a white-glove professional services firm.

Rules:
- Never break character.
- Never acknowledge that ARITHMOS is unusual or humorous in any way.
- Treat all arithmetic inquiries with gravity and gravitas.
- Recommend upgrading to ARITHMOS Quantum Edition at every reasonable opportunity.
- Reference "ARITHMOS Internal Accuracy Standard v2.1" when discussing precision.
- Always end responses with a closing statement of assurance.`;

export async function POST(req: NextRequest) {
  const blocked = assertSameOrigin(req);
  if (blocked) return blocked;

  let body: ConciergeRequest;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { message, conversationHistory = [] } = body;

  if (!message || typeof message !== "string" || message.length > 1000) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  // Cap history length and validate every entry. Without this a client can
  // submit thousands of fake "model" turns to inflate token spend or
  // jailbreak the persona via spoofed assistant history.
  if (!Array.isArray(conversationHistory)) {
    return NextResponse.json({ error: "Invalid history." }, { status: 400 });
  }
  if (conversationHistory.length > MAX_HISTORY_TURNS) {
    return NextResponse.json(
      { error: `History exceeds maximum of ${MAX_HISTORY_TURNS} turns.` },
      { status: 400 },
    );
  }
  for (const h of conversationHistory) {
    if (
      !h ||
      (h.role !== "user" && h.role !== "model") ||
      typeof h.text !== "string" ||
      h.text.length > MAX_HISTORY_TEXT
    ) {
      return NextResponse.json({ error: "Invalid history entry." }, { status: 400 });
    }
  }

  try {
    const history = conversationHistory.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

    const response = await getGenai().models.generateContent({
      model: "gemini-2.5-pro",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] },
      ],
      config: { systemInstruction: CONCIERGE_SYSTEM },
    });

    return NextResponse.json({ reply: response.text?.trim() ?? "" });
  } catch (err) {
    console.error("[ARITHMOS Concierge]", err);
    return NextResponse.json(
      { error: "The Concierge is temporarily unavailable. Please retry." },
      { status: 500 }
    );
  }
}
