"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";

type ProjectCardData = {
  slug: string;
  name: string;
  client: string;
  plotAcres: number;
  buildingsCount: number;
  builtUpSqft: number;
  completed: number;
  wip: number;
  src: string | undefined;
};

// same status colours as the 3D site plan and the building cards
const DONE = "#2fa568";
const WIP = "#f2841f";

function num(v: number, d = 2) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

// records where the pointer is inside the element, so its spotlight layer can follow the cursor
function trackPointer(e: React.MouseEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export default function ProjectIndexGrid({
  cards,
  detailSlugs,
}: {
  cards: ProjectCardData[];
  detailSlugs: string[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const detailSlugSet = new Set(detailSlugs);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      gsap.from(items, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        clearProps: "all",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Container full className="px-6 md:px-12">
        {/* up to three sites fill the row as three columns; more than that drop to four */}
        <div className={`mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 ${cards.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {cards.map((p, i) => {
            const remaining = Math.max(0, p.buildingsCount - p.completed - p.wip);
            // one segment per building while that stays readable, otherwise three proportional runs
            const perBuilding = p.buildingsCount > 0 && p.buildingsCount <= 12;
            const segments = perBuilding
              ? [
                  ...Array.from({ length: p.completed }, () => ({ colour: DONE, grow: 1 })),
                  ...Array.from({ length: p.wip }, () => ({ colour: WIP, grow: 1 })),
                  ...Array.from({ length: remaining }, () => ({ colour: "rgba(255,255,255,0.18)", grow: 1 })),
                ]
              : [
                  { colour: DONE, grow: p.completed },
                  { colour: WIP, grow: p.wip },
                  { colour: "rgba(255,255,255,0.18)", grow: remaining },
                ].filter((s) => s.grow > 0);

            return (
              // the entrance tween runs on this wrapper: the card itself has CSS transitions on transform and opacity that would fight it
              <div key={p.slug} data-project-card className="flex">
              <a
                href={detailSlugSet.has(p.slug) ? `#${p.slug}` : undefined}
                onMouseMove={trackPointer}
                className="group relative z-0 flex w-full flex-col overflow-hidden rounded-3xl bg-[#0b2247] text-white shadow-[0_18px_40px_-24px_rgba(11,34,71,0.8)] ring-1 ring-white/10 transition duration-500 ease-out hover:z-10 hover:scale-[1.025] hover:shadow-[0_32px_64px_-24px_rgba(62,134,208,0.75)] hover:ring-[#7fb6e8]/60 active:scale-[1.01]"
              >
                <div className="relative overflow-hidden">
                  <SiteImage
                    slot={`${p.slug}-card`}
                    image={{ src: p.src, alt: p.name }}
                    ratio="16/10"
                    className="rounded-none border-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* only the bottom third fades into the card, behind the title, so the photo itself stays clear */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#0b2247] via-[#0b2247]/55 to-transparent" />

                  <span
                    aria-hidden
                    className="tabular absolute left-5 top-3 font-display text-6xl font-bold leading-none text-white/90 drop-shadow-lg transition duration-500 group-hover:-translate-y-0.5 group-hover:text-white"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#0b2247]">
                    <ArrowUpRight size={20} />
                  </span>

                  <div className="absolute inset-x-5 bottom-2 [text-shadow:0_1px_10px_rgba(11,34,71,0.9)]">
                    <p className="text-label uppercase tracking-[0.14em] text-[#b9dcfa]">{p.client}</p>
                    <h3 className="mt-0.5 font-display text-2xl font-bold leading-tight md:text-3xl">{p.name}</h3>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col px-5 pb-5 pt-4">
                  <dl className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/[0.06] py-3 text-center">
                    <div>
                      <dd className="tabular font-display text-xl font-bold">{num(p.plotAcres)}</dd>
                      <dt className="text-caption text-white/60">acres</dt>
                    </div>
                    <div>
                      <dd className="tabular font-display text-xl font-bold">{p.buildingsCount}</dd>
                      <dt className="text-caption text-white/60">buildings</dt>
                    </div>
                    <div>
                      <dd className="tabular font-display text-xl font-bold">{num(p.builtUpSqft / 100000, 1)}L</dd>
                      <dt className="text-caption text-white/60">sq.ft</dt>
                    </div>
                  </dl>

                  <div className="mt-4 flex h-2 gap-1">
                    {segments.map((s, k) => (
                      <span
                        key={k}
                        className="h-full rounded-full transition duration-500 group-hover:brightness-125"
                        style={{ flexGrow: s.grow, flexBasis: 0, background: s.colour, transitionDelay: `${k * 40}ms` }}
                      />
                    ))}
                  </div>
                  <p className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-white/75">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: DONE }} />
                      {p.completed} handed over
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        {p.wip > 0 ? (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: WIP }} />
                        ) : null}
                        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: WIP }} />
                      </span>
                      {p.wip} in progress
                    </span>
                  </p>
                </div>

                {/* light under the cursor, and a sheen that sweeps across on entry */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(127,182,232,0.16), transparent 65%)" }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100"
                />
              </a>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
