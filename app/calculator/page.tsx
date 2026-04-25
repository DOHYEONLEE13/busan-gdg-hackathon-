import Link from "next/link";
import { Calculator } from "@/components/calculator/Calculator";

export const metadata = {
  title: "Calculator",
};

export default function CalculatorPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 font-manrope text-[13px] text-white/60 hover:text-white transition-colors"
      >
        ← 메인화면으로
      </Link>
      <div className="absolute top-6 right-6 z-20 font-instrument-serif text-white text-[20px] leading-none tracking-tight">
        ARITHMOS
        <sup className="ml-0.5 text-[9px] font-manrope align-top translate-y-[1px]">
          ™
        </sup>
      </div>
      <Calculator />
    </main>
  );
}
