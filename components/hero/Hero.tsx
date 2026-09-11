"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { PROJECTS, PORTFOLIO_TOTALS } from "@/data/buildings";
import SitePoster from "./SitePoster";

const MasterPlanScene = dynamic(() => import("./MasterPlanScene"), { ssr: false });

function useCanRender3D() {
  const [can, setCan] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      const cores = navigator.hardwareConcurrency ?? 8;
      setCan(Boolean(gl) && cores >= 4);
    } catch {
      setCan(false);
    }
  }, []);
  return can;
}

export default function Hero() {
  const can3D = useCanRender3D();
  const [activeSlug, setActiveSlug] = useState<string>(PROJECTS[0].slug);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

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
    { scope: copyRef }
  );

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {can3D === true ? (
          <MasterPlanScene activeSlug={activeSlug} />
        ) : (
          <SitePoster slug={activeSlug} />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="grid-rule pointer-events-none absolute inset-0 mx-auto max-w-[1280px]" />

      <div
        ref={copyRef}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end gap-8 px-6 pb-10 pt-32 md:px-12 md:pb-20"
      >
        <div className="max-w-3xl">
          <h1 ref={h1Ref} className="text-display-xl font-display text-white">
            Building today. Empowering tomorrow.
          </h1>
          <p data-hero-copy className="mt-6 max-w-[58ch] text-body-l text-grey-300">
            Pioneering productivity with technology across warehousing, industrial and infrastructure
            projects — delivering efficient, durable and scalable construction with an uncompromised
            commitment to Quality, Health, Safety &amp; Environment.
          </p>
        </div>

        <div data-hero-copy className="grid grid-cols-2 gap-6 border-t border-navy-500 pt-6 sm:grid-cols-4">
          <StatChip value="213.06 acres" />
          <StatChip value="42,30,930.54 sq.ft" />
          <StatChip value="23 buildings" />
          <StatChip value="₹220+ Cr BOQ" />
        </div>

        {/* mobile: chips + caption sit in normal flow to avoid overlapping the stat strip */}
        <div data-hero-copy className="flex flex-col gap-3 sm:hidden">
          <ProjectChips activeSlug={activeSlug} onSelect={setActiveSlug} />
          <HeroCaption can3D={can3D} />
        </div>
      </div>

      <div className="pointer-events-auto absolute bottom-24 right-6 z-10 hidden gap-2 sm:flex md:right-12">
        <ProjectChips activeSlug={activeSlug} onSelect={setActiveSlug} />
      </div>

      <p className="absolute bottom-8 left-6 z-10 hidden text-caption text-grey-300 sm:block md:left-12">
        <HeroCaption can3D={can3D} />
      </p>
    </section>
  );
}

function StatChip({ value }: { value: string }) {
  return <span className="tabular text-caption font-semibold text-white">{value}</span>;
}

function ProjectChips({
  activeSlug,
  onSelect,
}: {
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROJECTS.map((p) => (
        <button
          key={p.slug}
          onClick={() => onSelect(p.slug)}
          className={`rounded-full border px-4 py-2 text-caption font-medium transition-colors ${
            activeSlug === p.slug
              ? "border-sky-400 bg-sky-400 text-ink"
              : "border-navy-500 bg-ink/60 text-grey-300 hover:text-white"
          }`}
        >
          {p.shortName}
        </button>
      ))}
    </div>
  );
}

function HeroCaption({ can3D }: { can3D: boolean | null }) {
  return can3D === true
    ? "Drag to orbit · tap a building for details"
    : `Static site plan · ${PORTFOLIO_TOTALS.buildings} buildings across three parks`;
}
