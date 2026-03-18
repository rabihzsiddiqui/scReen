// lib/math.ts

/**
 * calculate the physical width and height of a display
 * given its diagonal size and pixel resolution.
 *
 * uses the pythagorean theorem:
 *   aspect ratio = resW / resH
 *   height = diagonal / sqrt(ratio^2 + 1)
 *   width = height * ratio
 */
export function calcPhysicalDimensions(
  diagonal: number,
  resW: number,
  resH: number
): { width: number; height: number } {
  const ratio = resW / resH;
  const height = diagonal / Math.sqrt(ratio * ratio + 1);
  const width = height * ratio;
  return { width, height };
}

/**
 * calculate pixels per inch (PPI) for a display.
 *
 * PPI = sqrt(resW^2 + resH^2) / diagonal
 *
 * this measures the diagonal pixel density, which is
 * the standard way display sharpness is expressed.
 */
export function calcPPI(
  diagonal: number,
  resW: number,
  resH: number
): number {
  return Math.round(
    Math.sqrt(resW * resW + resH * resH) / diagonal
  );
}

/**
 * format the aspect ratio as a simplified string like "16:9".
 *
 * uses the greatest common divisor (GCD) to reduce the
 * resolution to its simplest ratio. for example,
 * 3840x2160 reduces to 16:9 via GCD of 240.
 *
 * some resolutions produce unusual ratios (e.g. 2556:1179).
 * these are left as-is since they're technically correct,
 * but the UI may want to show common approximations.
 */
export function formatAspectRatio(resW: number, resH: number): string {
  const d = gcd(resW, resH);
  return `${resW / d}:${resH / d}`;
}

/**
 * euclidean algorithm to find the greatest common divisor.
 * used by formatAspectRatio to simplify resolution ratios.
 */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * calculate the physical area of a display in square inches.
 */
export function calcArea(width: number, height: number): number {
  return width * height;
}
