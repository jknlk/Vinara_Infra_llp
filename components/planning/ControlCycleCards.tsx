"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { IMAGES } from "@/data/images";
import { CONTROL_CYCLE } from "@/data/content/planning";

const STAGE_IMAGES = [IMAGES.cyclePlan, IMAGES.cycleExecute, IMAGES.cycleMeasure, IMAGES.cycleAnalyze, IMAGES.cycleAct];

// A compact strip of 16:9 cards. On desktop the section pins and vertical
// scroll drives the strip sideways; on phones it is a plain swipeable row.
export default function ControlCycleCards() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "center center",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Each photo drifts a little against the strip's movement.
      gsap.utils.toArray<HTMLElement>("[data-cycle-img]", track).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -5 },
          {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "center center",
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={pinRef} className="mt-8 overflow-hidden md:overflow-visible">
      <div
        ref={trackRef}
        className="flex w-max gap-5 pr-4 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden md:pr-8"
      >
        {CONTROL_CYCLE.map((stage, i) => (
          <article
            key={stage.title}
            className="group relative aspect-video w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-[#0f2b57] shadow-[0_24px_50px_-28px_rgba(15,43,87,0.6)] md:w-[min(34vw,520px)]"
          >
            <div data-cycle-img className="absolute -inset-x-[6%] inset-y-0">
              <Image
                src={STAGE_IMAGES[i]?.src ?? ""}
                alt={STAGE_IMAGES[i]?.alt ?? stage.title}
                fill
                sizes="(min-width: 768px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b57]/95 via-[#0f2b57]/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5">
              <span className="tabular block font-display text-2xl font-bold text-[#7fb6e8]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-bold text-white">{stage.title}</h3>
              <p className="mt-1 line-clamp-2 text-caption text-white/85">{stage.body}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 hidden h-1 w-full overflow-hidden rounded-full bg-[#0f2b57]/10 md:block">
        <div ref={barRef} className="h-full origin-left scale-x-0 rounded-full bg-[#3e86d0]" />
      </div>
    </div>
  );
}
