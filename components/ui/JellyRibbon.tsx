"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";

// The ribbon is drawn in a fixed 1600-unit box. Its centre line is a chain of
// points on springs: each is pulled towards a travelling wave and towards its
// neighbours, and is underdamped, so a nudge from the pointer wobbles along it.
export const RIBBON_WIDTH = 1600;
const CENTRE = RIBBON_WIDTH / 2;

const POINTS = 33;
const SPACING = (RIBBON_WIDTH + 80) / (POINTS - 1); // the chain overshoots both sides
const xAt = (i: number) => -40 + i * SPACING;

const PULL = 30; // towards the wave
const TENSION = 180; // towards the neighbours
const DAMPING = 3.2;
const POKE_REACH = 130; // units either side of the pointer that feel it
const TOP = 8;
const STITCH_INSET = 9;

// A phone shows only the middle of the box, to keep the type readable. Left at
// that, it would see a straight slice of the ribbon rather than its shape. So
// the chain is drawn squeezed sideways into the part that is in sight: `fit` is
// that part's share of the box, 1 on a wide screen. The whole curve and every
// wave then cross a phone as they cross a laptop, at the same band thickness.
const FIT_SPARE = 0.02; // of the box, kept beyond the edges of the part in sight
// A curve squeezed sideways is steeper, so its swing is eased back with it.
const swingAt = (fit: number) => Math.sqrt(fit);
const drawnAt = (x: number, fit: number) => CENTRE + (x - CENTRE) * fit;

// Runs before paint, so a phone never shows a frame of the unsqueezed ribbon.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

const clamp = (n: number, limit: number) => Math.max(-limit, Math.min(limit, n));

// Two waves running in opposite directions, the larger one swelling and fading.
// Together they stay within two thirds of `sway`, which leaves the rest for the wobble.
const wave = (x: number, time: number, sway: number) =>
  sway * 0.46 * (0.6 + 0.4 * Math.sin(time * 0.7)) * Math.sin(x / 143 - time * 1.5) +
  sway * 0.23 * Math.sin(x / 67 + time * 2.3);

type Point = [number, number];

// A smooth line through the points: each one is the control point of a curve
// between the midpoints either side of it.
export const through = (points: Point[]) => {
  const at = ([x, y]: Point) => `${x.toFixed(1)},${y.toFixed(1)}`;
  const mid = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `${at(points[0])} L${at(mid(points[0], points[1]))}`;
  for (let i = 1; i < points.length - 1; i++) {
    d += ` Q${at(points[i])} ${at(mid(points[i], points[i + 1]))}`;
  }
  return `${d} L${at(points[points.length - 1])}`;
};

type Shape = {
  band: number;
  sway: number;
  breath: number;
  rest?: (x: number) => number;
  flatBottom: boolean;
};

// The box is as tall as the resting shape plus the room the wobble can take,
// and a little more underneath for a shadow. A flat-bottomed ribbon fills the
// box down to its bottom edge instead, and only its top edge moves.
const layout = ({ band, sway, breath, rest, flatBottom }: Shape) => {
  const base = Array.from({ length: POINTS }, (_, i) => rest?.(xAt(i)) ?? 0);
  const reach = sway + band / 2 + breath;
  const mid = TOP + reach - Math.min(...base);
  const height = mid + Math.max(...base) + reach + (flatBottom ? 0 : 22);
  // The text of a flat-bottomed ribbon sits lower, midway down the deeper band.
  const lift = flatBottom ? (sway + breath) / 2 : 0;

  // `y` is each point's offset from its resting place, `v` its speed.
  const paths = (y: ArrayLike<number>, v: ArrayLike<number>, time: number, fit = 1) => {
    const swing = swingAt(fit);
    const line: Point[] = [];
    const top: Point[] = [];
    const bottom: Point[] = [];
    for (let i = 0; i < POINTS; i++) {
      const x = xAt(i);
      const drawn = drawnAt(x, fit);
      const centre = mid + (base[i] + y[i]) * swing;
      const half =
        band / 2 + breath * 0.5 * Math.sin(x / 190 - time * 2) - clamp(Math.abs(v[i]) * 0.03, breath * 0.5);
      line.push([drawn, centre + lift]);
      top.push([drawn, centre - half]);
      bottom.push([drawn, flatBottom ? height : centre + half]);
    }
    const inset = (edge: Point[], by: number) => `M${through(edge.map(([x, py]) => [x, py + by]))}`;
    return {
      line: `M${through(line)}`,
      stitches: [inset(top, STITCH_INSET), inset(bottom, -STITCH_INSET)],
      band: `M${through(top)} L${through(bottom.reverse())} Z`,
    };
  };

  // What the server renders, and what stays put under reduced motion.
  const still = Array.from({ length: POINTS }, (_, i) => wave(xAt(i), 0, sway));
  return { base, mid, height, paths, still, initial: paths(still, new Array(POINTS).fill(0), 0) };
};

type JellyRibbonProps = {
  band: number; // thickness, in units
  sway: number; // furthest a point may stray from its resting place
  breath?: number; // how much the band thickens and thins as it moves
  rest?: (x: number) => number; // the resting centre line; flat when omitted
  repeats: number; // copies of `children`: enough to cover the ribbon while it loops
  speed?: number; // units/s the text runs along the ribbon
  stitched?: boolean;
  flatBottom?: boolean; // for a ribbon resting on the bottom of the screen
  pauseOnHover?: boolean; // hold the text still under the pointer, so links in it can be clicked
  decorative?: boolean; // hidden from assistive tech unless false
  className?: string;
  bandClassName?: string;
  textClassName?: string;
  // One copy of the text, as SVG text content. `copy` is 0 for the first.
  children: ReactNode | ((copy: number) => ReactNode);
};

/**
 * A band of text that ripples like jelly and wobbles when the pointer crosses
 * it. Phones show the middle of a wider ribbon, so the type stays readable,
 * with the ribbon's whole shape drawn inside that middle (see `fit`).
 * The parent should clip it sideways and ignore the pointer: the box around
 * the band usually lies over a neighbouring section.
 */
export default function JellyRibbon({
  band,
  sway,
  breath = 7,
  rest,
  repeats,
  speed = 40,
  stitched = false,
  flatBottom = false,
  pauseOnHover = false,
  decorative = true,
  className = "",
  bandClassName = "",
  textClassName = "",
  children,
}: JellyRibbonProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const bandRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const stitchARef = useRef<SVGPathElement>(null);
  const stitchBRef = useRef<SVGPathElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGTextPathElement>(null);
  const id = useId();

  const shape = useMemo(
    () => layout({ band, sway, breath, rest, flatBottom }),
    [band, sway, breath, rest, flatBottom]
  );

  useBeforePaint(() => {
    const svg = svgRef.current;
    const bandPath = bandRef.current;
    const line = lineRef.current;
    const text = textRef.current;
    const textPath = pathRef.current;
    if (!svg || !bandPath || !line || !text || !textPath) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const y = Float64Array.from(shape.still);
    const v = new Float64Array(POINTS);
    let period = 0; // length of one copy of the text
    let fit = 1; // share of the box that is in sight
    let hovered = false;
    let shift = 0;
    let time = 0;
    let frame = 0;
    let prev = 0;

    const measure = () => {
      period = text.getComputedTextLength() / repeats;
    };

    const draw = () => {
      const next = shape.paths(y, v, time, fit);
      bandPath.setAttribute("d", next.band);
      line.setAttribute("d", next.line);
      stitchARef.current?.setAttribute("d", next.stitches[0]);
      stitchBRef.current?.setAttribute("d", next.stitches[1]);
    };

    // The parent clips the ribbon, so its width is the part in sight.
    const clipBox = svg.parentElement;
    const refit = () => {
      const width = svg.getBoundingClientRect().width;
      const seen = clipBox?.clientWidth ?? width;
      const next = width > 0 && seen > 0 ? Math.min(1, seen / width + FIT_SPARE) : 1;
      if (next === fit) return;
      fit = next;
      draw();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;
      if (!reducedMotion.matches) {
        time += dt;
        for (let i = 0; i < POINTS; i++) {
          const left = y[Math.max(i - 1, 0)];
          const right = y[Math.min(i + 1, POINTS - 1)];
          const force =
            PULL * (wave(xAt(i), time, sway) - y[i]) + TENSION * (left + right - 2 * y[i]) - DAMPING * v[i];
          v[i] += force * dt;
        }
        for (let i = 0; i < POINTS; i++) {
          y[i] = clamp(y[i] + v[i] * dt, sway);
        }
        draw();
        if (period > 0 && !(pauseOnHover && hovered)) {
          shift = (shift + speed * dt) % period;
          textPath.setAttribute("startOffset", String(-shift));
        }
      }
      frame = requestAnimationFrame(tick);
    };

    // The pointer drags the ribbon with it and shoves it aside as it crosses.
    // Listening on the window keeps the ribbon's box from blocking what it
    // lies over.
    const onPointerMove = (e: PointerEvent) => {
      if (!frame || e.pointerType !== "mouse") return;
      const rect = svg.getBoundingClientRect();
      hovered = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!hovered) return;
      const scale = RIBBON_WIDTH / rect.width;
      const px = (e.clientX - rect.left) * scale;
      const py = (e.clientY - rect.top) * scale;
      const swing = swingAt(fit);
      for (let i = 0; i < POINTS; i++) {
        const falloff = Math.exp(-(((drawnAt(xAt(i), fit) - px) / POKE_REACH) ** 2));
        const away = shape.mid + (shape.base[i] + y[i]) * swing > py ? 1 : -1;
        v[i] += (e.movementY * scale * 14 + away * Math.abs(e.movementX) * scale * 3) * falloff;
        v[i] = clamp(v[i], 600);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (entry.isIntersecting) {
        prev = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(svg);

    // The part in sight changes with the screen: a phone turned on its side,
    // a window dragged narrower.
    const resize = new ResizeObserver(refit);
    if (clipBox) resize.observe(clipBox);
    resize.observe(svg);

    refit();
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("pointermove", onPointerMove);
    // A pointer that leaves the page from over the ribbon sends no more moves.
    const onPointerGone = () => {
      hovered = false;
    };
    document.documentElement.addEventListener("pointerleave", onPointerGone);

    return () => {
      document.documentElement.removeEventListener("pointerleave", onPointerGone);
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [shape, sway, repeats, speed, pauseOnHover]);

  return (
    <svg
      ref={svgRef}
      aria-hidden={decorative || undefined}
      viewBox={`0 0 ${RIBBON_WIDTH} ${shape.height}`}
      className={`relative left-1/2 block w-[1100px] max-w-none -translate-x-1/2 md:w-full ${className}`}
    >
      <defs>
        <path ref={lineRef} id={`${id}-line`} d={shape.initial.line} />
      </defs>
      <path ref={bandRef} d={shape.initial.band} className={bandClassName} />
      {stitched && (
        <g fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="7 7">
          <path ref={stitchARef} d={shape.initial.stitches[0]} />
          <path ref={stitchBRef} d={shape.initial.stitches[1]} />
        </g>
      )}
      <text ref={textRef} dy="0.35em" className={textClassName}>
        <textPath ref={pathRef} href={`#${id}-line`}>
          {Array.from({ length: repeats }, (_, i) => (
            <tspan key={i}>{typeof children === "function" ? children(i) : children}</tspan>
          ))}
        </textPath>
      </text>
    </svg>
  );
}
