"use client";

import { useState, useMemo } from "react";
import type { ActiveDisplay, DeviceType } from "@/lib/types";

type SortKey =
  | "name"
  | "diagonal"
  | "resolution"
  | "aspectRatio"
  | "ppi"
  | "width"
  | "height"
  | "area";

type SortDir = "asc" | "desc";

const TYPE_BADGE: Record<DeviceType, { label: string; cls: string }> = {
  phone:   { label: "phone",   cls: "text-sky-400   bg-sky-400/10   border border-sky-400/30"   },
  tablet:  { label: "tablet",  cls: "text-violet-400 bg-violet-400/10 border border-violet-400/30" },
  laptop:  { label: "laptop",  cls: "text-cyan-400  bg-cyan-400/10  border border-cyan-400/30"  },
  monitor: { label: "monitor", cls: "text-indigo-400 bg-indigo-400/10 border border-indigo-400/30" },
  tv:      { label: "tv",      cls: "text-rose-400  bg-rose-400/10  border border-rose-400/30"  },
  custom:  { label: "custom",  cls: "text-zinc-400  bg-zinc-400/10  border border-zinc-400/30"  },
};

function ppiColor(ppi: number): string {
  if (ppi >= 200) return "text-emerald-400";
  if (ppi >= 100) return "text-amber-400";
  return "text-rose-400";
}

function sortValue(d: ActiveDisplay, key: SortKey): string | number {
  switch (key) {
    case "name":        return d.name;
    case "diagonal":    return d.diagonal;
    case "resolution":  return d.resW * d.resH;
    case "aspectRatio": return d.aspectRatio;
    case "ppi":         return d.ppi;
    case "width":       return d.width;
    case "height":      return d.height;
    case "area":        return d.area;
  }
}

interface ColDef {
  key: SortKey;
  label: string;
}

const COLUMNS: ColDef[] = [
  { key: "name",        label: "display"      },
  { key: "diagonal",    label: "diagonal"     },
  { key: "resolution",  label: "resolution"   },
  { key: "aspectRatio", label: "aspect ratio" },
  { key: "ppi",         label: "ppi"          },
  { key: "width",       label: "width"        },
  { key: "height",      label: "height"       },
  { key: "area",        label: "area"         },
];

interface SpecTableProps {
  displays: ActiveDisplay[];
  hoveredId: number | null;
  onHoverChange: (id: number | null) => void;
}

export function SpecTable({ displays, hoveredId, onHoverChange }: SpecTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("diagonal");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    return [...displays].sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      const cmp =
        typeof av === "string" && typeof bv === "string"
          ? av.localeCompare(bv)
          : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [displays, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-white tracking-tight">
        specs
        <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
      </h2>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-2.5 text-left cursor-pointer select-none whitespace-nowrap border-b border-zinc-800 bg-zinc-900 hover:bg-zinc-800/60 transition-colors duration-150"
                  >
                    <span className="inline-flex items-center gap-1 uppercase text-[10px] font-medium tracking-widest text-zinc-500">
                      {col.label}
                      <span className={active ? "text-cyan-400" : "text-zinc-700"}>
                        {active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((d) => {
              const isHovered = hoveredId === d.instanceId;
              const isDimmed = hoveredId !== null && !isHovered;
              return (
                <tr
                  key={d.instanceId}
                  className="border-b border-zinc-800/50 last:border-0 cursor-default"
                  style={{
                    backgroundColor: isHovered ? `${d.accent}12` : undefined,
                    opacity: isDimmed ? 0.35 : 1,
                    transition: "opacity 200ms ease, background-color 150ms ease",
                  }}
                  onMouseEnter={() => onHoverChange(d.instanceId)}
                  onMouseLeave={() => onHoverChange(null)}
                >
                  {/* display name + type badge */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-[2px] flex-shrink-0"
                        style={{ backgroundColor: d.accent }}
                      />
                      <span className="text-zinc-100 text-xs font-medium truncate max-w-[180px]">
                        {d.name}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded font-[family-name:var(--font-geist-mono)] flex-shrink-0 ${TYPE_BADGE[d.type].cls}`}
                      >
                        {TYPE_BADGE[d.type].label}
                      </span>
                    </div>
                  </td>

                  {/* diagonal */}
                  <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-zinc-300 whitespace-nowrap">
                    {d.diagonal}&quot;
                  </td>

                  {/* resolution */}
                  <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-zinc-300 whitespace-nowrap">
                    {d.resW.toLocaleString()}×{d.resH.toLocaleString()}
                  </td>

                  {/* aspect ratio */}
                  <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-zinc-400 whitespace-nowrap">
                    {d.aspectRatio}
                  </td>

                  {/* PPI */}
                  <td
                    className={`px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs font-semibold whitespace-nowrap ${ppiColor(d.ppi)}`}
                  >
                    {d.ppi}
                  </td>

                  {/* physical width */}
                  <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-zinc-300 whitespace-nowrap">
                    {d.width.toFixed(2)}&quot;
                  </td>

                  {/* physical height */}
                  <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-zinc-300 whitespace-nowrap">
                    {d.height.toFixed(2)}&quot;
                  </td>

                  {/* area */}
                  <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-zinc-300 whitespace-nowrap">
                    {d.area.toFixed(1)} in²
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
