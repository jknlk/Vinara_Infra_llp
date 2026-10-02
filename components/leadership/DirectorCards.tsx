"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Director = { name: string; role: string; bio: string; photo: string };

// Full-width director cards. Each slides in while its row scrolls into view
// (scrubbed to scroll position) and holds still once it has landed: the first
// from the left, the second from the right, alternating after that.
export default function DirectorCards({ directors }: { directors: readonly Director[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-director-card]").forEach((card, i) => {
          gsap.fromTo(
            card,
            { xPercent: i % 2 ? 100 : -100, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 35%",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="space-y-8 overflow-x-clip">
      {directors.map((p, i) => (
        <article
          key={p.name}
          data-director-card
          className="grid grid-cols-1 overflow-hidden rounded-3xl bg-[#0f2b57] text-white md:grid-cols-12"
        >
          <div className={`relative aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[380px] ${i % 2 ? "md:order-2" : ""}`}>
            <Image
              src={p.photo}
              alt={p.name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:col-span-7 md:p-14">
            <span className="tabular font-display text-5xl font-bold text-[#7fb6e8]/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{p.name}</h2>
            <p className="mt-1 text-body-l font-medium text-[#7fb6e8]">{p.role}</p>
            <p className="mt-5 max-w-[56ch] text-body text-white/80">{p.bio}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
