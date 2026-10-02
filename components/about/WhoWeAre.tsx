"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import { CORE_EXPERTISE } from "@/data/content/about";

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-expertise-row]");
      const stack = stackRef.current;
      const section = sectionRef.current;
      if (!stack || !section || rows.length < 2) return;

      // Size the stack to the tallest row so absolutely-positioned rows never clip.
      const maxHeight = Math.max(...rows.map((r) => r.scrollHeight));
      stack.style.height = `${maxHeight}px`;

      gsap.set(rows[0], { xPercent: 0, opacity: 1 });
      gsap.set(rows.slice(1), { xPercent: 100, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(rows.length - 1) * window.innerHeight * 0.8}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      rows.forEach((row, i) => {
        if (i === rows.length - 1) return;
        const next = rows[i + 1];
        tl.to(row, { xPercent: -100, opacity: 0, duration: 1, ease: "power2.inOut" }, i)
          .to(next, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, i);
      });

      // Other pinned sections above (e.g. the Why Choose Vinara carousel) can
      // change document height after this trigger's start position is first
      // measured — force a recalculation once everything has settled.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <Container full className="grid grid-cols-1 gap-16 px-10 md:px-16 lg:grid-cols-12 lg:px-24">
        <div className="lg:col-span-4 lg:self-start">
          <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">Who we are</p>
          <h2 className="mt-4 font-display text-display-md text-[#0f2b57]">
            Strong partnerships. Timely delivery. Lasting impact.
          </h2>
          <p className="mt-6 text-body text-[#5a6b84]">
            Based in Bengaluru, we deliver high-quality construction with a strong focus on safety, efficiency and
            long-term value.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div ref={stackRef} className="relative min-h-[280px]">
            {CORE_EXPERTISE.map((c, i) => (
              <div
                key={c.title}
                data-expertise-row
                className="absolute inset-0 grid grid-cols-1 gap-4 border-t border-[#0f2b57]/15 pt-8 md:grid-cols-12"
              >
                <span className="tabular text-caption font-semibold text-[#3e86d0] md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-body-l font-bold text-[#0f2b57] md:col-span-5">{c.title}</h3>
                <ul className="space-y-1 text-body text-[#5a6b84] md:col-span-6">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
