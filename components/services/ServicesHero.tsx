"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { IMAGES } from "@/data/images";
import { SERVICE_SECTIONS } from "@/data/content/services";

const eyebrow = "text-label uppercase tracking-[0.14em]";

const PANELS = [
  ...SERVICE_SECTIONS.map((s) => ({
    id: s.slug,
    title: s.title,
    blurb: s.items.slice(0, 3).join(" · "),
    image: IMAGES[s.imageKey as keyof typeof IMAGES],
  })),
  {
    id: "rmc",
    title: "RMC Plant",
    blurb: "M10–M50 grades · Design mixes · In-house lab",
    image: IMAGES.serviceRmc,
  },
];

export default function ServicesHero() {
  const [active, setActive] = useState(0);

  return (
    // From lg up the hero is exactly one screen: the panels take whatever height the heading leaves.
    <section className="relative isolate overflow-hidden bg-[#071a3a] text-white lg:flex lg:min-h-[100svh] lg:flex-col">
      {/* ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-[#1f6fd1]/30 blur-[140px]" />
        <div className="absolute -right-32 top-1/3 h-[520px] w-[520px] rounded-full bg-[#4d94ff]/20 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 70% at 30% 20%, #000, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 30% 20%, #000, transparent)",
          }}
        />
      </div>

      <Container className="pb-10 pt-32 md:pt-40 lg:shrink-0 lg:pb-6 lg:pt-[clamp(7rem,14svh,9rem)]">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className={`${eyebrow} flex items-center gap-3 text-[#7fb6e8]`}>
              <span className="h-px w-10 bg-[#7fb6e8]" />
              Our services
            </p>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl lg:mt-4 lg:text-[length:clamp(2.75rem,min(9.5svh,6.2vw),5.5rem)]">
              One partner.
              <span className="block join-shine join-shine-dark pb-[0.08em]">
                Every discipline.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-body-l text-white/75">
              Four integrated disciplines, one accountable team, backed by an in-house RMC plant.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Design", "Build", "Precast", "Supply"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-caption text-white/80 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive discipline panels */}
      {/* the bottom padding clears the fixed marquee ribbon, which is 3.6vw tall at its crest */}
      <Container className="pb-12 lg:flex lg:flex-1 lg:flex-col lg:pb-[calc(3.6vw+0.5rem)]">
        <div className="flex flex-col gap-3 lg:min-h-[220px] lg:flex-1 lg:flex-row">
          {PANELS.map((p, i) => {
            const on = active === i;
            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={p.title}
                className={`group relative block min-h-[92px] overflow-hidden rounded-2xl border border-white/10 transition-[flex-grow,min-height,border-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:min-h-0 lg:basis-0 ${
                  on ? "min-h-[260px] border-white/30 lg:grow-[3.4]" : "lg:grow-[1]"
                }`}
              >
                {p.image?.src ? (
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    priority={i === 0}
                    className={`object-cover transition-transform duration-[1200ms] ease-out ${
                      on ? "scale-105" : "scale-100 grayscale-[40%]"
                    }`}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    on
                      ? "bg-gradient-to-t from-[#071a3a] via-[#071a3a]/40 to-transparent"
                      : "bg-[#071a3a]/70"
                  }`}
                />

                <span className="tabular absolute left-5 top-4 font-display text-sm font-bold text-[#9fd0ff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition-all duration-500 ${
                    on ? "rotate-0 bg-white text-[#0b2247]" : "-rotate-45"
                  }`}
                >
                  <ArrowUpRight size={18} />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h2
                    className={`font-display font-bold leading-tight transition-all duration-500 ${
                      on ? "text-2xl md:text-3xl" : "text-lg lg:text-base lg:[writing-mode:horizontal-tb]"
                    }`}
                  >
                    {p.title}
                  </h2>
                  <div
                    className={`grid transition-all duration-700 ${
                      on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden text-caption text-white/80">{p.blurb}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-caption text-white/50 lg:mt-3 lg:shrink-0">
          <ChevronDown size={16} className="animate-bounce" />
          Scroll to explore
        </div>
      </Container>
    </section>
  );
}
