"use client";

import { useState, useRef, useCallback } from "react";
import { presets } from "@/lib/presets";
import {
  calcPhysicalDimensions,
  calcPPI,
  calcArea,
  formatAspectRatio,
} from "@/lib/math";
import type { DisplayPreset, ActiveDisplay } from "@/lib/types";
import { Overlay } from "@/components/overlay";
import { SpecTable } from "@/components/spec-table";
import { DisplayChips } from "@/components/display-chips";
import { PresetBrowser } from "@/components/preset-browser";
import { CustomForm } from "@/components/custom-form";

const ACCENT_PALETTE = [
  "#22d3ee", // cyan-400
  "#818cf8", // indigo-400
  "#fb7185", // rose-400
  "#fbbf24", // amber-400
  "#34d399", // emerald-400
  "#a78bfa", // violet-400
  "#fb923c", // orange-400
  "#38bdf8", // sky-400
];

function makeActiveDisplay(
  preset: DisplayPreset,
  instanceId: number,
  accent: string
): ActiveDisplay {
  const { width, height } = calcPhysicalDimensions(
    preset.diagonal,
    preset.resW,
    preset.resH
  );
  const ppi = calcPPI(preset.diagonal, preset.resW, preset.resH);
  const aspectRatio = formatAspectRatio(preset.resW, preset.resH);
  const area = calcArea(width, height);
  return { ...preset, width, height, ppi, aspectRatio, area, instanceId, accent };
}

type Panel = "preset" | "custom" | null;

export default function Home() {
  const [activeDisplays, setActiveDisplays] = useState<ActiveDisplay[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const instanceIdRef = useRef(0);

  function nextDisplay(preset: DisplayPreset): ActiveDisplay {
    const instanceId = ++instanceIdRef.current;
    const accent = ACCENT_PALETTE[(instanceId - 1) % ACCENT_PALETTE.length];
    return makeActiveDisplay(preset, instanceId, accent);
  }

  const addDisplay = useCallback((presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;
    setActiveDisplays((prev) => [...prev, nextDisplay(preset)]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addCustomDisplay = useCallback(
    (data: Omit<DisplayPreset, "id">) => {
      const preset: DisplayPreset = { ...data, id: `custom-${Date.now()}` };
      setActiveDisplays((prev) => [...prev, nextDisplay(preset)]);
      setPanel(null);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const removeDisplay = useCallback((instanceId: number) => {
    setActiveDisplays((prev) => prev.filter((d) => d.instanceId !== instanceId));
    setHoveredId((prev) => (prev === instanceId ? null : prev));
  }, []);

  const clearAll = useCallback(() => {
    setActiveDisplays([]);
    setHoveredId(null);
  }, []);

  function togglePanel(p: Panel) {
    setPanel((prev) => (prev === p ? null : p));
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* header */}
      <header className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-3 flex items-center gap-4">
        <span className="text-xl font-semibold tracking-tight">
          scReen
          <span className="inline-block w-[3px] h-[3px] ml-[1.5px] align-baseline bg-cyan-400" />
        </span>
        <div className="flex gap-2">
          {["open source", "no uploads", "browser-native"].map((b) => (
            <span
              key={b}
              className="text-[10px] font-medium text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5"
            >
              {b}
            </span>
          ))}
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto space-y-5">
        {/* hero */}
        <div className="pt-2">
          <h1 className="text-4xl font-bold tracking-tight leading-[1.1]">
            compare screens
            <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            add any two displays and see them side-by-side at accurate physical scale.
          </p>
        </div>

        {/* controls row */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => togglePanel("preset")}
            className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors duration-150 ${
              panel === "preset"
                ? "bg-cyan-400/15 border-cyan-400/40 text-cyan-400"
                : "bg-zinc-900 border-zinc-700/60 text-zinc-300 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            + preset
          </button>
          <button
            onClick={() => togglePanel("custom")}
            className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors duration-150 ${
              panel === "custom"
                ? "bg-cyan-400/15 border-cyan-400/40 text-cyan-400"
                : "bg-zinc-900 border-zinc-700/60 text-zinc-300 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            + custom
          </button>
        </div>

        {/* preset browser panel */}
        {panel === "preset" && (
          <PresetBrowser activeDisplays={activeDisplays} onAdd={addDisplay} />
        )}

        {/* custom form panel */}
        {panel === "custom" && <CustomForm onAdd={addCustomDisplay} />}

        {/* active display chips */}
        <DisplayChips
          displays={activeDisplays}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
          onRemove={removeDisplay}
          onClearAll={clearAll}
        />

        {/* overlay canvas */}
        <Overlay
          displays={activeDisplays}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
        />

        {/* spec table */}
        {activeDisplays.length > 0 && (
          <SpecTable
            displays={activeDisplays}
            hoveredId={hoveredId}
            onHoverChange={setHoveredId}
          />
        )}
      </div>

      {/* footer */}
      <footer className="mt-16 px-6 py-5 border-t border-zinc-800/50 text-xs text-zinc-700">
        built by rabih. browser-native, no uploads, no tracking.
      </footer>
    </main>
  );
}
