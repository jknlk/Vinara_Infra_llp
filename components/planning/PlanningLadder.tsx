"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { PLANNING_LEVELS } from "@/data/content/planning";

export default function PlanningLadder() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 1024px)", reduced: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { desktop, reduced } = ctx.conditions as Record<string, boolean>;
          const section = sectionRef.current;
          if (!desktop || reduced || !section) return;

          const rows = gsap.utils.toArray<HTMLElement>("[data-ladder-row]", section);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${rows.length * 260}`,
              scrub: 1,
              pin: true,
              pinType: "transform",
              anticipatePin: 1,
            },
          });

          rows.forEach((row, i) => {
            tl.fromTo(
              row,
              { opacity: 0.25, x: -16 },
              { opacity: 1, x: 0, duration: 1, ease: "none" },
              i === 0 ? 0 : "+=0.15"
            );
          });
        }
      );
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="flex min-h-screen flex-col justify-center py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        {PLANNING_LEVELS.map((lvl, i) => (
          <div
            key={lvl.level}
            data-ladder-row
            className="mx-auto rounded-[4px] border border-navy-500 bg-navy-900 px-6 py-5 lg:opacity-100"
            style={{ width: `${100 - i * 9}%` }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-baseline gap-4">
                <span className="tabular text-caption text-sky-400">{lvl.level}</span>
                <div>
                  <h3 className="text-body-l font-display font-bold text-white">
                    {lvl.title} <span className="text-caption font-normal text-grey-300">({lvl.term})</span>
                  </h3>
                  <p className="mt-1 max-w-[52ch] text-caption text-grey-300">{lvl.purpose}</p>
                </div>
              </div>
              <p className="text-caption text-sky-200 sm:text-right">{lvl.output}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
