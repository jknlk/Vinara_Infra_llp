"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { CAREERS_STATS } from "@/data/content/careers";
import { IMAGES } from "@/data/images";

export default function CareersHero({ openRoles, departments }: { openRoles: number; departments: number }) {
  const stats = CAREERS_STATS.map((s) =>
    s.label === "Open roles"
      ? { ...s, value: String(openRoles) }
      : s.label === "Departments"
        ? { ...s, value: String(departments) }
        : s
  );
  const scopeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const photo = IMAGES.showcaseSiteTeam;

  useGSAP(
    () => {
      if (!h1Ref.current) return;
      const split = new SplitText(h1Ref.current, { type: "lines", mask: "lines" });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(split.lines, { yPercent: 110, stagger: 0.09, duration: 1 }).from(
        "[data-careers-hero-copy]",
        { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 },
        "-=0.5"
      );
      return () => split.revert();
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative min-h-[92svh] w-full overflow-hidden bg-ink">
      {photo.src ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${photo.src})` }}
          role="img"
          aria-label={photo.alt}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

      <div className="relative z-10 flex min-h-[92svh] flex-col justify-end px-6 pb-12 pt-32 md:px-12 md:pb-16">
        <div className="max-w-3xl">
          <div
            data-careers-hero-copy
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-label uppercase tracking-[0.08em] text-white backdrop-blur"
          >
            <Sparkles size={14} className="text-sky-300" />
            We&rsquo;re hiring
          </div>

          <h1 ref={h1Ref} className="mt-6 text-display-xl font-display leading-[0.95] text-white">
            Build your career with us.
          </h1>

          <p
            data-careers-hero-copy
            className="mt-6 max-w-[56ch] text-body-l text-sky-100 [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]"
          >
            We&rsquo;re growing across warehousing, industrial and infrastructure delivery — and
            we&rsquo;re hiring people who want to build, not just watch.
          </p>

          <div data-careers-hero-copy className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#open-roles"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-body font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              View open roles
              <ArrowRight size={18} />
            </a>
            <a
              href="mailto:careers@vinarainfra.com?subject=General%20Application"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-body font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Send your resume
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div
          data-careers-hero-copy
          className="mt-12 rounded-2xl border border-white/15 bg-ink/70 px-6 py-6 shadow-xl shadow-black/20 backdrop-blur-md sm:px-8"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {stats.map((s) => (
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
