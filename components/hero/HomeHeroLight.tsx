"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { IMAGES } from "@/data/images";

const HERO_STATS = [
  { value: "213.06 acres", label: "Under Development" },
  { value: "42,30,930.54", label: "Sq.ft Built-Up" },
  { value: "23", label: "Buildings, Three Parks" },
  { value: "₹220+ Cr", label: "BOQ Under Delivery" },
];

export default function HomeHeroLight() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const photo = IMAGES.homeHeroPhoto;

  useGSAP(
    () => {
      if (!h1Ref.current) return;
      const split = new SplitText(h1Ref.current, { type: "lines", mask: "lines" });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(split.lines, { yPercent: 110, stagger: 0.09, duration: 1 }).from(
        "[data-hero-copy]",
        { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 },
        "-=0.5"
      );
      return () => split.revert();
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative min-h-[100svh] w-full overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: photo.src ? `url(${photo.src})` : undefined }}
        role="img"
        aria-label={photo.alt}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pb-10 pt-28 md:px-12">
        <div className="max-w-3xl flex-1 pb-10 pt-6">
          <div
            data-hero-copy
            className="inline-flex items-center gap-2 rounded-full border border-grey-300/60 bg-white/80 px-4 py-2 text-label uppercase tracking-[0.08em] text-grey-500 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Bengaluru · Grow Together · QHSE-Driven
          </div>

          <h1 ref={h1Ref} className="mt-6 text-display-xl font-display leading-[0.95]">
            <span className="text-navy-700">Building today.</span>{" "}
            <span className="text-ink">Empowering</span>{" "}
            <span className="text-blue-600">tomorrow.</span>
          </h1>

          <p data-hero-copy className="mt-6 max-w-[56ch] text-body-l text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
            Vinara Infra LLP — pioneering productivity with technology across warehousing,
            industrial and infrastructure projects, with an uncompromised commitment to Quality,
            Health, Safety &amp; Environment.
          </p>

          <div data-hero-copy className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-body font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Explore Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-grey-300 bg-white px-6 py-3.5 text-body font-semibold text-ink transition-colors hover:bg-paper"
            >
              Contact Us
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        <div
          data-hero-copy
          className="rounded-2xl border border-white/15 bg-ink/70 px-6 py-6 shadow-xl shadow-black/20 backdrop-blur-md sm:px-8"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <p className="tabular text-2xl font-display font-bold text-white sm:text-display-m">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-[0.08em] text-sky-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
