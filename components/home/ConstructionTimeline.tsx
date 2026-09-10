"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { DELIVERY_STAGES } from "@/data/content/home";

export default function ConstructionTimeline() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-timeline-row]");
      rows.forEach((row) => {
        const card = row.querySelector("[data-timeline-card]");
        const dot = row.querySelector("[data-timeline-dot]");
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          y: 28,
          duration: 0.7,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
          });
        }
      });
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="bg-paper pb-24 pt-12">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
          <span className="h-px w-6 bg-blue-500" />
          Construction Timeline
        </div>
        <h2 className="mt-4 max-w-2xl text-display-l font-display leading-[1.05]">
          <span className="text-ink">Ten stages. </span>
          <span className="text-blue-600">One promise.</span>
        </h2>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-sky-400/40 lg:block" />

          <div className="flex flex-col gap-10 lg:gap-16">
            {DELIVERY_STAGES.map((stage, i) => {
              const onRight = i % 2 === 0;
              return (
                <div key={stage.title} data-timeline-row className="relative grid grid-cols-1 items-center lg:grid-cols-2">
                  <span
                    data-timeline-dot
                    className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-400 bg-white lg:block"
                  />
                  <div className={onRight ? "lg:col-start-2 lg:pl-12" : "lg:col-start-1 lg:row-start-1 lg:pr-12"}>
                    <div
                      data-timeline-card
                      className="rounded-2xl border border-[#E3EAF4] bg-white p-8 shadow-sm"
                    >
                      <span className="text-label font-semibold uppercase tracking-[0.1em] text-sky-500">
                        Stage {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-display-m font-display font-bold text-ink">{stage.title}</h3>
                      <p className="mt-3 text-body text-grey-500">{stage.body}.</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
