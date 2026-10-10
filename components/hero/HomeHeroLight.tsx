"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

const FRAME_COUNT = 451;
const FRAME_DIR = "/3d hero scroll";
// Story captions that appear while scrolling; they alternate bottom-right / top-left.
const STORY = [
  { kicker: "01 · The Land", title: "213.06 acres under development.", body: "Three parks across Bengaluru, planned as one connected master-plan.", pos: "br" },
  { kicker: "02 · The Build", title: "12 buildings. 31,33,500 sq.ft built-up.", body: "Warehousing and industrial space engineered for speed and scale.", pos: "tl" },
  { kicker: "03 · The Standard", title: "Quality, Health, Safety & Environment.", body: "QHSE is not a checklist here — it runs through every site, every shift.", pos: "br" },
  { kicker: "04 · The Legacy", title: "37+ years of engineering.", body: "Building today, empowering tomorrow — grow together with Vinara.", pos: "tl" },
] as const;

const frameSrc = (i: number) =>
  encodeURI(`${FRAME_DIR}/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`);

export default function HomeHeroLight() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !h1Ref.current) return;

      // ---- frame sequence -------------------------------------------------
      const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
      const state = { frame: 0 };
      let lastDrawn = -1;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        lastDrawn = -1;
        render();
      };

      const render = () => {
        // draw nearest loaded frame at or before the requested one
        let i = Math.round(state.frame);
        while (i > 0 && !images[i]?.complete) i--;
        const img = images[i];
        if (!img || !img.complete || !img.naturalWidth || i === lastDrawn) return;
        lastDrawn = i;
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      };

      const load = (i: number) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (i === 0 || Math.abs(i - state.frame) < 2) render();
        };
        img.src = frameSrc(i);
        images[i] = img;
      };
      load(0);
      // stream the rest in order after the first frame so the hero paints fast
      let next = 1;
      const pump = () => {
        for (let n = 0; n < 6 && next < FRAME_COUNT; n++) load(next++);
        if (next < FRAME_COUNT) setTimeout(pump, 40);
      };
      pump();

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // ---- intro text -----------------------------------------------------
      const split = new SplitText(h1Ref.current, { type: "lines", mask: "lines" });
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(split.lines, { yPercent: 110, stagger: 0.09, duration: 1 })
        .from("[data-hero-copy]", { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.5");

      // ---- scroll scrub ---------------------------------------------------
      const scrub = gsap.timeline({
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top top",
          end: "+=700%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      scrub
        .to(state, { frame: FRAME_COUNT - 1, ease: "none", duration: 1, onUpdate: render }, 0)
        // copy lifts away early so the building takes the stage
        .to("[data-hero-fade]", { opacity: 0, y: -40, ease: "power1.in", duration: 0.03 }, 0);
      // hold the finished frame for the last stretch while the next section slides up over the hero
      scrub.to({}, { duration: 1 / 6 }, 1);
      STORY.forEach((_, i) => {
        const t = 0.05 + i * 0.23;
        const from = i % 2 === 0 ? { x: 30, y: 40 } : { x: -30, y: -40 };
        scrub
          .fromTo(`[data-story="${i}"]`, { opacity: 0, ...from }, { opacity: 1, x: 0, y: 0, ease: "power2.out", duration: 0.05 }, t)
          .to(`[data-story="${i}"]`, { opacity: 0, x: -from.x * 0.5, y: -from.y * 0.5, ease: "power2.in", duration: 0.05 }, t + 0.13);
      });

      return () => {
        ro.disconnect();
        split.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="Aerial view of a Vinara Infra warehouse" role="img" />

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 pt-28 sm:px-6 md:px-12 md:pb-16">
        <div data-hero-fade className="max-w-4xl pt-4">
          <div
            data-hero-copy
            className="inline-flex items-center gap-2 rounded-full border border-grey-300/60 bg-white/80 px-4 py-2 text-label uppercase tracking-[0.08em] text-grey-500 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Bengaluru · Grow Together · QHSE-Driven
          </div>

          <h1
            ref={h1Ref}
            className="mt-4 font-display font-bold text-[2rem] leading-[1.05] text-white sm:text-4xl sm:leading-[1] sm:mt-5 [text-shadow:0_2px_4px_rgba(0,0,0,0.7),0_4px_28px_rgba(0,0,0,0.75)] md:text-5xl lg:text-6xl"
          >
            Building today. Empowering tomorrow.
          </h1>

          <p data-hero-copy className="mt-3 max-w-[56ch] text-sm font-medium sm:mt-4 sm:text-body text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_16px_rgba(0,0,0,0.85)]">
            Vinara Infra LLP — pioneering productivity with technology across warehousing,
            industrial and infrastructure projects, with an uncompromised commitment to Quality,
            Health, Safety &amp; Environment.
          </p>

          <div data-hero-copy className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm sm:px-5 sm:text-body transition-opacity hover:opacity-90"
            >
              Explore Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-grey-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink sm:px-5 sm:text-body transition-colors hover:bg-paper"
            >
              Contact Us
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

      </div>

      {STORY.map((b, i) => (
        <div
          key={b.kicker}
          data-story={i}
          style={{ opacity: 0 }}
          className={`pointer-events-none absolute z-10 max-w-[min(34rem,calc(100%-2.5rem))] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.7),0_4px_28px_rgba(0,0,0,0.75)] ${
            b.pos === "br"
              ? "bottom-8 right-5 text-right md:bottom-14 md:right-12"
              : "left-5 top-28 text-left md:left-12 md:top-32"
          }`}
        >
          <p className="text-label uppercase tracking-[0.12em] text-sky-200">{b.kicker}</p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">{b.title}</h2>
          <p className="mt-2 text-sm font-medium sm:mt-3 sm:text-body">{b.body}</p>
        </div>
      ))}
    </section>
  );
}
