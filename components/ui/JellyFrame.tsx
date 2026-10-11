"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

// The outline is a ring of points on springs round a squircle, in a box that
// runs 0 to 1 both ways. Each point moves in and out along its spoke: pulled
// towards a wave that travels round the ring and towards its neighbours, and
// underdamped, so a nudge from the pointer wobbles round the edge.
const POINTS = 40;
const INSET = 0.035; // the resting outline sits this far inside the box, leaving room to bulge
const SQUARENESS = 6; // 2 is an ellipse; higher is closer to a rectangle

const PULL = 30; // towards the wave
const TENSION = 180; // towards the neighbours
const DAMPING = 3.2;
const POKE_REACH = 0.22; // how far from the pointer the edge feels it

const clamp = (n: number, limit: number) => Math.max(-limit, Math.min(limit, n));

const SPOKES = Array.from({ length: POINTS }, (_, i) => {
  const angle = (i / POINTS) * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const reach = 0.5 - INSET;
  return {
    angle,
    cos,
    sin,
    x: 0.5 + reach * Math.sign(cos) * Math.abs(cos) ** (2 / SQUARENESS),
    y: 0.5 + reach * Math.sign(sin) * Math.abs(sin) ** (2 / SQUARENESS),
  };
});

// Two waves running opposite ways round the ring.
const wave = (angle: number, time: number) =>
  0.011 * Math.sin(3 * angle - time * 1.2) + 0.007 * Math.sin(5 * angle + time * 1.7);

// A closed smooth line: each point is the control point of a curve between
// the midpoints either side of it.
const outline = (r: ArrayLike<number>) => {
  const at = (i: number) => {
    const s = SPOKES[i % POINTS];
    return [s.x + s.cos * r[i % POINTS], s.y + s.sin * r[i % POINTS]];
  };
  const mid = (i: number) => {
    const [ax, ay] = at(i);
    const [bx, by] = at(i + 1);
    return `${((ax + bx) / 2).toFixed(4)},${((ay + by) / 2).toFixed(4)}`;
  };
  let d = `M${mid(0)}`;
  for (let i = 1; i <= POINTS; i++) {
    const [x, y] = at(i);
    d += ` Q${x.toFixed(4)},${y.toFixed(4)} ${mid(i)}`;
  }
  return `${d} Z`;
};

// What the server renders, and what stays put under reduced motion.
const REST = SPOKES.map((s) => wave(s.angle, 0));
const STILL = outline(REST);

type JellyFrameProps = {
  className?: string; // sizes the frame
  echoClassName?: string; // strokes a second copy of the outline, set down and to the left behind the frame
  children: ReactNode; // fills the frame and is clipped to it
};

/**
 * A frame whose edge ripples like jelly and wobbles where the pointer crosses
 * it. The contents are cropped a little on every side to give the edge room.
 */
export default function JellyFrame({ className = "", echoClassName, children }: JellyFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGPathElement>(null);
  const echoRef = useRef<SVGPathElement>(null);
  const id = useId();

  useEffect(() => {
    const frame = frameRef.current;
    const clip = clipRef.current;
    if (!frame || !clip) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const r = Float64Array.from(REST);
    const v = new Float64Array(POINTS);
    let time = 0;
    let raf = 0;
    let prev = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;
      if (!reducedMotion.matches) {
        time += dt;
        for (let i = 0; i < POINTS; i++) {
          const left = r[(i + POINTS - 1) % POINTS];
          const right = r[(i + 1) % POINTS];
          const force =
            PULL * (wave(SPOKES[i].angle, time) - r[i]) + TENSION * (left + right - 2 * r[i]) - DAMPING * v[i];
          v[i] += force * dt;
        }
        for (let i = 0; i < POINTS; i++) {
          r[i] = clamp(r[i] + v[i] * dt, INSET);
        }
        const d = outline(r);
        clip.setAttribute("d", d);
        echoRef.current?.setAttribute("d", d);
      }
      raf = requestAnimationFrame(tick);
    };

    // The pointer carries the nearby edge along with it.
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = frame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const mx = e.movementX / rect.width;
      const my = e.movementY / rect.height;
      for (let i = 0; i < POINTS; i++) {
        const s = SPOKES[i];
        const distance = Math.hypot(s.x - px, s.y - py);
        const falloff = Math.exp(-((distance / POKE_REACH) ** 2));
        v[i] = clamp(v[i] + (mx * s.cos + my * s.sin) * 25 * falloff, 1.5);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    observer.observe(frame);
    frame.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      frame.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={frameRef} className={`relative ${className}`}>
      {/* The offset is on the svg box: inside it, lengths are fractions of the frame. */}
      <svg
        aria-hidden
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full -translate-x-4 translate-y-4 overflow-visible"
      >
        <defs>
          <clipPath id={`${id}-clip`} clipPathUnits="objectBoundingBox">
            <path ref={clipRef} d={STILL} />
          </clipPath>
        </defs>
        {echoClassName && (
          <path ref={echoRef} d={STILL} fill="none" vectorEffect="non-scaling-stroke" className={echoClassName} />
        )}
      </svg>
      <div className="absolute inset-0" style={{ clipPath: `url(#${id}-clip)` }}>
        {children}
      </div>
    </div>
  );
}
