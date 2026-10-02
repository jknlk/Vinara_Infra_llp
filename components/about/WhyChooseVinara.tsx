"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import { WHY_CHOOSE_VINARA } from "@/data/content/whyChooseVinara";

export default function WhyChooseVinara() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      const section = sectionRef.current;
      if (!track || !wrapper || !section) return;

      const leadingGap = parseFloat(getComputedStyle(wrapper).paddingLeft || "0");
      const distance = track.scrollWidth - section.clientWidth + leadingGap;
      if (distance <= 0) return;

      const pause = window.innerHeight * 0.6;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + pause}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24">
      <Container>
        <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">Why Choose Vinara</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-md text-[#0f2b57]">
          Six reasons clients build with us again.
        </h2>
      </Container>

      <div ref={wrapperRef} className="mt-14">
        <div ref={trackRef} className="flex w-max gap-6">
          {WHY_CHOOSE_VINARA.map((reason, i) => (
            <article
              key={reason.title}
              className="relative h-[420px] w-[320px] shrink-0 overflow-hidden rounded-2xl bg-[#0f2b57] shadow-xl md:w-[380px]"
            >
              <Image
                src={reason.image}
                alt={reason.alt}
                fill
                sizes="380px"
                className="object-cover"
              />
              <div className="relative flex h-full flex-col justify-end">
                <div className="bg-[#0f2b57] p-7 text-white">
                  <span className="tabular font-display text-display-md text-[#7fb6e8]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-body-l font-bold">{reason.title}</h3>
                  <p className="mt-2 text-body text-white/80">{reason.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
