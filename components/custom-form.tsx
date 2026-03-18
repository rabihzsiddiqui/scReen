"use client";

import { useState } from "react";
import type { DisplayPreset } from "@/lib/types";

interface CustomFormProps {
  onAdd: (preset: Omit<DisplayPreset, "id">) => void;
}

export function CustomForm({ onAdd }: CustomFormProps) {
  const [name, setName] = useState("");
  const [diagonal, setDiagonal] = useState("");
  const [resW, setResW] = useState("");
  const [resH, setResH] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const d = parseFloat(diagonal);
    const w = parseInt(resW, 10);
    const h = parseInt(resH, 10);

    if (!name.trim()) return setError("name is required");
    if (!d || d <= 0 || d > 500) return setError("diagonal must be a positive number");
    if (!w || w <= 0 || w > 30000) return setError("width must be a positive number");
    if (!h || h <= 0 || h > 30000) return setError("height must be a positive number");

    setError(null);
    onAdd({ name: name.trim(), diagonal: d, resW: w, resH: h, type: "custom" });
    setName("");
    setDiagonal("");
    setResW("");
    setResH("");
  }

  const inputCls =
    "w-full bg-zinc-800 border border-zinc-700/60 rounded-lg px-3 py-1.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors duration-150";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2.5"
    >
      <input
        type="text"
        placeholder="display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputCls}
      />

      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          placeholder='diagonal "'
          value={diagonal}
          onChange={(e) => setDiagonal(e.target.value)}
          step="0.1"
          min="0.1"
          className={`${inputCls} font-[family-name:var(--font-geist-mono)]`}
        />
        <input
          type="number"
          placeholder="width px"
          value={resW}
          onChange={(e) => setResW(e.target.value)}
          min="1"
          className={`${inputCls} font-[family-name:var(--font-geist-mono)]`}
        />
        <input
          type="number"
          placeholder="height px"
          value={resH}
          onChange={(e) => setResH(e.target.value)}
          min="1"
          className={`${inputCls} font-[family-name:var(--font-geist-mono)]`}
        />
      </div>

      {error && (
        <p className="text-[11px] text-rose-400">{error}</p>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm font-medium transition-colors duration-150"
      >
        add custom
      </button>
    </form>
  );
}
