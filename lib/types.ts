// lib/types.ts

export type DeviceType = "phone" | "tablet" | "laptop" | "monitor" | "tv" | "custom";

export type LaptopSubcategory =
  | "apple"
  | "gaming-14"
  | "gaming-15.6"
  | "gaming-16"
  | "gaming-17.3"
  | "gaming-18"
  | "productivity";

export type TabletSubcategory = "apple" | "samsung";

export interface DisplayPreset {
  /** unique identifier, e.g. "iphone-17-pro-max" */
  id: string;
  /** display name shown in UI, e.g. "iPhone 16 Pro Max / 17 Pro Max" */
  name: string;
  /** diagonal screen size in inches */
  diagonal: number;
  /** horizontal resolution in pixels */
  resW: number;
  /** vertical resolution in pixels */
  resH: number;
  /** device category */
  type: DeviceType;
  /** subcategory for laptops and tablets */
  subcategory?: LaptopSubcategory | TabletSubcategory;
  /** optional context shown as subtle label, e.g. "3K OLED" or "mini LED" */
  note?: string;
  /** individual models covered by this grouped entry */
  models?: string[];
}

export interface ComputedDisplay extends DisplayPreset {
  /** physical width in inches */
  width: number;
  /** physical height in inches */
  height: number;
  /** pixels per inch */
  ppi: number;
  /** physical area in square inches */
  area: number;
  /** aspect ratio as string, e.g. "16:9" */
  aspectRatio: string;
}

export interface ActiveDisplay extends ComputedDisplay {
  /** runtime ID for tracking in the comparison (incremented) */
  instanceId: number;
  /** accent color assigned from the cycling palette */
  accent: string;
  /**
   * only meaningful for phones and tablets.
   * false (default) = portrait orientation (tall).
   * true = rotated to landscape.
   */
  rotated?: boolean;
}
