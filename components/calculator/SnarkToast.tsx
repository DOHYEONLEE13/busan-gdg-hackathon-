"use client";

import { useEffect } from "react";
import type { ArithmosModelId } from "@/lib/constants";

type Props = {
  modelId: ArithmosModelId;
  expression: string;
  value: string;
  onDismiss: () => void;
};

/* Tier-specific snark — pricier the model, more elaborate the
   theatrical infrastructure the joke flexes. Two variants per tier,
   picked by a tiny hash so repeats don't always say the same thing. */
const SNARK: Record<
  ArithmosModelId,
  ReadonlyArray<(e: string, v: string) => string>
> = {
  one: [
    (e, v) => `그 귀한 ₩1,000을 써서 고작 ${e} 계산하셨군요. 답: ${v}. 축하합니다 ㅎㅎ`,
    (e) => `Gemini 1.5 Flash가 ${e} 풀어드리느라 ₩1,000 가져갔습니다. 잘 쓰셨어요 ㅎㅎ`,
  ],
  zero: [
    (e, v) => `허공에 ${e} 그리느라 ₩9,900 결제하셨네요. 결과 ${v}, 손가락 잘 움직이셨습니다 ㅎㅎ`,
    () => `₩9,900짜리 제스처 한 번. 버튼이 없으니 더 비싼 거 아시죠? ㅎㅎ`,
  ],
  pro: [
    (e, v) => `Pro Thinking Mode가 8.2초간 고심해서 도출한 답: ${v}. ${e} 한 번에 ₩10,000입니다 ㅎㅎ`,
    () => `Calculation History Ledger™에 영구 기록되었습니다. ₩10,000짜리 추억 하나 추가요 ㅎㅎ`,
  ],
  ultra: [
    (e, v) => `Liquid Glass + Dolby Atmos 풀가동해서 ${e} 답 도출하셨습니다. ₩50,000짜리 ${v}, 어떠신가요? ㅎㅎ`,
    () => `전담 어카운트 매니저가 방금 결제 알림 받았습니다. ₩50,000 잘 쓰셨다고 인사드릴 거예요 ㅎㅎ`,
  ],
  quantum: [
    (e, v) => `Quantum 8코어 + Holographic 추론 엔진 풀가동해서 ${e} = ${v} 도출. ₩200,000입니다 ㅎㅎ`,
    () => `Certificate of Computation™ NFT가 발급되었습니다. ₩200,000짜리 디지털 자산 생성 축하드려요 ㅎㅎ`,
  ],
};

function pickVariant<T>(arr: ReadonlyArray<T>, seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return arr[Math.abs(h) % arr.length];
}

export function SnarkToast({ modelId, expression, value, onDismiss }: Props) {
  useEffect(() => {
    const t = window.setTimeout(onDismiss, 6500);
    return () => window.clearTimeout(t);
  }, [onDismiss]);

  const text = pickVariant(SNARK[modelId], expression + value)(
    expression,
    value,
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-10 left-1/2 z-30 w-[calc(100%-24px)] max-w-[640px] rounded-[20px] bg-[#15101e]/95 backdrop-blur-md border border-[#7b39fc]/40 shadow-[0_24px_80px_rgba(123,57,252,0.5)] px-7 py-6 flex items-start gap-4 animate-[snark-rise_360ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
    >
      <span aria-hidden="true" className="text-[34px] leading-none mt-0.5">
        🎉
      </span>
      <p className="flex-1 font-inter text-[16px] sm:text-[17px] text-white/95 leading-[1.55] font-medium">
        {text}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="닫기"
        className="shrink-0 w-8 h-8 -mt-1 -mr-2 rounded-full text-white/55 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </svg>
      </button>
    </div>
  );
}
