"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, BadgeCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import JellyFrame from "@/components/ui/JellyFrame";
import { useLenis } from "@/components/providers/SmoothScroll";
import { IMAGES } from "@/data/images";
import { SERVICE_SECTIONS } from "@/data/content/services";

const eyebrow = "text-label uppercase tracking-[0.14em]";
const pad = (n: number) => String(n).padStart(2, "0");
const COUNT = SERVICE_SECTIONS.length;
const TOTAL = pad(COUNT);
const SLUGS: string[] = SERVICE_SECTIONS.map((s) => s.slug);
// where the pinned frame rests: just under the floating nav
const PIN_TOP = 104;

// The four disciplines as chapters. On desktop the block pins and the page
// scroll carries the chapters past sideways, one screen each, while the rail on
// the left tracks the one in view and each scroll settles on the next chapter.
// Short or reduced-motion screens get the same row as a plain sideways
// scroller; below desktop the chapters stack.
export default function ServiceChapters() {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const goTo = (i: number, immediate = false) => {
    const pin = pinRef.current;
    if (pin) {
      const y = pin.start + ((pin.end - pin.start) * i) / (COUNT - 1);
      if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate });
      else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
      return;
    }
    const viewport = viewportRef.current;
    if (!viewport) return;
    const max = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollTo({ left: (max * i) / (COUNT - 1), behavior: "smooth" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1280px)",
          tall: "(min-height: 560px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, tall, reduced } = ctx.conditions as Record<string, boolean>;
          const root = rootRef.current;
          const viewport = viewportRef.current;
          const track = trackRef.current;
          if (!desktop || !root || !viewport || !track) return;

          // rail: the bar fills to the chapter in view
          const paint = (progress: number) => {
            gsap.set("[data-chapter-progress]", {
              scaleY: (1 + progress * (COUNT - 1)) / COUNT,
            });
            setActive(Math.round(progress * (COUNT - 1)));
          };
          paint(0);

          if (!tall || reduced) {
            const onScroll = () => {
              const max = viewport.scrollWidth - viewport.clientWidth;
              paint(max > 0 ? viewport.scrollLeft / max : 0);
            };
            viewport.addEventListener("scroll", onScroll, { passive: true });
            return () => viewport.removeEventListener("scroll", onScroll);
          }

          // clip, not hidden: an anchor jump can still scroll a hidden box sideways
          viewport.scrollLeft = 0;
          gsap.set(viewport, { overflow: "clip" });

          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          // the chapter the scroll last came to rest on
          let settled = 0;
          const slide = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: `top ${PIN_TOP}px`,
              end: () => `+=${distance()}`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => paint(self.progress),
              onEnter: () => (settled = 0),
              onEnterBack: () => (settled = COUNT - 1),
            },
          });
          pinRef.current = slide.scrollTrigger ?? null;

          // each photo drifts against the slide inside its frame
          gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
            const img = chapter.querySelector("[data-chapter-img]");
            if (!img) return;
            gsap.fromTo(
              img,
              { xPercent: -6, scale: 1.14 },
              {
                xPercent: 6,
                scale: 1.14,
                ease: "none",
                scrollTrigger: {
                  trigger: chapter,
                  containerAnimation: slide,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });

          // One chapter per scroll: when the wheel stops between two, carry on
          // to the one it was heading for (or back, if it barely moved).
          const onScrollEnd = () => {
            const pin = pinRef.current;
            if (!pin || !pin.isActive) return;
            const at = pin.progress * (COUNT - 1);
            const moved = at - settled;
            const next =
              Math.abs(moved) < 0.06 ? settled : moved > 0 ? Math.ceil(at - 0.02) : Math.floor(at + 0.02);
            settled = gsap.utils.clamp(0, COUNT - 1, next);
            if (Math.abs(at - settled) > 0.002) goTo(settled);
          };
          ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

          // The chapters sit side by side, so a #slug can't be reached by a
          // plain anchor jump: turn it into a position along the pin instead.
          const onClick = (e: MouseEvent) => {
            const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href*='#']");
            if (!link || root.contains(link) || link.pathname !== window.location.pathname) return;
            const i = SLUGS.indexOf(link.hash.slice(1));
            if (i < 0) return;
            e.preventDefault();
            goTo(i);
          };
          document.addEventListener("click", onClick, true);

          const fromHash = gsap.delayedCall(0.3, () => {
            const i = SLUGS.indexOf(window.location.hash.slice(1));
            if (i > 0) goTo(i, true);
          });

          return () => {
            ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
            document.removeEventListener("click", onClick, true);
            fromHash.kill();
            pinRef.current = null;
          };
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const jump = (e: React.MouseEvent, id: string, offset = -110) => {
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(`#${id}`, { offset });
  };

  return (
    <section id="capabilities" className="relative bg-white py-14 md:py-20">
      <Container full>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <p className={`${eyebrow} flex items-center gap-3 text-blue-600`}>
              <span className="h-px w-10 bg-blue-600" />
              What we build
            </p>
            <h2 className="mt-5 max-w-[16ch] font-display text-display-l join-shine pb-[0.08em]">
              Four disciplines, built to work as one.
            </h2>
          </div>
          <p className="text-body-l text-grey-500 lg:col-span-4">
            Every discipline is planned, built and handed over by one accountable team, with precast and concrete
            produced in-house.
          </p>
        </div>

        <div
          ref={rootRef}
          className="mt-12 grid gap-10 border-t border-ink/10 bg-white pt-10 md:mt-16 md:pt-14 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-12 2xl:grid-cols-[17rem_minmax(0,1fr)] xl:pt-6"
        >
          {/* chapter rail */}
          <aside className="hidden xl:block">
            <nav aria-label="Disciplines">
              <div aria-hidden className="tabular flex items-baseline gap-2 font-display font-extrabold leading-none">
                <span className="block h-[1em] overflow-hidden text-7xl text-blue-600">
                  <span
                    className="block transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ transform: `translateY(-${active}em)` }}
                  >
                    {SERVICE_SECTIONS.map((s, i) => (
                      <span key={s.slug} className="block h-[1em]">
                        {pad(i + 1)}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="text-xl text-grey-300">/ {TOTAL}</span>
              </div>

              <ol className="relative mt-8 border-l border-ink/10">
                <span
                  aria-hidden
                  data-chapter-progress
                  className="absolute -left-px top-0 h-full w-0.5 origin-top bg-blue-600"
                />
                {SERVICE_SECTIONS.map((s, i) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(i);
                      }}
                      aria-current={active === i ? "true" : undefined}
                      className={`flex gap-3 py-2.5 pl-5 text-caption font-semibold leading-snug transition-all duration-500 ${
                        active === i ? "translate-x-1.5 text-ink" : "text-grey-300 hover:text-ink"
                      }`}
                    >
                      <span className={`tabular ${active === i ? "text-blue-600" : ""}`}>{pad(i + 1)}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>

              <a
                href="#rmc"
                onClick={(e) => jump(e, "rmc", 0)}
                className={`${eyebrow} mt-8 inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-ink`}
              >
                Next: RMC plant
                <ArrowDown size={14} />
              </a>
            </nav>
          </aside>

          {/* chapters */}
          <div ref={viewportRef} className="min-w-0 xl:snap-x xl:snap-mandatory xl:overflow-x-auto">
            <div ref={trackRef} className="xl:flex xl:gap-12 xl:will-change-transform">
              {SERVICE_SECTIONS.map((s, i) => {
                const image = IMAGES[s.imageKey as keyof typeof IMAGES];
                return (
                  <article
                    key={s.slug}
                    id={s.slug}
                    data-chapter
                    className="scroll-mt-28 border-t border-ink/10 py-12 first:border-t-0 first:pt-0 last:pb-0 md:py-16 xl:grid xl:w-full xl:shrink-0 xl:snap-start xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:grid-rows-[auto_1fr] xl:gap-x-12 xl:gap-y-6 xl:border-t-0 xl:py-0"
                  >
                    <div className="xl:col-start-1 xl:row-start-1">
                      <p className={`${eyebrow} tabular text-blue-600`}>
                        {pad(i + 1)} <span className="text-grey-300">/ {TOTAL}</span>
                        <span className="mx-3 text-grey-300">—</span>
                        Capability
                      </p>
                      <h3 className="mt-4 max-w-[15ch] text-balance font-display text-display-l text-ink xl:mt-3 xl:text-[clamp(1.5rem,2.1vw,2.5rem)] xl:leading-[1.05]">
                        {s.title}
                      </h3>
                    </div>

                    <JellyFrame
                      className="mt-8 aspect-[16/10] md:aspect-[21/9] xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mt-0 xl:aspect-[4/5] xl:h-[min(calc(100svh-184px),640px,34vw)] xl:self-start"
                      echoClassName="stroke-blue-600/25"
                    >
                      <div aria-hidden className="absolute inset-0 bg-blue-100" />
                      {image?.src ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width:1280px) 30vw, 100vw"
                          data-chapter-img
                          className="object-cover"
                        />
                      ) : null}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-tr from-ink/55 via-ink/5 to-transparent"
                      />
                      <span
                        aria-hidden
                        className="tabular pointer-events-none absolute -bottom-[0.14em] right-4 font-display text-[7rem] font-extrabold leading-none text-white/20 md:right-8 md:text-[12rem]"
                      >
                        {pad(i + 1)}
                      </span>
                    </JellyFrame>

                    <div className="mt-8 md:mt-10 xl:col-start-1 xl:row-start-2 xl:mt-0">
                      <p className="font-display text-2xl font-medium leading-[1.25] tracking-tight text-ink md:text-[1.75rem] xl:text-lg xl:leading-[1.35]">
                        {s.body}
                      </p>
                      <div className="mt-7 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 xl:mt-5">
                        <BadgeCheck size={20} className="mt-0.5 shrink-0 text-blue-600" />
                        <p className="text-caption text-grey-500">
                          <span className={`${eyebrow} mb-1 block text-blue-600`}>Proven on site</span>
                          {s.reference}
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:mt-0">
                      <p className={`${eyebrow} text-grey-500`}>Scope of work</p>
                      <ul className="mt-4 border-t border-ink/15 xl:mt-3">
                        {s.items.map((item, n) => (
                          <li
                            key={item}
                            className="group relative flex items-baseline gap-5 border-b border-ink/15 py-4 md:py-5 xl:py-2.5"
                          >
                            <span className="tabular text-caption font-semibold text-blue-600">{pad(n + 1)}</span>
                            <span className="font-display text-xl font-bold leading-snug text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-2xl xl:text-base 2xl:text-lg">
                              {item}
                            </span>
                            <span
                              aria-hidden
                              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-blue-600 transition-transform duration-500 ease-out group-hover:scale-x-100"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
