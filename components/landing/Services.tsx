const services = [
  {
    title: "Four-Operation Arithmetic Engine™",
    body: "모든 ARITHMOS 모델은 Gemini 파운데이션 모델의 추론 능력을 활용해 사칙연산을 수행합니다. 전통적 전자계산기와는 근본적으로 다른, 추론 기반의 결과물을 제공합니다.",
  },
  {
    title: "Thinking Mode™ 시각화 파이프라인",
    body: "ARITHMOS Pro 이상의 모델에서 제공되는 독자 기술. 계산 과정의 모든 중간 단계를 실시간으로 시각화하여, 결과에 대한 완전한 투명성과 감사 추적 가능성을 보장합니다.",
  },
  {
    title: "전담 컨시어지 · 24/7",
    body: "Ultra 이상의 고객에게는 전담 어카운트 매니저가 배정됩니다. Quantum Edition은 추가로 AI 컨시어지가 24시간 상시 대기합니다. 한국어·영어·일본어 삼자 지원.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-[#0a0a0a] px-6 lg:px-[120px] py-16 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[720px]">
          <span className="font-cabin font-medium text-[14px] uppercase tracking-[0.18em] text-[#a48dd7]">
            핵심 기술
          </span>
          <h2 className="mt-4 font-instrument-serif text-white text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight">
            정밀함을 <em className="italic px-1">재정의</em>하는 세 가지 기술.
          </h2>
          <p className="mt-5 font-inter text-[17px] leading-relaxed text-white/60 max-w-[560px]">
            세 가지. 타협 없이. 그 외의 모든 것은 부차적인 요소입니다.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="rounded-[20px] border border-white/10 bg-white/[0.02] p-8 hover:border-[#7b39fc]/40 hover:bg-white/[0.04] transition-colors"
            >
              <span className="font-cabin font-medium text-[13px] text-[#a48dd7]">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-instrument-serif text-white text-2xl lg:text-[28px] leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 font-inter text-[15px] leading-relaxed text-white/60">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
