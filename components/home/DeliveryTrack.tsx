"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { DELIVERY_STAGES } from "@/data/content/home";
import DataPanel from "@/components/ui/DataPanel";

export default function DeliveryTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 1024px)", reduced: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { desktop, reduced } = ctx.conditions as Record<string, boolean>;
          const track = trackRef.current;
          const section = sectionRef.current;
          if (!desktop || reduced || !track || !section) return;

          gsap.to(track, {
            x: () => -(track.scrollWidth - section.clientWidth),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${track.scrollWidth - section.clientWidth}`,
              scrub: 1,
              pin: true,
              pinType: "transform",
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="overflow-hidden bg-paper py-24 lg:flex lg:min-h-[80vh] lg:items-center lg:py-0">
      <div ref={trackRef} className="flex flex-col gap-6 lg:w-max lg:flex-row lg:flex-nowrap lg:gap-6">
        {DELIVERY_STAGES.map((stage, i) => (
          <DataPanel key={stage.title} accent="var(--color-sky-400)" className="lg:w-[300px] lg:shrink-0">
            <span className="tabular text-caption text-sky-400">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-display-m font-display text-white">{stage.title}</h3>
            <p className="mt-2 text-body text-grey-300">{stage.body}</p>
          </DataPanel>
        ))}
      </div>
    </div>
  );
}
