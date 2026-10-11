"use client";

import JellyRibbon from "@/components/ui/JellyRibbon";

const WORDS = [
  "Warehousing",
  "Industrial",
  "Design-Build",
  "Precast",
  "Earthworks",
  "Infrastructure",
  "QHSE-Driven",
  "Grow Together",
];

export default function KeywordTicker() {
  return (
    // The ribbon's centre line sits on the top edge of the page body, so it
    // laps over the hero above and the services section below. It is shifted
    // with `top`, not a margin: as the first child, its top margin would
    // collapse into the page body's own and move nothing.
    <section
      aria-hidden
      className="pointer-events-none relative -top-[51px] z-10 -mb-[63px] overflow-x-clip md:-top-[4.6vw] md:-mb-[5.6vw]"
    >
      <JellyRibbon
        band={64}
        sway={26}
        repeats={3}
        className="drop-shadow-[0_10px_14px_rgba(6,32,79,0.28)]"
        bandClassName="fill-ink"
        textClassName="fill-white/90 font-display text-[20px] font-semibold uppercase tracking-[0.35em]"
      >
        {WORDS.map((w) => (
          <tspan key={w}>
            {w.replace(/ /g, " ")}
            <tspan className="fill-sky-400">{"   ◆   "}</tspan>
          </tspan>
        ))}
      </JellyRibbon>
    </section>
  );
}
