"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ShieldCheck, Building2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { IMAGES } from "@/data/images";
import JellyRibbon from "@/components/ui/JellyRibbon";
import JellyFrame from "@/components/ui/JellyFrame";

const STATS = [
  { value: "2M+", label: "sq.ft under execution" },
  { value: "4", label: "core verticals" },
  { value: "6", label: "step delivery system" },
  { value: "Zero", label: "harm is the goal" },
];

// Spaces inside SVG text collapse, so the ribbon's gaps are non-breaking ones.
const NBSP = " ";

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
              <span data-ah-line className="block join-shine">kept on every site.</span>
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
          <div data-ah-frame className="drop-shadow-[0_30px_40px_rgba(15,43,87,0.35)]">
            <JellyFrame className="aspect-[4/3] w-full lg:aspect-[5/4]" echoClassName="stroke-[#0b4fc2]/30">
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
            </JellyFrame>
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

      {/* stat ribbon: the figures loop along it, hidden from assistive tech,
          which reads the list instead */}
      <dl className="sr-only">
        {STATS.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      <div data-ah-stat className="pointer-events-none relative -mt-6 overflow-x-clip">
        <JellyRibbon
          band={76}
          sway={20}
          repeats={4}
          stitched
          className="drop-shadow-[0_14px_18px_rgba(15,43,87,0.25)]"
          bandClassName="fill-[#0b4fc2]"
          textClassName="font-display text-[34px] font-bold"
        >
          {STATS.map((s) => (
            <tspan key={s.label}>
              <tspan className="fill-white">{s.value}</tspan>
              <tspan className="fill-blue-200 font-medium [font-family:var(--font-body)]" style={{ fontSize: "0.6em" }}>
                {NBSP}
                {NBSP}
                {s.label.replace(/ /g, NBSP)}
              </tspan>
              <tspan className="fill-white" style={{ fontSize: "0.7em" }}>
                {NBSP.repeat(4)}✦{NBSP.repeat(4)}
              </tspan>
            </tspan>
          ))}
        </JellyRibbon>
      </div>
    </section>
  );
}
