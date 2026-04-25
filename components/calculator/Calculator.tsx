"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { ArithmosModelId } from "@/lib/constants";
import { CalculatorFrame } from "./CalculatorFrame";
import { ModelSelector } from "./ModelSelector";
import { RevealPaymentModal } from "./RevealPaymentModal";
import { calcReducer, initialState, type CalcAction } from "./calcReducer";
import { THEMES } from "./themes";

type StreamChunk =
  | { type: "thought"; text: string }
  | { type: "result"; text: string }
  | { type: "done"; tokens: number }
  | { type: "error"; text: string };

export function Calculator() {
  const [state, dispatch] = useReducer(calcReducer, initialState);
  const [modelId, setModelId] = useState<ArithmosModelId>("one");
  const [modalOpen, setModalOpen] = useState(false);
  const theme = THEMES[modelId];
  const locked = state.pendingResult !== null;
  const abortRef = useRef<AbortController | null>(null);

  /* Open the reveal modal whenever a fresh pending result appears. */
  useEffect(() => {
    if (locked) setModalOpen(true);
  }, [state.pendingResult, locked]);

  /* Kick off the Gemini stream when the reducer enters the thinking phase. */
  useEffect(() => {
    if (state.phase !== "thinking" || !state.lastExpression) return;

    const controller = new AbortController();
    abortRef.current = controller;
    const expression = state.lastExpression;

    (async () => {
      try {
        const res = await fetch("/api/calculate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ expression, modelId }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Calculation API returned ${res.status}.`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        let finalResult: string | null = null;
        let streamError: string | null = null;

        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          for (;;) {
            const nl = buf.indexOf("\n");
            if (nl === -1) break;
            const line = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (!line) continue;
            let chunk: StreamChunk;
            try {
              chunk = JSON.parse(line) as StreamChunk;
            } catch {
              continue;
            }
            if (chunk.type === "thought") {
              dispatch({ type: "thinking_chunk", text: chunk.text });
            } else if (chunk.type === "result") {
              finalResult = chunk.text;
            } else if (chunk.type === "error") {
              streamError = chunk.text;
            }
            /* "done" is metadata-only — ignore. */
          }
        }

        if (streamError) {
          dispatch({ type: "equals_error", message: streamError });
        } else if (finalResult !== null && finalResult !== "") {
          dispatch({ type: "equals_done", result: finalResult });
        } else {
          dispatch({
            type: "equals_error",
            message: "Reasoning Engine returned no result.",
          });
        }
      } catch (e) {
        if (controller.signal.aborted) return;
        dispatch({
          type: "equals_error",
          message: e instanceof Error ? e.message : "Stream error.",
        });
      }
    })();

    return () => controller.abort();
  }, [state.phase, state.lastExpression, modelId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (modalOpen) return;
      const a = keyToAction(e.key);
      if (!a) return;
      e.preventDefault();
      dispatch(a);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const handleComplete = useCallback(() => {
    dispatch({ type: "reveal" });
    setModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleRequestReveal = useCallback(() => {
    if (locked) setModalOpen(true);
  }, [locked]);

  /* Lock the model selector while a stream is in flight — switching mid-
     stream would race the abort and the new fetch. */
  const selectorDisabled = state.phase === "thinking";

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex justify-center pt-20 pb-2 z-10 px-4">
        <ModelSelector
          selected={modelId}
          onSelect={setModelId}
          disabled={selectorDisabled}
        />
      </div>

      <div className="relative flex-1 flex items-center justify-center px-6 pb-16">
        <CalculatorFrame
          modelId={modelId}
          theme={theme}
          state={state}
          dispatch={dispatch}
          onRequestReveal={handleRequestReveal}
        />
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-inter text-[12px] text-white/35 z-10 text-center">
        키보드 입력 가능 · 숫자 / + − × ÷ / Enter(=) / Esc(C) / . / %
      </div>

      {modalOpen && locked && state.lastExpression ? (
        <RevealPaymentModal
          modelId={modelId}
          modelName={theme.label}
          expression={state.lastExpression}
          onComplete={handleComplete}
          onCancel={handleCancel}
        />
      ) : null}
    </div>
  );
}

function keyToAction(key: string): CalcAction | null {
  if (/^[0-9]$/.test(key)) return { type: "digit", value: key };
  if (key === ".") return { type: "decimal" };
  if (key === "+") return { type: "operator", value: "+" };
  if (key === "-") return { type: "operator", value: "−" };
  if (key === "*" || key.toLowerCase() === "x")
    return { type: "operator", value: "×" };
  if (key === "/") return { type: "operator", value: "÷" };
  if (key === "=" || key === "Enter") return { type: "equals" };
  if (key === "Escape" || key.toLowerCase() === "c") return { type: "clear" };
  if (key === "%") return { type: "percent" };
  return null;
}
