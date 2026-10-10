"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

// Cards sit on the inside of a cylinder of radius `radius`, seen from `camera`
// in front of its axis: the centre card is the smallest and square-on, the ones
// towards the edges grow and rake inwards. The cards hang below the vanishing
// point, so their bottom edges sweep down into an arc as they move outwards.
//
// Every length is in `--u` units, so a scene scales with the viewport until its
// unit reaches a clamp. Past that the stage simply shows more or fewer cards.
export type ArcGeometry = {
  unit: { min: number; vw: number; max: number }; // one `--u`: px, vw, px
  radius: number;
  camera: number;
  step: number; // degrees from one card to the next; `radius` leaves a small gap at this pitch
  cardW: number;
  cardH: number;
  cardTop: number; // card top edge below the vanishing point
  originY: number; // vanishing point, relative to the stage top
  type: number; // text size, relative to the unit
  visibleArc: number; // cards further round than this are behind the viewer's shoulders
  stageHeight: string;
};

// A phone only has room for three cards, and three cards of a desktop-sized
// ring sit almost flat. This ring has half as many cards to a turn and a closer
// camera, so the centre card's neighbours rake in as hard as the outermost
// cards do on a desktop.
export const COMPACT_RING = {
  unit: { min: 8, vw: 2.93, max: 13.5 },
  radius: 39,
  camera: 44,
  step: 45,
  cardW: 29.6,
  type: 1.3,
  visibleArc: 88,
} satisfies Partial<ArcGeometry>;
const COMPACT_QUERY = "(max-width: 767px)";

const SECONDS_PER_CARD = 6;
const DRAG_THRESHOLD = 6; // px of movement before a press becomes a drag

export const u = (n: number) => `calc(${n} * var(--u))`;
export const t = (n: number) => `calc(${n} * var(--t))`;

// The cards form a loop that need not be exactly one turn of the ring, so a
// card is placed by its position along that loop, counted in cards. Each time
// it passes the far side it starts a new lap and is seated a loop further on.
const lapOf = (i: number, offset: number, total: number) => Math.round((offset - i) / total);

const seat = (position: number) =>
  `rotateY(calc(${-position} * var(--step))) translateZ(calc(-1 * var(--radius)))`;

// How many cards either side of the centre are in sight.
const reach = (g: ArcGeometry) => g.visibleArc / g.step;

// The shortest loop on which no card is in sight at both ends at once.
const loopSize = (g: ArcGeometry) => Math.floor(2 * reach(g)) + 1;

const vars = (g: ArcGeometry) => `
    --u: clamp(${g.unit.min}px, ${g.unit.vw}vw, ${g.unit.max}px);
    --t: ${u(g.type)};
    --step: ${g.step}deg;
    --radius: ${u(g.radius)};
    --camera: ${u(g.camera)};
    --card-w: ${u(g.cardW)};
    --card-h: ${u(g.cardH)};
    --card-top: ${u(g.cardTop)};
    --origin-y: ${u(g.originY)};
    --stage-h: ${g.stageHeight};
  `;

// The geometry is picked by a media query rather than in script, so the ring
// the server renders is already the right one on a phone.
const styles = (scope: string, base: ArcGeometry, compact?: ArcGeometry) =>
  compact
    ? `
  ${scope} {${vars(base)}}
  @media not all and ${COMPACT_QUERY} {
    ${scope} [data-culled~="base"] { display: none; }
  }
  @media ${COMPACT_QUERY} {
    ${scope} {${vars(compact)}}
    ${scope} [data-culled~="compact"] { display: none; }
  }
`
    : `
  ${scope} {${vars(base)}}
  ${scope} [data-culled~="base"] { display: none; }
`;

type CardArcProps = {
  count: number;
  geometry: ArcGeometry;
  compact?: ArcGeometry; // takes over on phones
  className?: string;
  children: (index: number, duplicate: boolean) => ReactNode;
};

/**
 * A ring of cards seen from inside. It drifts on its own, pauses under the
 * pointer, and can be dragged or flicked sideways with mouse or touch. The
 * stage is meant to span the viewport, and cards size their contents with
 * `u()` and `t()`.
 */
export default function CardArc({ count, geometry, compact, className = "", children }: CardArcProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Short sets of cards repeat until the loop is long enough for either geometry.
  const longest = Math.max(loopSize(geometry), compact ? loopSize(compact) : 0);
  const total = count > 0 ? count * Math.ceil(longest / count) : 0;

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring || total === 0) return;

    const items = Array.from(ring.children) as HTMLElement[];
    const laps: number[] = [];
    const shown: boolean[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = compact ? window.matchMedia(COMPACT_QUERY) : null;

    let active = geometry;
    let offset = 0; // how far the ring has turned, in cards
    let velocity = 0; // cards/s
    let hovered = false;
    let focused = false; // a card has keyboard focus
    let dragging = false;
    let pressed = false;
    let moved = false;
    let pointerId = -1;
    let startX = 0;
    let lastX = 0;
    let lastT = 0;
    let frame = 0;
    let prev = 0;
    let inView = false;

    // Cards of ring rotation per pixel of pointer travel, matched to the
    // centre card so it tracks the pointer one-to-one.
    const cardsPerPx = () => {
      const { unit, radius, camera, step } = active;
      const px = Math.min(unit.max, Math.max(unit.min, (window.innerWidth * unit.vw) / 100));
      return 180 / Math.PI / (radius * (camera / (camera + radius)) * px) / step;
    };

    const render = () => {
      const inSight = reach(active);
      ring.style.transform = `rotateY(calc(${offset} * var(--step)))`;
      for (let i = 0; i < items.length; i++) {
        const lap = lapOf(i, offset, total);
        if (lap !== laps[i]) {
          laps[i] = lap;
          items[i].style.transform = seat(i + lap * total);
        }
        const visible = Math.abs(i + lap * total - offset) <= inSight;
        if (visible !== shown[i]) {
          shown[i] = visible;
          items[i].style.display = visible ? "block" : "none";
        }
      }
    };

    // CSS lays the ring out. This only has to know which geometry it picked.
    const onLayout = () => {
      active = narrow?.matches && compact ? compact : geometry;
      render();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!dragging) {
        // Hover is re-checked against the browser each frame, so a missed
        // pointerleave (page scrolled from under a resting cursor, say) can
        // never leave the ring stopped.
        if (hovered && !stage.matches(":hover")) hovered = false;
        const target =
          hovered || focused || pressed || reducedMotion.matches ? 0 : 1 / SECONDS_PER_CARD;
        velocity += (target - velocity) * (1 - Math.exp(-dt * 3));
        offset += velocity * dt;
        render();
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      prev = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pressed = true;
      moved = false;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      lastT = e.timeStamp;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pressed || e.pointerId !== pointerId) return;
      if (!dragging) {
        if (Math.abs(e.clientX - startX) < DRAG_THRESHOLD) return;
        // Capture only once it is a drag: capturing on press would retarget
        // the click away from the card link.
        dragging = true;
        moved = true;
        lastX = e.clientX;
        lastT = e.timeStamp;
        stage.setPointerCapture(pointerId);
        stage.dataset.dragging = "true";
      }
      const delta = -(e.clientX - lastX) * cardsPerPx();
      const dt = (e.timeStamp - lastT) / 1000;
      offset += delta;
      if (dt > 0) velocity = velocity * 0.6 + (delta / dt) * 0.4;
      lastX = e.clientX;
      lastT = e.timeStamp;
      render();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      // A drag that stopped before release should not fling.
      if (dragging && e.timeStamp - lastT > 120) velocity = 0;
      pressed = false;
      dragging = false;
      delete stage.dataset.dragging;
      if (e.pointerType !== "mouse") hovered = false;
    };

    // Releasing a drag over a card must not follow its link.
    const onClick = (e: MouseEvent) => {
      if (!moved) return;
      moved = false;
      e.preventDefault();
      e.stopPropagation();
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };

    // Tabbing to a card brings it to the centre.
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target.matches(":focus-visible")) return;
      const index = items.findIndex((item) => item.contains(target));
      if (index < 0) return;
      offset = index + laps[index] * total;
      velocity = 0;
      focused = true;
      render();
    };
    const onFocusOut = () => {
      focused = false;
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    observer.observe(stage);

    onLayout();
    narrow?.addEventListener("change", onLayout);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    // On the window, so a press released outside the stage still ends.
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("click", onClick, true);
    stage.addEventListener("focusin", onFocusIn);
    stage.addEventListener("focusout", onFocusOut);

    return () => {
      stop();
      observer.disconnect();
      narrow?.removeEventListener("change", onLayout);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("click", onClick, true);
      stage.removeEventListener("focusin", onFocusIn);
      stage.removeEventListener("focusout", onFocusOut);
    };
  }, [geometry, compact, total]);

  if (total === 0) {
    return null;
  }

  return (
    <div
      ref={stageRef}
      data-arc={id}
      className={`relative w-full cursor-grab touch-pan-y select-none overflow-hidden data-[dragging]:cursor-grabbing ${className}`}
      style={{ height: "var(--stage-h)" }}
    >
      <style>{styles(`[data-arc="${id}"]`, geometry, compact)}</style>
      <div
        className="absolute inset-0"
        style={{ perspective: "var(--camera)", perspectiveOrigin: "50% var(--origin-y)" }}
      >
        <div
          ref={ringRef}
          className="absolute left-1/2 h-0 w-0 will-change-transform [transform-style:preserve-3d]"
          style={{ top: "var(--origin-y)" }}
        >
          {Array.from({ length: total }, (_, i) => {
            const duplicate = i >= count;
            const position = i + lapOf(i, 0, total) * total;
            const culledIn = [
              Math.abs(position) > reach(geometry) && "base",
              compact && Math.abs(position) > reach(compact) && "compact",
            ].filter(Boolean);
            return (
              <div
                key={i}
                aria-hidden={duplicate || undefined}
                data-culled={culledIn.join(" ") || undefined}
                className="absolute [backface-visibility:hidden]"
                style={{
                  width: "var(--card-w)",
                  height: "var(--card-h)",
                  left: "calc(var(--card-w) / -2)",
                  top: "var(--card-top)",
                  transform: seat(position),
                }}
              >
                {children(i % count, duplicate)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
