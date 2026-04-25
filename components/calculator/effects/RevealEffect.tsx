"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ArithmosModelId } from "@/lib/constants";

type Props = {
  modelId: ArithmosModelId;
  value: string;
  displayClass: string;
  onDone: () => void;
};

/* Dispatcher — picks the tier-appropriate reveal animation. */
export function RevealEffect(props: Props) {
  switch (props.modelId) {
    case "quantum":
      return <QuantumReveal {...props} />;
    case "ultra":
      return <ShutterReveal {...props} />;
    case "pro":
      return <TypewriterReveal {...props} />;
    case "one":
    case "zero":
    default:
      return <SimpleReveal {...props} />;
  }
}

/* ─── ONE / ZERO — Simple fade-up ──────────────────────────────────────────── */

function SimpleReveal({ value, displayClass, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 700);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <span
      key={value}
      className={`${displayClass} block animate-[reveal-fade-up_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]`}
    >
      {value}
    </span>
  );
}

/* ─── PRO — Character-by-character typewriter ──────────────────────────────── */

function TypewriterReveal({ value, displayClass, onDone }: Props) {
  const [shown, setShown] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    setShown("");
    doneRef.current = false;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(value.slice(0, i));
      if (i >= value.length) {
        window.clearInterval(id);
        if (!doneRef.current) {
          doneRef.current = true;
          window.setTimeout(onDone, 480);
        }
      }
    }, 80);
    return () => window.clearInterval(id);
  }, [value, onDone]);

  return (
    <span className={`${displayClass} inline-flex items-baseline justify-end`}>
      <span>{shown}</span>
      <span
        aria-hidden="true"
        className="ml-[2px] inline-block w-[2px] self-center h-[0.7em] bg-current animate-[typewriter-cursor_700ms_steps(2)_infinite]"
      />
    </span>
  );
}

/* ─── ULTRA — Liquid Glass shutter + shimmer ───────────────────────────────── */

function ShutterReveal({ value, displayClass, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 1300);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <span className="relative inline-block w-full">
      <span
        key={value}
        className={`${displayClass} block animate-[ultra-shutter_1100ms_cubic-bezier(0.7,0,0.3,1)_both]`}
      >
        {value}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-[ultra-shimmer_1300ms_ease-out_both] mix-blend-overlay"
      />
    </span>
  );
}

/* ─── QUANTUM — Scramble → cascade lock-in → Certificate ───────────────────── */

const SCRAMBLE_GLYPHS = "0123456789ABCDEF░▓▒█";

function QuantumReveal({ value, displayClass, onDone }: Props) {
  const [text, setText] = useState("");
  const [stage, setStage] = useState<"scramble" | "lock" | "complete">("scramble");

  useEffect(() => {
    setText("");
    setStage("scramble");
    let raf = 0;
    const start = performance.now();
    const len = value.length;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 700) {
        // Pure scramble
        let s = "";
        for (let i = 0; i < len; i++) {
          s += SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
        }
        setText(s);
        raf = requestAnimationFrame(tick);
      } else if (elapsed < 1300) {
        // Cascade lock — characters resolve left-to-right
        const progress = (elapsed - 700) / 600;
        const locked = Math.floor(progress * len);
        let s = value.slice(0, locked);
        for (let i = locked; i < len; i++) {
          // Preserve formatting glyphs (., -, e) so the silhouette stays close
          const c = value[i];
          if (c === "." || c === "-" || c === " ") s += c;
          else
            s += SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
        }
        setText(s);
        setStage("lock");
        raf = requestAnimationFrame(tick);
      } else {
        setText(value);
        setStage("complete");
        // Hold + certificate before handing control back
        window.setTimeout(onDone, 2400);
        return;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, onDone]);

  return (
    <span className="relative inline-block w-full">
      <span
        className={`${displayClass} block font-mono ${
          stage === "complete"
            ? "gradient-holographic bg-clip-text text-transparent"
            : ""
        } ${stage === "lock" ? "animate-[quantum-glitch_180ms_steps(2)_infinite]" : ""}`}
      >
        {text || "—"}
      </span>
      {stage === "complete" ? <CertificateCard value={value} /> : null}
    </span>
  );
}

function CertificateCard({ value }: { value: string }) {
  /* Pseudo-deterministic serial + hash so the same calculation looks the
     same on subsequent reveals. Uses a small string-hash, not crypto. */
  const { serial, hash, timestamp } = useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const hex = ((h >>> 0).toString(16) + "00000000").slice(0, 16).toUpperCase();
    const ts = new Date();
    return {
      serial: `Q-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`,
      hash: `0x${hex}…`,
      timestamp: ts.toISOString().replace("T", " ").slice(0, 19),
    };
  }, [value]);

  return (
    <span
      className="absolute -bottom-[120px] right-0 left-0 sm:left-auto w-full sm:w-[260px] rounded-[12px] border border-white/15 bg-[rgba(15,10,30,0.92)] backdrop-blur-md p-3 text-left shadow-[0_18px_50px_rgba(123,57,252,0.35)] animate-[cert-rise_500ms_120ms_cubic-bezier(0.2,0.8,0.2,1)_both] origin-top"
    >
      <span className="block font-cabin text-[9px] uppercase tracking-[0.22em] gradient-holographic bg-clip-text text-transparent">
        Certificate of Computation™
      </span>
      <span className="mt-2 block font-mono text-[10px] text-white/65 leading-relaxed">
        Serial · {serial}
        <br />
        Hash · {hash}
        <br />
        Stamp · {timestamp}
      </span>
      <span className="mt-2 block font-cabin text-[9px] tracking-[0.18em] text-white/40">
        ARITHMOS Internal Accuracy Standard v2.1
      </span>
    </span>
  );
}
