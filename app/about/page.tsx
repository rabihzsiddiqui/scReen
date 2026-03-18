import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "about - scReen",
  description:
    "the math behind scReen: physical dimensions from diagonal, pixel density, density tiers, and why retina means different things at different viewing distances.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      <SiteHeader />

      <div className="px-6 py-14 max-w-2xl mx-auto space-y-14">
        {/* hero */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight leading-[1.1]">
            the math behind scReen
            <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
          </h1>
          <p className="text-zinc-400 text-base mt-3 leading-relaxed">
            every number in scReen is calculated on the fly from two inputs: a
            diagonal size and a resolution. no lookup tables, no hardcoded
            dimensions. here&apos;s how it works.
          </p>
        </div>

        {/* section: physical dimensions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            physical dimensions
            <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            when you add a display, you provide a diagonal (say, 13.3 inches)
            and a resolution (say, 2560&times;1600). the physical width and
            height aren&apos;t stored anywhere — they&apos;re derived using the
            pythagorean theorem.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            the pixel counts form a right triangle where the diagonal pixel
            count is the hypotenuse. knowing that ratio and the physical
            diagonal is enough to recover both dimensions:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-[family-name:var(--font-geist-mono)] text-sm text-zinc-300 space-y-1.5">
            <div>diagonal_px = sqrt(resW&sup2; + resH&sup2;)</div>
            <div>width_in&nbsp;&nbsp; = diagonal_in &times; resW / diagonal_px</div>
            <div>height_in&nbsp; = diagonal_in &times; resH / diagonal_px</div>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            for a 13.3-inch 2560&times;1600 display, the diagonal pixel count
            is ~3017 px, giving a physical size of 11.26 &times; 7.04 inches.
            scReen uses these numbers to draw each rectangle at its actual
            relative scale.
          </p>
        </section>

        {/* section: pixel density */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            pixel density
            <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            PPI (pixels per inch) measures how tightly packed the pixels are.
            the same pythagorean logic applies, just solved in the other
            direction:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-[family-name:var(--font-geist-mono)] text-sm text-zinc-300">
            <div>PPI = sqrt(resW&sup2; + resH&sup2;) / diagonal_in</div>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            the numerator is the total pixel count along the diagonal. divide
            by the physical diagonal length and you get how many pixels fit in
            each inch. a higher PPI means sharper images and crisper text.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            note that PPI measures physical density, not rendering density. a
            display set to 2&times; scaling has a higher PPI than a 1&times;
            display but renders the same logical pixel count to your app.
          </p>
        </section>

        {/* section: density tiers */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            density tiers
            <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            scReen color-codes displays in the spec table using three
            thresholds:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <span className="text-emerald-400 font-medium text-sm">
                  high — above 220 PPI
                </span>
                <p className="text-zinc-500 text-sm mt-0.5 leading-relaxed">
                  modern phones, retina laptops, high-DPI monitors. individual
                  pixels are not distinguishable at typical use distance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <div>
                <span className="text-amber-400 font-medium text-sm">
                  mid — 110 to 220 PPI
                </span>
                <p className="text-zinc-500 text-sm mt-0.5 leading-relaxed">
                  most monitors and standard laptops. sharp at arm&apos;s
                  length but below retina for close work.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block w-2 h-2 rounded-full bg-rose-400 shrink-0" />
              <div>
                <span className="text-rose-400 font-medium text-sm">
                  low — below 110 PPI
                </span>
                <p className="text-zinc-500 text-sm mt-0.5 leading-relaxed">
                  large TVs and older displays. lower density is expected and
                  acceptable at greater viewing distances.
                </p>
              </div>
            </div>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            these thresholds are practical buckets for comparison within
            scReen, not universal standards.
          </p>
        </section>

        {/* section: retina and angular resolution */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            retina and angular resolution
            <span className="inline-block w-[0.08em] h-[0.08em] ml-[0.04em] align-baseline bg-cyan-400" />
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            the human eye can resolve about 1 arcminute of visual angle —
            that&apos;s 1/60th of a degree. below that threshold, features
            become indistinguishable. apple based the term &ldquo;retina
            display&rdquo; on this limit: the pixels are small enough that they
            can&apos;t be individually perceived at the device&apos;s normal
            use distance.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            the key phrase is &ldquo;normal use distance.&rdquo; a phone is
            held much closer than a TV, so it needs a much higher PPI to meet
            the same perceptual threshold. the minimum PPI needed to stay below
            1 arcminute at a given distance d (in inches):
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-[family-name:var(--font-geist-mono)] text-sm text-zinc-300 space-y-1.5">
            <div>min_PPI = 1 / (2 &times; d &times; tan(0.5 arcmin))</div>
            <div className="text-zinc-600">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &asymp; 3438 / d
            </div>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            at typical viewing distances for each device type:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-sm font-[family-name:var(--font-geist-mono)]">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-4 py-2.5 text-zinc-500 font-normal">
                    device
                  </th>
                  <th className="text-right px-4 py-2.5 text-zinc-500 font-normal">
                    typical distance
                  </th>
                  <th className="text-right px-4 py-2.5 text-zinc-500 font-normal">
                    min PPI
                  </th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800/50">
                  <td className="px-4 py-2.5">phone</td>
                  <td className="px-4 py-2.5 text-right text-zinc-500">
                    12 in
                  </td>
                  <td className="px-4 py-2.5 text-right">286</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="px-4 py-2.5">laptop</td>
                  <td className="px-4 py-2.5 text-right text-zinc-500">
                    20 in
                  </td>
                  <td className="px-4 py-2.5 text-right">172</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="px-4 py-2.5">monitor</td>
                  <td className="px-4 py-2.5 text-right text-zinc-500">
                    28 in
                  </td>
                  <td className="px-4 py-2.5 text-right">123</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">TV</td>
                  <td className="px-4 py-2.5 text-right text-zinc-500">
                    96 in
                  </td>
                  <td className="px-4 py-2.5 text-right">36</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            a 400 PPI phone and a 40 PPI TV can both qualify as retina for
            their context. what matters is whether individual pixels are
            distinguishable at the actual viewing distance, not the raw number.
            this is also why scReen&apos;s density tiers use fixed thresholds —
            they&apos;re optimized for comparison, not for declaring any single
            display &ldquo;good&rdquo; or &ldquo;bad.&rdquo;
          </p>
        </section>

        {/* back to tool */}
        <div className="pt-2 border-t border-zinc-800/50">
          <Link
            href="/"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            back to scReen
          </Link>
        </div>
      </div>

      <footer className="px-6 py-5 border-t border-zinc-800/50 text-xs text-zinc-700">
        built by rabih. browser-native, no uploads, no tracking.
      </footer>
    </main>
  );
}
