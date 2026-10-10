"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
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
  const inset = IMAGES.careersTeam;

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-ch-line]", { yPercent: 110, stagger: 0.12, duration: 1.1 })
        .from("[data-ch-fade]", { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.7")
        .from("[data-ch-frame]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" }, 0.1)
        .from("[data-ch-photo]", { scale: 1.3, duration: 1.6, ease: "power3.out" }, 0.1)
        .from("[data-ch-float]", { y: 28, opacity: 0, stagger: 0.12, duration: 0.8 }, "-=0.9")
        .from("[data-ch-stat]", { y: 20, opacity: 0, stagger: 0.07, duration: 0.7 }, "-=0.7");

      gsap.to("[data-ch-photo]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: scopeRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-white">
      {/* backdrop: brand glow + setting-out grid */}
      <div
        className="pointer-events-none absolute -right-[10%] -top-[20%] -z-10 h-[70%] w-[60%] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-navy-700), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-[30%] -left-[15%] -z-10 h-[60%] w-[50%] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-blue-400), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-12 px-6 pb-12 pt-32 md:px-12 lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-36">
        {/* copy */}
        <div className="lg:col-span-7">
          <div
            data-ch-fade
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-1.5 pl-3 pr-4 text-label uppercase tracking-[0.12em] text-white/80 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            Careers at Vinara
            <span className="h-3 w-px bg-white/25" />
            <span className="tabular text-blue-400">
              {openRoles} open {openRoles === 1 ? "role" : "roles"}
            </span>
          </div>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,6.4vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-ch-line className="block">
                Build your career
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-ch-line className="block text-blue-400">
                where things get built.
              </span>
            </span>
          </h1>

          <p data-ch-fade className="mt-7 max-w-[54ch] text-body-l text-white/70">
            We&rsquo;re growing across warehousing, industrial and infrastructure delivery — and
            we&rsquo;re hiring people who want to build, not just watch.
          </p>

          <div data-ch-fade className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#open-roles"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-400 px-6 py-3.5 text-body font-semibold text-ink transition-colors hover:bg-white"
            >
              View open roles
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:careers@vinarainfra.com?subject=General%20Application"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-body font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Send your resume
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        {/* photo composition */}
        <div className="relative lg:col-span-5">
          <div
            data-ch-frame
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/10 sm:aspect-[16/10] lg:aspect-[4/5] lg:max-h-[68svh]"
          >
            {photo.src ? (
              <Image
                data-ch-photo
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="scale-[1.15] object-cover"
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

            {featured.length > 0 ? (
              <div
                data-ch-float
                className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-ink/70 p-2 backdrop-blur-xl sm:inset-x-4 sm:bottom-4"
              >
                <p className="px-3 pb-1 pt-2 text-label uppercase tracking-[0.12em] text-white/50">Latest openings</p>
                <ul>
                  {featured.map((role) => (
                    <li key={role.title}>
                      <a
                        href="#open-roles"
                        className="group flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-caption font-semibold text-white">{role.title}</span>
                          <span className="mt-0.5 flex items-center gap-1 truncate text-label font-normal normal-case tracking-normal text-white/55">
                            <MapPin size={11} className="shrink-0 text-blue-400" />
                            <span className="truncate">{role.location}</span>
                          </span>
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {inset.src ? (
            <div
              data-ch-float
              className="absolute -left-10 top-10 hidden w-40 overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/40 xl:block"
            >
              <div className="relative aspect-[4/5]">
                <Image src={inset.src} alt={inset.alt} fill sizes="160px" className="object-cover" />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* stat rail */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] items-stretch px-6 md:px-12">
          <dl className="grid flex-1 grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-ch-stat
                className={`py-6 pr-6 lg:py-7 ${i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""} ${
                  i % 2 === 1 ? "border-l border-white/10 pl-6" : ""
                } ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""}`}
              >
                <dd className="tabular font-display text-3xl font-extrabold leading-none tracking-[-0.02em] text-white md:text-4xl">
                  {s.value}
                </dd>
                <dt className="mt-2 text-label uppercase tracking-[0.1em] text-white/55">{s.label}</dt>
              </div>
            ))}
          </dl>
          <a
            href="#why-vinara"
            aria-label="Scroll to explore"
            className="ml-8 hidden items-center gap-3 self-center text-label uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white xl:flex"
          >
            Scroll
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20">
              <ArrowDown size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
