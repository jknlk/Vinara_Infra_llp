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

// Scroll script, in viewport-heights of scroll: each photo takes one unit to open
// to the full screen, then holds before the next one starts.
const LEAD = 0.15;
const HOLD = 0.4;
const TAIL = 0.3;
const FULL = "inset(0px 0px 0px 0px round 0px)";

type Rect = { x: number; y: number; w: number; h: number };

function num(v: number, d = 0) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function BuildingShowcase({ projectName, slides }: { projectName: string; slides: ShowcaseSlide[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  const sum = slides.reduce((a, b) => a + b.builtUpSqft, 0) || 1;
  const starts = slides.map((_, i) => LEAD + i * (1 + HOLD));
  const total = LEAD + Math.max(slides.length - 1, 0) * (1 + HOLD) + 1 + TAIL;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // with reduced motion the buildings stay a plain stack of full-height panels
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        const stage = stageRef.current;
        if (!root || !stage) return;
        const vw = () => stage.clientWidth;
        const vh = () => stage.clientHeight;

        // where a photo sits before it opens: the card beside the text, the
        // next-up card peeking in at the right edge, or parked just off screen
        const card = (): Rect => {
          if (vw() < 1024) {
            const w = vw() * 0.9;
            return { x: vw() * 0.05, y: 96, w, h: (w * 9) / 16 };
          }
          const w = Math.min(vw() * 0.37, (vh() * 0.58 * 16) / 9);
          const h = (w * 9) / 16;
          return { x: vw() * 0.055, y: (vh() - h) / 2 - 12, w, h };
        };
        const hidden = (): Rect => ({ ...card(), x: vw() });
        const peek = (): Rect => (vw() < 1024 ? hidden() : { ...card(), x: vw() * 0.8 });

        const inset = (r: Rect) => `inset(${r.y}px ${vw() - r.x - r.w}px ${vh() - r.y - r.h}px ${r.x}px round 24px)`;
        // shrink the full-screen photo so it covers the card it is clipped to
        const fit = (rect: () => Rect) => ({
          x: () => rect().x + rect().w / 2 - vw() / 2,
          y: () => rect().y + rect().h / 2 - vh() / 2,
          scale: () => Math.max(rect().w / vw(), rect().h / vh()),
        });

        const reveals: { show: () => void; hide: () => void }[] = [];
        const shown: boolean[] = [];

        // the page scroll opens each photo to the full screen while the frame stays pinned
        const master = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${total * vh() * 0.9}`,
            scrub: true,
            pin: true,
            // native scroll + fixed pin: a transform pin jitters against the mobile compositor
            pinType: "fixed",
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const t = self.progress * total;
              gsap.set(fillRef.current, { scaleX: self.progress });
              let next = 0;
              starts.forEach((at, i) => {
                if (i === 0) return;
                if (t >= at + 0.5) next = i;
                const on = t >= at + 0.55;
                if (on === !!shown[i]) return;
                shown[i] = on;
                if (on) reveals[i]?.show();
                else reveals[i]?.hide();
              });
              setActive((cur) => (cur === next ? cur : next));
            },
          },
        });
        pinRef.current = master.scrollTrigger ?? null;

        gsap.utils.toArray<HTMLElement>("[data-slide]", root).forEach((slide, i) => {
          const q = gsap.utils.selector(slide);
          const from = i === 0 ? card : peek;
          const open = { duration: 1, ease: "power2.inOut", immediateRender: i < 2 };

          // from the third building on, the card first slides in to wait at the right edge
          if (i >= 2) {
            const enter = { duration: 0.5, ease: "power2.out" };
            master
              .fromTo(q("[data-clip]"), { clipPath: () => inset(hidden()) }, { clipPath: () => inset(peek()), ...enter }, starts[i - 1] + 0.7)
              .fromTo(q("[data-photo]"), fit(hidden), { ...fit(peek), ...enter }, starts[i - 1] + 0.7);
          }
          master
            .fromTo(q("[data-clip]"), { clipPath: () => inset(from()) }, { clipPath: FULL, ...open }, starts[i])
            .fromTo(q("[data-photo]"), fit(from), { x: 0, y: 0, scale: 1, ...open }, starts[i])
            .fromTo(q("[data-scrim]"), { opacity: 0 }, { opacity: 1, duration: 1 }, starts[i]);
          // the open photo keeps pushing in while the next one covers it
          if (i < slides.length - 1) master.fromTo(q("[data-zoom]"), { scale: 1 }, { scale: 1.08, duration: 1 }, starts[i + 1]);

          // clean reveal: everything fades up in order
          const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          tl.from(q("[data-text]"), { autoAlpha: 0, duration: 0.3 }, 0)
            .from(q("[data-ghost]"), { opacity: 0, duration: 1 }, 0)
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

          reveals[i] = {
            show: () => {
              tl.timeScale(1).play();
              lines?.timeScale(1).play();
            },
            // leave quickly: the photo underneath is already shrinking away
            hide: () => {
              tl.timeScale(2.5).reverse();
              lines?.timeScale(2.5).reverse();
            },
          };

          // the first building is already on screen when the frame arrives; the rest follow their photo
          if (i === 0) ScrollTrigger.create({ trigger: root, start: "top 55%", onEnter: reveals[0].show, onLeaveBack: reveals[0].hide });
        });

        // pad the script out to its full length so the last photo holds before the pin lets go
        master.to({}, { duration: Math.max(total - master.duration(), 0.001) });

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
    // land just after the photo has finished opening
    const y = st.start + ((st.end - st.start) * (starts[i] + 1.05)) / total;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  if (!slides.length) return null;

  return (
    <div ref={rootRef} className="relative min-h-[100lvh] overflow-hidden bg-[#0a1f3f] text-white" aria-label={`${projectName} buildings`}>
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
      <div ref={stageRef} className="relative h-[100svh] min-h-[640px] motion-reduce:h-auto">
        {/* Slides are stacked full-screen, later ones on top. Each photo is laid out
            full-bleed and clipped down to a card; the scroll opens the clip. */}
        {slides.map((b, i) => {
          const s = STATUS[b.status];
          const share = (b.builtUpSqft / sum) * 100;
          return (
            <article key={b.id} data-slide className="absolute inset-0 motion-reduce:relative motion-reduce:min-h-[100svh]">
              <figure data-clip className="absolute inset-0 overflow-hidden bg-[#0f2b57] will-change-[clip-path]">
                <div data-photo className="absolute inset-0 will-change-transform">
                  <div data-zoom className="absolute inset-0">
                    {b.src ? (
                      <Image src={b.src} alt={`${b.name}, ${projectName}`} fill sizes="100vw" className="object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center text-white/30">
                        <Warehouse size={64} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3f]/80 via-transparent to-[#0a1f3f]/30" />
                {/* darkens the open photo under the text */}
                <div
                  data-scrim
                  className="absolute inset-0 bg-[#0a1f3f]/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#0a1f3f]/15 lg:via-[#0a1f3f]/75 lg:to-[#0a1f3f]/85"
                />
              </figure>

              {/* text: under the card on phones, beside it on desktop; it stays put as the photo opens behind it */}
              <div
                data-text
                className="absolute inset-x-5 top-[calc(7.25rem+50.625vw)] lg:inset-x-auto lg:left-[46vw] lg:top-1/2 lg:w-[min(30rem,32vw)] lg:-translate-y-1/2"
              >
                <span
                  data-ghost
                  aria-hidden
                  className="tabular pointer-events-none absolute -top-24 left-[45%] hidden select-none font-display text-[15rem] font-bold leading-none text-transparent [-webkit-text-stroke:2px_rgba(127,182,232,0.2)] lg:block"
                >
                  {pad(i + 1)}
                </span>

                <div data-line className="relative flex flex-wrap items-center gap-3">
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

                <h3 data-title className="relative mt-2 font-display text-[clamp(2.25rem,4.6vw,4.75rem)] font-bold leading-[1.1] tracking-tight">
                  {b.name}
                </h3>

                <p data-copy className="relative mt-2 max-w-[46ch] text-body text-white/75">
                  {b.caption ||
                    `${num(b.builtUpSqft)} sq.ft of Grade-A warehousing, ${num(share, 1)}% of the built-up area at ${projectName}.`}
                </p>

                <dl className="relative mt-4 grid grid-cols-3 gap-4 border-t border-white/15 pt-3">
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

                <div data-line className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
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
