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

const SLIDES = ["aboutHeroFormwork", "aboutHeroLadderCrew", "aboutHeroRenovation", "aboutHeroSkyline"]
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
    <section ref={scopeRef} className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--color-ink)] text-white md:flex-row">
      {/* left: copy panel */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 pb-10 pt-32 md:w-[46%] md:px-12 md:pt-36 lg:px-16">
        <div
          className="pointer-events-none absolute -left-1/3 top-0 h-[60%] w-[80%] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--color-navy-700), transparent)" }}
        />
        <div className="grid-rule pointer-events-none absolute inset-0 opacity-20" />

        <p data-ah-fade className="relative flex items-center gap-3 text-label uppercase tracking-[0.18em] text-[var(--color-sky-200)]">
          <span className="h-px w-12 bg-[var(--color-sky-200)]" />
          About Vinara Infra LLP
        </p>
        <h1 className="relative mt-6 font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
          <span className="block overflow-hidden pb-1">
            <span data-ah-line className="block">A builder&rsquo;s promise,</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-ah-line className="block bg-gradient-to-r from-[var(--color-sky-200)] to-white bg-clip-text text-transparent">
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
              <p className="font-display text-2xl font-bold text-white md:text-3xl">{s.value}</p>
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

      {/* right: image slideshow */}
      <div className="relative min-h-[40vh] w-full flex-1 overflow-hidden md:min-h-0">
        {SLIDES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 54vw, 100vw"
            className={`object-cover transition-[opacity,transform] ease-out ${
              i === index ? "scale-110 opacity-100 duration-[7000ms]" : "scale-100 opacity-0 duration-[1600ms]"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/40 via-transparent to-[var(--color-ink)]/60 md:bg-gradient-to-r md:from-[var(--color-ink)] md:via-[var(--color-ink)]/10 md:to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3 md:left-auto md:right-6">
          <span className="tabular text-caption font-semibold text-white/80">
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                className="group relative h-1 w-10 overflow-hidden rounded-full bg-white/25"
              >
                <span
                  key={i === index ? `on-${index}` : "off"}
                  className="absolute inset-y-0 left-0 bg-[var(--color-sky-200)]"
                  style={i === index ? { animation: `about-progress ${SLIDE_MS}ms linear forwards` } : { width: i < index ? "100%" : 0 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes about-progress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
