export type CalcOp = "+" | "−" | "×" | "÷";

export type CalcPhase = "idle" | "thinking" | "locked" | "error";

export type CalcState = {
  display: string;
  previous: string | null;
  operator: CalcOp | null;
  overwrite: boolean;
  /* When set, the display shows the computed result but it is "locked" —
     blurred in UI until the user pays to reveal it. Only `reveal` or `clear`
     can progress while this is non-null. */
  pendingResult: string | null;
  /* Human-readable expression (e.g. "7 × 8") captured at the moment of
     equals — shown in the payment modal and used as the Gemini prompt. */
  lastExpression: string | null;
  /* Async lifecycle for the Gemini "thinking" stream. */
  phase: CalcPhase;
  /* Each entry is one streamed chunk (phase line or model thought). */
  thinkingLog: string[];
  errorMessage: string | null;
};

export type CalcAction =
  | { type: "digit"; value: string }
  | { type: "operator"; value: CalcOp }
  | { type: "equals" }
  | { type: "clear" }
  | { type: "sign" }
  | { type: "percent" }
  | { type: "decimal" }
  | { type: "reveal" }
  | { type: "thinking_chunk"; text: string }
  | { type: "equals_done"; result: string }
  | { type: "equals_error"; message?: string };

export const initialState: CalcState = {
  display: "0",
  previous: null,
  operator: null,
  overwrite: false,
  pendingResult: null,
  lastExpression: null,
  phase: "idle",
  thinkingLog: [],
  errorMessage: null,
};

const MAX_LEN = 12;

function format(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  const rounded = Number(n.toPrecision(10));
  const str = rounded.toString();
  if (str.length <= MAX_LEN) return str;
  return rounded.toExponential(6);
}

function compute(a: string, b: string, op: CalcOp): number {
  const na = parseFloat(a);
  const nb = parseFloat(b);
  switch (op) {
    case "+":
      return na + nb;
    case "−":
      return na - nb;
    case "×":
      return na * nb;
    case "÷":
      return nb === 0 ? NaN : na / nb;
  }
}

const STREAM_INTERNAL: ReadonlySet<CalcAction["type"]> = new Set([
  "thinking_chunk",
  "equals_done",
  "equals_error",
]);

export function calcReducer(s: CalcState, a: CalcAction): CalcState {
  if (s.display === "Error" && a.type !== "clear") return s;

  /* While Gemini is thinking, only stream-internal actions and `clear`
     can progress. Block keypad input mid-stream. */
  if (s.phase === "thinking" && !STREAM_INTERNAL.has(a.type) && a.type !== "clear") {
    return s;
  }

  /* Locked: only `reveal` and `clear` are allowed. */
  if (s.pendingResult !== null && a.type !== "clear" && a.type !== "reveal") {
    return s;
  }

  switch (a.type) {
    case "digit": {
      if (s.overwrite) return { ...s, display: a.value, overwrite: false };
      if (s.display === "0") return { ...s, display: a.value };
      if (s.display.replace("-", "").replace(".", "").length >= MAX_LEN)
        return s;
      return { ...s, display: s.display + a.value };
    }
    case "decimal": {
      if (s.overwrite) return { ...s, display: "0.", overwrite: false };
      if (s.display.includes(".")) return s;
      return { ...s, display: s.display + "." };
    }
    case "operator": {
      if (s.operator && s.previous !== null && !s.overwrite) {
        const result = format(compute(s.previous, s.display, s.operator));
        return {
          ...s,
          display: result,
          previous: result,
          operator: a.value,
          overwrite: true,
        };
      }
      return {
        ...s,
        previous: s.display,
        operator: a.value,
        overwrite: true,
      };
    }
    case "equals": {
      if (s.operator === null || s.previous === null) return s;
      const expression = `${s.previous} ${s.operator} ${s.display}`;
      const localFallback = format(compute(s.previous, s.display, s.operator));
      // Stash the local result in `display` as a fallback. The UI hides
      // the display value while phase === "thinking", so the user sees
      // the streaming pipeline instead of the answer.
      return {
        ...s,
        display: localFallback,
        previous: null,
        operator: null,
        overwrite: true,
        phase: "thinking",
        thinkingLog: [],
        lastExpression: expression,
        errorMessage: null,
      };
    }
    case "thinking_chunk": {
      if (s.phase !== "thinking") return s;
      return { ...s, thinkingLog: [...s.thinkingLog, a.text] };
    }
    case "equals_done": {
      if (s.phase !== "thinking") return s;
      return {
        ...s,
        display: a.result,
        pendingResult: a.result,
        phase: "locked",
      };
    }
    case "equals_error": {
      if (s.phase !== "thinking") return s;
      // Lock anyway using the local fallback already in `display` so
      // the paywall still holds and the UX doesn't dead-end.
      return {
        ...s,
        pendingResult: s.display,
        phase: "locked",
        errorMessage:
          a.message ?? "Reasoning Engine offline. Local fallback applied.",
      };
    }
    case "reveal": {
      return { ...s, pendingResult: null, phase: "idle" };
    }
    case "clear":
      return initialState;
    case "sign": {
      if (s.display === "0") return s;
      const flipped = s.display.startsWith("-")
        ? s.display.slice(1)
        : "-" + s.display;
      return { ...s, display: flipped };
    }
    case "percent": {
      const n = parseFloat(s.display) / 100;
      return { ...s, display: format(n), overwrite: true };
    }
  }
}
