"use client";

import { useEffect, useRef } from "react";

interface DragMarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  /** auto-scroll speed in px per second */
  speed?: number;
  repeat?: number;
}

// A looping row that drifts on its own and can be dragged (mouse, touch or pen)
// in either direction. Drag throws it with a little momentum, then it settles
// back into its drift. Spacing comes from the --gap custom property, e.g.
// className="[--gap:1.5rem]". A drag never opens the card links underneath.
export default function DragMarquee({
  children,
  className = "",
  reverse = false,
  speed = 28,
  repeat = 6,
}: DragMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const direction = reverse ? 1 : -1;

    let x = 0;
    let velocity = 0;
    let hovering = false;
    let visible = true;
    let down = false;
    let dragging = false;
    let moved = false;
    let pointerId = -1;
    let startX = 0;
    let startPos = 0;
    let lastX = 0;
    let lastT = 0;
    let lastFrame = performance.now();
    let raf = 0;

    // distance from the start of one copy to the start of the next
    const loopWidth = () => {
      const [a, b] = [track.children[0], track.children[1]] as HTMLElement[];
      return a && b ? b.offsetLeft - a.offsetLeft : 0;
    };
    // keep x within (-loop, 0] so the copies line up seamlessly
    const wrap = (value: number, loop: number) => (loop ? ((value % loop) - loop) % loop : value);
    const paint = () => {
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      if (visible && !dragging) {
        let step = velocity * dt;
        velocity *= Math.exp(-dt * 4);
        if (Math.abs(velocity) < 1) velocity = 0;
        if (!reduceMotion && !hovering) step += direction * speed * dt;
        if (step) {
          x = wrap(x + step, loopWidth());
          paint();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true;
      moved = false;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      startPos = x;
      lastT = e.timeStamp;
      velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!down || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!moved) {
        if (Math.abs(dx) < 6) return;
        moved = true;
        dragging = true;
        viewport.setPointerCapture(pointerId);
        viewport.style.cursor = "grabbing";
      }
      x = wrap(startPos + dx, loopWidth());
      paint();
      const dtMs = e.timeStamp - lastT;
      if (dtMs > 0) velocity = velocity * 0.5 + ((e.clientX - lastX) / dtMs) * 1000 * 0.5;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };

    const onPointerEnd = (e: PointerEvent) => {
      if (!down || e.pointerId !== pointerId) return;
      down = false;
      if (dragging) {
        dragging = false;
        viewport.style.cursor = "";
        if (viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId);
        // a pause before letting go means no throw
        if (e.timeStamp - lastT > 80) velocity = 0;
        velocity = Math.max(-2500, Math.min(2500, velocity));
      }
      // the click that follows a drag consumes `moved`; clear it if none comes
      setTimeout(() => (moved = false), 0);
    };

    const onClickCapture = (e: MouseEvent) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const onFocusIn = () => {
      hovering = true;
    };
    const onFocusOut = () => {
      hovering = false;
    };
    const onDragStart = (e: Event) => e.preventDefault();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(viewport);

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerEnd);
    viewport.addEventListener("pointercancel", onPointerEnd);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("focusin", onFocusIn);
    viewport.addEventListener("focusout", onFocusOut);
    viewport.addEventListener("dragstart", onDragStart);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerEnd);
      viewport.removeEventListener("pointercancel", onPointerEnd);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("focusin", onFocusIn);
      viewport.removeEventListener("focusout", onFocusOut);
      viewport.removeEventListener("dragstart", onDragStart);
    };
  }, [reverse, speed]);

  return (
    <div
      ref={viewportRef}
      className={`cursor-grab select-none overflow-hidden p-2 [--gap:1rem] [touch-action:pan-y] ${className}`}
    >
      <div ref={trackRef} className="flex w-max gap-[var(--gap)] will-change-transform">
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex shrink-0 gap-[var(--gap)]" inert={i > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
