import Link from "next/link";

const ITEMS = [
  { tag: "Our Work", text: "213.06 acres under development across three parks", href: "/projects" },
  { tag: "Projects Handled", text: "12 buildings · 31,33,500 sq.ft built-up", href: "/projects" },
  { tag: "Customers", text: "Trusted by Amazon · DHL · CBRE · Turner & Townsend", href: "/projects" },
  { tag: "Build Quality", text: "QHSE-driven delivery with in-house RMC and site controls", href: "/planning" },
  { tag: "Legacy", text: "37+ years of engineering experience", href: "/about" },
];

export default function StickyMarquee() {
  return (
    <div className="group fixed inset-x-0 bottom-0 z-40 overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink to-transparent sm:w-24" />
      <ul className="flex w-max animate-marquee items-center py-2 [animation-duration:60s] group-hover:[animation-play-state:paused]">
        {/* Two identical halves; the loop shifts by exactly one half. */}
        {[0, 1].flatMap((half) =>
          [...ITEMS, ...ITEMS].map((it, i) => (
            <li key={`${half}-${i}`} aria-hidden={half === 1 || undefined} className="flex shrink-0 items-center">
              <Link href={it.href} tabIndex={half === 1 ? -1 : undefined} className="flex items-center gap-3 px-5 sm:px-8">
                <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:text-xs">
                  {it.tag}
                </span>
                <span className="whitespace-nowrap text-xs font-medium text-white/90 sm:text-sm">{it.text}</span>
              </Link>
              <span className="h-1 w-1 rotate-45 bg-sky-400" />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
