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
    <section aria-hidden className="relative overflow-hidden bg-ink py-3 sm:py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-40" />
      <ul className="flex w-max animate-marquee items-center [animation-duration:50s]">
        {/* Two identical halves; the loop shifts by exactly one half. */}
        {[0, 1].flatMap((half) =>
          [...WORDS, ...WORDS].map((w, i) => (
            <li key={`${half}-${i}`} className="flex shrink-0 items-center">
              <span className="px-6 font-display text-xs font-semibold uppercase tracking-[0.35em] text-white/90 sm:px-10 sm:text-sm">
                {w}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-sky-400" />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
