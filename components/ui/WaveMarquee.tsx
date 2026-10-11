"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Each row travels along its own wave, and no two waves are alike: neighbours
// run in opposite directions and have a different number of crests, so the
// rows keep closing in on each other and drawing apart. Each wave stays inside
// its own lane, so the rows never touch.
const SPEED = 40; // px/s along the row
const DRIFT = 0.18; // radians/s the waves themselves slide along
const WAVES = [1, 1.5]; // crests across the track, row by row
const WIDE_QUERY = "(min-width: 640px)";
const LANE = { narrow: 60, wide: 92 }; // px from one row's centre line to the next
const SWING = { narrow: 10, wide: 18 }; // px each row rises and falls about its centre line
const GAP = { narrow: 0, wide: 96 }; // px between items; narrow items are fixed-width cells

type WaveMarqueeProps = {
  rows: ReactNode[][];
  copies?: number; // of each row: together they must be wider than the track
  className?: string;
};

export default function WaveMarquee({ rows, copies = 4, className = "" }: WaveMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia(WIDE_QUERY);
    const strands = Array.from(track.children).map((list) => ({
      items: Array.from(list.children) as HTMLElement[],
      widths: [] as number[],
      starts: [] as number[], // each item's place along the row
      length: 0, // of the whole row, which is what it loops by
      lead: 0, // the widest item: the row starts this far off the left edge
    }));

    let width = 0;
    let swing = 0;
    let lane = 0;
    let travelled = 0; // px
    let turned = 0; // radians
    let pace = 1; // 1 running, 0 held under the pointer
    let hovered = false;
    let frame = 0;
    let prev = 0;

    const measure = () => {
      width = track.clientWidth;
      swing = wide.matches ? SWING.wide : SWING.narrow;
      lane = wide.matches ? LANE.wide : LANE.narrow;
      const gap = wide.matches ? GAP.wide : GAP.narrow;
      for (const strand of strands) {
        let at = 0;
        strand.lead = 0;
        strand.items.forEach((item, i) => {
          strand.widths[i] = item.offsetWidth;
          strand.starts[i] = at;
          at += item.offsetWidth + gap;
          strand.lead = Math.max(strand.lead, item.offsetWidth);
        });
        strand.length = at;
      }
      render();
    };

    const render = () => {
      if (width === 0) return;
      strands.forEach((strand, r) => {
        const direction = r % 2 ? 1 : -1;
        const centre = (r - (strands.length - 1) / 2) * lane;
        const turns = (WAVES[r % WAVES.length] * Math.PI * 2) / width; // radians per px
        strand.items.forEach((item, i) => {
          const along = strand.starts[i] + direction * travelled;
          const x = (((along % strand.length) + strand.length) % strand.length) - strand.lead;
          const angle = (x + strand.widths[i] / 2) * turns + r * Math.PI + direction * turned;
          const y = centre + swing * Math.sin(angle);
          const tilt = Math.atan(swing * turns * Math.cos(angle));
          item.style.transform =
            `translate3d(${x.toFixed(1)}px, calc(-50% + ${y.toFixed(1)}px), 0) rotate(${tilt.toFixed(4)}rad)`;
        });
      });
      track.dataset.ready = "true";
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!reducedMotion.matches) {
        pace += ((hovered ? 0 : 1) - pace) * (1 - Math.exp(-dt * 5));
        travelled += SPEED * pace * dt;
        turned += DRIFT * pace * dt;
        render();
      }
      frame = requestAnimationFrame(tick);
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) {
        prev = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(track);

    // Item widths change as logos load and as the track crosses the breakpoint.
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    for (const strand of strands) strand.items.forEach((item) => resize.observe(item));

    measure();
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
    };
  }, [rows, copies]);

  return (
    // Hidden until the first layout, before which every item sits at the left edge.
    <div
      ref={trackRef}
      className={`relative opacity-0 transition-opacity duration-500 data-[ready]:opacity-100 ${className}`}
    >
      {rows.map((row, r) => (
        <ul key={r} className="absolute inset-0">
          {Array.from({ length: copies }, (_, copy) =>
            row.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                aria-hidden={copy > 0 || undefined}
                className="absolute left-0 top-1/2 flex h-12 w-[30vw] items-center justify-center px-2 will-change-transform sm:w-auto sm:px-0"
              >
                {item}
              </li>
            ))
          )}
        </ul>
      ))}
    </div>
  );
}
