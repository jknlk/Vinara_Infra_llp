"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import type { ArcGeometry } from "@/components/ui/CardArc";
import { through } from "@/components/ui/JellyRibbon";

const SCALE = 20; // drawing units to one of the arc's `--u`, so type sizes are not fractions
const SWEEP = 85; // degrees either side of the centre the line is drawn for
const SPEED = 1.6; // `--u` per second

const radians = (degrees: number) => (degrees * Math.PI) / 180;

// Where the bottom edge of a card `angle` round the ring lands on screen, in
// `--u` from the vanishing point's column and the stage top.
const edge = (g: ArcGeometry, angle: number) => {
  const scale = g.camera / (g.camera + g.radius * Math.cos(radians(angle)));
  return {
    x: g.radius * Math.sin(radians(angle)) * scale,
    y: g.originY + (g.cardTop + g.cardH) * scale,
  };
};

type ArcCaptionProps = {
  geometry: ArcGeometry; // of the CardArc this sits over
  size?: number; // type size, in `--u`
  gap?: number; // clear space between the cards and the text, in `--u`
  repeats?: number; // copies of `children`: enough to cover the line while it loops
  className?: string;
  children: ReactNode; // one copy of the text, as SVG text content
};

/**
 * A line of text that runs on a loop just under the cards of a CardArc,
 * following the curve their bottom edges make. It goes in a box of the stage's
 * size that sits over the stage and clips its overflow.
 */
export default function ArcCaption({
  geometry,
  size = 1.7,
  gap = 1,
  repeats = 8,
  className = "",
  children,
}: ArcCaptionProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGTextPathElement>(null);
  const id = useId();

  const end = edge(geometry, SWEEP);
  const half = Math.ceil(end.x);
  const height = Math.ceil(end.y + gap + size * 1.3);
  // The path is the baseline, so it sits a cap height under the clear space.
  const drop = gap + size * 0.75;
  const points: [number, number][] = [];
  for (let angle = -SWEEP; angle <= SWEEP; angle += 5) {
    const { x, y } = edge(geometry, angle);
    points.push([(half + x) * SCALE, (y + drop) * SCALE]);
  }
  const { unit } = geometry;
  const u = `clamp(${unit.min}px, ${unit.vw}vw, ${unit.max}px)`;

  useEffect(() => {
    const svg = svgRef.current;
    const text = textRef.current;
    const textPath = pathRef.current;
    if (!svg || !text || !textPath) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let period = 0; // length of one copy of the text
    let shift = 0;
    let frame = 0;
    let prev = 0;

    const measure = () => {
      period = text.getComputedTextLength() / repeats;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (period > 0 && !reducedMotion.matches) {
        shift = (shift + SPEED * SCALE * dt) % period;
        textPath.setAttribute("startOffset", String(-shift));
      }
      frame = requestAnimationFrame(tick);
    };

    // A caption hidden for the other breakpoint never comes into view.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (entry.isIntersecting) {
        if (period === 0) measure();
        prev = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(svg);

    document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [repeats]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      viewBox={`0 0 ${2 * half * SCALE} ${height * SCALE}`}
      className={`pointer-events-none absolute left-1/2 top-0 max-w-none -translate-x-1/2 ${className}`}
      style={{ width: `calc(${2 * half} * ${u})`, height: `calc(${height} * ${u})` }}
    >
      <defs>
        <path id={`${id}-line`} d={`M${through(points)}`} />
      </defs>
      <text ref={textRef} style={{ fontSize: size * SCALE }}>
        <textPath ref={pathRef} href={`#${id}-line`}>
          {Array.from({ length: repeats }, (_, i) => (
            <tspan key={i}>{children}</tspan>
          ))}
        </textPath>
      </text>
    </svg>
  );
}
