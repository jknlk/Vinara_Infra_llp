"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import SiteImage from "@/components/ui/SiteImage";
import Container from "@/components/ui/Container";
import type { ImageSlot } from "@/data/images";

export default function PageHero({
  title,
  standfirst,
  image,
  imageSlot,
}: {
  title: string;
  standfirst?: string;
  image?: ImageSlot;
  imageSlot?: string;
}) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!h1Ref.current) return;
      const split = new SplitText(h1Ref.current, { type: "lines", mask: "lines" });
      gsap.from(split.lines, { yPercent: 110, stagger: 0.09, duration: 1, ease: "power4.out" });
      gsap.from("[data-hero-standfirst]", { y: 20, opacity: 0, duration: 0.8, delay: 0.35 });
      return () => split.revert();
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative overflow-hidden border-b border-navy-500 bg-surface pb-16 pt-36 md:pb-20 md:pt-44">
      {image ? (
        <div className="absolute inset-0">
          <SiteImage slot={imageSlot ?? "hero"} image={image} ratio="auto" className="h-full w-full rounded-none border-0" />
          <div className="absolute inset-0 bg-ink/75" />
        </div>
      ) : null}
      <div className="grid-rule pointer-events-none absolute inset-0 mx-auto max-w-[1280px]" />
      <Container className="relative">
        <h1
          ref={h1Ref}
          className={`max-w-4xl text-display-xl font-display ${image ? "text-white" : "text-ink"}`}
        >
          {title}
        </h1>
        {standfirst ? (
          <p
            data-hero-standfirst
            className={`mt-6 max-w-[60ch] text-body-l ${image ? "text-grey-300" : "text-grey-500"}`}
          >
            {standfirst}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
