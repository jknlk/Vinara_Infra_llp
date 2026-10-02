"use client";

import { useRef } from "react";
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

const HERO_IMAGE = IMAGES.aboutHeroSkyline;

export default function AboutHero() {
  const scopeRef = useRef<HTMLElement>(null);

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
    <section ref={scopeRef} className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--color-ink)] text-white">
      {/* full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* left: copy panel */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 pb-10 pt-32 md:w-[46%] md:px-12 md:pt-36 lg:px-16">
        <div
          className="pointer-events-none absolute -left-1/3 top-0 h-[60%] w-[80%] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--color-navy-700), transparent)" }}
        />
        <div className="grid-rule pointer-events-none absolute inset-0 opacity-20" />

        <p data-ah-fade className="relative flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">
          <span className="h-px w-12 bg-[#3e86d0]" />
          About Vinara Infra LLP
        </p>
        <h1 className="relative mt-6 font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
          <span className="block overflow-hidden pb-1">
            <span data-ah-line className="block text-[#0EA0BC]">A builder&rsquo;s promise,</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-ah-line className="block text-[#0EA0BC]">
              kept on every site.
            </span>
          </span>
        </h1>
        <p data-ah-fade className="relative mt-6 max-w-[42ch] text-body-l text-white/85">
          From warehousing to infrastructure, we bring technology-driven discipline to every
          stage of delivery — planned, engineered and handed over with care.
        </p>

        <div data-ah-fade className="relative mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} data-ah-stat>
              <p className="font-display text-2xl font-bold text-[#0EA0BC] md:text-3xl">{s.value}</p>
              <p className="mt-1 text-caption text-white/70">{s.label}</p>
            </div>
          ))}
        </div>

        <a
          href="#about-body"
          data-ah-fade
          className="relative mt-10 hidden items-center gap-2 text-caption text-white/80 transition-colors hover:text-white sm:flex"
        >
          Scroll to explore <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
