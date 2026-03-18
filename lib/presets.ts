// lib/presets.ts

import { DisplayPreset } from "./types";

export const presets: DisplayPreset[] = [
  // ─────────────────────────────────────────
  // phones
  // ─────────────────────────────────────────

  {
    id: "iphone-16pm-17pm",
    name: "iPhone 16 Pro Max / 17 Pro Max",
    diagonal: 6.9,
    resW: 2868,
    resH: 1320,
    type: "phone",
    models: ["iPhone 16 Pro Max", "iPhone 17 Pro Max"],
  },
  {
    id: "iphone-16p-17-17p",
    name: "iPhone 16 Pro / 17 / 17 Pro",
    diagonal: 6.3,
    resW: 2622,
    resH: 1206,
    type: "phone",
    models: ["iPhone 16 Pro", "iPhone 17", "iPhone 17 Pro"],
  },
  {
    id: "iphone-17-air",
    name: "iPhone 17 Air",
    diagonal: 6.5,
    resW: 2740,
    resH: 1260,
    type: "phone",
  },
  {
    id: "iphone-15pm-16plus",
    name: "iPhone 15 Pro Max / 16 Plus",
    diagonal: 6.7,
    resW: 2796,
    resH: 1290,
    type: "phone",
    models: ["iPhone 15 Pro Max", "iPhone 16 Plus"],
  },
  {
    id: "iphone-15-15p-16",
    name: "iPhone 15 / 15 Pro / 16",
    diagonal: 6.1,
    resW: 2556,
    resH: 1179,
    type: "phone",
    models: ["iPhone 15", "iPhone 15 Pro", "iPhone 16"],
  },
  {
    id: "galaxy-s25-s26-ultra",
    name: "Galaxy S25/S26 Ultra",
    diagonal: 6.9,
    resW: 3120,
    resH: 1440,
    type: "phone",
    models: ["Galaxy S25 Ultra", "Galaxy S26 Ultra"],
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    diagonal: 6.8,
    resW: 3120,
    resH: 1440,
    type: "phone",
  },
  {
    id: "galaxy-s24p-s25p-s26p",
    name: "Galaxy S24+/S25+/S26+",
    diagonal: 6.7,
    resW: 3120,
    resH: 1440,
    type: "phone",
    models: ["Galaxy S24+", "Galaxy S25+", "Galaxy S26+"],
  },
  {
    id: "galaxy-s26",
    name: "Galaxy S26",
    diagonal: 6.3,
    resW: 2340,
    resH: 1080,
    type: "phone",
  },
  {
    id: "galaxy-s24-s25",
    name: "Galaxy S24/S25",
    diagonal: 6.2,
    resW: 2340,
    resH: 1080,
    type: "phone",
    models: ["Galaxy S24", "Galaxy S25"],
  },
  {
    id: "pixel-9pxl-10pxl",
    name: "Pixel 9 Pro XL / 10 Pro XL",
    diagonal: 6.8,
    resW: 2992,
    resH: 1344,
    type: "phone",
    models: ["Pixel 9 Pro XL", "Pixel 10 Pro XL"],
  },
  {
    id: "pixel-9p-10-10p",
    name: "Pixel 9 Pro / 10 / 10 Pro",
    diagonal: 6.3,
    resW: 2856,
    resH: 1280,
    type: "phone",
    models: ["Pixel 9 Pro", "Pixel 10", "Pixel 10 Pro"],
  },
  {
    id: "pixel-9",
    name: "Pixel 9",
    diagonal: 6.3,
    resW: 2424,
    resH: 1080,
    type: "phone",
  },
  {
    id: "pixel-8-pro",
    name: "Pixel 8 Pro",
    diagonal: 6.7,
    resW: 2992,
    resH: 1344,
    type: "phone",
  },
  {
    id: "pixel-8",
    name: "Pixel 8",
    diagonal: 6.2,
    resW: 2400,
    resH: 1080,
    type: "phone",
  },

  // ─────────────────────────────────────────
  // tablets - apple
  // ─────────────────────────────────────────

  {
    id: "ipad-pro-13-m4m5",
    name: 'iPad Pro 13" (M4-M5)',
    diagonal: 13,
    resW: 2752,
    resH: 2064,
    type: "tablet",
    subcategory: "apple",
    note: "tandem OLED",
    models: ["iPad Pro 13-inch (M4)", "iPad Pro 13-inch (M5)"],
  },
  {
    id: "ipad-pro-12-9-2018-2022",
    name: 'iPad Pro 12.9" (2018-2022)',
    diagonal: 12.9,
    resW: 2732,
    resH: 2048,
    type: "tablet",
    subcategory: "apple",
    note: "mini LED on 5th/6th gen",
    models: [
      "iPad Pro 12.9-inch (3rd gen)",
      "iPad Pro 12.9-inch (4th gen)",
      "iPad Pro 12.9-inch (5th gen, M1)",
      "iPad Pro 12.9-inch (6th gen, M2)",
    ],
  },
  {
    id: "ipad-pro-11-m4m5",
    name: 'iPad Pro 11" (M4-M5)',
    diagonal: 11,
    resW: 2420,
    resH: 1668,
    type: "tablet",
    subcategory: "apple",
    note: "OLED",
    models: ["iPad Pro 11-inch (M4)", "iPad Pro 11-inch (M5)"],
  },
  {
    id: "ipad-pro-11-2018-2022",
    name: 'iPad Pro 11" (2018-2022)',
    diagonal: 11,
    resW: 2388,
    resH: 1668,
    type: "tablet",
    subcategory: "apple",
    models: [
      "iPad Pro 11-inch (1st gen)",
      "iPad Pro 11-inch (2nd gen)",
      "iPad Pro 11-inch (3rd gen, M1)",
      "iPad Pro 11-inch (4th gen, M2)",
    ],
  },
  {
    id: "ipad-air-13",
    name: 'iPad Air 13" (M3-M4)',
    diagonal: 13,
    resW: 2732,
    resH: 2048,
    type: "tablet",
    subcategory: "apple",
    models: ["iPad Air 13-inch (M3)", "iPad Air 13-inch (M4)"],
  },
  {
    id: "ipad-air-11",
    name: 'iPad Air 11" / Air (M1)',
    diagonal: 10.9,
    resW: 2360,
    resH: 1640,
    type: "tablet",
    subcategory: "apple",
    models: ["iPad Air (M1)", "iPad Air 11-inch (M3)", "iPad Air 11-inch (M4)"],
  },
  {
    id: "ipad-10th",
    name: "iPad (10th gen)",
    diagonal: 10.9,
    resW: 2360,
    resH: 1640,
    type: "tablet",
    subcategory: "apple",
  },
  {
    id: "ipad-mini-6-7",
    name: "iPad mini (6th-7th gen)",
    diagonal: 8.3,
    resW: 2266,
    resH: 1488,
    type: "tablet",
    subcategory: "apple",
    models: ["iPad mini (6th gen, A15)", "iPad mini (7th gen, A17 Pro)"],
  },

  // ─────────────────────────────────────────
  // tablets - samsung
  // ─────────────────────────────────────────

  {
    id: "galaxy-tab-s-ultra",
    name: "Galaxy Tab S8/S9/S10 Ultra",
    diagonal: 14.6,
    resW: 2960,
    resH: 1848,
    type: "tablet",
    subcategory: "samsung",
    models: ["Galaxy Tab S8 Ultra", "Galaxy Tab S9 Ultra", "Galaxy Tab S10 Ultra"],
  },
  {
    id: "galaxy-tab-s-plus",
    name: "Galaxy Tab S8+/S9+/S10+",
    diagonal: 12.4,
    resW: 2800,
    resH: 1752,
    type: "tablet",
    subcategory: "samsung",
    models: ["Galaxy Tab S8+", "Galaxy Tab S9+", "Galaxy Tab S10+"],
  },
  {
    id: "galaxy-tab-s-base",
    name: "Galaxy Tab S8/S9/S10",
    diagonal: 11,
    resW: 2560,
    resH: 1600,
    type: "tablet",
    subcategory: "samsung",
    models: ["Galaxy Tab S8", "Galaxy Tab S9", "Galaxy Tab S10"],
  },

  // ─────────────────────────────────────────
  // laptops - apple
  // ─────────────────────────────────────────

  {
    id: "mba-13-m1",
    name: 'MacBook Air 13" (M1)',
    diagonal: 13.3,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "apple",
  },
  {
    id: "mba-13-m2m5",
    name: 'MacBook Air 13" (M2-M5)',
    diagonal: 13.6,
    resW: 2560,
    resH: 1664,
    type: "laptop",
    subcategory: "apple",
    models: [
      "MacBook Air 13-inch (M2)",
      "MacBook Air 13-inch (M3)",
      "MacBook Air 13-inch (M4)",
      "MacBook Air 13-inch (M5)",
    ],
  },
  {
    id: "mba-15-m2m5",
    name: 'MacBook Air 15" (M2-M5)',
    diagonal: 15.3,
    resW: 2880,
    resH: 1864,
    type: "laptop",
    subcategory: "apple",
    models: [
      "MacBook Air 15-inch (M2)",
      "MacBook Air 15-inch (M3)",
      "MacBook Air 15-inch (M4)",
      "MacBook Air 15-inch (M5)",
    ],
  },
  {
    id: "mbp-13-m1m2",
    name: 'MacBook Pro 13" (M1-M2)',
    diagonal: 13.3,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "apple",
    note: "discontinued",
    models: ["MacBook Pro 13-inch (M1)", "MacBook Pro 13-inch (M2)"],
  },
  {
    id: "mbp-14",
    name: 'MacBook Pro 14" (M1 Pro - M5)',
    diagonal: 14.2,
    resW: 3024,
    resH: 1964,
    type: "laptop",
    subcategory: "apple",
    models: [
      "MacBook Pro 14-inch (M1 Pro/Max)",
      "MacBook Pro 14-inch (M2 Pro/Max)",
      "MacBook Pro 14-inch (M3/Pro/Max)",
      "MacBook Pro 14-inch (M4/Pro/Max)",
      "MacBook Pro 14-inch (M5/Pro/Max)",
    ],
  },
  {
    id: "mbp-16",
    name: 'MacBook Pro 16" (M1 Pro - M5)',
    diagonal: 16.2,
    resW: 3456,
    resH: 2234,
    type: "laptop",
    subcategory: "apple",
    models: [
      "MacBook Pro 16-inch (M1 Pro/Max)",
      "MacBook Pro 16-inch (M2 Pro/Max)",
      "MacBook Pro 16-inch (M3 Pro/Max)",
      "MacBook Pro 16-inch (M4 Pro/Max)",
      "MacBook Pro 16-inch (M5 Pro/Max)",
    ],
  },

  // ─────────────────────────────────────────
  // laptops - gaming 14"
  // ─────────────────────────────────────────

  {
    id: "rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14 (2024-2026)",
    diagonal: 14,
    resW: 2880,
    resH: 1800,
    type: "laptop",
    subcategory: "gaming-14",
    note: "3K OLED",
  },
  {
    id: "helios-neo-slim-14",
    name: "Acer Predator Helios Neo Slim 14",
    diagonal: 14.5,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-14",
  },

  // ─────────────────────────────────────────
  // laptops - gaming 15.6"
  // ─────────────────────────────────────────

  {
    id: "gaming-15-fhd",
    name: '15.6" gaming laptop (FHD)',
    diagonal: 15.6,
    resW: 1920,
    resH: 1080,
    type: "laptop",
    subcategory: "gaming-15.6",
    models: [
      "MSI Katana/Cyborg 15",
      "Acer Nitro V 15",
      "Lenovo LOQ 15",
      "ASUS TUF A15/F15",
    ],
  },
  {
    id: "gaming-15-qhd",
    name: '15.6" gaming laptop (QHD)',
    diagonal: 15.6,
    resW: 2560,
    resH: 1440,
    type: "laptop",
    subcategory: "gaming-15.6",
  },

  // ─────────────────────────────────────────
  // laptops - gaming 16"
  // ─────────────────────────────────────────

  {
    id: "razer-blade-16",
    name: "Razer Blade 16 (2024-2025)",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
    note: "premium thin-and-light",
  },
  {
    id: "rog-zephyrus-g16",
    name: "ASUS ROG Zephyrus G16 (2024-2026)",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
    note: "2.5K OLED option",
  },
  {
    id: "rog-strix-g16-scar16",
    name: "ASUS ROG Strix G16 / Scar 16",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
    note: "nebula display",
  },
  {
    id: "legion-pro-16",
    name: 'Lenovo Legion Pro 5/7 16"',
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
  },
  {
    id: "msi-stealth-vector-16",
    name: "MSI Stealth 16 / Vector 16",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
  },
  {
    id: "helios-neo-16",
    name: "Acer Predator Helios Neo 16",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
  },
  {
    id: "dell-g16",
    name: "Dell G16",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
  },
  {
    id: "alienware-m16",
    name: "Alienware m16",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
  },
  {
    id: "hp-omen-16",
    name: "HP Omen Transcend 16",
    diagonal: 16,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-16",
    note: "OLED option",
  },
  {
    id: "gaming-16-fhdplus",
    name: '16" gaming laptop (FHD+)',
    diagonal: 16,
    resW: 1920,
    resH: 1200,
    type: "laptop",
    subcategory: "gaming-16",
    models: [
      "ASUS TUF F16",
      "Lenovo LOQ 16",
      "Acer Nitro V 16",
    ],
  },

  // ─────────────────────────────────────────
  // laptops - gaming 17.3"
  // ─────────────────────────────────────────

  {
    id: "gaming-17-fhd",
    name: '17.3" gaming laptop (FHD)',
    diagonal: 17.3,
    resW: 1920,
    resH: 1080,
    type: "laptop",
    subcategory: "gaming-17.3",
    models: [
      "MSI GP/GF 17",
      'Lenovo Legion 5 17"',
      "ASUS TUF F17",
    ],
  },
  {
    id: "gaming-17-qhd",
    name: '17.3" gaming laptop (QHD)',
    diagonal: 17.3,
    resW: 2560,
    resH: 1440,
    type: "laptop",
    subcategory: "gaming-17.3",
  },

  // ─────────────────────────────────────────
  // laptops - gaming 18"
  // ─────────────────────────────────────────

  {
    id: "msi-titan-18-4k",
    name: "MSI Titan 18 HX (4K)",
    diagonal: 18,
    resW: 3840,
    resH: 2400,
    type: "laptop",
    subcategory: "gaming-18",
    note: "mini LED",
  },
  {
    id: "rog-strix-scar-18",
    name: "ASUS ROG Strix Scar 18 (2024-2025)",
    diagonal: 18,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-18",
    note: "QHD+ 240Hz",
  },
  {
    id: "msi-raider-18",
    name: "MSI Raider 18 (2024-2025)",
    diagonal: 18,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-18",
  },
  {
    id: "helios-18",
    name: "Acer Predator Helios 18 (2024-2025)",
    diagonal: 18,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-18",
  },
  {
    id: "legion-9i-18",
    name: 'Lenovo Legion 9i 18"',
    diagonal: 18,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-18",
  },
  {
    id: "alienware-m18",
    name: 'Alienware m18 / Area-51 18"',
    diagonal: 18,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "gaming-18",
  },

  // ─────────────────────────────────────────
  // laptops - productivity
  // ─────────────────────────────────────────

  {
    id: "dell-xps-13",
    name: "Dell XPS 13 (2024+)",
    diagonal: 13.4,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "productivity",
  },
  {
    id: "dell-xps-16",
    name: "Dell XPS 16 (2024+)",
    diagonal: 16.3,
    resW: 2560,
    resH: 1600,
    type: "laptop",
    subcategory: "productivity",
  },
  {
    id: "thinkpad-x1-carbon-14",
    name: 'ThinkPad X1 Carbon 14"',
    diagonal: 14,
    resW: 2880,
    resH: 1800,
    type: "laptop",
    subcategory: "productivity",
  },
  {
    id: "framework-13",
    name: "Framework 13",
    diagonal: 13.5,
    resW: 2256,
    resH: 1504,
    type: "laptop",
    subcategory: "productivity",
  },

  // ─────────────────────────────────────────
  // monitors
  // ─────────────────────────────────────────

  {
    id: "apple-studio-display",
    name: "Apple Studio Display",
    diagonal: 27,
    resW: 5120,
    resH: 2880,
    type: "monitor",
    note: "5K Retina",
  },
  {
    id: "apple-pro-display-xdr",
    name: "Apple Pro Display XDR",
    diagonal: 32,
    resW: 6016,
    resH: 3384,
    type: "monitor",
    note: "6K Retina",
  },
  {
    id: "rog-pg32ucdm",
    name: "ASUS ROG Swift PG32UCDM",
    diagonal: 32,
    resW: 3840,
    resH: 2160,
    type: "monitor",
    note: "4K QD-OLED 240Hz",
  },
  {
    id: "rog-pg27ucdm",
    name: "ASUS ROG Swift PG27UCDM",
    diagonal: 27,
    resW: 3840,
    resH: 2160,
    type: "monitor",
    note: "4K QD-OLED 240Hz",
  },
  {
    id: "rog-pg27aqwp",
    name: "ASUS ROG Swift PG27AQWP-W",
    diagonal: 27,
    resW: 2560,
    resH: 1440,
    type: "monitor",
    note: "tandem W-OLED 540Hz",
  },
  {
    id: "dell-u2723qe",
    name: "Dell UltraSharp U2723QE",
    diagonal: 27,
    resW: 3840,
    resH: 2160,
    type: "monitor",
  },
  {
    id: "lg-27gx790a",
    name: "LG UltraGear 27GX790A",
    diagonal: 27,
    resW: 2560,
    resH: 1440,
    type: "monitor",
    note: "OLED 480Hz",
  },
  {
    id: "lg-39gx950b",
    name: "LG UltraGear 39GX950B",
    diagonal: 39,
    resW: 5120,
    resH: 2160,
    type: "monitor",
    note: "tandem OLED ultrawide",
  },
  {
    id: "odyssey-g8-34",
    name: 'Samsung Odyssey OLED G8 34"',
    diagonal: 34,
    resW: 3440,
    resH: 1440,
    type: "monitor",
    note: "curved ultrawide",
  },
  {
    id: "odyssey-g9-49",
    name: 'Samsung Odyssey OLED G9 49"',
    diagonal: 49,
    resW: 5120,
    resH: 1440,
    type: "monitor",
    note: "super ultrawide",
  },
  {
    id: "lg-ultrafine-24",
    name: 'LG UltraFine 4K 24"',
    diagonal: 23.7,
    resW: 3840,
    resH: 2160,
    type: "monitor",
  },
  {
    id: "generic-27-1440p",
    name: '27" 1440p monitor',
    diagonal: 27,
    resW: 2560,
    resH: 1440,
    type: "monitor",
    note: "common IPS gaming",
  },
  {
    id: "generic-27-4k",
    name: '27" 4K monitor',
    diagonal: 27,
    resW: 3840,
    resH: 2160,
    type: "monitor",
    note: "common productivity",
  },
  {
    id: "generic-24-1080p",
    name: '24" 1080p monitor',
    diagonal: 24,
    resW: 1920,
    resH: 1080,
    type: "monitor",
    note: "baseline reference",
  },

  // ─────────────────────────────────────────
  // TVs
  // ─────────────────────────────────────────

  {
    id: "lg-c5-42",
    name: 'LG C5 OLED 42"',
    diagonal: 42,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
  {
    id: "lg-c5-55",
    name: 'LG C5 OLED 55"',
    diagonal: 55,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
  {
    id: "lg-c5-65",
    name: 'LG C5 OLED 65"',
    diagonal: 65,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
  {
    id: "samsung-s95f-55",
    name: 'Samsung S95F QD-OLED 55"',
    diagonal: 55,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
  {
    id: "samsung-s95f-65",
    name: 'Samsung S95F QD-OLED 65"',
    diagonal: 65,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
  {
    id: "sony-bravia-9-65",
    name: 'Sony Bravia 9 65"',
    diagonal: 65,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
  {
    id: "sony-bravia-9-75",
    name: 'Sony Bravia 9 75"',
    diagonal: 75,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
  {
    id: "samsung-qn85d-85",
    name: 'Samsung 85" QN85D',
    diagonal: 85,
    resW: 3840,
    resH: 2160,
    type: "tv",
  },
] satisfies DisplayPreset[];

/**
 * helper to look up a preset by ID
 */
export function getPresetById(id: string): DisplayPreset | undefined {
  return presets.find((p) => p.id === id);
}

/**
 * get all presets for a given device type
 */
export function getPresetsByType(type: DisplayPreset["type"]): DisplayPreset[] {
  return presets.filter((p) => p.type === type);
}

/**
 * get laptop presets filtered by subcategory
 */
export function getLaptopPresetsBySubcategory(
  subcategory: string
): DisplayPreset[] {
  return presets.filter(
    (p) => p.type === "laptop" && p.subcategory === subcategory
  );
}
