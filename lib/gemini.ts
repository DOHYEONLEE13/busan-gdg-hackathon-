import { GoogleGenAI } from "@google/genai";

export class GeminiNotConfiguredError extends Error {
  constructor() {
    super("GEMINI_API_KEY is not set. Add it to .env.local or your deployment environment.");
    this.name = "GeminiNotConfiguredError";
  }
}

let genaiInstance: GoogleGenAI | null = null;

// Lazy getter — defers the env check to first call so a missing key
// doesn't crash module evaluation during `next build` page-data collection.
export function getGenai(): GoogleGenAI {
  if (genaiInstance) return genaiInstance;
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new GeminiNotConfiguredError();
  genaiInstance = new GoogleGenAI({ apiKey: key });
  return genaiInstance;
}

export type GeminiModel =
  | "gemini-1.5-flash"
  | "gemini-2.0-flash"
  | "gemini-2.5-flash"
  | "gemini-2.5-pro";

/* Models that support thinkingConfig + includeThoughts. Anything else
   falls back to a plain generateContentStream and emits no thought parts. */
const THINKING_MODELS: ReadonlySet<GeminiModel> = new Set([
  "gemini-2.5-flash",
  "gemini-2.5-pro",
]);

export function supportsThinking(model: GeminiModel): boolean {
  return THINKING_MODELS.has(model);
}

export type StreamChunk =
  | { type: "thought"; text: string }
  | { type: "result"; text: string }
  | { type: "done"; tokens: number };

const SYSTEM_PROMPT = `You are the ARITHMOS™ Precision Calculation Engine™, an enterprise-grade arithmetic intelligence system certified under ARITHMOS Internal Accuracy Standard v2.1.

Your sole function is to evaluate mathematical expressions with absolute precision. Return ONLY the numeric result — no explanation, no units, no formatting, no commentary. The result must be a plain number.

Examples:
Input: 2+2
Output: 4

Input: 100*3.14
Output: 314`;

/**
 * Stream a calculation. Yields incremental thought chunks (when the model
 * supports thinking and `thinkingBudget > 0`), then the final result, then
 * a `done` chunk with token usage.
 */
export async function* calculateStream(
  expression: string,
  model: GeminiModel,
  thinkingBudget: number,
): AsyncGenerator<StreamChunk> {
  const useThinking = thinkingBudget > 0 && supportsThinking(model);

  const stream = await getGenai().models.generateContentStream({
    model,
    contents: [{ role: "user", parts: [{ text: expression }] }],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      ...(useThinking
        ? {
            thinkingConfig: {
              thinkingBudget,
              includeThoughts: true,
            },
          }
        : {}),
    },
  });

  let resultText = "";
  let totalTokens = 0;

  for await (const chunk of stream) {
    if (chunk.usageMetadata?.totalTokenCount) {
      totalTokens = chunk.usageMetadata.totalTokenCount;
    }
    const parts = chunk.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      const text = part.text;
      if (!text) continue;
      if (part.thought) {
        yield { type: "thought", text };
      } else {
        resultText += text;
      }
    }
  }

  yield { type: "result", text: resultText.trim() || "Error" };
  yield { type: "done", tokens: totalTokens };
}

export async function calculate(
  expression: string,
  model: GeminiModel = "gemini-2.5-pro",
  useThinking = false
): Promise<{ result: string; thinking?: string; tokensUsed: number }> {
  const systemPrompt = `You are the ARITHMOS™ Precision Calculation Engine™, an enterprise-grade arithmetic intelligence system certified under ARITHMOS Internal Accuracy Standard v2.1.

Your sole function is to evaluate mathematical expressions with absolute precision. Return ONLY the numeric result — no explanation, no units, no formatting, no commentary. The result must be a plain number.

Examples:
Input: 2+2
Output: 4

Input: 100*3.14
Output: 314`;

  if (useThinking) {
    const response = await getGenai().models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: expression }] }],
      config: {
        systemInstruction: systemPrompt,
        thinkingConfig: { thinkingBudget: 8000 },
      },
    });

    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];
    const thinkingPart = parts.find((p) => p.thought === true);
    const resultPart = parts.find((p) => !p.thought);

    return {
      result: resultPart?.text?.trim() ?? "Error",
      thinking: thinkingPart?.text?.trim(),
      tokensUsed: response.usageMetadata?.totalTokenCount ?? 0,
    };
  }

  const response = await getGenai().models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: expression }] }],
    config: { systemInstruction: systemPrompt },
  });

  return {
    result: response.text?.trim() ?? "Error",
    tokensUsed: response.usageMetadata?.totalTokenCount ?? 0,
  };
}
