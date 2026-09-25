"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { IMAGES } from "@/data/images";

export default function HomeHeroLight({ stats }: { stats: { value: string; label: string }[] }) {
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
    <section ref={scopeRef} className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: photo.src ? `url(${photo.src})` : undefined }}
        role="img"
        aria-label={photo.alt}
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-6 pt-28 md:px-12">
        <div className="max-w-4xl pt-4">
          <div
            data-hero-copy
            className="inline-flex items-center gap-2 rounded-full border border-grey-300/60 bg-white/80 px-4 py-2 text-label uppercase tracking-[0.08em] text-grey-500 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Bengaluru · Grow Together · QHSE-Driven
          </div>

          <h1 ref={h1Ref} className="mt-5 font-display font-bold text-4xl leading-[1] md:text-5xl lg:text-6xl">
            <span className="text-navy-700">Building today.</span>{" "}
            <span className="text-ink">Empowering</span>{" "}
            <span className="text-blue-600">tomorrow.</span>
          </h1>

          <p data-hero-copy className="mt-4 max-w-[56ch] text-body text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
            Vinara Infra LLP — pioneering productivity with technology across warehousing,
            industrial and infrastructure projects, with an uncompromised commitment to Quality,
            Health, Safety &amp; Environment.
          </p>

          <div data-hero-copy className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-body font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Explore Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-grey-300 bg-white px-5 py-2.5 text-body font-semibold text-ink transition-colors hover:bg-paper"
            >
              Contact Us
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        <div
          data-hero-copy
          className="rounded-2xl border border-white/15 bg-ink/70 px-6 py-4 shadow-xl shadow-black/20 backdrop-blur-md sm:px-8"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 sm:gap-y-0">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="tabular text-xl font-display font-bold text-white sm:text-2xl">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-[0.08em] text-sky-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
