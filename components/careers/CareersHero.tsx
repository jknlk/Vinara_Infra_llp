"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { afterPreloader } from "@/lib/afterPreloader";
import { CAREERS_STATS, type JobRole } from "@/data/content/careers";
import { IMAGES } from "@/data/images";
export default function CareersHero({
  openRoles,
  departments,
  featured,
}: {
  openRoles: number;
  departments: number;
  featured: JobRole[];
}) {
  const stats = CAREERS_STATS.map((s) =>
    s.label === "Open roles"
      ? { ...s, value: String(openRoles) }
      : s.label === "Departments"
        ? { ...s, value: String(departments) }
        : s
  );
  const scopeRef = useRef<HTMLElement>(null);
  const photo = IMAGES.careersHero;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Staged now, played once the preloader lifts: started straight away it
      // would run unseen behind it on a hard load.
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      tl.from("[data-ch-line]", { yPercent: 110, stagger: 0.12, duration: 1.1 })
        .from("[data-ch-fade]", { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.7")
        .fromTo(
          "[data-ch-frame]",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut", clearProps: "clipPath" },
          0
        )
        .from("[data-ch-photo]", { scale: 1.18, duration: 1.8, ease: "power3.out" }, 0)
        .from("[data-ch-float]", { y: 28, opacity: 0, duration: 0.8 }, "-=0.9")
        .from("[data-ch-stat]", { y: 20, opacity: 0, stagger: 0.07, duration: 0.7 }, "-=0.7");

      // Only where the photo bleeds: the drift opens a sliver above it, which
      // the nav and the top fade cover there but a framed photo would show.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        gsap.to("[data-ch-photo]", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: scopeRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return afterPreloader(() => tl.play());
    },
    { scope: scopeRef }
  );

  return (
    // From lg up the hero is exactly one screen, sized off the viewport height as well as its width.
    <section ref={scopeRef} className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-white">
      {/* backdrop: brand glow + setting-out grid, both kept clear of the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[12%] -top-[30%] -z-10 h-[80%] w-[55%] rounded-full bg-blue-600/40 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 36% 80% at 12% 45%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 36% 80% at 12% 45%, #000, transparent)",
        }}
      />

      {/* the bottom padding clears the fixed marquee ribbon, which is 3.6vw tall at its crest */}
      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-y-10 px-6 pb-12 pt-28 md:px-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 lg:pb-[calc(3.6vw+0.75rem)] lg:pt-[6.5rem]">
        {/* `contents` below lg, so the photo can sit between the copy and the stats */}
        <div className="contents lg:col-span-8 lg:flex lg:flex-col">
          <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-center">
            <div
              data-ch-fade
              className="inline-flex items-center gap-3 self-start rounded-full border border-white/15 bg-white/5 py-1.5 pl-3 pr-4 text-label uppercase tracking-[0.12em] text-white/80 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Careers at Vinara
              <span className="h-3 w-px bg-white/25" />
              <span className="tabular text-blue-300">
                {openRoles} open {openRoles === 1 ? "role" : "roles"}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[length:clamp(2.5rem,11vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] lg:mt-[clamp(0.875rem,2.6svh,1.75rem)] lg:text-[length:clamp(2.5rem,min(5.4vw,9.6svh),5rem)]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-ch-line className="block">
                  Build your career
                </span>
              </span>
              <span className="block overflow-hidden">
                {/* the padding keeps the descenders inside the box the gradient is clipped to */}
                <span
                  data-ch-line
                  className="block join-shine join-shine-dark pb-[0.14em]"
                >
                  where things get built.
                </span>
              </span>
            </h1>

            <p
              data-ch-fade
              className="mt-5 max-w-[52ch] text-body-l text-white/75 lg:mt-[clamp(0.75rem,2.4svh,1.5rem)]"
            >
              We&rsquo;re growing across warehousing, industrial and infrastructure delivery — and
              we&rsquo;re hiring people who want to build, not just watch.
            </p>

            <div data-ch-fade className="mt-8 flex flex-wrap items-center gap-3 lg:mt-[clamp(1.25rem,3.6svh,2.25rem)]">
              <a
                href="#open-roles"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-400 px-6 py-3 text-body font-semibold text-ink shadow-lg shadow-blue-400/25 transition-colors hover:bg-white"
              >
                View open roles
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="mailto:careers@vinarainfra.com?subject=General%20Application"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-body font-semibold text-white backdrop-blur transition-colors hover:border-white/50 hover:bg-white/10"
              >
                Send your resume
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <dl className="order-3 grid grid-cols-2 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-4 lg:order-none lg:mt-[clamp(1.25rem,4svh,2.5rem)] lg:pt-[clamp(1rem,2.8svh,1.5rem)]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-ch-stat
                className={`flex flex-col-reverse justify-end pr-4 ${i % 2 === 1 ? "border-l border-white/15 pl-5" : ""} ${
                  i > 0 ? "sm:border-l sm:border-white/15 sm:pl-5 lg:pl-6" : ""
                }`}
              >
                <dt className="mt-1.5 text-label uppercase tracking-[0.1em] text-white/60">{s.label}</dt>
                <dd className="tabular font-display text-3xl font-extrabold leading-none tracking-[-0.02em] text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-2 lg:order-none lg:col-span-4 lg:flex lg:flex-col lg:justify-end">
          {/* a framed photo on phones; from lg it bleeds off the right edge behind the columns */}
          <div
            data-ch-frame
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:aspect-auto lg:w-[54%] lg:rounded-none lg:border-0"
          >
            {/* starts just under the nav, so the hard hats aren't lost behind it */}
            <div className="absolute inset-0 lg:top-[4.75rem]">
              {photo.src ? (
                <Image
                  data-ch-photo
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="origin-top scale-[1.12] object-cover object-[72%_0%]"
                />
              ) : null}
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent lg:hidden" />
            {/* from lg the photo melts into the page on every side but the right */}
            <div
              aria-hidden
              className="absolute inset-0 hidden lg:block"
              style={{
                background: [
                  "linear-gradient(to right, var(--color-ink) 0%, rgb(6 32 79 / 0.88) 24%, rgb(6 32 79 / 0) 62%)",
                  "linear-gradient(to bottom, var(--color-ink) 4.75rem, rgb(6 32 79 / 0) calc(4.75rem + 16%))",
                  "linear-gradient(to top, var(--color-ink) 0%, rgb(6 32 79 / 0.45) 26%, rgb(6 32 79 / 0) 54%)",
                ].join(", "),
              }}
            />
          </div>

          {featured.length > 0 ? (
            <div
              data-ch-float
              className="relative mx-3 -mt-24 rounded-2xl border border-white/15 bg-ink/75 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:ml-auto sm:mr-5 sm:max-w-sm lg:mx-0 lg:mt-0 lg:max-w-none"
            >
              <div className="flex items-center justify-between gap-4 px-3 pb-1 pt-2">
                <p className="text-label uppercase tracking-[0.12em] text-white/55">Latest openings</p>
                <a
                  href="#open-roles"
                  className="text-label normal-case tracking-normal text-blue-300 transition-colors hover:text-white"
                >
                  View all {openRoles}
                </a>
              </div>
              <ul>
                {featured.map((role) => (
                  <li key={role.title}>
                    <a
                      href="#open-roles"
                      className="group flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-caption font-semibold text-white">{role.title}</span>
                        <span className="mt-0.5 flex items-center gap-1 truncate text-label font-normal normal-case tracking-normal text-white/60">
                          <MapPin size={11} className="shrink-0 text-blue-400" />
                          <span className="truncate">{role.location}</span>
                        </span>
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-400 group-hover:text-ink">
                        <ArrowUpRight size={15} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
