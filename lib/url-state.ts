// lib/url-state.ts

import type { DisplayPreset } from "./types";
import { presets } from "./presets";

const PARAM = "d";

/**
 * encode active displays into a URL param string.
 * presets use their id; custom displays use the format:
 *   custom:<encodedName>:<diagonal>:<resW>:<resH>
 */
export function encodeDisplaysToParam(displays: DisplayPreset[]): string {
  return displays
    .map((d) => {
      if (d.id.startsWith("custom-")) {
        return `custom:${encodeURIComponent(d.name)}:${d.diagonal}:${d.resW}:${d.resH}`;
      }
      return d.id;
    })
    .join(",");
}

/**
 * decode a URL search string into DisplayPreset objects.
 * skips unknown preset IDs and malformed custom entries silently.
 * deduplicates by raw token.
 */
export function decodePresetsFromSearch(search: string): DisplayPreset[] {
  const params = new URLSearchParams(search);
  const raw = params.get(PARAM);
  if (!raw) return [];

  const tokens = raw.split(",").filter(Boolean);
  const seen = new Set<string>();
  const result: DisplayPreset[] = [];

  for (const token of tokens) {
    if (seen.has(token)) continue;
    seen.add(token);

    if (token.startsWith("custom:")) {
      const parts = token.split(":");
      // format: custom:<name>:<diagonal>:<resW>:<resH>
      if (parts.length < 5) continue;
      const encodedName = parts[1];
      const diagonal = parseFloat(parts[2]);
      const resW = parseInt(parts[3], 10);
      const resH = parseInt(parts[4], 10);
      if (!encodedName || isNaN(diagonal) || isNaN(resW) || isNaN(resH)) continue;
      if (diagonal <= 0 || resW <= 0 || resH <= 0) continue;
      try {
        result.push({
          id: `custom-${Date.now()}-${result.length}`,
          name: decodeURIComponent(encodedName),
          diagonal,
          resW,
          resH,
          type: "custom",
        });
      } catch {
        continue;
      }
    } else {
      const preset = presets.find((p) => p.id === token);
      if (!preset) continue; // unknown or outdated ID — skip silently
      result.push(preset);
    }
  }

  return result;
}

/**
 * update the URL via replaceState (no new history entry).
 * clears the param when displays is empty.
 */
export function updateUrlState(displays: DisplayPreset[]): void {
  const encoded = encodeDisplaysToParam(displays);
  const url = new URL(window.location.href);
  if (encoded) {
    url.searchParams.set(PARAM, encoded);
  } else {
    url.searchParams.delete(PARAM);
  }
  window.history.replaceState(null, "", url.toString());
}
