"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { ArithmosModelId } from "@/lib/constants";

type Metric =
  | "throughput"
  | "cores"
  | "coherence"
  | "envelope"
  | "qubits"
  | "entropy";

type TelemetryConfig = {
  metrics: readonly Metric[];
  coresMax: number;
  pulseColor: string;
  pulseGradient?: boolean;
  throughputBase: number;
  qubitsBase: number;
};

/* Per-tier telemetry density. Higher tier = more fake metrics, more dramatic. */
const TELEMETRY: Record<ArithmosModelId, TelemetryConfig> = {
  one: {
    metrics: [],
    coresMax: 1,
    pulseColor: "#86868b",
    throughputBase: 0,
    qubitsBase: 0,
  },
  zero: {
    metrics: ["throughput"],
    coresMax: 1,
    pulseColor: "#f5f5f7",
    throughputBase: 2400,
    qubitsBase: 0,
  },
  pro: {
    metrics: ["throughput", "envelope"],
    coresMax: 4,
    pulseColor: "#5e5ce6",
    throughputBase: 5800,
    qubitsBase: 0,
  },
  ultra: {
    metrics: ["throughput", "cores", "coherence", "envelope"],
    coresMax: 8,
    pulseColor: "#c9a961",
    throughputBase: 11400,
    qubitsBase: 0,
  },
  quantum: {
    metrics: ["throughput", "cores", "coherence", "envelope", "qubits", "entropy"],
    coresMax: 8,
    pulseColor: "#a855f7",
    pulseGradient: true,
    throughputBase: 18900,
    qubitsBase: 256,
  },
};

const PIPELINE_LABEL: Record<ArithmosModelId, string> = {
  one: "Reasoning Pipeline",
  zero: "Ambient Reasoning Pipeline",
  pro: "Thinking Mode Pipeline",
  ultra: "Deep Reasoning Engine",
  quantum: "Quantum Reasoning Pipeline",
};

export function ReasoningPanel({
  log,
  expression,
  modelId,
}: {
  log: string[];
  expression: string | null;
  modelId: ArithmosModelId;
}) {
  const cfg = TELEMETRY[modelId];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const isQuantum = modelId === "quantum";

  return (
    <div
      className={`mt-3 rounded-[12px] border bg-black/55 backdrop-blur-sm overflow-hidden ${
        isQuantum
          ? "border-[#a855f7]/25 shadow-[0_0_24px_rgba(168,85,247,0.18)]"
          : "border-white/10"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <span className="font-cabin uppercase tracking-[0.28em] text-[10px] text-[#c9a961]">
          {PIPELINE_LABEL[modelId]}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full animate-pulse ${
              cfg.pulseGradient ? "gradient-holographic" : ""
            }`}
            style={cfg.pulseGradient ? undefined : { backgroundColor: cfg.pulseColor }}
          />
          <span className="font-cabin text-[10px] text-white/45 uppercase tracking-[0.2em]">
            Live
          </span>
        </span>
      </div>

      {cfg.metrics.length > 0 ? <TelemetryStrip cfg={cfg} /> : null}

      <div
        ref={scrollRef}
        className="px-3 py-2 max-h-[140px] overflow-y-auto font-mono text-[11px] text-white/65 leading-relaxed space-y-1"
      >
        {expression ? (
          <div className="text-white/35">$ evaluate &quot;{expression}&quot;</div>
        ) : null}
        {log.map((line, i) => (
          <div
            key={i}
            className={line.startsWith("▸") ? "text-[#c9a961]/85" : "text-white/70"}
          >
            {line}
          </div>
        ))}
        {log.length === 0 ? (
          <div className="text-white/30 italic">awaiting reasoning…</div>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Telemetry strip (the fake Bloomberg) ─────────────────────────────────── */

function TelemetryStrip({ cfg }: { cfg: TelemetryConfig }) {
  const [tick, setTick] = useState(0);
  const [qubits, setQubits] = useState(cfg.qubitsBase);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
      setQubits((q) => q + Math.floor(Math.random() * 17 + 4));
    }, 220);
    return () => window.clearInterval(id);
  }, []);

  /* Derived per render — fake instrument noise. */
  const throughput =
    cfg.throughputBase +
    Math.floor((Math.random() - 0.4) * cfg.throughputBase * 0.18);

  const cores = Math.min(
    cfg.coresMax,
    Math.max(
      1,
      Math.floor(cfg.coresMax * 0.55 + Math.sin(tick * 0.32) * cfg.coresMax * 0.42),
    ),
  );

  const coherence = 0.9925 + Math.random() * 0.0072;

  const envelope = ((): { label: string; color: string } => {
    const r = (tick * 7) % 100;
    if (r < 72) return { label: "nominal", color: "#7ed0a8" };
    if (r < 92) return { label: "engaged", color: "#c9a961" };
    return { label: "saturated", color: "#e8a85f" };
  })();

  const entropy = (0.009 + Math.random() * 0.011).toFixed(3);

  return (
    <div className="px-3 py-2 border-b border-white/5 grid grid-cols-2 gap-x-4 gap-y-1.5">
      {cfg.metrics.includes("throughput") ? (
        <MetricRow
          label="Throughput"
          value={`${throughput.toLocaleString()} tok/s`}
        />
      ) : null}

      {cfg.metrics.includes("cores") ? (
        <MetricRow
          label="Cores"
          value={
            <span className="inline-flex items-center gap-1.5">
              <CoreBar n={cores} max={cfg.coresMax} />
              <span>
                {cores}/{cfg.coresMax}
              </span>
            </span>
          }
        />
      ) : null}

      {cfg.metrics.includes("coherence") ? (
        <MetricRow
          label="Coherence"
          value={
            <span>
              {coherence.toFixed(4)} <span className="text-[#7ed0a8]">↑</span>
            </span>
          }
        />
      ) : null}

      {cfg.metrics.includes("envelope") ? (
        <MetricRow
          label="Envelope"
          value={<span style={{ color: envelope.color }}>{envelope.label}</span>}
        />
      ) : null}

      {cfg.metrics.includes("qubits") ? (
        <MetricRow
          label="Qubits"
          value={
            <span>
              {qubits.toLocaleString()} <span className="text-[#7ed0a8]">↑</span>
            </span>
          }
        />
      ) : null}

      {cfg.metrics.includes("entropy") ? (
        <MetricRow
          label="Entropy"
          value={
            <span>
              {entropy} <span className="text-[#7ed0a8]">↓</span>
            </span>
          }
        />
      ) : null}
    </div>
  );
}

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 min-w-0 font-mono text-[10px]">
      <span className="font-cabin uppercase tracking-[0.18em] text-[9px] text-white/40 shrink-0">
        {label}
      </span>
      <span className="text-white/85 truncate text-right">{value}</span>
    </div>
  );
}

function CoreBar({ n, max }: { n: number; max: number }) {
  return (
    <span className="inline-flex items-center gap-[1px]" aria-hidden="true">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-[5px] h-[8px] rounded-[1px] transition-colors ${
            i < n ? "bg-[#c9a961]" : "bg-white/10"
          }`}
        />
      ))}
    </span>
  );
}
