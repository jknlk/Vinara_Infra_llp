"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import { WHY_VINARA, CORE_VALUES } from "@/data/content/about";

export default function WhyVinaraValues() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-why-item]", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-why-list]", start: "top 85%", once: true },
      });

      gsap.from("[data-value-card]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-value-grid]", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">Why Vinara</p>
          <ul data-why-list className="mt-8 divide-y divide-[#0f2b57]/15 border-y border-[#0f2b57]/15">
            {WHY_VINARA.map((w) => (
              <li
                key={w}
                data-why-item
                className="flex items-center gap-4 py-5 font-display text-body-l font-bold text-[#0f2b57]"
              >
                <span className="h-2 w-2 rounded-full bg-[#3e86d0]" />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">Our values</p>
          <div
            data-value-grid
            className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#0f2b57]/15 sm:grid-cols-2"
          >
            {CORE_VALUES.map((v) => (
              <div key={v.title} data-value-card className="bg-[#f2f7fc] p-8">
                <h3 className="font-display text-body-l font-bold text-[#0f2b57]">{v.title}</h3>
                <p className="mt-2 text-body text-[#5a6b84]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
