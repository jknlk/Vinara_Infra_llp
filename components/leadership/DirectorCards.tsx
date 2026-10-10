"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Director = { name: string; role: string; bio: string; photo: string };

// Director profile cards, side by side on desktop: portrait on the left,
// details on the right. Each card fades up once as it scrolls into view.
export default function DirectorCards({ directors }: { directors: readonly Director[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-director-card]").forEach((card, i) => {
          gsap.from(card, {
            y: 48,
            opacity: 0,
            duration: 0.9,
            delay: (i % 2) * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="m-scroll grid grid-cols-1 gap-6 xl:grid-cols-2">
      {directors.map((p, i) => (
        <article
          key={p.name}
          data-director-card
          className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-[#0b2247]/10 bg-[#f4f8fd] sm:grid-cols-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden sm:col-span-2 sm:aspect-auto sm:min-h-[440px]">
            <Image
              src={p.photo}
              alt={p.name}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col p-8 sm:col-span-3 md:p-10">
            <span className="tabular font-display text-6xl font-bold leading-none text-[#0b2247]/10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-auto pt-10">
              <p className="text-label uppercase tracking-[0.14em] text-[#2f7fd0]">{p.role}</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#0b2247] md:text-4xl">{p.name}</h2>
              <span className="mt-6 block h-px w-12 bg-[#2f7fd0]" />
              <p className="mt-6 max-w-[46ch] text-body text-[#0b2247]/70">{p.bio}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
