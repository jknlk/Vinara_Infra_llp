"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Warehouse } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { Building } from "@/data/buildings";
import { STATUS } from "./BuildingCards";

export type ShowcaseSlide = Building & { src?: string; caption?: string };

const SQM_PER_SQFT = 0.092903;
const eyebrow = "text-label uppercase tracking-[0.14em]";

function num(v: number, d = 0) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function BuildingShowcase({ projectName, slides }: { projectName: string; slides: ShowcaseSlide[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  const sum = slides.reduce((a, b) => a + b.builtUpSqft, 0) || 1;
  const steps = Math.max(slides.length - 1, 1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // with reduced motion the strip stays a plain sideways-scrolling row
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        const track = trackRef.current;
        if (!root || !track) return;
        const distance = () => track.scrollWidth - root.clientWidth;

        // the page scroll drives the strip sideways while the frame stays pinned
        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            pin: true,
            // native scroll + fixed pin: a transform pin jitters against the mobile compositor
            pinType: "fixed",
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(fillRef.current, { scaleX: self.progress });
              const next = Math.round(self.progress * steps);
              setActive((cur) => (cur === next ? cur : next));
            },
          },
        });
        pinRef.current = scroll.scrollTrigger ?? null;

        gsap.utils.toArray<HTMLElement>("[data-slide]", root).forEach((slide, i) => {
          const q = gsap.utils.selector(slide);
          // clean reveal: everything fades up in order
          const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          tl.from(q("[data-ghost]"), { opacity: 0, duration: 1 }, 0)
            .from(q("[data-line]"), { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, 0)
            .from(q("[data-title]"), { y: 36, opacity: 0, duration: 0.8 }, 0.1)
            .from(q("[data-stat]"), { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.35)
            .from(q("[data-bar]"), { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power2.out" }, 0.55);
          q("[data-count]").forEach((el) => {
            const end = Number(el.dataset.count);
            const digits = Number(el.dataset.digits ?? 0);
            const counter = { v: 0 };
            tl.to(counter, { v: end, duration: 1.3, ease: "power2.out", onUpdate: () => void (el.textContent = num(counter.v, digits)) }, 0.35);
          });

          // caption lines rise in; re-split when fonts load or the width changes
          let lines: gsap.core.Tween | undefined;
          SplitText.create(q("[data-copy]"), {
            type: "lines",
            autoSplit: true,
            onSplit: (self) =>
              (lines = gsap.from(self.lines, {
                yPercent: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                delay: 0.3,
                paused: true,
              })),
          });

          const show = () => {
            tl.play();
            lines?.play();
          };
          const hide = () => {
            tl.reverse();
            lines?.reverse();
          };

          // the first slide is already on screen when the frame arrives; the rest enter from the right
          ScrollTrigger.create(
            i === 0
              ? { trigger: root, start: "top 55%", onEnter: show, onLeaveBack: hide }
              : { trigger: slide, containerAnimation: scroll, start: "left 78%", onEnter: show, onLeaveBack: hide }
          );

          // the photo drifts slightly inside its frame as the slide crosses the screen
          const cross = { trigger: slide, containerAnimation: scroll, start: "left right", end: "right left", scrub: true };
          gsap.fromTo(q("[data-photo]"), { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: cross });
        });

        return () => {
          pinRef.current = null;
        };
      });
    },
    { scope: rootRef, dependencies: [slides.length] }
  );

  function goTo(i: number) {
    const st = pinRef.current;
    if (!st) return;
    const y = st.start + ((st.end - st.start) * i) / steps;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  if (!slides.length) return null;

  return (
    <div
      ref={rootRef}
      className="relative min-h-[100lvh] overflow-hidden bg-[#0a1f3f] text-white motion-reduce:overflow-x-auto"
      aria-label={`${projectName} buildings`}
    >
      {/* blueprint grid and a soft glow behind the slides */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(#7fb6e8 1px, transparent 1px), linear-gradient(90deg, #7fb6e8 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 hidden h-[560px] w-[560px] rounded-full bg-[#3e86d0]/25 blur-[140px] md:block" />

      {/* The backdrop above fills the tallest viewport, so nothing shows under the
          pinned frame when the mobile URL bar collapses; the slides and the strip
          stay in the shortest one. */}
      <div className="relative h-[100svh] min-h-[640px]">
      <div ref={trackRef} className="relative flex h-full w-max px-[4vw] pb-28 pt-32">
        {slides.map((b, i) => {
          const s = STATUS[b.status];
          const share = (b.builtUpSqft / sum) * 100;
          return (
            <article
              key={b.id}
              data-slide
              className="relative flex h-full shrink-0 items-center gap-6 px-[2vw] lg:gap-10"
            >
              <span
                data-ghost
                aria-hidden
                className="tabular pointer-events-none absolute right-[2vw] top-0 hidden select-none font-display text-[15rem] font-bold leading-none text-transparent [-webkit-text-stroke:2px_rgba(127,182,232,0.2)] lg:block"
              >
                {pad(i + 1)}
              </span>

              {/* photo: always 16:9, high on one slide, low on the next */}
              <figure
                data-frame
                className="relative aspect-video h-[66%] shrink-0 overflow-hidden rounded-3xl bg-[#0f2b57] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
              >
                <div data-photo className="absolute inset-y-0 -left-[8%] -right-[8%]">
                  {b.src ? (
                    <Image src={b.src} alt={`${b.name}, ${projectName}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-white/30">
                      <Warehouse size={64} />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3f]/80 via-transparent to-[#0a1f3f]/20" />
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: s.hex }} />
                <figcaption className="absolute inset-x-5 bottom-4 flex items-center justify-between gap-3 text-caption text-white/85">
                  <span className="font-semibold">
                    {projectName} · {b.id}
                  </span>
                  <span className="tabular">
                    {pad(i + 1)} / {pad(slides.length)}
                  </span>
                </figcaption>
              </figure>

              {/* text: beside the photo, at the opposite edge */}
              <div data-text className="relative w-[min(30rem,80vw)] shrink-0">
                <div data-line className="flex flex-wrap items-center gap-3">
                  <p className={`${eyebrow} flex items-center gap-3 text-[#7fb6e8]`}>
                    <span className="h-px w-10 bg-[#7fb6e8]" />
                    Building {pad(i + 1)}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-caption font-semibold"
                    style={{ color: s.hex }}
                  >
                    <s.Icon size={13} strokeWidth={3} />
                    {b.statusLabel}
                  </span>
                </div>

                <h3 data-title className="mt-2 font-display text-[clamp(2.25rem,4.6vw,4.75rem)] font-bold leading-[1.1] tracking-tight">
                  {b.name}
                </h3>

                <p data-copy className="mt-2 max-w-[46ch] text-body text-white/75">
                  {b.caption ||
                    `${num(b.builtUpSqft)} sq.ft of Grade-A warehousing, ${num(share, 1)}% of the built-up area at ${projectName}.`}
                </p>

                <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-white/15 pt-3">
                  <div data-stat>
                    <dd className="tabular font-display text-xl font-bold leading-none lg:text-2xl">
                      <span data-count={b.builtUpSqft}>{num(b.builtUpSqft)}</span>
                    </dd>
                    <dt className="mt-1.5 text-caption text-white/60">sq.ft built-up</dt>
                  </div>
                  <div data-stat>
                    <dd className="tabular font-display text-xl font-bold leading-none lg:text-2xl">
                      <span data-count={b.builtUpSqft * SQM_PER_SQFT}>{num(b.builtUpSqft * SQM_PER_SQFT)}</span>
                    </dd>
                    <dt className="mt-1.5 text-caption text-white/60">sq.m</dt>
                  </div>
                  <div data-stat>
                    <dd className="tabular font-display text-xl font-bold leading-none lg:text-2xl">
                      <span data-count={share} data-digits={1}>
                        {num(share, 1)}
                      </span>
                      %
                    </dd>
                    <dt className="mt-1.5 text-caption text-white/60">share of site</dt>
                  </div>
                </dl>

                <div data-line className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    data-bar
                    className="h-full rounded-full"
                    style={{ width: `${share}%`, background: `linear-gradient(90deg, ${s.hex}99, ${s.hex})` }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* fixed strip under the slides: where you are, and a jump to any building */}
      <div className="absolute inset-x-5 bottom-6 flex items-center gap-4 motion-reduce:hidden md:inset-x-12">
        <p className={`${eyebrow} hidden shrink-0 items-center gap-2 text-white/60 sm:flex`}>
          Scroll <ArrowRight size={14} />
        </p>
        <div className="relative min-w-0 flex-1">
          <div className="h-px bg-white/20">
            <span ref={fillRef} className="block h-px origin-left scale-x-0 bg-[#7fb6e8]" />
          </div>
          <div className="mt-2 flex justify-between gap-2">
            {slides.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={active === i}
                className={`truncate text-caption font-semibold transition-colors duration-300 ${
                  active === i ? "text-white" : "text-white/45 hover:text-white/80"
                }`}
              >
                {b.id}
              </button>
            ))}
          </div>
        </div>
        <p className="tabular shrink-0 font-display text-body-l font-bold">
          {pad(active + 1)}
          <span className="text-white/45"> / {pad(slides.length)}</span>
        </p>
      </div>
      </div>
    </div>
  );
}
