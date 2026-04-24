# ARITHMOS™

> **Beyond Numbers. 계산, 그 이상의 계산.**
>
> 사칙연산을 ₩49,000/월부터 ₩2,490,000/월에 파는 엔터프라이즈 계산 지능 플랫폼.
> 그리고 구독과 **별개로**, 계산 한 번마다 따로 결제해야 답을 알려줍니다.

[**Useless AI Championship**](https://useless-ai.dev) 출품작 · 부산 GDG 해커톤 제출

---

## 프로젝트 소개

**ARITHMOS™**는 "생성형 AI + 프리미엄 SaaS" 문법을 극한까지 밀어붙인 **풍자형 웹 애플리케이션**입니다.

표면적으로는 진지한 B2B 엔터프라이즈 SaaS — 다섯 가지 모델 라인업, 월 구독 요금제, Liquid Glass 섀시, Thinking Mode™ 시각화, 24/7 컨시어지, NFT Certificate of Computation™을 갖춘 계산기 제품을 팝니다.

실제로 하는 일은 **그냥 2 + 2를 계산하는 것**. 그것도 결과를 알려주는 대가로 **매 연산마다 추가 결제**를 요구합니다.

모든 카피는 100% 진지한 럭셔리 B2B 톤 — 한 줄의 농담도, 윙크도 없이. 이 **과잉된 진지함 자체가 이 프로젝트의 유머**입니다.

## 왜 만들었나

2024–2025 동안 업계에 만연한 두 가지 클리셰를 겨냥했습니다.

1. **"AI"라는 이름만 붙이면 모든 것이 프리미엄이 되는 시대** — 단순 CRUD에 GPT 호출 한 번 끼얹고 가격을 10배 매기는 SaaS 문화
2. **럭셔리 제품 언어의 인플레이션** — "Liquid Glass", "Holographic Iridescent", "Probabilistic Engine" 같은 공허한 형용사로 평범한 제품을 포장하는 관행

ARITHMOS는 이 두 문법을 **계산기라는 가장 기초적인 도구**에 과다 적용해, 벤치마크 수치, 무관한 기술 스택, 추상적 벤더 네이밍이 실질 가치 없이도 "프리미엄"을 만들어낸다는 점을 **거울처럼 되비춥니다**.

"계산마다 결제" 기능은 이 풍자의 정점입니다 — 월 구독을 이미 하고 있음에도 답을 보려면 한 번 더 돈을 내야 하는, **문자 그대로 쓸모없는 SaaS**.

## 핵심 기능

### 랜딩 페이지 — `/`
- **Full-screen 비디오 배경** (`object-cover`, autoplay/loop/muted)
- Instrument Serif 160px `ARITHMOS` 워드마크 + 태그라인
- Services (핵심 기술 3개) / Reviews (도입 사례 3개) / Contact CTA / Footer
- 전원 다크 모드 + 퍼플 `#7b39fc` 액센트 + 골드 `#c9a961` 시그니처

### 계산기 — `/calculator`
다섯 가지 **모델 테마**에 따라 UI가 즉시 전환:

| 모델 | 소재 컨셉 | 디자인 언어 | 계산당 가격 |
|---|---|---|---|
| **One** | Matte Aluminum | 매트 다크 그라디언트 + Inter extralight | ₩1,000 |
| **Pro** | Anodized Titanium | 티타늄 블루 + 골드 보더 + Instrument Serif | ₩10,000 |
| **Ultra** | Liquid Glass | 글래스모피즘 + 퍼플·골드 blur orbs | ₩50,000 |
| **Quantum Edition** | Holographic Iridescent | 회전하는 오로라 그라디언트 + `bg-clip-text` | ₩200,000 |
| **Zero** | Void Aluminum | 버튼 없음, 흰 알루미늄, 제스처 입력 전용 | ₩9,900 |

**Pay-per-calculation reveal 플로우**:
1. `7 × 8 =` 입력
2. 디스플레이가 `filter: blur(16px)`로 흐려지며 잠금
3. "₩10,000 결제하고 결과 공개" 버튼 자동 노출 + 모달 오픈
4. 모달 안에 **Stripe Embedded Checkout이 inline으로 마운트** (페이지 이탈 없음)
5. 테스트 카드(`4242 4242 4242 4242`)로 결제 → `onComplete` 콜백
6. `reveal` 액션 디스패치 → 블러 해제 → `56` 공개
7. 모달을 닫고 결제하지 않으면 **영구 잠금** (C 버튼으로 리셋만 가능)

### 모델 상세 페이지 — `/models/[id]`
- Next.js 16 동적 라우트로 5개 모델을 단일 템플릿에서 처리 (`generateStaticParams`)
- Hero (티어 + 소재 + 가격) → Specs table → Features 넘버링 → CTA → Footer
- Quantum은 Holographic 컬러를 `gradient-holographic` 애니메이션으로 렌더, 다른 모델은 각자의 액센트 컬러로 통일
- `/models` 인덱스는 5개 카드 그리드

### 구독 체크아웃 — `/checkout?model=pro`
- Stripe **Hosted Checkout** 리다이렉트 (월 구독, `mode: "subscription"`)
- `.env.local`에 키 없으면 graceful fallback — "Stripe 미연동 · 설정 방법 안내" UI + 테스트 성공 시뮬레이션 링크
- `/checkout/success?session_id=…` — 세션 조회 후 확인 페이지
- 모든 체크아웃은 **Stripe Test Mode 전용** (`sk_live_*`는 import 시 throw)

## 기술 스택

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, Turbopack, React 19.2 Canary)
- **Language** — TypeScript strict (`any` 금지)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) (CSS-based `@theme inline` config)
- **Typography** — Instrument Serif / Cabin / Manrope / Inter / JetBrains Mono / Pretendard (via `next/font/google`)
- **Payments** — [Stripe](https://stripe.com) (Test Mode only, Checkout hosted + Embedded)
  - `stripe@22` (server, `lib/stripe.ts` lazy singleton)
  - `@stripe/stripe-js@9` (client, `createEmbeddedCheckoutPage`)
- **State** — React `useReducer` for calculator state machine (framework-agnostic pure TS)
- **Deployment target** — Vercel-ready (`adapterPath` 호환)

## 주요 구현 사항

### 1. Calculator 상태기계 — `components/calculator/calcReducer.ts`
순수 TypeScript 리듀서. React 의존성 없고, 단위 테스트 가능한 구조.

```ts
type CalcState = {
  display: string;
  previous: string | null;
  operator: CalcOp | null;
  overwrite: boolean;
  pendingResult: string | null;    // 결제 전까지 잠금
  lastExpression: string | null;   // 모달에 표시할 "7 × 8"
};
```

- `=` → `equals` 액션이 `pendingResult` 세팅 → UI 자동 잠금
- `pendingResult !== null` 상태에서는 `clear`, `reveal` 외 모든 액션 무시 (리듀서 레벨 가드)
- `toPrecision(10)` 반올림으로 IEEE 754 부동소수 노이즈 (`0.1 + 0.2 = 0.30000000000000004`) 제거
- 0으로 나누면 `"Error"` 상태로 잠금, `clear` 외 모든 액션 무시

### 2. 테마 시스템 — `components/calculator/themes.ts`
5개 모델 각각이 **독립된 테마 객체**로 정의되어, 같은 `<CalculatorFrame />` 컴포넌트가 전혀 다른 비주얼 아이덴티티로 렌더링.

```ts
type CalcTheme = {
  frameClass: string;        // 섀시 그라디언트 + 보더 + 그림자
  displayWrapClass: string;  // 디스플레이 영역 스타일
  displayValueClass: string; // 숫자 폰트 + 크기 + 색상 (Instrument Serif 등)
  variantClass: Record<"number" | "function" | "operator" | "equals", string>;
  ambient?: "ultra" | "quantum" | "zero"; // 추가 장식 레이어
  hasKeypad: boolean;        // Zero는 false
};
```

- **Quantum Edition**의 회전 오로라는 `@keyframes aurora-drift` + `conic-gradient(from 180deg at 50% 50%, ...)` + `blur-3xl`로 순수 CSS 구현
- **Holographic 텍스트**는 `bg-gradient-to-r + bg-clip-text + text-transparent` + `gradient-holographic` 애니메이션
- **Zero 모델**은 `hasKeypad: false` 분기로 키패드 자체를 렌더하지 않고 "Gesture Input Only" 플레이스홀더 표시

### 3. Stripe Embedded Checkout 통합
Stripe v22 API의 신 `ui_mode: "embedded_page"` 사용. 기존 "embedded"는 deprecated.

**서버** — `app/api/stripe/create-calc-session/route.ts`:
```ts
const session = await stripe.checkout.sessions.create({
  ui_mode: "embedded_page",
  mode: "payment",
  redirect_on_completion: "never",  // onComplete 콜백 받기 위함
  line_items: [{
    price_data: {
      currency: "krw",
      product_data: { name: `${model.name} · 단건 계산 공개` },
      unit_amount: OPERATION_PRICES[model.id],
    },
    quantity: 1,
  }],
  metadata: { model_id, expression, op_type: "single_calculation_reveal" },
});
```

**클라이언트** — `components/calculator/RevealPaymentModal.tsx`:
```ts
const instance = await stripe.createEmbeddedCheckoutPage({
  clientSecret,
  onComplete() { dispatch({ type: "reveal" }); }
});
instance.mount(containerRef.current);
```

- `ui_mode: "embedded_page"` + `redirect_on_completion: "never"` → 결제 후 페이지 이동 없이 콜백만
- 언마운트 시 `instance.destroy()`로 iframe 정리

### 4. Graceful Stripe Fallback — `lib/stripe.ts`
키가 없어도 서버가 크래시하지 않도록 **lazy singleton 패턴**:

```ts
export class StripeNotConfiguredError extends Error { … }

let stripeInstance: Stripe | null = null;
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new StripeNotConfiguredError();
  if (key.startsWith("sk_live_")) {
    throw new Error("ARITHMOS™ operates in TEST MODE only.");
  }
  return (stripeInstance ??= new Stripe(key, { typescript: true }));
}
```

- 모듈 import는 안전 — `getStripe()` 호출 시점에만 throw
- API 라우트는 `StripeNotConfiguredError`를 catch해 `503` 반환
- 페이지는 `isStripeConfigured()` 체크 후 설정 안내 UI로 fallback

### 5. Dynamic 모델 상세 페이지 — `app/models/[id]/page.tsx`
Next.js 16의 async `params` 패턴 사용:

```ts
export function generateStaticParams() {
  return ARITHMOS_MODELS.map((m) => ({ id: m.id }));
}

export default async function ModelPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const model = ARITHMOS_MODELS.find((m) => m.id === id);
  if (!model) notFound();
  // …
}
```

- 빌드 시 5개 모델 전부 정적 생성
- `constants.ts` 단일 소스에서 모든 모델 데이터 주입 (price/features/specs)
- Holographic 모델만 특별 처리 (`gradient-holographic` + `aurora-drift`)

### 6. Tailwind v4 `@theme inline` + next/font 통합
Tailwind v4는 CSS 기반 설정. `globals.css`에서:

```css
@theme inline {
  --color-background: #0a0a0a;
  --color-gold: #c9a961;
  --font-manrope: var(--next-font-manrope), "Manrope", sans-serif;
  --font-cabin: var(--next-font-cabin), "Cabin", sans-serif;
  --font-instrument-serif: var(--next-font-instrument-serif), serif;
}
```

- `next/font/google` 변수(`--next-font-*`)를 `@theme inline` 변수로 브릿지
- 결과: `font-manrope`, `font-cabin`, `font-instrument-serif` 유틸리티가 Tailwind 레벨에서 작동

### 7. 계산기 키보드 입력
모달이 열려 있을 땐 키보드 이벤트 무시하도록 guard.

```ts
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (modalOpen) return;
    const a = keyToAction(e.key);
    if (!a) return;
    e.preventDefault();
    dispatch(a);
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [modalOpen]);
```

키 매핑: `0–9`, `+`, `-`, `*/x`, `/`, `Enter/=`, `Escape/c`, `.`, `%`

## 프로젝트 구조

```
arithmos/
├── app/
│   ├── page.tsx                          # 랜딩 (비디오 hero)
│   ├── calculator/page.tsx               # 계산기 진입점
│   ├── models/
│   │   ├── page.tsx                      # 라인업 인덱스
│   │   └── [id]/page.tsx                 # 동적 모델 상세
│   ├── checkout/
│   │   ├── page.tsx                      # 구독 체크아웃 (서버 리다이렉트)
│   │   └── success/page.tsx              # 결제 성공
│   ├── api/stripe/
│   │   ├── create-calc-session/route.ts  # 단건 reveal 세션 (embedded)
│   │   ├── create-payment-intent/route.ts # 레거시 — 미사용
│   │   └── webhook/route.ts              # Stripe 이벤트 수신
│   └── globals.css                       # Tailwind v4 theme + 애니메이션
├── components/
│   ├── landing/                          # 랜딩 섹션들 (Hero, Services, Reviews, …)
│   └── calculator/                       # 계산기 UI
│       ├── Calculator.tsx                # 루트 orchestrator
│       ├── CalculatorFrame.tsx           # 테마 적용된 섀시
│       ├── Keypad.tsx                    # 4×5 버튼 그리드
│       ├── ModelSelector.tsx             # 5개 모델 pill 셀렉터
│       ├── RevealPaymentModal.tsx        # Stripe Embedded Checkout 모달
│       ├── calcReducer.ts                # 순수 상태기계
│       └── themes.ts                     # 5개 모델 테마 정의
└── lib/
    ├── constants.ts                      # 모델 스펙 + 가격 + 카피 단일 소스
    ├── stripe.ts                         # 서버 Stripe 클라이언트 (lazy)
    ├── gemini.ts                         # Gemini SDK (미사용, 풍자적 보관)
    └── supabase.ts                       # Supabase 스켈레톤 (미사용)
```

## 로컬 실행

### 요구 사항
- Node.js 20.9+ (Next.js 16 요구)
- TypeScript 5.1+

### 설정

```bash
git clone https://github.com/DOHYEONLEE13/busan-gdg-hackathon-.git
cd busan-gdg-hackathon-
npm install

# .env.local 생성 (템플릿)
cp .env.local.example .env.local
```

### Stripe 테스트 키 설정
1. [stripe.com](https://stripe.com) 무료 계정 생성 (사업자 인증 불필요)
2. Test mode → Developers → API keys
3. `.env.local`에 추가:
   ```
   STRIPE_SECRET_KEY=sk_test_…
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_…
   ```
4. 키가 없어도 앱은 동작합니다 — "Stripe 미연동" 안내 UI로 fallback

### 개발 서버
```bash
npm run dev
# http://localhost:3000
```

Turbopack 기반 — 초기 컴파일 ~600ms, HMR 수십 ms.

### 결제 테스트
- 모델 페이지 "도입 구독 시작" → Stripe Hosted Checkout
- 계산기에서 `=` 누르기 → Stripe Embedded Checkout 모달
- 카드: `4242 4242 4242 4242` / 만료 임의 미래 / CVC 임의 3자리

## 디자인 토큰

```css
Background:       #0a0a0a
Surface:          #111111
Surface Elevated: #1a1a1a
Border:           #2a2a2a
Foreground:       #f5f5f7
Foreground 2nd:   #86868b

Brand Purple:     #7b39fc   (operators, CTAs)
Brand Gold:       #c9a961   (accents, trim, Ultra/Pro)

Destructive:      #ff3b30
Success:          #30d158
```

## 라이선스 · 크레딧

- **코드**: 해커톤 출품작. 상업적 사용 금지.
- **폰트**: Instrument Serif, Manrope, Cabin, Inter, JetBrains Mono (OFL / Google Fonts 라이선스)
- **Pretendard**: Open Font License
- 모든 이미지·영상은 데모 목적의 플레이스홀더

## 면책

**본 프로젝트는 데모 구현입니다. 실제 결제는 발생하지 않습니다. 테스트 카드: 4242 4242 4242 4242**

Stripe 키는 `sk_test_*`만 사용합니다. 코드에 `sk_live_*` 키가 주입되면 import 시점에 의도적으로 throw해 실제 결제를 원천 차단합니다.

---

<sub>© 2026 ARITHMOS Inc. — Beyond Numbers.</sub>
