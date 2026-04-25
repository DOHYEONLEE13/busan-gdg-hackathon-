"use client";

import type { ArithmosModelId } from "@/lib/constants";

type ModelPill = {
  id: ArithmosModelId;
  label: string;
  material: string;
};

const MODELS: readonly ModelPill[] = [
  { id: "one", label: "One", material: "Matte Aluminum" },
  { id: "pro", label: "Pro", material: "Anodized Titanium" },
  { id: "ultra", label: "Ultra", material: "Liquid Glass" },
  { id: "quantum", label: "Quantum", material: "Holographic" },
  { id: "zero", label: "Zero", material: "Void Aluminum" },
];

type Props = {
  selected: ArithmosModelId;
  onSelect: (id: ArithmosModelId) => void;
  disabled?: boolean;
};

export function ModelSelector({ selected, onSelect, disabled }: Props) {
  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-[14px] border border-white/10 bg-white/[0.04] backdrop-blur-md ${
        disabled ? "opacity-55 pointer-events-none" : ""
      }`}
    >
      {MODELS.map((m) => {
        const active = selected === m.id;
        return (
          <button
            key={m.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(m.id)}
            className={`group relative h-9 px-3.5 rounded-[10px] font-cabin font-medium text-[13px] transition-colors ${
              active
                ? "bg-[#7b39fc] text-white shadow-[0_0_0_1px_rgba(164,132,215,0.4),0_4px_16px_rgba(123,57,252,0.35)]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
            title={m.material}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
