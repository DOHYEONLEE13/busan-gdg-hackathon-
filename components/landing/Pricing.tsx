import Link from "next/link";
import { ARITHMOS_MODELS, formatKrw } from "@/lib/constants";

type Model = (typeof ARITHMOS_MODELS)[number];

export function Pricing() {
  const halo = ARITHMOS_MODELS.find((m) => m.id === "quantum");
  const others = ARITHMOS_MODELS.filter((m) => m.id !== "quantum");

  return (
    <section
      id="pricing"
      className="relative px-6 lg:px-[120px] py-16 lg:py-24 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle violet wash so this section reads distinct from Services
          and Reviews on either side. Stays well behind the cards. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#11091e] to-[#0a0a0a]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#7b39fc] opacity-[0.08] blur-[140px]"
      />

      <div className="relative max-w-[1280px] mx-auto">
        <div className="max-w-[760px]">
          <span className="font-cabin font-medium text-[14px] uppercase tracking-[0.18em] text-[#a48dd7]">
            요금제
          </span>
          <h2 className="mt-3 font-instrument-serif text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight">
            정밀함의 <em className="italic px-1">계급</em>을 선택하십시오.
          </h2>
          <p className="mt-4 font-inter text-[16px] leading-relaxed text-white/60 max-w-[560px]">
            다섯 개의 등급. 각각 다른 추론 깊이와 감각의 밀도. 모든 플랜은 월간
            구독 기준입니다.
          </p>
        </div>

        {halo ? (
          <div className="mt-12">
            <HaloCard model={halo} />
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((m) => (
            <CompactCard key={m.id} model={m} />
          ))}
        </div>

        <p className="mt-10 font-inter text-[12px] leading-relaxed text-white/35 max-w-[760px]">
          *모든 플랜은 ARITHMOS Internal Accuracy Standard v2.1을 준수합니다.
          연산당 결과 공개 시 별도의 소액 결제가 발생합니다 (시연 환경 — 실제
          청구 없음).
        </p>
      </div>
    </section>
  );
}

/* ─── Halo (Quantum) — wide, two-column layout ──────────────────────────────── */

function HaloCard({ model }: { model: Model }) {
  return (
    <div className="relative rounded-[24px] border border-[#a855f7]/40 bg-gradient-to-br from-[#1a1130] via-[#0f0a1f] to-[#0a0a0a] overflow-hidden shadow-[0_30px_80px_-20px_rgba(168,85,247,0.35)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full opacity-25 blur-[120px] bg-[conic-gradient(from_180deg_at_50%_50%,#ff6ec7,#a855f7,#3b82f6,#06b6d4,#10b981,#f59e0b,#ff6ec7)]"
      />

      <span className="absolute top-5 left-6 inline-flex items-center h-6 px-2.5 rounded-[6px] gradient-holographic text-black font-cabin font-semibold text-[10.5px] uppercase tracking-[0.14em]">
        {model.badge ?? "Halo Product"}
      </span>

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 p-8 pt-14 lg:p-10 lg:pt-14">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #ff6ec7, #a855f7, #3b82f6, #06b6d4, #10b981, #f59e0b, #ff6ec7)",
              }}
            />
            <span className="font-cabin font-medium text-[12px] uppercase tracking-[0.16em] text-white/55">
              {model.tier} · {model.material}
            </span>
          </div>

          <h3 className="mt-3 font-instrument-serif text-white text-[36px] lg:text-[44px] leading-[1.05] tracking-tight">
            <span className="gradient-holographic bg-clip-text text-transparent">
              {model.name}
            </span>
          </h3>
          <p className="mt-3 font-inter text-[15.5px] leading-relaxed text-white/65 max-w-[460px]">
            {model.tagline}
          </p>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
            {model.features.slice(0, 6).map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 font-inter text-[13.5px] leading-relaxed text-white/75"
              >
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-6 lg:items-end">
          <div className="lg:text-right">
            <div className="font-cabin uppercase tracking-[0.18em] text-[10.5px] text-white/40">
              Monthly Subscription
            </div>
            <div className="mt-1 flex items-baseline gap-1 lg:justify-end">
              <span className="font-instrument-serif text-white text-[52px] lg:text-[60px] leading-none">
                {formatKrw(model.price)}
              </span>
              <span className="font-manrope text-[14px] text-white/45">
                {model.period}
              </span>
            </div>
            <p className="mt-2 font-inter text-[12.5px] text-white/40 max-w-[260px] lg:ml-auto">
              VAT 별도 · 연간 약정 시 별도 견적
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-auto lg:min-w-[220px]">
            <Link
              href={`/models/${model.id}`}
              className="h-12 inline-flex items-center justify-center rounded-[12px] gradient-holographic text-black font-manrope font-semibold text-[14.5px] hover:opacity-95 transition-opacity shadow-[0_8px_28px_rgba(168,85,247,0.4)]"
            >
              자세히 보기
            </Link>
            <Link
              href="/#contact"
              className="h-10 inline-flex items-center justify-center rounded-[12px] border border-white/15 bg-white/5 text-white font-manrope font-medium text-[13px] hover:bg-white/10 hover:border-white/25 transition-colors"
            >
              도입 문의 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Compact (One / Pro / Ultra / Zero) — 4-column row ─────────────────────── */

function CompactCard({ model }: { model: Model }) {
  const isPopular = model.badge === "Most Popular";

  return (
    <div
      className={`relative flex flex-col rounded-[16px] p-5 transition-colors ${
        isPopular
          ? "border border-[#7b39fc]/45 bg-gradient-to-b from-[#1a1130] via-[#0f0a1f] to-[#0a0a0a] hover:border-[#7b39fc]/65"
          : "border border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
      }`}
    >
      {model.badge ? (
        <span
          className={`absolute -top-2.5 left-5 inline-flex items-center h-5 px-2 rounded-[5px] font-cabin font-medium text-[10px] uppercase tracking-[0.12em] ${
            isPopular
              ? "bg-[#7b39fc] text-white"
              : "bg-white/10 text-white/80 border border-white/15"
          }`}
        >
          {model.badge}
        </span>
      ) : null}

      <div className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: model.color as string }}
        />
        <span className="font-cabin font-medium text-[10.5px] uppercase tracking-[0.14em] text-white/45">
          {model.tier}
        </span>
      </div>

      <h3 className="mt-2 font-instrument-serif text-white text-[22px] leading-tight">
        {model.name.replace("ARITHMOS ", "")}
      </h3>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-instrument-serif text-white text-[28px] leading-none">
          {formatKrw(model.price)}
        </span>
        <span className="font-manrope text-[12px] text-white/45">
          {model.period}
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-1.5">
        {model.features.slice(0, 3).map((f) => (
          <li
            key={f}
            className="flex items-start gap-1.5 font-inter text-[12px] leading-relaxed text-white/65"
          >
            <CheckIcon small />
            <span className="line-clamp-2">{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/models/${model.id}`}
        className={`mt-auto pt-5 inline-flex items-center justify-center h-9 rounded-[10px] font-manrope font-medium text-[12.5px] transition-colors ${
          isPopular
            ? "bg-[#7b39fc] text-white hover:bg-[#8d4dff]"
            : "bg-white/8 text-white border border-white/15 hover:bg-white/15 hover:border-white/25"
        }`}
      >
        자세히 보기 →
      </Link>
    </div>
  );
}

function CheckIcon({ small }: { small?: boolean }) {
  const size = small ? 12 : 16;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a48dd7"
      strokeWidth={small ? 2.8 : 2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
