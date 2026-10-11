"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { afterPreloader } from "@/lib/afterPreloader";

// Site-wide section choreography. Mounted once in the root layout; every
// <section> in the page body gets three layers as it scrolls in:
//   1. curtain — the section opens out from an inset, round-shouldered panel
//      to full bleed, tied to the scroll position;
//   2. cards   — rows of cards tip up into place one after another;
//   3. media   — photos wipe open while settling back from a zoom, then drift
//      against the scroll inside their frame.
// Text is handled separately by TextReveal.
//
// Opt a subtree out with `data-no-sx`.
const MARK = "data-sx";
const SKIP_INSIDE =
  "[data-no-sx], [aria-hidden='true'], .pin-spacer, .preloader, .animate-marquee, .animate-team-marquee, .animate-team-marquee-vertical, .curved-ring, .gallery-tile, [class*='fixed']";

// Already driven by GSAP (heroes, pinned and scrubbed scenes) or by motion.
const owned = (el: Element) =>
  (el as { _gsap?: unknown })._gsap !== undefined || /opacity|transform/.test(el.getAttribute("style") ?? "");

type Kill = () => void;

function curtain(section: HTMLElement): Kill {
  const ease = gsap.parseEase("power2.out");
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "top 45%",
    onUpdate: (self) => {
      const rest = 1 - ease(self.progress);
      // fully open: drop the clip so nothing that overhangs the section is cut
      section.style.clipPath =
        rest <= 0.001 ? "" : `inset(${rest * 40}px ${rest * 4}% 0px ${rest * 4}% round ${rest * 40}px ${rest * 40}px 0px 0px)`;
    },
  });
  return () => {
    trigger.kill();
    section.style.clipPath = "";
  };
}

const CARD_FROM = { y: 70, autoAlpha: 0, scale: 0.94, rotateX: -14, transformPerspective: 900, transformOrigin: "50% 100%" };
const CARD_PROPS = "transform,opacity,visibility";

// A row of cards: three or more siblings of real size laid out by grid/flex.
function cardRow(container: Element) {
  const display = getComputedStyle(container).display;
  if (!display.includes("grid") && !display.includes("flex")) return null;
  const items = Array.from(container.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
  if (items.length < 3) return null;
  for (const item of items) {
    const r = item.getBoundingClientRect();
    if (r.width < 120 || r.height < 60 || owned(item)) return null;
  }
  return items;
}

function cards(items: HTMLElement[]): Kill {
  // hover transitions on the cards would smear a per-frame transform
  const settle = (els: Element[]) => {
    gsap.set(els, { clearProps: CARD_PROPS });
    for (const el of els) el.removeAttribute("data-sx-in");
  };
  for (const el of items) el.setAttribute("data-sx-in", "");
  gsap.set(items, CARD_FROM);

  const triggers = ScrollTrigger.batch(items, {
    start: "top 92%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
        overwrite: true,
        onComplete: () => settle(batch),
      }),
  });
  return () => {
    for (const t of triggers) t.kill();
    gsap.killTweensOf(items);
    settle(items);
  };
}

function media(img: HTMLImageElement): Kill | null {
  const { width, height } = img.getBoundingClientRect();
  if (width < 200 || height < 140 || getComputedStyle(img).objectFit !== "cover") return null;

  const frame = img.parentElement;
  if (!frame || frame.hasAttribute(MARK) || owned(frame)) return null;
  // the zoom and drift need a frame that crops the photo
  if (!/hidden|clip/.test(getComputedStyle(frame).overflow) || frame.offsetHeight > window.innerHeight * 1.2) return null;
  frame.setAttribute(MARK, "");
  img.setAttribute("data-sx-media", "");

  const wipe = gsap.fromTo(
    frame,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.3,
      ease: "expo.inOut",
      clearProps: "clipPath",
      scrollTrigger: { trigger: frame, start: "top 88%", once: true },
    }
  );
  // settles at 1.12, not 1: the spare margin is what the drift below moves through
  const zoom = gsap.fromTo(
    img,
    { scale: 1.4 },
    { scale: 1.12, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: frame, start: "top 88%", once: true } }
  );
  const drift = gsap.fromTo(
    img,
    { yPercent: -5 },
    { yPercent: 5, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } }
  );

  return () => {
    for (const tween of [wipe, zoom, drift]) {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
    gsap.set(frame, { clearProps: "clipPath" });
    gsap.set(img, { clearProps: "transform" });
    frame.removeAttribute(MARK);
    img.removeAttribute("data-sx-media");
  };
}

function choreograph(section: HTMLElement): Kill[] {
  const kills: Kill[] = [];
  // heroes and pinned / 3D scenes run their own show
  const scripted = owned(section) || section.querySelector(".pin-spacer, canvas") !== null;
  const isHero = section.getBoundingClientRect().top + window.scrollY < window.innerHeight * 0.6;
  if (scripted || isHero) return kills;

  kills.push(curtain(section));

  for (const container of section.querySelectorAll("div, ul, ol")) {
    if (container.hasAttribute(MARK) || container.closest(SKIP_INSIDE)) continue;
    const items = cardRow(container);
    if (!items) continue;
    container.setAttribute(MARK, "");
    kills.push(cards(items));
  }

  for (const img of section.querySelectorAll("img")) {
    if (img.closest(SKIP_INSIDE) || owned(img)) continue;
    const kill = media(img);
    if (kill) kills.push(kill);
  }

  return kills;
}

export default function SectionFx() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const records = new Map<Element, Kill[]>();

    const scan = () => {
      for (const [section, kills] of records) {
        if (!section.isConnected) {
          for (const kill of kills) kill();
          records.delete(section);
        }
      }

      for (const section of document.querySelectorAll<HTMLElement>(`main section:not([${MARK}])`)) {
        if (section.getClientRects().length === 0) continue;
        section.setAttribute(MARK, "");
        if (section.closest(SKIP_INSIDE)) continue;
        records.set(section, choreograph(section));
      }
    };

    // Microtask after each React commit: sections that arrive with a navigation
    // are staged before their first paint.
    const observer = new MutationObserver(scan);
    const stopWaiting = afterPreloader(() => {
      scan();
      observer.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      stopWaiting();
      observer.disconnect();
      for (const kills of records.values()) for (const kill of kills) kill();
      for (const el of document.querySelectorAll(`main [${MARK}]`)) el.removeAttribute(MARK);
    };
  }, [isAdmin]);

  return null;
}
