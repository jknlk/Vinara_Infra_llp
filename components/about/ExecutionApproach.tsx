"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import { EXECUTION_STEPS } from "@/data/content/about";

export default function ExecutionApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]");

      gsap.from(cards, {
        x: -220,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: { trigger: "[data-step-list]", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#0f2b57] py-24 text-white">
      <Container full className="px-10 md:px-16 lg:px-24">
        <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">Execution approach</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-md">From first plan to final handover.</h2>
        <ol data-step-list className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {EXECUTION_STEPS.map((s) => (
            <li key={s.n} data-step-card className="border-t border-white/25 pt-6">
              <span className="tabular font-display text-display-md text-[#7fb6e8]">
                {String(s.n).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-body-l font-bold">{s.title}</h3>
              <p className="mt-2 text-body text-white/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
