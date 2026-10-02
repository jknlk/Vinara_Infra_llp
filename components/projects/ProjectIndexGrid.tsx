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

function num(v: number, d = 2) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
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

      items.forEach((item) => {
        gsap.from(item, {
          x: -160,
          opacity: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Container full className="px-6 md:px-12">
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((p, i) => {
            const pct = p.buildingsCount
              ? Math.min(100, Math.round(((p.completed + p.wip * 0.5) / p.buildingsCount) * 100))
              : 0;
            return (
              <a
                key={p.slug}
                data-project-card
                href={detailSlugSet.has(p.slug) ? `#${p.slug}` : undefined}
                className="group overflow-hidden rounded-2xl border border-[#0f2b57]/15 bg-white transition-shadow hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <SiteImage
                    slot={`${p.slug}-card`}
                    image={{ src: p.src, alt: p.name }}
                    ratio="16/10"
                    className="rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-3 font-display text-5xl font-bold text-white drop-shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold text-[#0f2b57]">{p.name}</h3>
                    <ArrowUpRight
                      size={22}
                      className="text-[#0f2b57] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-1 text-caption text-[#5a6b84]">{p.client}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-[#0f2b57]/10 pt-4">
                    <div>
                      <dd className="tabular font-display font-bold text-[#0f2b57]">{num(p.plotAcres)}</dd>
                      <dt className="text-caption text-[#5a6b84]">acres</dt>
                    </div>
                    <div>
                      <dd className="tabular font-display font-bold text-[#0f2b57]">{p.buildingsCount}</dd>
                      <dt className="text-caption text-[#5a6b84]">buildings</dt>
                    </div>
                    <div>
                      <dd className="tabular font-display font-bold text-[#0f2b57]">{num(p.builtUpSqft / 100000, 1)}L</dd>
                      <dt className="text-caption text-[#5a6b84]">sq.ft</dt>
                    </div>
                  </dl>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#0f2b57]/10">
                    <div className="h-full rounded-full bg-[#3e86d0]" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-2 text-caption text-[#5a6b84]">
                    {p.completed} handed over · {p.wip} in progress
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
