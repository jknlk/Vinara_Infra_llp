"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { Target, Telescope } from "lucide-react";
import Container from "@/components/ui/Container";
import { MISSION_VISION } from "@/data/content/about";

const TILT = 7; // degrees, edge to edge
const VARS = ["--rx", "--ry", "--px", "--py", "--s"];

// Card surface: zooms in as it scrolls into view, then leans toward the
// pointer and presses in under a finger. All motion runs off CSS variables.
const CARD =
  "group relative flex min-h-[240px] flex-col overflow-hidden rounded-[28px] p-8 opacity-0 [--s:0.9] will-change-transform " +
  "[transform:perspective(1400px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_scale(var(--s))] " +
  "transition-[transform,opacity,filter,box-shadow] duration-700 ease-out " +
  "data-[in]:opacity-100 data-[in]:[--s:1] data-[active]:z-10 data-[active]:duration-200 " +
  "lg:group-hover/mv:not-hover:brightness-[0.94] lg:group-hover/mv:not-hover:[--s:0.975] " +
  "motion-reduce:opacity-100 motion-reduce:[transform:none] sm:min-h-[260px] md:p-10 lg:min-h-[300px] lg:px-12 lg:py-10";

// Layers inside the card drift against the pointer for depth.
const WATERMARK =
  "pointer-events-none absolute -bottom-16 -right-12 h-72 w-72 transition-transform duration-700 ease-out " +
  "[transform:translate(calc(var(--px,0)*-40px),calc(var(--py,0)*-40px))_scale(var(--wz,1))_rotate(var(--wr,0deg))] " +
  "group-hover:[--wz:1.3] group-data-[active]:[--wz:1.3] lg:h-80 lg:w-80";
const CONTENT =
  "relative flex flex-1 flex-col transition-transform duration-300 ease-out " +
  "[transform:translate(calc(var(--px,0)*10px),calc(var(--py,0)*10px))]";

function TouchCard({ className, glow, children }: { className: string; glow: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const calm = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    calm.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-in", "");
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const track = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const lean = e.pointerType === "mouse" && !calm.current;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      if (!lean) return;
      el.style.setProperty("--rx", `${(0.5 - y) * TILT}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * TILT}deg`);
      el.style.setProperty("--px", `${x - 0.5}`);
      el.style.setProperty("--py", `${y - 0.5}`);
    });
  };

  const engage = (e: PointerEvent<HTMLElement>, scale: number) => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-active", "");
    el.style.setProperty("--s", `${scale}`);
    track(e);
  };

  const release = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.removeAttribute("data-active");
    for (const v of VARS) el.style.removeProperty(v);
  };

  return (
    <article
      ref={ref}
      className={`${CARD} ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && engage(e, 1.025)}
      onPointerMove={track}
      onPointerDown={(e) => engage(e, 0.97)}
      onPointerUp={(e) => (e.pointerType === "mouse" ? engage(e, 1.025) : release())}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      {/* spotlight under the pointer / finger */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-data-[active]:opacity-100"
        style={{ background: `radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 65%)` }}
      />
      {children}
    </article>
  );
}

export default function MissionVision() {
  return (
    <section className="bg-white py-8 md:py-8">
      <Container full>
        <p className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">
          <span className="h-px w-12 bg-[#3e86d0]" />
          Mission &amp; Vision
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-display-m join-shine pb-[0.08em]">
          What drives us, and where we are headed.
        </h2>

        <div className="group/mv m-scroll mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <TouchCard
            glow="rgba(127,182,232,0.28)"
            className="bg-gradient-to-br from-[#0f2b57] via-[#0d3a7d] to-[#0b4fc2] text-white shadow-[0_30px_60px_-30px_rgba(11,79,194,0.6)] data-[active]:shadow-[0_50px_90px_-30px_rgba(11,79,194,0.75)]"
          >
            <Target aria-hidden strokeWidth={1} className={`${WATERMARK} text-white/[0.07] group-hover:[--wr:12deg]`} />
            <div className={CONTENT}>
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 lg:h-16 lg:w-16">
                  <Target size={28} />
                </span>
                <span aria-hidden className="tabular font-display text-5xl font-extrabold leading-none text-white/10 lg:text-6xl">
                  01
                </span>
              </div>
              <h3 className="mt-auto pt-6 font-display text-3xl font-bold lg:text-4xl">Our Mission</h3>
              <span className="mt-4 block h-1 w-12 rounded-full bg-[#7fb6e8] transition-[width] duration-500 group-hover:w-24 group-data-[active]:w-24" />
              <p className="mt-4 max-w-2xl text-body-l text-white/85">
                {MISSION_VISION.mission}
              </p>
            </div>
          </TouchCard>

          <TouchCard
            glow="rgba(11,79,194,0.12)"
            className="border border-[#0f2b57]/10 bg-[#f4f8fd] text-[#0f2b57] data-[active]:border-[#0b4fc2]/25 data-[active]:shadow-[0_50px_90px_-40px_rgba(11,79,194,0.45)]"
          >
            <Telescope aria-hidden strokeWidth={1} className={`${WATERMARK} text-[#0b4fc2]/[0.07] group-hover:[--wr:-12deg]`} />
            <div className={CONTENT}>
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b4fc2] text-white shadow-[0_12px_24px_-10px_rgba(11,79,194,0.7)] transition-transform duration-500 group-hover:scale-110 lg:h-16 lg:w-16">
                  <Telescope size={28} />
                </span>
                <span aria-hidden className="tabular font-display text-5xl font-extrabold leading-none text-[#0b4fc2]/10 lg:text-6xl">
                  02
                </span>
              </div>
              <h3 className="mt-auto pt-6 font-display text-3xl font-bold lg:text-4xl">Our Vision</h3>
              <span className="mt-4 block h-1 w-12 rounded-full bg-[#0b4fc2] transition-[width] duration-500 group-hover:w-24 group-data-[active]:w-24" />
              <p className="mt-4 max-w-2xl text-body-l text-[#5a6b84]">
                {MISSION_VISION.vision}
              </p>
            </div>
          </TouchCard>
        </div>
      </Container>
    </section>
  );
}
