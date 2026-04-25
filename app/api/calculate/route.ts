import { NextRequest } from "next/server";
import { calculateStream, type GeminiModel } from "@/lib/gemini";
import {
  ARITHMOS_MODELS,
  REASONING_PHASES,
  THINKING_BUDGET,
  type ArithmosModelId,
} from "@/lib/constants";
import { assertSameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const maxDuration = 60;

interface CalculateRequest {
  expression: string;
  modelId: string;
}

const PHASE_DELAY_MS = 250;

function jsonLine(obj: unknown): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(obj) + "\n");
}

function errorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const blocked = assertSameOrigin(req);
  if (blocked) return blocked;

  let body: CalculateRequest;
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const { expression, modelId } = body;

  if (!expression || typeof expression !== "string") {
    return errorResponse("expression is required.", 400);
  }
  if (expression.length > 256) {
    return errorResponse("Expression exceeds maximum length of 256 characters.", 400);
  }

  const arithmosModel = ARITHMOS_MODELS.find((m) => m.id === modelId);
  if (!arithmosModel) {
    return errorResponse("Invalid ARITHMOS model.", 400);
  }

  const tierId = arithmosModel.id as ArithmosModelId;
  const phases = REASONING_PHASES[tierId];
  const budget = THINKING_BUDGET[tierId];

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const safeEnqueue = (obj: unknown) => {
        try {
          controller.enqueue(jsonLine(obj));
        } catch {
          /* controller closed (client disconnected) — ignore */
        }
      };

      try {
        // Theatrical pre-roll: stream phase lines with small delays so
        // the user sees the "Quantum Reasoning Pipeline" warming up
        // before the actual model talks. Free of API cost.
        for (const phase of phases) {
          safeEnqueue({ type: "thought", text: `▸ ${phase}…` });
          await new Promise((r) => setTimeout(r, PHASE_DELAY_MS));
        }
        safeEnqueue({
          type: "thought",
          text: `▸ Dispatching to ${arithmosModel.geminiModel}…`,
        });

        // Real Gemini stream.
        const gen = calculateStream(
          expression,
          arithmosModel.geminiModel as GeminiModel,
          budget,
        );

        for await (const chunk of gen) {
          safeEnqueue(chunk);
        }
      } catch (err) {
        console.error("[ARITHMOS Calculate stream]", err);
        safeEnqueue({
          type: "error",
          text: "Reasoning Engine encountered an internal error.",
        });
      } finally {
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
