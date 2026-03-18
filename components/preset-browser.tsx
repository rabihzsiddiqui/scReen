"use client";

import { useState, useMemo } from "react";
import { presets } from "@/lib/presets";
import type { DisplayPreset, ActiveDisplay } from "@/lib/types";

type TopTab = "phones" | "tablets" | "laptops" | "monitors" | "tvs";

const TOP_TABS: { id: TopTab; label: string; type: DisplayPreset["type"] }[] = [
  { id: "phones",   label: "phones",   type: "phone"   },
  { id: "tablets",  label: "tablets",  type: "tablet"  },
  { id: "laptops",  label: "laptops",  type: "laptop"  },
  { id: "monitors", label: "monitors", type: "monitor" },
  { id: "tvs",      label: "TVs",      type: "tv"      },
];

const TABLET_SUBCATS = [
  { id: "apple",   label: "apple"   },
  { id: "samsung", label: "samsung" },
] as const;

const LAPTOP_SUBCATS = [
  { id: "apple",       label: "apple"          },
  { id: "gaming-14",   label: 'gaming 14"'     },
  { id: "gaming-15.6", label: 'gaming 15.6"'   },
  { id: "gaming-16",   label: 'gaming 16"'     },
  { id: "gaming-17.3", label: 'gaming 17.3"'   },
  { id: "gaming-18",   label: 'gaming 18"'     },
  { id: "productivity",label: "productivity"   },
] as const;

function matchesSearch(p: DisplayPreset, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    p.name.toLowerCase().includes(lower) ||
    (p.note?.toLowerCase().includes(lower) ?? false) ||
    (p.models?.some((m) => m.toLowerCase().includes(lower)) ?? false)
  );
}

interface PresetBrowserProps {
  activeDisplays: ActiveDisplay[];
  onAdd: (presetId: string) => void;
}

export function PresetBrowser({ activeDisplays, onAdd }: PresetBrowserProps) {
  const [activeTab, setActiveTab] = useState<TopTab>("phones");
  const [search, setSearch] = useState("");

  const addedIds = useMemo(
    () => new Set(activeDisplays.map((d) => d.id)),
    [activeDisplays]
  );

  const currentType = TOP_TABS.find((t) => t.id === activeTab)!.type;
  const tabPresets = presets.filter((p) => p.type === currentType);
  const filtered = search
    ? tabPresets.filter((p) => matchesSearch(p, search))
    : tabPresets;

  function renderRow(p: DisplayPreset) {
    const added = addedIds.has(p.id);
    return (
      <button
        key={p.id}
        onClick={() => onAdd(p.id)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-zinc-800/80 transition-colors duration-150"
        style={{ opacity: added ? 0.38 : 1 }}
      >
        <span className="flex-1 min-w-0">
          <span className="text-xs text-zinc-200 font-medium truncate block">{p.name}</span>
        </span>
        <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-zinc-500 whitespace-nowrap flex-shrink-0">
          {p.diagonal}&quot;
        </span>
        <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-zinc-600 whitespace-nowrap flex-shrink-0">
          {p.resW}×{p.resH}
        </span>
        {p.note && (
          <span className="text-[9px] font-medium text-cyan-400/70 bg-cyan-400/10 border border-cyan-400/20 rounded px-1.5 py-0.5 whitespace-nowrap flex-shrink-0">
            {p.note}
          </span>
        )}
      </button>
    );
  }

  function renderGrouped(subcats: readonly { id: string; label: string }[]) {
    const groups = subcats
      .map(({ id, label }) => ({
        id,
        label,
        items: filtered.filter((p) => p.subcategory === id),
      }))
      .filter((g) => g.items.length > 0);

    if (groups.length === 0) {
      return <p className="text-xs text-zinc-600 px-3 py-4">no results</p>;
    }

    return groups.map(({ id, label, items }) => (
      <div key={id}>
        <div className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest px-3 pt-3 pb-1">
          {label}
        </div>
        {items.map(renderRow)}
      </div>
    ));
  }

  function renderContent() {
    if (activeTab === "tablets") return renderGrouped(TABLET_SUBCATS);
    if (activeTab === "laptops") return renderGrouped(LAPTOP_SUBCATS);
    if (filtered.length === 0) {
      return <p className="text-xs text-zinc-600 px-3 py-4">no results</p>;
    }
    return <div>{filtered.map(renderRow)}</div>;
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {/* search */}
      <div className="px-3 pt-3 pb-2.5 border-b border-zinc-800/60">
        <input
          type="text"
          placeholder="search displays..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700/60 rounded-lg px-3 py-1.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors duration-150"
        />
      </div>

      {/* category tabs */}
      <div className="flex gap-1 px-3 pt-2.5 pb-2 border-b border-zinc-800/60 flex-wrap">
        {TOP_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
              activeTab === tab.id
                ? "bg-cyan-400/15 text-cyan-400 border border-cyan-400/30"
                : "text-zinc-500 hover:text-zinc-300 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* preset list */}
      <div className="max-h-64 overflow-y-auto py-1">{renderContent()}</div>
    </div>
  );
}
