import { OPERATION_PRICES, formatKrw, type ArithmosModelId } from "@/lib/constants";
import type { CalcAction, CalcState } from "./calcReducer";
import { Keypad } from "./Keypad";
import type { CalcTheme } from "./themes";
import { RevealEffect } from "./effects/RevealEffect";
import { ReasoningPanel } from "./ReasoningPanel";

type Props = {
  modelId: ArithmosModelId;
  theme: CalcTheme;
  state: CalcState;
  dispatch: (action: CalcAction) => void;
  onRequestReveal: () => void;
  revealingValue: string | null;
  onRevealDone: () => void;
};

export function CalculatorFrame({
  modelId,
  theme,
  state,
  dispatch,
  onRequestReveal,
  revealingValue,
  onRevealDone,
}: Props) {
  const locked = state.pendingResult !== null;
  const thinking = state.phase === "thinking";
  const revealing = revealingValue !== null;
  const price = OPERATION_PRICES[modelId];

  const metaLabel = (() => {
    if (thinking) return "REASONING…";
    if (locked) return "공개 대기중";
    if (state.display === "Error") return "ERROR";
    if (state.operator && state.previous !== null) {
      return `${state.previous} ${state.operator}`;
    }
    return theme.label;
  })();

  return (
    <div className={`w-full max-w-[420px] ${theme.frameClass}`}>
      {theme.ambient === "ultra" ? <UltraAmbient /> : null}
      {theme.ambient === "quantum" ? <QuantumAmbient /> : null}
      {theme.ambient === "zero" ? <ZeroAmbient /> : null}

      <div className={theme.innerClass}>
        <div className={theme.displayWrapClass}>
          <div className="flex items-end justify-between gap-3">
            <span className={theme.displayMetaClass}>{metaLabel}</span>
            <span className={theme.displayTierClass}>{theme.tier}</span>
          </div>
          <div className="mt-2 text-right overflow-hidden relative">
            {revealing ? (
              <RevealEffect
                modelId={modelId}
                value={revealingValue}
                displayClass={theme.displayValueClass}
                onDone={onRevealDone}
              />
            ) : (
              <span
                className={`${theme.displayValueClass} transition-[filter,opacity] duration-300 ${
                  thinking
                    ? "blur-[10px] opacity-30 select-none"
                    : locked
                      ? "blur-[16px] opacity-70 select-none"
                      : ""
                }`}
                aria-hidden={thinking || locked}
              >
                {thinking ? "—" : state.display}
              </span>
            )}
          </div>
        </div>

        {thinking ? (
          <ReasoningPanel
            log={state.thinkingLog}
            expression={state.lastExpression}
            modelId={modelId}
          />
        ) : null}

        {state.errorMessage && !thinking ? (
          <div className="mt-3 px-3 py-2 rounded-[8px] bg-amber-500/10 border border-amber-400/20 font-inter text-[11px] text-amber-200/85 leading-relaxed">
            {state.errorMessage}
          </div>
        ) : null}

        {locked ? (
          <button
            type="button"
            onClick={onRequestReveal}
            className="mt-4 w-full h-12 rounded-[14px] bg-[#7b39fc] hover:bg-[#8d4dff] text-white font-cabin font-medium text-[14px] transition-colors shadow-[0_6px_22px_rgba(123,57,252,0.4)] flex items-center justify-center gap-2"
          >
            <LockIcon />
            {formatKrw(price)} 결제하고 결과 공개
          </button>
        ) : null}

        {theme.hasKeypad ? (
          <div className={locked || thinking ? "pointer-events-none opacity-55" : ""}>
            <Keypad theme={theme} dispatch={dispatch} />
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-3">
            <div
              aria-hidden="true"
              className="h-[2px] w-28 rounded-full bg-[#0a0a0a]/20"
            />
            <p className="font-cabin text-[11px] uppercase tracking-[0.28em] text-[#86868b]">
              Gesture Input Only
            </p>
            <p className="font-inter text-[12px] text-[#86868b] max-w-[260px] text-center leading-relaxed">
              Zero Button Interface™. 키보드 또는 Spatial Gesture로 입력하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UltraAmbient() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-[#7b39fc] opacity-40 blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-12 w-48 h-48 rounded-full bg-[#c9a961] opacity-20 blur-[80px]"
      />
    </>
  );
}

function QuantumAmbient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-45"
    >
      <div className="aurora-drift absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,110,199,0.5),rgba(168,85,247,0.5),rgba(59,130,246,0.5),rgba(6,182,212,0.5),rgba(16,185,129,0.5),rgba(245,158,11,0.5),rgba(255,110,199,0.5))] blur-3xl" />
    </div>
  );
}

function ZeroAmbient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-4 rounded-[32px] border border-black/5"
    />
  );
}
