export function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center text-center px-6 mt-16 sm:mt-24 lg:mt-32 pb-12 sm:pb-20 lg:pb-24">
      <div className="inline-flex items-center gap-2 h-[38px] pl-[6px] pr-4 rounded-[10px] bg-[rgba(85,80,110,0.4)] backdrop-blur-md border border-[rgba(164,132,215,0.5)]">
        <span className="flex items-center h-[26px] px-2 rounded-[6px] bg-[#7b39fc] text-white font-cabin font-medium text-[12px] leading-none">
          NEW
        </span>
        <span className="font-cabin font-medium text-[14px] text-white">
          ARITHMOS Quantum Edition 정식 공개
        </span>
      </div>

      <h1 className="mt-8 font-instrument-serif text-white text-6xl sm:text-8xl lg:text-[160px] leading-[0.95] tracking-tight">
        ARITHMOS
      </h1>

      <p className="mt-6 font-instrument-serif text-white/85 text-3xl sm:text-4xl lg:text-[48px] leading-[1.1] tracking-tight max-w-[820px]">
        프리미엄 계산기
      </p>

      <div className="mt-8">
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
    </section>
  );
}
