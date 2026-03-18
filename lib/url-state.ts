// lib/url-state.ts

import type { DisplayPreset, DeviceType } from "./types";
import { presets } from "./presets";

const PARAM = "d";

const PORTABLE_TYPES: DeviceType[] = ["phone", "tablet"];

export type DecodedEntry = { preset: DisplayPreset; rotated: boolean };

/**
 * encode active displays into a URL param string.
 * presets use their id; custom displays use the format:
 *   custom:<encodedName>:<diagonal>:<resW>:<resH>
 * phones/tablets rotated to landscape get a :landscape suffix.
 */
export function encodeDisplaysToParam(
  displays: Array<DisplayPreset & { rotated?: boolean }>
): string {
  return displays
    .map((d) => {
      let token: string;
      if (d.id.startsWith("custom-")) {
        token = `custom:${encodeURIComponent(d.name)}:${d.diagonal}:${d.resW}:${d.resH}`;
      } else {
        token = d.id;
      }
      if (PORTABLE_TYPES.includes(d.type) && d.rotated === true) {
        token += ":landscape";
      }
      return token;
    })
    .join(",");
}

/**
 * decode a URL search string into DecodedEntry objects.
 * skips unknown preset IDs and malformed custom entries silently.
 * deduplicates by base token (ignoring :landscape suffix).
 */
export function decodePresetsFromSearch(search: string): DecodedEntry[] {
  const params = new URLSearchParams(search);
  const raw = params.get(PARAM);
  if (!raw) return [];

  const tokens = raw.split(",").filter(Boolean);
  const seen = new Set<string>();
  const result: DecodedEntry[] = [];

  for (const token of tokens) {
    // detect :landscape suffix
    let baseToken = token;
    let rotated = false;
    if (token.endsWith(":landscape")) {
      baseToken = token.slice(0, -":landscape".length);
      rotated = true;
    }

    if (seen.has(baseToken)) continue;
    seen.add(baseToken);

    if (baseToken.startsWith("custom:")) {
      const parts = baseToken.split(":");
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
          preset: {
            id: `custom-${Date.now()}-${result.length}`,
            name: decodeURIComponent(encodedName),
            diagonal,
            resW,
            resH,
            type: "custom",
          },
          rotated: false, // custom displays have no portrait default
        });
      } catch {
        continue;
      }
    } else {
      const preset = presets.find((p) => p.id === baseToken);
      if (!preset) continue; // unknown or outdated ID — skip silently
      const isPortable = PORTABLE_TYPES.includes(preset.type);
      result.push({ preset, rotated: isPortable ? rotated : false });
    }
  }

  return result;
}

/**
 * update the URL via replaceState (no new history entry).
 * clears the param when displays is empty.
 */
export function updateUrlState(
  displays: Array<DisplayPreset & { rotated?: boolean }>
): void {
  const encoded = encodeDisplaysToParam(displays);
  const url = new URL(window.location.href);
  if (encoded) {
    url.searchParams.set(PARAM, encoded);
  } else {
    url.searchParams.delete(PARAM);
  }
  window.history.replaceState(null, "", url.toString());
}
