"use client";

import Link from "next/link";
import JellyRibbon from "@/components/ui/JellyRibbon";

const ITEMS = [
  { tag: "Our Work", text: "213.06 acres under development across three parks", href: "/projects" },
  { tag: "Projects Handled", text: "12 buildings · 31,33,500 sq.ft built-up", href: "/projects" },
  { tag: "Customers", text: "Trusted by Amazon · DHL · CBRE · Turner & Townsend", href: "/projects" },
  { tag: "Build Quality", text: "QHSE-driven delivery with in-house RMC and site controls", href: "/planning" },
  { tag: "Legacy", text: "37+ years of engineering experience", href: "/about" },
];

// Spaces inside SVG text collapse, so the gaps are non-breaking ones.
const GAP = "   ";

export default function StickyMarquee() {
  return (
    // Only the text takes the pointer: the box around the ribbon lies over the page.
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 overflow-x-clip">
      <JellyRibbon
        band={34}
        sway={9}
        breath={4}
        repeats={2}
        flatBottom
        pauseOnHover
        decorative={false}
        className="drop-shadow-[0_-6px_12px_rgba(6,32,79,0.25)]"
        bandClassName="fill-ink"
        textClassName="pointer-events-auto text-[15px] font-medium"
      >
        {(copy) =>
          ITEMS.map((it) => (
            <Link
              key={it.tag}
              href={it.href}
              tabIndex={copy > 0 ? -1 : undefined}
              aria-hidden={copy > 0 || undefined}
              className="group/item"
            >
              <tspan className="fill-sky-300 font-semibold uppercase tracking-[0.14em]">{it.tag}</tspan>
              <tspan className="fill-white/90 transition-colors group-hover/item:fill-white">
                {GAP}
                {it.text.replace(/ /g, " ")}
              </tspan>
              <tspan className="fill-sky-400">
                {GAP}◆{GAP}
              </tspan>
            </Link>
          ))
        }
      </JellyRibbon>
    </div>
  );
}
