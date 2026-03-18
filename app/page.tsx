"use client";

import { useState, useRef, useCallback, useEffect, useId } from "react";
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
import { SiteHeader } from "@/components/site-header";
import { decodePresetsFromSearch, updateUrlState } from "@/lib/url-state";

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
  const [liveMsg, setLiveMsg] = useState("");
  const instanceIdRef = useRef(0);
  // tracks whether the mount restore has run — suppresses URL sync on first render
  const mountedRef = useRef(false);
  const liveRegionId = useId();

  function nextDisplay(preset: DisplayPreset): ActiveDisplay {
    const instanceId = ++instanceIdRef.current;
    const accent = ACCENT_PALETTE[(instanceId - 1) % ACCENT_PALETTE.length];
    return makeActiveDisplay(preset, instanceId, accent);
  }

  const addDisplay = useCallback((presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;
    setActiveDisplays((prev) => [...prev, nextDisplay(preset)]);
    setLiveMsg(`${preset.name} added`);
  }, []);

  const addCustomDisplay = useCallback(
    (data: Omit<DisplayPreset, "id">) => {
      const preset: DisplayPreset = { ...data, id: `custom-${Date.now()}` };
      setActiveDisplays((prev) => [...prev, nextDisplay(preset)]);
      setLiveMsg(`${data.name} added`);
      setPanel(null);
    },
    []
  );

  // restore state from URL on mount
  useEffect(() => {
    const restored = decodePresetsFromSearch(window.location.search);
    if (restored.length > 0) {
      setActiveDisplays(restored.map((preset) => nextDisplay(preset)));
    } else {
      updateUrlState([]);
    }
    mountedRef.current = true;
  }, []);

  // sync URL whenever displays change (skip initial render)
  useEffect(() => {
    if (!mountedRef.current) return;
    updateUrlState(activeDisplays);
  }, [activeDisplays]);

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
  }, []);

  const removeDisplay = useCallback((instanceId: number) => {
    setActiveDisplays((prev) => {
      const removed = prev.find((d) => d.instanceId === instanceId);
      if (removed) setLiveMsg(`${removed.name} removed`);
      return prev.filter((d) => d.instanceId !== instanceId);
    });
    setHoveredId((prev) => (prev === instanceId ? null : prev));
  }, []);

  const clearAll = useCallback(() => {
    setActiveDisplays([]);
    setHoveredId(null);
  }, []);

  // close open panel on Escape
  useEffect(() => {
    if (!panel) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPanel(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panel]);

  function togglePanel(p: Panel) {
    setPanel((prev) => (prev === p ? null : p));
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* visually-hidden live region for add/remove announcements */}
      <div
        id={liveRegionId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMsg}
      </div>
      <SiteHeader />

      <div className="p-6 max-w-5xl mx-auto space-y-5">
        {/* hero */}
        <div className="pt-4 pb-2">
          <h1 className="text-5xl font-bold tracking-tight leading-[1.1]">
            scReen
            <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
          </h1>
          <p className="text-zinc-400 text-base mt-2 leading-relaxed">
            compare any two displays side-by-side at accurate physical scale.
          </p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {["open source", "no uploads", "browser-native"].map((b) => (
              <span
                key={b}
                className="text-[10px] font-medium text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5"
              >
                {b}
              </span>
            ))}
            <a
              href="#tool"
              className="ml-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              get started
            </a>
          </div>
        </div>

        {/* controls row */}
        <div id="tool" className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => togglePanel("preset")}
            aria-expanded={panel === "preset"}
            aria-controls="preset-browser-panel"
            className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors duration-150 focus-ring ${
              panel === "preset"
                ? "bg-cyan-400/15 border-cyan-400/40 text-cyan-400"
                : "bg-zinc-900 border-zinc-700/60 text-zinc-300 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            + preset
          </button>
          <button
            onClick={() => togglePanel("custom")}
            aria-expanded={panel === "custom"}
            aria-controls="custom-form-panel"
            className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors duration-150 focus-ring ${
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
          <div id="preset-browser-panel">
            <PresetBrowser activeDisplays={activeDisplays} onAdd={addDisplay} />
          </div>
        )}

        {/* custom form panel */}
        {panel === "custom" && (
          <div id="custom-form-panel">
            <CustomForm onAdd={addCustomDisplay} />
          </div>
        )}

        {/* active display chips */}
        <DisplayChips
          displays={activeDisplays}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
          onRemove={removeDisplay}
          onClearAll={clearAll}
          onCopyLink={copyLink}
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
