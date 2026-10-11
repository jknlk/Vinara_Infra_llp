"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

// Site-wide button effects. Mounted once in the root layout and delegated from
// the document, so every pill-shaped link or button picks it up without being
// touched: it leans towards the cursor, fills from the point the cursor came
// in at, throws a shine across itself, and bursts into sparks when pressed.
// The visuals live under `[data-fx-btn]` in globals.css.
//
// Force it on a non-pill element with `data-fx`; opt out with `data-no-fx`.
const CANDIDATE = "a, button";
// the nav has its own motion; toggles and filter chips shouldn't jump around
const SKIP = "header, [data-no-fx], [aria-pressed], [role='tab'], [disabled], .preloader";
const MIN_WIDTH = 96;
const MIN_HEIGHT = 40;
const MAX_HEIGHT = 84;
const SPARK_COLOURS = ["#4d94ff", "#0048b0", "#f59e0b", "#85b4ff", "#06204f"];

function qualifies(el: HTMLElement) {
  if (el.closest(SKIP)) return false;
  if (el.hasAttribute("data-fx")) return true;
  if (!el.textContent?.trim()) return false;
  const { width, height } = el.getBoundingClientRect();
  if (width < MIN_WIDTH || height < MIN_HEIGHT || height > MAX_HEIGHT) return false;
  return parseFloat(getComputedStyle(el).borderTopLeftRadius) >= height / 2 - 1;
}

function burst(x: number, y: number) {
  const ring = document.createElement("span");
  ring.className = "fx-ring";
  ring.style.left = `${x}px`;
  ring.style.top = `${y}px`;
  document.body.appendChild(ring);
  gsap.fromTo(
    ring,
    { scale: 0.2, opacity: 0.9 },
    { scale: 3.2, opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => ring.remove() }
  );

  const count = 16;
  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    const size = gsap.utils.random(4, 10);
    spark.className = "fx-spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.width = spark.style.height = `${size}px`;
    spark.style.background = SPARK_COLOURS[i % SPARK_COLOURS.length];
    if (i % 3 === 0) spark.style.borderRadius = "2px";
    document.body.appendChild(spark);

    const angle = (i / count) * Math.PI * 2 + gsap.utils.random(-0.3, 0.3);
    const reach = gsap.utils.random(50, 130);
    gsap.to(spark, {
      keyframes: {
        x: [0, Math.cos(angle) * reach * 0.8, Math.cos(angle) * reach],
        // fly out, then sag as if they had weight
        y: [0, Math.sin(angle) * reach * 0.8, Math.sin(angle) * reach + 34],
        easeEach: "none",
      },
      rotation: gsap.utils.random(-260, 260),
      scale: 0,
      opacity: 0,
      duration: gsap.utils.random(0.7, 1.15),
      ease: "power3.out",
      onComplete: () => spark.remove(),
    });
  }
}

export default function ButtonFx() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const verdicts = new WeakMap<HTMLElement, boolean>();
    // elements another animation already moves keep the fill but don't lean
    const fixed = new WeakSet<HTMLElement>();
    let current: HTMLElement | null = null;
    let frame = 0;

    const resolve = (target: EventTarget | null) => {
      const el = target instanceof Element ? target.closest<HTMLElement>(CANDIDATE) : null;
      if (!el) return null;
      let ok = verdicts.get(el);
      if (ok === undefined) {
        ok = qualifies(el);
        verdicts.set(el, ok);
        const moved = (el as { _gsap?: unknown })._gsap !== undefined || /transform/.test(el.getAttribute("style") ?? "");
        if (ok && moved) fixed.add(el);
      }
      if (!ok) return null;
      // a data attribute, not a class: React rewrites className on re-render
      if (!el.hasAttribute("data-fx-btn")) {
        el.setAttribute("data-fx-btn", getComputedStyle(el).position === "static" ? "static" : "");
      }
      return el;
    };

    const aim = (el: HTMLElement, e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--fx-x", `${e.clientX - r.left}px`);
      el.style.setProperty("--fx-y", `${e.clientY - r.top}px`);
    };

    const release = () => {
      if (!current) return;
      const el = current;
      current = null;
      cancelAnimationFrame(frame);
      el.removeAttribute("data-fx-on");
      if (!fixed.has(el)) gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)", overwrite: "auto" });
    };

    const onOver = (e: PointerEvent) => {
      const el = resolve(e.target);
      if (el === current) return;
      release();
      if (!el) return;
      current = el;
      aim(el, e);
      // a frame later, so the fill has a start state to grow from
      frame = requestAnimationFrame(() => el.setAttribute("data-fx-on", ""));
    };

    const onMove = (e: PointerEvent) => {
      if (!current || e.pointerType !== "mouse" || fixed.has(current)) return;
      const r = current.getBoundingClientRect();
      const cx = r.left + r.width / 2 - Number(gsap.getProperty(current, "x"));
      const cy = r.top + r.height / 2 - Number(gsap.getProperty(current, "y"));
      gsap.to(current, {
        x: (e.clientX - cx) * 0.3,
        y: (e.clientY - cy) * 0.45,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onOut = (e: PointerEvent) => {
      if (!current) return;
      if (e.relatedTarget instanceof Node && current.contains(e.relatedTarget)) return;
      // the fill drains towards wherever the cursor left
      aim(current, e);
      release();
    };

    const onDown = (e: PointerEvent) => {
      const el = resolve(e.target);
      if (!el) return;
      burst(e.clientX, e.clientY);
      if (!fixed.has(el)) {
        gsap.fromTo(el, { scale: 0.9 }, { scale: 1, duration: 0.8, ease: "elastic.out(1.2, 0.3)", overwrite: "auto" });
      }
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerdown", onDown);

    return () => {
      release();
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [isAdmin]);

  return null;
}
