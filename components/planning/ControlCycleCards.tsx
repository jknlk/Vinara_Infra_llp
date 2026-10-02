"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { IMAGES } from "@/data/images";
import { CONTROL_CYCLE } from "@/data/content/planning";

const STAGE_IMAGES = [IMAGES.cyclePlan, IMAGES.cycleExecute, IMAGES.cycleMeasure, IMAGES.cycleAnalyze, IMAGES.cycleAct];

export default function ControlCycleCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>("[data-cycle-card]");
    if (!cards?.length) return;

    const triggers = Array.from(cards).map((card, i) => {
      const fromLeft = i % 2 === 0;
      return gsap.fromTo(
        card,
        { x: fromLeft ? "-8vw" : "8vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={sectionRef} className="mt-10 grid grid-cols-1 gap-6">
      {CONTROL_CYCLE.map((stage, i) => (
        <div
          key={stage.title}
          data-cycle-card
          className="relative flex min-h-[220px] w-full items-end overflow-hidden rounded-2xl"
        >
          <Image
            src={STAGE_IMAGES[i]?.src ?? ""}
            alt={STAGE_IMAGES[i]?.alt ?? stage.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b57]/90 via-[#0f2b57]/40 to-transparent" />
          <div className="relative z-10 p-7 sm:p-9">
            <span className="tabular font-display text-3xl font-bold text-[#7fb6e8]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{stage.title}</h3>
            <p className="mt-2 max-w-xl text-body text-white/85">{stage.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
