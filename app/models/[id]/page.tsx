import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ARITHMOS_MODELS, BACKGROUND_VIDEO_SRC } from "@/lib/constants";
import { Footer } from "@/components/landing/Footer";

type PageParams = { id: string };

export function generateStaticParams() {
  return ARITHMOS_MODELS.map((m) => ({ id: m.id }));
}

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const model = ARITHMOS_MODELS.find((m) => m.id === id);
  if (!model) return { title: "모델을 찾을 수 없습니다" };
  return {
    title: `${model.name} — ${model.tier}`,
    description: model.tagline,
  };
}

export default async function ModelPage(props: {
  params: Promise<PageParams>;
}) {
  const { id } = await props.params;
  const model = ARITHMOS_MODELS.find((m) => m.id === id);
  if (!model) notFound();

  const isHolographic = model.color === "holographic";
  const accent = isHolographic ? "#a855f7" : (model.color as string);

  return (
    <main className="relative bg-[#0a0a0a] min-h-screen">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 lg:px-[120px] pt-8 pb-6">
        <Link
          href="/"
          className="font-manrope text-[13px] text-white/60 hover:text-white transition-colors"
        >
          ← 홈으로
        </Link>
        <Link
          href="/"
          className="inline-flex items-baseline font-instrument-serif text-white text-[22px] leading-none tracking-tight"
        >
          ARITHMOS
          <sup className="ml-0.5 text-[10px] font-manrope align-top translate-y-[1px]">
            ™
          </sup>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative px-6 lg:px-[120px] pt-8 pb-16 sm:pt-10 sm:pb-24 lg:pb-28 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={BACKGROUND_VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Legibility scrim — keep hero copy readable on top of motion. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0a0a0a]"
        />
        <AccentGlow accent={accent} isHolographic={isHolographic} />

        <div className="relative max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="font-cabin uppercase tracking-[0.3em] text-[11px]"
              style={{ color: accent }}
            >
              {model.tier}
            </span>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            <span className="font-cabin uppercase tracking-[0.22em] text-[11px] text-white/50">
              {model.material}
            </span>
            {model.badge ? (
              <>
                <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                <span
                  className="font-cabin uppercase tracking-[0.2em] text-[11px]"
                  style={{ color: accent }}
                >
                  {model.badge}
                </span>
              </>
            ) : null}
          </div>

          <h1
            className={`mt-8 font-instrument-serif text-white leading-[0.95] tracking-tight text-6xl sm:text-7xl lg:text-[128px] ${
              isHolographic
                ? "bg-clip-text text-transparent gradient-holographic"
                : ""
            }`}
          >
            {model.name.replace("ARITHMOS ", "")}
          </h1>

          <p className="mt-6 font-instrument-serif text-white/80 text-2xl sm:text-3xl lg:text-[38px] leading-[1.15] max-w-[820px]">
            {model.tagline}
          </p>

          <div className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-6">
            <div>
              <div className="font-cabin uppercase tracking-[0.22em] text-[10px] text-white/40">
                Subscription
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-instrument-serif text-white text-5xl lg:text-[64px] leading-none tracking-tight">
                  {model.priceLabel}
                </span>
                <span className="font-cabin text-white/50 text-[14px]">
                  {model.period}
                </span>
              </div>
              <div className="mt-2 font-inter text-[12px] text-white/35">
                연간 약정 · VAT 별도 · 기업 단가 별도 협의
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/checkout?model=${model.id}`}
                className="h-12 px-6 inline-flex items-center justify-center rounded-[10px] bg-[#7b39fc] text-white font-cabin font-medium text-[15px] hover:bg-[#8d4dff] transition-colors shadow-[0_4px_20px_rgba(123,57,252,0.35)]"
              >
                도입 구독 시작
              </Link>
              <Link
                href="/calculator"
                className="h-12 px-6 inline-flex items-center justify-center rounded-[10px] bg-white/5 border border-white/15 text-white font-cabin font-medium text-[15px] hover:bg-white/10 transition-colors"
              >
                계산기에서 체험
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="relative px-6 lg:px-[120px] py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
            <div className="max-w-[420px]">
              <span className="font-cabin uppercase tracking-[0.3em] text-[11px] text-white/50">
                Specifications
              </span>
              <h2 className="mt-4 font-instrument-serif text-white text-4xl lg:text-[52px] leading-[1.05] tracking-tight">
                기술 사양.
              </h2>
            </div>

            <dl className="flex-1 max-w-[680px] divide-y divide-white/10">
              <SpecRow label="정확도" value={model.specs.accuracy} />
              <SpecRow label="연산 레이턴시" value={model.specs.latency} />
              <SpecRow label="지원 연산" value={model.specs.operations} />
              <SpecRow label="디스플레이" value={model.specs.display} />
              <SpecRow label="서포트" value={model.specs.support} />
              <SpecRow
                label="파운데이션 모델"
                value={model.geminiModel}
                mono
              />
              <SpecRow label="섀시 소재" value={model.material} />
            </dl>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 lg:px-[120px] py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px]">
            <span className="font-cabin uppercase tracking-[0.3em] text-[11px] text-white/50">
              Features
            </span>
            <h2 className="mt-4 font-instrument-serif text-white text-4xl lg:text-[52px] leading-[1.05] tracking-tight">
              포함된 기술.
            </h2>
            <p className="mt-5 font-inter text-[15px] text-white/55 leading-relaxed">
              본 모델에 포함된 엔터프라이즈 계산 지능 피처 목록입니다. 기술 문의는
              전담 어카운트 매니저를 통해 회신됩니다.
            </p>
          </div>

          <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
            {model.features.map((feature, i) => (
              <li
                key={feature}
                className="rounded-[18px] border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="font-instrument-serif text-3xl leading-none"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-inter text-[15px] text-white/85 leading-relaxed pt-1">
                    {feature}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 lg:px-[120px] py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#2b2344] via-[#3b2a5e] to-[#1a1530] border border-white/10 p-10 lg:p-16">
            <div
              className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full opacity-35 blur-[120px] pointer-events-none"
              style={{ backgroundColor: isHolographic ? "#a855f7" : accent }}
              aria-hidden="true"
            />
            <div className="relative max-w-[720px]">
              <span className="font-cabin uppercase tracking-[0.3em] text-[11px] text-[#c9b6f0]">
                Next Step
              </span>
              <h2 className="mt-4 font-instrument-serif text-white text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight">
                {model.name}을 <em className="italic">도입</em>하세요.
              </h2>
              <p className="mt-5 font-inter text-[17px] text-white/70 leading-relaxed max-w-[540px]">
                기업 단위 도입, 사용자 수 기반 단가, 전담 온보딩 세션 등
                자세한 조건은 영업 담당이 회신합니다.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/checkout?model=${model.id}`}
                  className="h-12 px-6 inline-flex items-center justify-center rounded-[10px] bg-[#7b39fc] text-white font-cabin font-medium text-[15px] hover:bg-[#8d4dff] transition-colors shadow-[0_4px_20px_rgba(123,57,252,0.35)]"
                >
                  도입 구독 시작
                </Link>
                <Link
                  href="/#contact"
                  className="h-12 px-6 inline-flex items-center justify-center rounded-[10px] bg-white/10 border border-white/20 text-white font-cabin font-medium text-[15px] hover:bg-white/15 transition-colors"
                >
                  기업 단가 문의
                </Link>
              </div>
              <p className="mt-5 font-inter text-[12px] text-white/40">
                본 프로젝트는 데모 구현으로 Stripe Test Mode를 사용합니다. 실제
                결제는 발생하지 않습니다.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {ARITHMOS_MODELS.filter((m) => m.id !== model.id).map((m) => (
              <Link
                key={m.id}
                href={`/models/${m.id}`}
                className="px-4 py-2 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 font-cabin text-[13px] text-white/70 hover:text-white transition-colors"
              >
                {m.name.replace("ARITHMOS ", "")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SpecRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="py-5 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
      <dt className="font-cabin uppercase tracking-[0.22em] text-[11px] text-white/45">
        {label}
      </dt>
      <dd
        className={`text-white/90 text-[15px] sm:text-right ${
          mono ? "font-mono" : "font-inter"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function AccentGlow({
  accent,
  isHolographic,
}: {
  accent: string;
  isHolographic: boolean;
}) {
  if (isHolographic) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
      >
        <div className="aurora-drift absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,110,199,0.6),rgba(168,85,247,0.6),rgba(59,130,246,0.6),rgba(6,182,212,0.6),rgba(16,185,129,0.6),rgba(245,158,11,0.6),rgba(255,110,199,0.6))]" />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-32 right-[-10%] w-[520px] h-[520px] rounded-full opacity-25 blur-[120px]"
      style={{ backgroundColor: accent }}
    />
  );
}
