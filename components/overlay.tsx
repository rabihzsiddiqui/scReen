"use client";

import { Fragment, useRef, useEffect, useState, useCallback } from "react";
import type { ActiveDisplay } from "@/lib/types";

const PADDING = 40;
const DOT_SPACING = 24;
// thresholds below which the label moves above the rectangle
const SMALL_H = 52;
const SMALL_W = 100;

interface OverlayProps {
  displays: ActiveDisplay[];
  hoveredId: number | null;
  onHoverChange: (id: number | null) => void;
}

function niceScaleBar(scale: number): { px: number; label: string } {
  const candidates = [0.25, 0.5, 1, 2, 5, 10, 20, 50];
  const ideal = 80 / scale;
  const nice = candidates.reduce((a, b) =>
    Math.abs(b - ideal) < Math.abs(a - ideal) ? b : a
  );
  return { px: nice * scale, label: `${nice} in` };
}

export function Overlay({ displays, hoveredId, onHoverChange }: OverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const rectRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { width: cw, height: ch } = size;

  // largest area renders first (behind), smallest on top
  const sorted = [...displays].sort((a, b) => b.area - a.area);

  let scale = 1;
  if (displays.length > 0 && cw > 0 && ch > 0) {
    const maxW = Math.max(...displays.map((d) => d.width));
    const maxH = Math.max(...displays.map((d) => d.height));
    scale = Math.min(
      (cw - PADDING * 2) / maxW,
      (ch - PADDING * 2) / maxH
    );
  }

  const scaleBar = displays.length > 0 && cw > 0 ? niceScaleBar(scale) : null;

  const handleRectKeyDown = useCallback(
    (e: React.KeyboardEvent, instanceId: number) => {
      if (sorted.length <= 1) return;
      const idx = sorted.findIndex((d) => d.instanceId === instanceId);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = sorted[(idx + 1) % sorted.length];
        rectRefs.current.get(next.instanceId)?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
        rectRefs.current.get(prev.instanceId)?.focus();
      } else if (e.key === "Escape") {
        onHoverChange(null);
        (e.currentTarget as HTMLElement).blur();
      }
    },
    [sorted, onHoverChange]
  );

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="display comparison overlay"
      className="relative w-full bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
      style={{ height: "520px", minHeight: "300px" }}
    >
      {/* dot grid background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="overlay-dots"
            x="0"
            y="0"
            width={DOT_SPACING}
            height={DOT_SPACING}
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.9" fill="#27272a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#overlay-dots)" />
      </svg>

      {/* empty state */}
      {displays.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-zinc-600 text-sm font-[family-name:var(--font-geist-mono)]">
            add displays to compare
          </p>
        </div>
      )}

      {/* display rectangles, labels, annotations */}
      {cw > 0 &&
        sorted.map((d) => {
          const w = Math.round(d.width * scale);
          const h = Math.round(d.height * scale);
          const x = Math.round(cw / 2 - w / 2);
          const y = Math.round(ch - PADDING - h);

          const isHovered = hoveredId === d.instanceId;
          const isDimmed = hoveredId !== null && !isHovered;
          const labelAbove = h < SMALL_H || w < SMALL_W;

          const sharedOpacity: React.CSSProperties = {
            opacity: isDimmed ? 0.25 : 1,
            transition: "opacity 200ms ease",
          };

          return (
            <Fragment key={d.instanceId}>
              {/* label above (small displays) */}
              {labelAbove && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: x,
                    top: y - 40,
                    width: w,
                    zIndex: isHovered ? 11 : 2,
                    ...sharedOpacity,
                  }}
                >
                  <div
                    className="text-center text-[10px] font-medium font-[family-name:var(--font-geist-mono)] leading-tight truncate"
                    style={{
                      color: d.accent,
                      textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                    }}
                  >
                    {d.name}
                  </div>
                  <div
                    className="text-center text-[9px] font-[family-name:var(--font-geist-mono)] leading-tight opacity-60"
                    style={{
                      color: d.accent,
                      textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                    }}
                  >
                    {d.diagonal}&quot; · {Math.round(d.ppi)} ppi
                  </div>
                </div>
              )}

              {/* main rectangle */}
              <div
                ref={(el) => {
                  if (el) rectRefs.current.set(d.instanceId, el);
                  else rectRefs.current.delete(d.instanceId);
                }}
                role="button"
                tabIndex={0}
                aria-label={`${d.name}, ${d.diagonal} inch, ${Math.round(d.ppi)} PPI`}
                className="absolute animate-display-in focus-ring"
                style={{
                  left: x,
                  top: y,
                  width: w,
                  height: h,
                  border: `2px solid ${d.accent}`,
                  backgroundColor: `${d.accent}0d`,
                  zIndex: isHovered ? 10 : 1,
                  cursor: "default",
                  ...sharedOpacity,
                }}
                onMouseEnter={() => onHoverChange(d.instanceId)}
                onMouseLeave={() => onHoverChange(null)}
                onFocus={() => onHoverChange(d.instanceId)}
                onBlur={() => onHoverChange(null)}
                onKeyDown={(e) => handleRectKeyDown(e, d.instanceId)}
              >
                {/* label inside (large displays) */}
                {!labelAbove && (
                  <div
                    className="absolute top-2 left-2 pointer-events-none"
                    style={{ maxWidth: "calc(100% - 16px)" }}
                  >
                    <div
                      className="text-[11px] font-medium leading-tight font-[family-name:var(--font-geist-mono)] truncate"
                      style={{
                        color: d.accent,
                        textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                      }}
                    >
                      {d.name}
                    </div>
                    <div
                      className="text-[9px] leading-tight font-[family-name:var(--font-geist-mono)] opacity-70 mt-0.5"
                      style={{
                        color: d.accent,
                        textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                      }}
                    >
                      {d.diagonal}&quot; · {Math.round(d.ppi)} ppi
                    </div>
                  </div>
                )}
              </div>

              {/* dimension annotations — only on hover */}
              {isHovered && (
                <>
                  {/* physical width, centered below */}
                  <div
                    className="absolute pointer-events-none text-center font-[family-name:var(--font-geist-mono)] text-[10px] text-zinc-500"
                    style={{
                      left: x,
                      top: y + h + 6,
                      width: w,
                      textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                      zIndex: 20,
                    }}
                  >
                    {d.width.toFixed(1)}&quot;
                  </div>
                  {/* physical height, vertically centered to the right */}
                  <div
                    className="absolute pointer-events-none flex items-center font-[family-name:var(--font-geist-mono)] text-[10px] text-zinc-500"
                    style={{
                      left: x + w + 6,
                      top: y,
                      height: h,
                      textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                      zIndex: 20,
                    }}
                  >
                    {d.height.toFixed(1)}&quot;
                  </div>
                </>
              )}
            </Fragment>
          );
        })}

      {/* scale reference bar, bottom-right */}
      {scaleBar && (
        <div className="absolute bottom-3 right-4 flex flex-col items-end gap-1 pointer-events-none">
          <div
            className="relative flex items-center"
            style={{ width: scaleBar.px, height: 6 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-600" />
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-zinc-600" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-zinc-600" />
          </div>
          <span className="font-[family-name:var(--font-geist-mono)] text-[9px] text-zinc-500">
            {scaleBar.label}
          </span>
        </div>
      )}
    </div>
  );
}
