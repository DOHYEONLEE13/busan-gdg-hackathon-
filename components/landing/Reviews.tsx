const reviews = [
  {
    quote:
      "재무팀 전원의 기본 계산기를 ARITHMOS One으로 일괄 교체한 뒤, 월별 결산 리포트의 신뢰도가 체감 가능한 수준으로 올라갔습니다. Gemini 추론 기반 결과는 기존 전자계산기의 한계를 뛰어넘습니다.",
    name: "김 지훈",
    role: "메리디안 캐피탈 · CFO",
  },
  {
    quote:
      "Ultra 모델의 Liquid Glass 섀시와 Dolby Atmos 계산 사운드는 처음엔 과하다고 생각했습니다. 3개월 사용 후, 이제 일반 계산기로는 돌아갈 수 없다는 결론에 도달했습니다.",
    name: "정 서연",
    role: "Parallel Design Studio · 대표",
  },
  {
    quote:
      "Quantum Edition의 확률적 계산 엔진은 저희 전략 자문 업무의 감사(監査) 기준을 바꿨습니다. 불확실성 밴드를 함께 제공하는 계산기는 현재 업계에 존재하지 않습니다.",
    name: "이 준혁",
    role: "오레올 캐피탈 · 매니징 파트너",
  },
];

export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative bg-[#0a0a0a] px-6 lg:px-[120px] py-16 lg:py-24 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-[620px]">
            <span className="font-cabin font-medium text-[14px] uppercase tracking-[0.18em] text-[#a48dd7]">
              도입 사례
            </span>
            <h2 className="mt-4 font-instrument-serif text-white text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight">
              조용한 브랜드의 <em className="italic px-1">선택.</em>
            </h2>
          </div>
          <p className="font-inter text-[15px] text-white/50 max-w-[340px]">
            프라이빗 멤버 인덱스에서 발췌. 실명 및 기업명은 요청 시 확인
            가능합니다.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="rounded-[20px] border border-white/10 bg-white/[0.02] p-8 flex flex-col"
            >
              <Quote />
              <blockquote className="mt-5 font-inter text-[15px] leading-relaxed text-white/80 flex-1">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-white/10">
                <div className="font-manrope font-semibold text-[14px] text-white">
                  {r.name}
                </div>
                <div className="mt-1 font-inter text-[13px] text-white/50">
                  {r.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 22V13.2c0-3.6.72-6.72 2.16-9.36C3.72 1.44 6.12 0 9.36 0v4.32c-2.04.6-3.48 1.74-4.32 3.42-.36.72-.54 1.62-.54 2.7h4.86V22H0zm15.72 0v-8.8c0-3.6.72-6.72 2.16-9.36C19.44 1.44 21.84 0 25.08 0v4.32c-2.04.6-3.48 1.74-4.32 3.42-.36.72-.54 1.62-.54 2.7h4.86V22h-9.36z"
        fill="#7b39fc"
      />
    </svg>
  );
}
