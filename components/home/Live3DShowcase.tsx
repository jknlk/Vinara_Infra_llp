"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/buildings";

const MasterPlanScene = dynamic(() => import("@/components/hero/MasterPlanScene"), { ssr: false });

export default function Live3DShowcase() {
  const [can3D, setCan3D] = useState<boolean | null>(null);
  const [near, setNear] = useState(false);
  const [index, setIndex] = useState(0);
  const [inside, setInside] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const project = PROJECTS[index];

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setCan3D(Boolean(gl));
    } catch {
      setCan3D(false);
    }
  }, []);

  // the heavy scene only loads once the section is about to scroll into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = (by: number) => setIndex((i) => (i + by + PROJECTS.length) % PROJECTS.length);
  const fade = `transition-opacity duration-500 ${inside ? "pointer-events-none opacity-0" : "opacity-100"}`;

  return (
    <section className="bg-white py-6 lg:py-8">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
              <span className="h-px w-6 bg-blue-500" />
              Live 3D Experience
            </div>
            <h2 className="mt-4 max-w-2xl text-display-m font-display leading-[1.1]">
              <span className="text-ink">Walk our sites </span>
              <span className="join-shine">before you visit.</span>
            </h2>
          </div>
          <p className="max-w-md text-body-l text-grey-500">
            Orbit each campus in real time, tap any building and step inside the warehouse.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#dbe9f4] shadow-xl sm:aspect-[16/9] lg:aspect-auto lg:h-[540px]"
        >
          {can3D && near ? (
            <MasterPlanScene activeSlug={project.slug} embedded onInsideChange={setInside} />
          ) : null}

          {can3D === false ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#dbe9f4] to-[#b9d3ea]" />
          ) : null}

          {/* soft scrim so the copy reads over the scene */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#f2f7fc]/85 to-transparent ${fade}`}
          />

          <div className={`pointer-events-none absolute left-4 top-4 sm:left-8 sm:top-8 ${fade}`}>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#0f2b57]/85 px-3 py-1 text-caption text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live 3D · {project.name} · {project.buildingsCount} buildings
            </p>
          </div>

          <div
            className={`absolute inset-x-4 bottom-14 flex flex-col items-stretch gap-3 sm:inset-x-8 sm:bottom-12 lg:flex-row lg:items-end lg:justify-between ${fade}`}
          >
            <div className="pointer-events-auto flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f2b57] px-6 py-3 text-body font-semibold text-white shadow-lg transition hover:bg-[#1d5fb0]"
              >
                Explore projects <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="hidden rounded-full border border-[#0f2b57]/25 bg-white/80 px-6 py-3 text-body font-semibold text-[#0f2b57] backdrop-blur-sm transition hover:border-[#0f2b57] sm:inline-block"
              >
                Talk to us
              </Link>
            </div>

            {/* phones drop the arrows: the three site names alone already fill the width */}
            <div className="pointer-events-auto flex max-w-full items-center gap-1.5 self-start rounded-full bg-white/90 p-1.5 shadow-lg backdrop-blur-sm lg:self-auto">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous site"
                className="hidden h-8 w-8 items-center sm:flex justify-center rounded-full text-[#0f2b57] transition hover:bg-[#0f2b57]/10"
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
                className="hidden h-8 w-8 items-center sm:flex justify-center rounded-full text-[#0f2b57] transition hover:bg-[#0f2b57]/10"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
