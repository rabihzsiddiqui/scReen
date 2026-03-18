"use client";

import { useState, useCallback } from "react";
import type { ActiveDisplay } from "@/lib/types";

interface DisplayChipsProps {
  displays: ActiveDisplay[];
  hoveredId: number | null;
  onHoverChange: (id: number | null) => void;
  onRemove: (instanceId: number) => void;
  onClearAll: () => void;
  onCopyLink: () => Promise<void>;
}

export function DisplayChips({
  displays,
  hoveredId,
  onHoverChange,
  onRemove,
  onClearAll,
  onCopyLink,
}: DisplayChipsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [onCopyLink]);

  if (displays.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {displays.map((d) => {
        const isChipDimmed = hoveredId !== null && hoveredId !== d.instanceId;
        return (
          <div
            key={d.instanceId}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs cursor-default"
            style={{
              borderColor: `${d.accent}40`,
              backgroundColor: `${d.accent}10`,
              color: d.accent,
              opacity: isChipDimmed ? 0.35 : 1,
              transition: "opacity 200ms ease",
            }}
            onMouseEnter={() => onHoverChange(d.instanceId)}
            onMouseLeave={() => onHoverChange(null)}
            onFocus={() => onHoverChange(d.instanceId)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                onHoverChange(null);
              }
            }}
          >
            <span className="font-medium font-[family-name:var(--font-geist-mono)]">
              {d.name}
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] opacity-60 text-[10px]">
              {d.diagonal}&quot;
            </span>
            <button
              onClick={() => onRemove(d.instanceId)}
              className="opacity-50 hover:opacity-100 transition-opacity duration-150 ml-0.5 leading-none focus-ring"
              aria-label={`remove ${d.name}`}
            >
              ×
            </button>
          </div>
        );
      })}
      <button
        onClick={handleCopy}
        className={`text-xs px-2 py-1 transition-colors duration-200 ${
          copied
            ? "text-cyan-400"
            : "text-zinc-600 hover:text-zinc-400"
        }`}
      >
        {copied ? "copied" : "copy link"}
      </button>
      {displays.length >= 2 && (
        <button
          onClick={onClearAll}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200 px-2 py-1"
        >
          clear all
        </button>
      )}
    </div>
  );
}
