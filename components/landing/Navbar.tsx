"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ARITHMOS_MODELS, OPERATION_PRICES, formatKrw } from "@/lib/constants";

type NavLink = {
  label: string;
  href: string;
  type?: "link" | "products";
};

const LINKS: NavLink[] = [
  { label: "홈", href: "/" },
  { label: "제품", href: "/models", type: "products" },
  { label: "요금제", href: "/#pricing" },
  { label: "도입 사례", href: "/#reviews" },
  { label: "소개", href: "/about" },
  { label: "문의", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (
        productsRef.current &&
        !productsRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <nav className="relative z-30 w-full flex items-center justify-between px-6 lg:px-[120px] py-[16px]">
        <Link href="/" className="flex items-center shrink-0" aria-label="ARITHMOS 홈">
          <Wordmark />
        </Link>

        <ul className="hidden lg:flex items-center gap-8 ml-12 flex-1">
          {LINKS.map((link) =>
            link.type === "products" ? (
              <li key={link.label} ref={productsRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={productsOpen}
                  onClick={() => setProductsOpen((v) => !v)}
                  className="flex items-center gap-1 font-manrope font-medium text-[14px] text-white hover:opacity-80 transition-opacity"
                >
                  {link.label}
                  <ChevronDownIcon
                    className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {productsOpen ? <ProductsDropdown onSelect={() => setProductsOpen(false)} /> : null}
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-manrope font-medium text-[14px] text-white hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            className="h-10 px-4 rounded-[8px] bg-white border border-[#d4d4d4] text-[#171717] font-manrope font-semibold text-[14px] hover:bg-[#f5f5f5] transition-colors"
          >
            로그인
          </button>
          <Link
            href="/#contact"
            className="h-10 px-4 inline-flex items-center rounded-[8px] bg-[#7b39fc] text-[#fafafa] font-manrope font-semibold text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_16px_rgba(123,57,252,0.35)] hover:bg-[#8d4dff] transition-colors"
          >
            도입 문의
          </Link>
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setOpen(true)}
          className="lg:hidden text-white p-2 -mr-2"
        >
          <MenuIcon />
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black flex flex-col lg:hidden overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-[16px]">
            <Link
              href="/"
              className="flex items-center"
              aria-label="ARITHMOS 홈"
              onClick={() => setOpen(false)}
            >
              <Wordmark />
            </Link>
            <button
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setOpen(false)}
              className="text-white p-2 -mr-2"
            >
              <CloseIcon />
            </button>
          </div>

          <ul className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-12">
            {LINKS.map((link) =>
              link.type === "products" ? (
                <li key={link.label} className="w-full max-w-[320px] text-center">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className="inline-flex items-center gap-2 font-manrope font-medium text-2xl text-white"
                  >
                    {link.label}
                    <ChevronDownIcon
                      className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileProductsOpen ? (
                    <ul className="mt-4 flex flex-col gap-3">
                      {ARITHMOS_MODELS.map((m) => (
                        <li key={m.id}>
                          <Link
                            href={`/models/${m.id}`}
                            onClick={() => setOpen(false)}
                            className="block font-manrope text-[15px] text-white/70 hover:text-white transition-colors"
                          >
                            {m.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-manrope font-medium text-2xl text-white hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex flex-col gap-3 px-6 pb-10">
            <button
              type="button"
              className="h-12 w-full rounded-[8px] bg-white border border-[#d4d4d4] text-[#171717] font-manrope font-semibold text-[14px]"
            >
              로그인
            </button>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="h-12 w-full inline-flex items-center justify-center rounded-[8px] bg-[#7b39fc] text-[#fafafa] font-manrope font-semibold text-[14px]"
            >
              도입 문의
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ProductsDropdown({ onSelect }: { onSelect: () => void }) {
  return (
    <div
      role="menu"
      className="absolute left-0 top-full mt-3 w-[340px] rounded-[14px] border border-white/10 bg-[#0f0f12]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.6)] p-2 origin-top animate-[dropdownIn_120ms_ease-out]"
    >
      <ul className="flex flex-col">
        {ARITHMOS_MODELS.map((m) => (
          <li key={m.id}>
            <Link
              role="menuitem"
              href={`/models/${m.id}`}
              onClick={onSelect}
              className="group flex items-start gap-3 px-3 py-3 rounded-[10px] hover:bg-white/[0.06] transition-colors"
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-block w-2 h-2 rounded-full shrink-0"
                style={{
                  background:
                    m.color === "holographic"
                      ? "conic-gradient(from 0deg, #ff6ec7, #a855f7, #3b82f6, #06b6d4, #10b981, #f59e0b, #ff6ec7)"
                      : m.color,
                }}
              />
              <span className="flex-1 min-w-0">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-manrope font-semibold text-[14px] text-white">
                    {m.name}
                  </span>
                  <span className="font-manrope text-[12px] text-white/45 shrink-0">
                    {formatKrw(OPERATION_PRICES[m.id])}/회
                  </span>
                </span>
                <span className="mt-0.5 block font-manrope text-[12px] text-white/50">
                  {m.tier} · {m.material}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/models"
        onClick={onSelect}
        className="mt-1 flex items-center justify-between px-3 py-2.5 rounded-[10px] border-t border-white/10 font-manrope text-[13px] text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
      >
        모든 제품 보기
        <ArrowRightIcon />
      </Link>
    </div>
  );
}

function Wordmark() {
  return (
    <span className="inline-flex items-baseline font-instrument-serif text-white text-[24px] leading-none tracking-tight">
      ARITHMOS
      <sup className="ml-0.5 text-[10px] font-manrope font-medium align-top translate-y-[2px]">
        ™
      </sup>
    </span>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}
