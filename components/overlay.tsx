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
  onRotate: (instanceId: number) => void;
}

interface DragState {
  instanceId: number;
  startMouseX: number;
  startMouseY: number;
  startRectX: number;
  startRectY: number;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function niceScaleBar(scale: number): { px: number; label: string } {
  const candidates = [0.25, 0.5, 1, 2, 5, 10, 20, 50];
  const ideal = 80 / scale;
  const nice = candidates.reduce((a, b) =>
    Math.abs(b - ideal) < Math.abs(a - ideal) ? b : a
  );
  return { px: nice * scale, label: `${nice} in` };
}

function RotateIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={10}
      height={10}
      aria-hidden="true"
    >
      <path d="M2 6a4 4 0 1 0 4-4" />
      <polyline points="6 0 6 2 4 2" />
    </svg>
  );
}

export function Overlay({ displays, hoveredId, onHoverChange, onRotate }: OverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const rectRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const prefersReducedMotion = useReducedMotion();

  // per-instance dragged positions (absolute px within container)
  const [positions, setPositions] = useState<Map<number, { x: number; y: number }>>(new Map());
  const [dragging, setDragging] = useState<DragState | null>(null);

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

  // clean up stale positions when displays are removed
  useEffect(() => {
    const ids = new Set(displays.map((d) => d.instanceId));
    setPositions((prev) => {
      const next = new Map(prev);
      for (const id of prev.keys()) {
        if (!ids.has(id)) next.delete(id);
      }
      return next;
    });
  }, [displays]);

  // end drag on mouseup anywhere
  useEffect(() => {
    if (!dragging) return;
    function onMouseUp() {
      setDragging(null);
    }
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [dragging]);

  const { width: cw, height: ch } = size;

  // largest area renders first (behind), smallest on top
  const sorted = [...displays].sort((a, b) => b.area - a.area);

  function effectiveDims(d: ActiveDisplay): { ew: number; eh: number } {
    const isPortable = d.type === "phone" || d.type === "tablet";
    const inPortrait = isPortable && !d.rotated;
    return { ew: inPortrait ? d.height : d.width, eh: inPortrait ? d.width : d.height };
  }

  let scale = 1;
  if (displays.length > 0 && cw > 0 && ch > 0) {
    const maxW = Math.max(...displays.map((d) => effectiveDims(d).ew));
    const maxH = Math.max(...displays.map((d) => effectiveDims(d).eh));
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

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging) return;
    const dx = e.clientX - dragging.startMouseX;
    const dy = e.clientY - dragging.startMouseY;
    setPositions((prev) => {
      const next = new Map(prev);
      next.set(dragging.instanceId, {
        x: dragging.startRectX + dx,
        y: dragging.startRectY + dy,
      });
      return next;
    });
  }

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="display comparison overlay"
      className="relative w-full bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
      style={{
        height: "520px",
        minHeight: "300px",
        cursor: dragging ? "grabbing" : "default",
      }}
      onMouseMove={handleMouseMove}
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
          const { ew, eh } = effectiveDims(d);
          const w = Math.round(ew * scale);
          const h = Math.round(eh * scale);

          // auto-layout: centered horizontally, bottom-aligned
          const autoX = Math.round(cw / 2 - w / 2);
          const autoY = Math.round(ch - PADDING - h);
          const saved = positions.get(d.instanceId);
          const x = saved ? saved.x : autoX;
          const y = saved ? saved.y : autoY;

          const isPortable = d.type === "phone" || d.type === "tablet";
          const inPortrait = isPortable && !d.rotated;
          const isActiveDrag = dragging?.instanceId === d.instanceId;

          const isHovered = hoveredId === d.instanceId;
          const isDimmed = hoveredId !== null && !isHovered;
          const labelAbove = h < SMALL_H || w < SMALL_W;

          const sharedOpacity: React.CSSProperties = {
            opacity: isDimmed ? 0.25 : 1,
            transition:
              prefersReducedMotion || isActiveDrag
                ? "opacity 200ms ease"
                : "opacity 200ms ease, width 200ms ease, height 200ms ease, left 200ms ease, top 200ms ease",
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
                aria-label={`${d.name}, ${d.diagonal} inch, ${Math.round(d.ppi)} PPI${isPortable ? (inPortrait ? ", portrait" : ", landscape") : ""}`}
                className="absolute animate-display-in focus-ring"
                style={{
                  left: x,
                  top: y,
                  width: w,
                  height: h,
                  border: `2px solid ${d.accent}`,
                  backgroundColor: `${d.accent}0d`,
                  zIndex: isActiveDrag ? 12 : isHovered ? 10 : 1,
                  cursor: isActiveDrag ? "grabbing" : "grab",
                  userSelect: "none",
                  ...sharedOpacity,
                }}
                onMouseDown={(e) => {
                  if (e.button !== 0) return;
                  e.preventDefault();
                  setDragging({
                    instanceId: d.instanceId,
                    startMouseX: e.clientX,
                    startMouseY: e.clientY,
                    startRectX: x,
                    startRectY: y,
                  });
                  onHoverChange(d.instanceId);
                }}
                onMouseEnter={() => { if (!dragging) onHoverChange(d.instanceId); }}
                onMouseLeave={() => { if (!dragging) onHoverChange(null); }}
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

                {/* rotate button — phones and tablets only */}
                {isPortable && h >= 28 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRotate(d.instanceId);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="absolute bottom-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded text-zinc-600 hover:text-zinc-200 transition-colors duration-150 focus-ring"
                    aria-label={`rotate ${d.name} to ${inPortrait ? "landscape" : "portrait"}`}
                    title={inPortrait ? "rotate to landscape" : "rotate to portrait"}
                  >
                    <RotateIcon />
                  </button>
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
                    {ew.toFixed(1)}&quot;
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
                    {eh.toFixed(1)}&quot;
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
