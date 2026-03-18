"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-md px-6 py-3 flex items-center transition-colors duration-200 ${
        scrolled ? "border-b border-zinc-800/80" : ""
      }`}
    >
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight text-zinc-100 hover:text-white transition-colors duration-200"
      >
        scReen
        <span className="inline-block w-[3px] h-[3px] ml-[1.5px] align-baseline bg-cyan-400" />
      </Link>
      <nav className="ml-auto flex items-center gap-5">
        <Link
          href="/about"
          className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
        >
          about
        </Link>
      </nav>
    </header>
  );
}
