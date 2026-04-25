export function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center text-center px-6 mt-14 sm:mt-20 lg:mt-24 pb-12 sm:pb-16 lg:pb-20">
      <div className="inline-flex items-center gap-2 h-[34px] pl-[5px] pr-3.5 rounded-[10px] bg-[rgba(85,80,110,0.4)] backdrop-blur-md border border-[rgba(164,132,215,0.5)]">
        <span className="flex items-center h-[22px] px-2 rounded-[6px] bg-[#7b39fc] text-white font-cabin font-medium text-[11px] leading-none">
          NEW
        </span>
        <span className="font-cabin font-medium text-[13px] text-white">
          ARITHMOS Quantum Edition 정식 공개
        </span>
      </div>

      <h1 className="mt-6 font-instrument-serif text-white text-6xl sm:text-8xl lg:text-[120px] leading-[0.95] tracking-tight">
        ARITHMOS
      </h1>

      <p className="mt-4 font-instrument-serif text-white/85 text-2xl sm:text-3xl lg:text-[36px] leading-[1.1] tracking-tight">
        프리미엄 계산기
      </p>

      <div className="mt-7">
        <a
          href="/calculator"
          className="group relative inline-flex items-center justify-center h-12 px-7 rounded-[12px] border border-white/25 bg-white/10 backdrop-blur-xl text-white font-cabin font-medium text-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.06),0_6px_24px_rgba(123,57,252,0.18)] hover:bg-white/15 hover:border-white/35 transition-[background-color,border-color] overflow-hidden"
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80"
            aria-hidden="true"
          />
          <span className="relative">계산기 이용하기</span>
        </a>
      </div>

      <p className="mt-4 font-inter text-[13.5px] sm:text-[14.5px] text-white/65 max-w-[480px] leading-relaxed">
        <span className="inline-flex items-center gap-1.5 mr-2 px-2 py-0.5 rounded-[6px] bg-white/10 border border-white/15 font-cabin font-medium text-[10.5px] uppercase tracking-[0.14em] text-[#c9b6f0] align-[1px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a48dd7] animate-pulse" />
          Gemini 2.5 Pro
        </span>
        Google Gemini 2.5 Pro 추론 엔진을 탑재한
        <span className="text-white"> 최고급 프리미엄 계산기</span>입니다.
      </p>
    </section>
  );
}
