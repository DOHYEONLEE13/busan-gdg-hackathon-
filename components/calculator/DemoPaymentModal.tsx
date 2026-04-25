"use client";

import { useEffect, useState } from "react";
import {
  OPERATION_PRICES,
  formatKrw,
  type ArithmosModelId,
} from "@/lib/constants";

type Props = {
  modelId: ArithmosModelId;
  modelName: string;
  expression: string;
  onComplete: () => void;
  onCancel: () => void;
};

const PROCESSING_PHASES = [
  "보안 결제 envelope 검증 중",
  "ARITHMOS Quantum Ledger 갱신",
  "1-Tap 인증 토큰 발급",
  "결제 승인 완료",
] as const;

const TIER_LABEL: Record<ArithmosModelId, string> = {
  one: "Entry",
  pro: "Professional",
  ultra: "Flagship",
  quantum: "Halo",
  zero: "Limited",
};

export function DemoPaymentModal({
  modelId,
  modelName,
  expression,
  onComplete,
  onCancel,
}: Props) {
  const price = OPERATION_PRICES[modelId];
  const [stage, setStage] = useState<"idle" | "processing" | "done">("idle");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const isHalo = modelId === "quantum";

  useEffect(() => {
    if (stage !== "processing") return;
    const phaseTimer = window.setInterval(() => {
      setPhaseIdx((i) => Math.min(i + 1, PROCESSING_PHASES.length - 1));
    }, 380);
    const doneTimer = window.setTimeout(() => {
      setStage("done");
      window.setTimeout(onComplete, 320);
    }, 1500);
    return () => {
      window.clearInterval(phaseTimer);
      window.clearTimeout(doneTimer);
    };
  }, [stage, onComplete]);

  /* Esc to cancel — only when not mid-processing. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stage === "idle") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[reveal-fade-up_220ms_ease-out_both]"
        aria-hidden="true"
        onClick={() => stage === "idle" && onCancel()}
      />
      <div
        className={`relative w-full max-w-[440px] rounded-[20px] border bg-[#0f1015]/95 backdrop-blur-xl overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] animate-[reveal-fade-up_320ms_cubic-bezier(0.2,0.8,0.2,1)_both] ${
          isHalo
            ? "border-[#a855f7]/35 shadow-[0_40px_120px_-10px_rgba(168,85,247,0.35)]"
            : "border-white/10"
        }`}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-start justify-between gap-3">
          <div>
            <span
              className={`font-cabin uppercase tracking-[0.28em] text-[10px] ${
                isHalo
                  ? "gradient-holographic bg-clip-text text-transparent"
                  : "text-[#c9a961]"
              }`}
            >
              ARITHMOS Payment Authorization
            </span>
            <h2 className="mt-2 font-instrument-serif text-white text-[22px] leading-[1.15] tracking-tight">
              계산 결과 공개 승인
            </h2>
          </div>
          {stage === "idle" ? (
            <button
              type="button"
              onClick={onCancel}
              aria-label="닫기"
              className="shrink-0 w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>
          ) : null}
        </div>

        {/* Order summary */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <div className="font-cabin uppercase tracking-[0.18em] text-[9px] text-white/40">
                {TIER_LABEL[modelId]} · 단건 공개
              </div>
              <div className="mt-1 font-instrument-serif text-white text-[16px] truncate">
                {modelName}
              </div>
              <div className="mt-1 font-mono text-[12px] text-white/55 truncate">
                Reveal &quot;{expression}&quot;
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-cabin uppercase tracking-[0.16em] text-[9px] text-white/40">
                Total
              </div>
              <div className="mt-0.5 font-instrument-serif text-[28px] leading-none text-white">
                {formatKrw(price)}
              </div>
            </div>
          </div>

          {/* Saved method card */}
          <div className="rounded-[12px] border border-white/10 bg-gradient-to-br from-[#1a1530] via-[#0f0d20] to-[#0a0a0a] p-4 flex items-center gap-3">
            <div className="w-10 h-7 rounded-[4px] bg-gradient-to-br from-[#c9a961] to-[#7b39fc] grid place-items-center">
              <span className="font-cabin font-bold text-[10px] text-white/95">VISA</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[13px] text-white tracking-wider">
                •••• 4242
              </div>
              <div className="font-cabin text-[10px] text-white/45 tracking-[0.14em] uppercase mt-0.5">
                Default · Expires 12/30
              </div>
            </div>
            <span className="font-cabin text-[10px] uppercase tracking-[0.18em] text-[#7ed0a8]">
              Verified
            </span>
          </div>
        </div>

        {/* Action area */}
        <div className="px-6 pb-6">
          {stage === "idle" ? (
            <button
              type="button"
              onClick={() => {
                setStage("processing");
                setPhaseIdx(0);
              }}
              className={`w-full h-12 rounded-[12px] font-cabin font-medium text-[14.5px] tracking-[0.04em] flex items-center justify-center gap-2 transition-[transform,background-color] hover:scale-[1.01] active:scale-[0.99] ${
                isHalo
                  ? "gradient-holographic text-black shadow-[0_8px_28px_rgba(168,85,247,0.45)]"
                  : "bg-[#7b39fc] text-white hover:bg-[#8d4dff] shadow-[0_6px_22px_rgba(123,57,252,0.4)]"
              }`}
            >
              <BoltIcon />
              {formatKrw(price)} · 1-Tap 결제 승인
            </button>
          ) : (
            <ProcessingState
              phaseIdx={phaseIdx}
              done={stage === "done"}
              isHalo={isHalo}
            />
          )}

          {/* Trust panel — checklist-style, plain language, multiple
              specific reassurances. Designed to dissolve any "wait,
              do I need to enter my card?" hesitation in <2 seconds. */}
          <div className="mt-4 rounded-[14px] border border-[#7ed0a8]/30 bg-[#7ed0a8]/[0.07] px-4 py-3.5">
            <div className="flex items-center gap-2">
              <ShieldIcon />
              <span className="font-cabin font-semibold uppercase tracking-[0.16em] text-[12px] text-[#7ed0a8]">
                100% 안전한 시연 환경
              </span>
            </div>
            <ul className="mt-2.5 space-y-1.5 font-inter text-[13px] text-white/85 leading-[1.45]">
              <li className="flex items-start gap-2">
                <CheckMark />
                <span>
                  <span className="text-white">카드 정보 일절 요구·입력 안 함</span>{" "}
                  — 화면 어디서도 카드 번호를 입력하지 않습니다
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckMark />
                <span>
                  <span className="text-white">실제 결제 절대 발생 안 함</span> —
                  Stripe 호출도 없는 가짜 처리 화면입니다
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckMark />
                <span>
                  <span className="text-white">개인정보 / 계정가입 없음</span> —
                  버튼 누르면 1.5초 후 결과 화면으로 자동 이동
                </span>
              </li>
            </ul>
            <p className="mt-3 pt-2.5 border-t border-[#7ed0a8]/15 font-inter text-[11px] text-white/45 leading-relaxed">
              ARITHMOS는 풍자적 컨셉의 포트폴리오 데모입니다. 안심하고
              눌러보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessingState({
  phaseIdx,
  done,
  isHalo,
}: {
  phaseIdx: number;
  done: boolean;
  isHalo: boolean;
}) {
  return (
    <div
      className={`w-full h-12 rounded-[12px] flex items-center justify-center gap-3 ${
        done
          ? "bg-[#1a3a2a] border border-[#7ed0a8]/40"
          : isHalo
            ? "gradient-holographic"
            : "bg-[#7b39fc]/20 border border-[#7b39fc]/40"
      }`}
    >
      {done ? (
        <CheckIcon />
      ) : (
        <span
          className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"
          aria-hidden="true"
        />
      )}
      <span
        className={`font-cabin text-[13px] font-medium ${
          done ? "text-[#7ed0a8]" : isHalo ? "text-black" : "text-white"
        }`}
      >
        {done ? "결제 승인 완료" : PROCESSING_PHASES[phaseIdx]}
      </span>
    </div>
  );
}

function BoltIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7ed0a8"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 mt-[3px]"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7ed0a8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 mt-0.5"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7ed0a8"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
