import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "이 프로젝트에 대하여",
  description:
    "ARITHMOS는 풍자적 컨셉의 포트폴리오 데모입니다. Gemini 2.5 Pro로 사칙연산을 추론하고 ₩1,000~₩200,000을 받는 진지한 럭셔리 SaaS의 외피.",
};

export default function AboutPage() {
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
      <section className="relative px-6 lg:px-[120px] pt-8 pb-12 sm:pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[-10%] w-[520px] h-[520px] rounded-full opacity-20 blur-[120px] bg-[#a48dd7]"
        />
        <div className="relative max-w-[860px] mx-auto">
          <span className="font-cabin uppercase tracking-[0.3em] text-[11px] text-[#a48dd7]">
            About this project
          </span>
          <h1 className="mt-5 font-instrument-serif text-white text-4xl sm:text-5xl lg:text-[68px] leading-[1.05] tracking-tight">
            이 사이트는 <em className="italic">농담</em>입니다.
          </h1>
          <p className="mt-6 font-inter text-[17px] sm:text-[18px] text-white/75 leading-[1.6] max-w-[680px]">
            정확하게는 — <span className="text-white">진지한 표정으로 만든
            농담</span>입니다. ARITHMOS™는 사칙연산 계산기 한 번 쓸 때마다
            ₩1,000에서 ₩200,000까지 받는 풀스택 SaaS의 외피를 빌려, "AI를
            어디까지 비싸게 포장할 수 있는가"를 묻는 풍자적 데모입니다.
          </p>
        </div>
      </section>

      {/* What is real */}
      <Section
        eyebrow="What's actually real"
        title={<>그래도 <em className="italic">진짜로</em> 동작합니다.</>}
      >
        <Grid>
          <Block
            label="01"
            title="Google Gemini 2.5 Pro 추론"
            body="모든 계산은 실제 Gemini API에 스트리밍 호출됩니다. 모델별로 Gemini 1.5 Flash / 2.0 Flash / 2.5 Pro가 매핑되고, Pro·Ultra·Quantum 등급은 Thinking Mode (extended reasoning)도 활성화됩니다."
          />
          <Block
            label="02"
            title="Stripe Embedded Checkout"
            body={
              <>
                실제 Stripe SDK가 연동되어 있으며,{" "}
                <code className="font-mono text-[13px] px-1 py-[1px] rounded bg-white/5 border border-white/10">
                  ?stripe=1
                </code>{" "}
                URL 파라미터로 활성화하면 실제 결제 iframe이 열립니다 (테스트
                모드, 실제 청구 없음). 데모 평가에선 마찰 0의 가짜 결제 화면이
                기본이고, 진짜 통합은 별도 토글로 검증 가능합니다.
              </>
            }
          />
          <Block
            label="03"
            title="Cloudflare Workers SSR"
            body="Next.js 16 App Router를 OpenNext 어댑터로 Cloudflare Workers에 배포. 정적 자산은 Workers Assets, API 라우트는 Worker 핸들러로 분리되어 글로벌 엣지에서 서빙됩니다."
          />
          <Block
            label="04"
            title="티어별 Reveal Ceremony"
            body="결제 후 결과 공개에 모델별 다른 애니메이션이 재생됩니다. Quantum은 hex 글리프 스크램블 → 캐스케이드 lock-in → 홀로그래픽 결과 + Certificate of Computation™ 카드까지."
          />
        </Grid>
      </Section>

      {/* The joke */}
      <Section eyebrow="The joke" title={<>왜 이런 걸 만들었나요?</>}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
          <p className="font-inter text-[15.5px] text-white/75 leading-[1.65]">
            출발점은 단순한 관찰이었습니다. AI 회사들의 가격 페이지에 등장하는
            "Enterprise · Custom Pricing · Talk to sales · Quantum-grade
            inference" 같은 표현이, 만약 정말로{" "}
            <span className="text-white">사칙연산</span>에 적용된다면 어떻게
            보일까?
          </p>
          <p className="font-inter text-[15.5px] text-white/75 leading-[1.65]">
            ARITHMOS는 그 가설을 끝까지 밀어붙인 결과물입니다. "Liquid Glass
            Chassis", "Probabilistic Calculation Engine v3", "Certificate of
            Computation™ NFT" — 모든 카피는 의도적으로 진지하고, 단 한 번도
            카메라를 향해 윙크하지 않습니다.
          </p>
          <p className="font-inter text-[15.5px] text-white/75 leading-[1.65]">
            톤이 무너지는 순간 농담도 무너지므로, 디자인 시스템 · 결제 흐름 ·
            telemetry 게이지 · CS 카피 모두 실제 B2B 제품처럼 만들었습니다.
            모순이 즐거움의 출처입니다.
          </p>
          <p className="font-inter text-[15.5px] text-white/75 leading-[1.65]">
            결과 공개 직후 뜨는 "그 귀한 토큰 써서 고작 2+1 하셨군요 ㅎㅎ"
            토스트가 유일한 공식 wink입니다 — 그것조차 결제가 끝난{" "}
            <em>다음에야</em> 등장합니다.
          </p>
        </div>
      </Section>

      {/* Stack */}
      <Section eyebrow="Tech stack" title={<>어떻게 만들었나요?</>}>
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          <Spec
            label="Framework"
            value="Next.js 16"
            note="App Router · RSC · Turbopack"
          />
          <Spec
            label="Language"
            value="TypeScript"
            note="strict mode, no any"
          />
          <Spec
            label="Hosting"
            value="Cloudflare Workers"
            note="@opennextjs/cloudflare 어댑터"
          />
          <Spec
            label="AI"
            value="Google Gemini"
            note="@google/genai · Flash 1.5 / 2.0 · Pro 2.5"
          />
          <Spec
            label="Payments"
            value="Stripe"
            note="Test mode only · sk_test_*"
          />
          <Spec
            label="3D / Motion"
            value="React Three Fiber"
            note="Three.js · Drei · Framer Motion"
          />
          <Spec
            label="Styling"
            value="Tailwind CSS v4"
            note="CSS-based config · Inter / Instrument Serif / Pretendard"
          />
          <Spec
            label="Database"
            value="Supabase"
            note="Postgres · 현재는 미사용 (스키마만 준비)"
          />
          <Spec
            label="Edge runtime"
            value="nodejs_compat"
            note="Workers 위 Stripe SDK fetch HTTP client"
          />
        </dl>
      </Section>

      {/* Maker */}
      <Section eyebrow="Maker" title={<>만든 사람</>}>
        <div className="rounded-[20px] border border-white/10 bg-white/[0.02] p-7 lg:p-9 max-w-[720px]">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7b39fc] via-[#a48dd7] to-[#c9a961] grid place-items-center font-instrument-serif text-white text-[20px]"
            >
              D
            </div>
            <div>
              <div className="font-instrument-serif text-white text-[22px]">
                이도현
              </div>
              <div className="font-cabin uppercase tracking-[0.18em] text-[11px] text-white/45">
                DOHYEONLEE13
              </div>
            </div>
          </div>

          <p className="mt-6 font-inter text-[15px] text-white/70 leading-[1.65]">
            부산 GDG 해커톤 출품작으로 시작했고, 풀스택 데모 + 풍자적 카피 +
            티어별 인터랙션 디자인의 합으로 완성했습니다. 의견·피드백 환영합니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/DOHYEONLEE13/busan-gdg-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 inline-flex items-center gap-2 rounded-[10px] bg-white/8 border border-white/15 text-white font-manrope font-medium text-[13px] hover:bg-white/15 hover:border-white/25 transition-colors"
            >
              <GithubIcon />
              GitHub Repository
            </a>
            <a
              href="mailto:dohyeonlee13@gmail.com"
              className="h-10 px-4 inline-flex items-center gap-2 rounded-[10px] bg-white/8 border border-white/15 text-white font-manrope font-medium text-[13px] hover:bg-white/15 hover:border-white/25 transition-colors"
            >
              dohyeonlee13@gmail.com
            </a>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <section className="relative px-6 lg:px-[120px] py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-[860px] mx-auto rounded-[16px] border border-[#7ed0a8]/25 bg-[#7ed0a8]/[0.05] p-6 lg:p-8">
          <div className="flex items-center gap-2.5">
            <ShieldIcon />
            <span className="font-cabin font-semibold uppercase tracking-[0.18em] text-[12px] text-[#7ed0a8]">
              Safety & Disclaimer
            </span>
          </div>
          <ul className="mt-4 space-y-2.5 font-inter text-[14.5px] text-white/80 leading-[1.55]">
            <li className="flex items-start gap-2.5">
              <CheckMark />
              <span>
                <span className="text-white">실제 결제 발생 안 함</span> —
                Stripe Test Mode (
                <code className="font-mono text-[12px] px-1 rounded bg-white/5">
                  sk_test_*
                </code>
                )만 사용. Live 키 사용은 코드 레벨에서 차단.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckMark />
              <span>
                <span className="text-white">데모 결제 화면은 가짜</span> —
                기본 결제 흐름은 ARITHMOS Payment Authorization (UI만 결제처럼
                보이는 가짜 시퀀스)이며, Stripe API 호출도 발생하지 않습니다.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckMark />
              <span>
                <span className="text-white">개인정보 수집 없음</span> — 회원가입,
                계정 시스템 일절 없음. 입력하신 계산식은 Gemini API로만 전송되며
                서버에 저장되지 않습니다.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckMark />
              <span>
                <span className="text-white">제품 카피는 풍자</span> — "ARITHMOS
                Internal Accuracy Standard v2.1", "Liquid Glass Chassis", 등의
                기술 명칭은 모두 가상입니다. 실제 제품/표준이 아닙니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ─── Layout primitives ─────────────────────────────────────────────────────── */

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative px-6 lg:px-[120px] py-14 lg:py-20 border-t border-white/5">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <span className="font-cabin uppercase tracking-[0.3em] text-[11px] text-white/50">
              {eyebrow}
            </span>
            <h2 className="mt-3 font-instrument-serif text-white text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] tracking-tight">
              {title}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
      {children}
    </div>
  );
}

function Block({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.02] p-6 lg:p-7 hover:bg-white/[0.04] transition-colors">
      <span className="font-cabin font-medium text-[12px] tracking-[0.18em] text-[#a48dd7]">
        {label}
      </span>
      <h3 className="mt-3 font-instrument-serif text-white text-[22px] leading-tight">
        {title}
      </h3>
      <p className="mt-3 font-inter text-[14.5px] text-white/70 leading-[1.65]">
        {body}
      </p>
    </div>
  );
}

function Spec({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="border-t border-white/10 pt-4">
      <dt className="font-cabin uppercase tracking-[0.18em] text-[10.5px] text-white/45">
        {label}
      </dt>
      <dd className="mt-1 font-instrument-serif text-white text-[20px] leading-tight">
        {value}
      </dd>
      <dd className="mt-1 font-inter text-[12.5px] text-white/50 leading-relaxed">
        {note}
      </dd>
    </div>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────────────── */

function GithubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.17.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.48 3.16-1.17 3.16-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.4-2.7 5.36-5.27 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7ed0a8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
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
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 mt-[5px]"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
