"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { IMAGES } from "@/data/images";

const STATS = [
  { value: "2M+", label: "sq.ft under execution" },
  { value: "4", label: "core verticals" },
  { value: "6", label: "step delivery system" },
  { value: "Zero", label: "harm is the goal" },
];

const SLIDES = ["homeHeroPhoto", "showcaseWarehouseAerial2", "showcaseCrane", "showcaseContainerYard", "galleryCityCranes"]
  .map((k) => IMAGES[k])
  .filter((i): i is typeof i & { src: string } => Boolean(i?.src));

const SLIDE_MS = 6000;

export default function AboutHero() {
  const scopeRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-ah-line]", { yPercent: 110, stagger: 0.12, duration: 1.1 })
        .from("[data-ah-fade]", { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.6")
        .from("[data-ah-stat]", { y: 30, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.4");
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-[#0b2247] text-white">
      {/* full-bleed slideshow with slow push-in */}
      <div className="absolute inset-0" aria-hidden>
        {SLIDES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] ease-out ${
              i === index ? "scale-110 opacity-100 duration-[7000ms]" : "scale-100 opacity-0 duration-[1600ms]"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2247] via-[#0b2247]/70 to-[#0b2247]/10" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0b2247] via-[#0b2247]/70 to-transparent" />
        <div className="grid-rule pointer-events-none absolute inset-0 opacity-20" />
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-6 pt-32 md:px-12 lg:px-16">
        <p data-ah-fade className="flex items-center gap-3 text-label uppercase tracking-[0.18em] text-[#7fb6e8]">
          <span className="h-px w-12 bg-[#7fb6e8]" />
          About Vinara Infra LLP
        </p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[1.02] md:text-7xl lg:text-[6.5rem]">
          <span className="block overflow-hidden pb-1">
            <span data-ah-line className="block">Building today.</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-ah-line className="block bg-gradient-to-r from-[#7fb6e8] to-white bg-clip-text text-transparent">
              Empowering tomorrow.
            </span>
          </span>
        </h1>
        <p data-ah-fade className="mt-6 max-w-[48ch] text-body-l text-white/85">
          Technology-driven construction with a focus on safety, efficiency and long-term value.
        </p>

        <div data-ah-fade className="mt-8 flex items-center gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className="relative h-1 w-14 overflow-hidden rounded-full bg-white/25"
            >
              <span
                key={i === index ? `on-${index}` : "off"}
                className="absolute inset-y-0 left-0 bg-white"
                style={i === index ? { animation: `about-progress ${SLIDE_MS}ms linear forwards` } : { width: i < index ? "100%" : 0 }}
              />
            </button>
          ))}
          <a href="#about-body" className="ml-4 hidden items-center gap-2 text-caption text-white/80 hover:text-white sm:flex">
            Scroll <ArrowDown size={14} />
          </a>
        </div>
      </div>

      {/* stats glass bar */}
      <div className="relative px-6 pb-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur-md md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} data-ah-stat className="bg-[#0b2247]/60 px-6 py-5">
              <p className="font-display text-3xl font-bold md:text-4xl">{s.value}</p>
              <p className="mt-1 text-caption text-white/75">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes about-progress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
