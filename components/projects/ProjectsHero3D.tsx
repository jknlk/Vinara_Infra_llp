"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/buildings";

const MasterPlanScene = dynamic(() => import("@/components/hero/MasterPlanScene"), { ssr: false });

const eyebrow = "text-label uppercase tracking-[0.14em]";

export default function ProjectsHero3D({
  summary,
  stats,
  fallback,
}: {
  summary: string;
  stats: { value: string; label: string }[];
  // shown instead of the live scene on devices without WebGL
  fallback: React.ReactNode;
}) {
  const [can3D, setCan3D] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);
  const [inside, setInside] = useState(false);
  const project = PROJECTS[index];

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      const cores = navigator.hardwareConcurrency ?? 8;
      setCan3D(Boolean(gl) && cores >= 4);
    } catch {
      setCan3D(false);
    }
  }, []);

  const step = (by: number) => setIndex((i) => (i + by + PROJECTS.length) % PROJECTS.length);

  // the copy steps aside while the visitor is walking around inside a warehouse
  const chrome = `transition-opacity duration-500 ${inside ? "pointer-events-none opacity-0" : "opacity-100"}`;

  const switcher = (
    <div className="flex items-center gap-1.5 rounded-full bg-white/90 p-1.5 shadow-lg backdrop-blur-sm">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous site"
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#0f2b57] transition hover:bg-[#0f2b57]/10"
      >
        <ArrowLeft size={16} />
      </button>
      {PROJECTS.map((p, i) => (
        <button
          key={p.slug}
          type="button"
          onClick={() => setIndex(i)}
          aria-pressed={i === index}
          className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-caption font-semibold transition sm:px-3.5 ${
            i === index ? "bg-[#0f2b57] text-white" : "text-[#0f2b57] hover:bg-[#0f2b57]/10"
          }`}
        >
          {p.shortName}
        </button>
      ))}
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next site"
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#0f2b57] transition hover:bg-[#0f2b57]/10"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );

  return (
    <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden bg-[#dbe9f4] lg:min-h-[720px]">
      <div className="absolute inset-0">
        {can3D === true ? (
          <MasterPlanScene activeSlug={project.slug} hero onInsideChange={setInside} />
        ) : can3D === false ? (
          fallback
        ) : null}
      </div>

      {/* scrims keep the copy readable over the scene: from the left on wide screens, from the bottom on phones */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 hidden w-[40%] bg-gradient-to-r from-[#f2f7fc]/85 via-[#f2f7fc]/45 to-transparent lg:block ${chrome}`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#f2f7fc]/95 via-[#f2f7fc]/60 to-transparent lg:hidden ${chrome}`}
      />

      <div
        className={`pointer-events-none absolute inset-0 mx-auto flex w-full max-w-[1680px] flex-col justify-end px-4 pb-6 sm:px-6 lg:justify-center lg:px-8 lg:pb-0 lg:pt-20 ${chrome}`}
      >
        {/* phones get a short strip (title, one button, site switcher) so the scene stays in full view; it takes touches so the page can still be scrolled */}
        <div className={`lg:w-[44%] ${inside ? "" : "pointer-events-auto lg:pointer-events-none"}`}>
          <p className={`${eyebrow} hidden items-center gap-3 text-[#3e86d0] lg:flex`}>
            <span className="h-px w-10 bg-[#3e86d0]" />
            Projects
          </p>
          <h1 className="font-display text-2xl font-bold leading-[1.05] text-[#0f2b57] sm:text-3xl lg:mt-4 lg:text-7xl">
            Portfolio <span className="text-[#3e86d0] lg:block">at a glance.</span>
          </h1>
          <p className="mt-4 hidden max-w-[48ch] text-body-l text-[#42536c] lg:block">{summary}</p>
          <div className={`mt-3 flex flex-wrap items-center gap-3 lg:mt-6 ${inside ? "" : "pointer-events-auto"}`}>
            <a
              href={`#${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#0f2b57] px-4 py-2 text-caption font-semibold text-white transition hover:bg-[#1d5fb0] lg:px-7 lg:py-3 lg:text-body"
            >
              Explore sites <ArrowUpRight size={18} />
            </a>
            <a
              href="/contact"
              className="hidden rounded-full border border-[#0f2b57]/25 bg-white/70 px-7 py-3 text-body font-semibold text-[#0f2b57] transition hover:border-[#0f2b57] lg:inline-block"
            >
              Talk to us
            </a>
          </div>
          {can3D === true ? <div className="mt-3 flex lg:hidden">{switcher}</div> : null}
          <dl className="mt-8 hidden grid-cols-4 gap-x-8 gap-y-5 border-t border-[#0f2b57]/15 pt-6 lg:grid">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="tabular font-display text-2xl font-bold text-[#0f2b57] md:text-3xl">{s.value}</dd>
                <dt className="mt-1 text-caption text-[#42536c]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {can3D === true ? (
        <div className={`absolute bottom-16 right-4 hidden flex-col items-end gap-2 lg:flex ${chrome}`}>
          <p className="rounded-full bg-[#0f2b57]/85 px-3 py-1 text-caption text-white backdrop-blur-sm">
            Live 3D · {project.name} · {project.buildingsCount} buildings
          </p>
          {switcher}
        </div>
      ) : null}
    </section>
  );
}
