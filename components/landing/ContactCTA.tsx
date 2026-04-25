"use client";

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative bg-[#0a0a0a] px-6 lg:px-[120px] py-16 lg:py-24 border-t border-white/5"
    >
      <div className="relative max-w-[1200px] mx-auto rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2b2344] via-[#3b2a5e] to-[#1a1530] border border-white/10 p-10 lg:p-20">
        <div
          className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#7b39fc] opacity-30 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-[760px]">
          <span className="font-cabin font-medium text-[14px] uppercase tracking-[0.18em] text-[#c9b6f0]">
            도입 문의
          </span>
          <h2 className="mt-4 font-instrument-serif text-white text-4xl sm:text-5xl lg:text-[72px] leading-[1.05] tracking-tight">
            확신이 필요한 <em className="italic px-1">계산</em>이 있다면.
          </h2>
          <p className="mt-6 font-inter text-[17px] leading-relaxed text-white/75 max-w-[540px]">
            업무 환경과 팀 규모, 월간 계산 볼륨을 알려주세요. 영업일 기준
            1시간 이내에 적합한 모델 제안과 도입 견적을 회신드립니다.
          </p>

          <form
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-[560px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 h-12 px-4 rounded-[10px] bg-white/10 border border-white/15 text-white placeholder:text-white/40 font-inter text-[15px] outline-none focus:border-[#a48dd7] focus:bg-white/15 transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-[10px] bg-[#7b39fc] text-white font-cabin font-medium text-[16px] hover:bg-[#8d4dff] transition-colors shadow-[0_4px_20px_rgba(123,57,252,0.35)]"
            >
              도입 상담 요청
            </button>
          </form>
          <p className="mt-4 font-inter text-[13px] text-white/40">
            초대 기반 서비스. 모든 문의는 담당자가 직접 검토합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
