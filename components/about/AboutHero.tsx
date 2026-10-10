"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ShieldCheck, Building2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { IMAGES } from "@/data/images";

const STATS = [
  { value: "2M+", count: 2, suffix: "M+", label: "sq.ft under execution" },
  { value: "4", count: 4, suffix: "", label: "core verticals" },
  { value: "6", count: 6, suffix: "", label: "step delivery system" },
  { value: "Zero", label: "harm is the goal" },
];

const HERO_IMAGE = IMAGES.aboutHeroSiteTeam;

export default function AboutHero() {
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-ah-line]", { yPercent: 110, stagger: 0.12, duration: 1.1 })
        .from("[data-ah-fade]", { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.6")
        .from("[data-ah-frame]", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "power3.inOut" }, 0.1)
        .from("[data-ah-stat]", { y: 30, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.6")
        .from("[data-ah-badge]", { scale: 0.8, y: 20, opacity: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.6)" }, "-=1.2");

      gsap.fromTo("[data-ah-img]", { scale: 1.18 }, { scale: 1, duration: 2.2, ease: "power3.out" });
      gsap.to("[data-ah-badge]", { y: "-=10", duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.8, delay: 1.6 });

      gsap.utils.toArray<HTMLElement>("[data-ah-count]").forEach((el) => {
        const target = Number(el.dataset.ahCount);
        const suffix = el.dataset.ahSuffix ?? "";
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.8,
          delay: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(o.v) + suffix;
          },
        });
      });
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative w-full overflow-hidden bg-white text-[#0f2b57]">
      {/* backdrop: blueprint grid + soft glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(11,79,194,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,79,194,0.07)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[#3e86d0]/20 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-[#0b4fc2]/10 blur-[120px]" />
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pb-14 pt-32 md:px-12 md:pt-36 lg:min-h-[88svh] lg:grid-cols-12 lg:gap-14 lg:px-16">
        {/* copy */}
        <div className="lg:col-span-6">
          <p
            data-ah-fade
            className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]"
          >
            <span className="h-px w-12 bg-[#3e86d0]" />
            About Vinara Infra LLP
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-1">
              <span data-ah-line className="block">A builder&rsquo;s promise,</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-ah-line className="block bg-gradient-to-r from-[#0b4fc2] via-[#2f7bf0] to-[#3e86d0] bg-clip-text text-transparent">kept on every site.</span>
            </span>
          </h1>
          <p data-ah-fade className="mt-6 max-w-[46ch] text-body-l text-[#5a6b84]">
            From warehousing to infrastructure, we bring technology-driven discipline to every
            stage of delivery — planned, engineered and handed over with care.
          </p>

          <a
            href="#about-body"
            data-ah-fade
            className="mt-8 hidden items-center gap-2 text-caption font-semibold text-[#0b4fc2] transition-colors hover:text-[#0f2b57] sm:inline-flex"
          >
            Scroll to explore <ArrowDown size={14} />
          </a>
        </div>

        {/* photo */}
        <div className="relative lg:col-span-6">
          {/* offset outline frame */}
          <div aria-hidden className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-[28px] border-2 border-[#0b4fc2]/25 sm:block" />
          <div
            data-ah-frame
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-[0_40px_80px_-24px_rgba(15,43,87,0.45)] lg:aspect-[5/4]"
          >
            {HERO_IMAGE.src ? (
              <Image
                data-ah-img
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            ) : null}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f2b57]/45 via-transparent to-transparent" />
          </div>

          {/* floating glass badges */}
          <div
            data-ah-badge
            className="absolute -left-3 bottom-8 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_20px_40px_-16px_rgba(15,43,87,0.45)] backdrop-blur-xl sm:-left-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#0b4fc2] to-[#4d94ff] text-white">
              <Building2 size={20} />
            </span>
            <span>
              <span className="block font-display text-xl font-bold leading-none text-[#0b4fc2]">2M+ sq.ft</span>
              <span className="mt-1 block text-caption text-[#5a6b84]">under execution</span>
            </span>
          </div>
          <div
            data-ah-badge
            className="absolute -top-3 right-4 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_20px_40px_-16px_rgba(15,43,87,0.45)] backdrop-blur-xl sm:-right-4 sm:top-10"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0f2b57] text-white">
              <ShieldCheck size={20} />
            </span>
            <span>
              <span className="block font-display text-xl font-bold leading-none text-[#0f2b57]">Zero harm</span>
              <span className="mt-1 block text-caption text-[#5a6b84]">our standing goal</span>
            </span>
          </div>
        </div>
      </div>

      {/* stat rail */}
      <div className="relative border-t border-[#0f2b57]/10 bg-white/70 backdrop-blur">
        <dl className="mx-auto grid w-full max-w-[1440px] grid-cols-2 px-6 md:px-12 lg:grid-cols-4 lg:px-16">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-ah-stat
              className={`py-7 pr-6 ${i > 0 ? "lg:border-l lg:border-[#0f2b57]/10 lg:pl-8" : ""} ${
                i % 2 === 1 ? "border-l border-[#0f2b57]/10 pl-6" : ""
              } ${i > 1 ? "border-t border-[#0f2b57]/10 lg:border-t-0" : ""}`}
            >
              <dd
                className="font-display text-3xl font-bold text-[#0b4fc2] md:text-4xl"
                {...(s.count ? { "data-ah-count": s.count, "data-ah-suffix": s.suffix } : {})}
              >
                {s.value}
              </dd>
              <dt className="mt-1 text-caption text-[#5a6b84]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
