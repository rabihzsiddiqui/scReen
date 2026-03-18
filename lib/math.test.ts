// lib/math.test.ts

import { describe, it, expect } from "vitest";
import {
  calcPhysicalDimensions,
  calcPPI,
  formatAspectRatio,
  calcArea,
} from "./math";

describe("calcPhysicalDimensions", () => {
  it("calculates correct dimensions for a 27\" 16:9 monitor", () => {
    // 27" diagonal, 2560x1440 (16:9)
    const { width, height } = calcPhysicalDimensions(27, 2560, 1440);
    expect(width).toBeCloseTo(23.53, 1);
    expect(height).toBeCloseTo(13.24, 1);
  });

  it("calculates correct dimensions for a 6.1\" phone", () => {
    // iPhone 15/16, 6.1" diagonal, 2556x1179
    const { width, height } = calcPhysicalDimensions(6.1, 2556, 1179);
    expect(width).toBeCloseTo(5.54, 1);
    expect(height).toBeCloseTo(2.56, 1);
  });

  it("handles ultrawide aspect ratios", () => {
    // 34" ultrawide, 3440x1440 (roughly 21:9)
    const { width, height } = calcPhysicalDimensions(34, 3440, 1440);
    expect(width).toBeCloseTo(31.36, 1);
    expect(height).toBeCloseTo(13.13, 1);
  });

  it("handles square-ish tablet aspect ratios", () => {
    // iPad Pro 12.9", 2732x2048 (roughly 4:3)
    const { width, height } = calcPhysicalDimensions(12.9, 2732, 2048);
    expect(width).toBeCloseTo(10.32, 1);
    expect(height).toBeCloseTo(7.74, 1);
  });
});

describe("calcPPI", () => {
  it("calculates PPI for a standard 27\" 1440p monitor", () => {
    const ppi = calcPPI(27, 2560, 1440);
    expect(ppi).toBe(109);
  });

  it("calculates PPI for a 27\" 4K monitor", () => {
    const ppi = calcPPI(27, 3840, 2160);
    expect(ppi).toBe(163);
  });

  it("calculates PPI for iPhone 16 Pro Max", () => {
    const ppi = calcPPI(6.9, 2868, 1320);
    expect(ppi).toBe(458);
  });

  it("calculates PPI for a 24\" 1080p monitor (baseline)", () => {
    const ppi = calcPPI(24, 1920, 1080);
    expect(ppi).toBe(92);
  });
});

describe("formatAspectRatio", () => {
  it("formats common 16:9 ratio", () => {
    expect(formatAspectRatio(1920, 1080)).toBe("16:9");
    expect(formatAspectRatio(2560, 1440)).toBe("16:9");
    expect(formatAspectRatio(3840, 2160)).toBe("16:9");
  });

  it("formats 16:10 ratio", () => {
    expect(formatAspectRatio(2560, 1600)).toBe("8:5");
  });

  it("formats 4:3 ratio", () => {
    expect(formatAspectRatio(2048, 1536)).toBe("4:3");
  });

  it("handles unusual phone ratios", () => {
    // these may not simplify to clean ratios
    const ratio = formatAspectRatio(2556, 1179);
    expect(ratio).toContain(":");
  });
});

describe("calcArea", () => {
  it("calculates area correctly", () => {
    expect(calcArea(10, 5)).toBe(50);
    expect(calcArea(23.53, 13.24)).toBeCloseTo(311.54, 0);
  });
});
