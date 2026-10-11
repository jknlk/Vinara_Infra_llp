"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, SplitText } from "@/lib/gsap";
import { afterPreloader } from "@/lib/afterPreloader";

// Site-wide text reveal. Mounted once in the root layout: it finds every
// heading and paragraph on the page (and anything a later navigation or render
// adds) and reveals it as it scrolls into view — headings word by word out of
// a line mask, paragraphs with a soft rise.
//
// Opt a subtree out with `data-no-reveal`.
const TARGETS = "main :is(h1, h2, h3, p), footer :is(h2, h3, p)";
const SKIP_INSIDE =
  "[data-no-reveal], [aria-hidden='true'], button, form, svg, .preloader, .animate-marquee, .animate-team-marquee, .animate-team-marquee-vertical, .curved-ring";
// background-clip:text doesn't survive being cut into transformed line boxes
const GRADIENT_TEXT = "[class*='bg-clip-text'], .join-shine";
const MARK = "data-rv";

// Already driven by GSAP (hero SplitText, scrubbed sections) or by motion.
const owned = (el: Element) =>
  (el as { _gsap?: unknown })._gsap !== undefined || /opacity|transform/.test(el.getAttribute("style") ?? "");

function ownedWithin(el: Element) {
  if (owned(el)) return true;
  for (const child of el.querySelectorAll("*")) if (owned(child)) return true;
  return false;
}

function ownedAbove(el: Element) {
  for (let p = el.parentElement; p && p.tagName !== "MAIN" && p !== document.body; p = p.parentElement) {
    if (owned(p)) return true;
  }
  return false;
}

// React keeps a reference to each text node it renders. Text built from several
// expressions ("{count} projects") shows up as adjacent text nodes, or text
// nodes split by a comment in server HTML — splitting those would strand
// React's later updates, so they get the block reveal instead.
function isStaticText(el: Element) {
  if (document.createTreeWalker(el, NodeFilter.SHOW_COMMENT).nextNode()) return false;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nextSibling?.nodeType === Node.TEXT_NODE) return false;
  }
  return true;
}

function revealBlock(el: Element, delay = 0) {
  const tween = gsap.from(el, {
    y: 26,
    autoAlpha: 0,
    duration: 0.9,
    delay,
    clearProps: "transform,opacity,visibility",
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
  });
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(el, { clearProps: "transform,opacity,visibility" });
  };
}

function revealHeading(el: Element) {
  let tween: gsap.core.Tween | undefined;
  const split = SplitText.create(el, {
    type: "lines,words",
    mask: "lines",
    linesClass: "rv-line",
    autoSplit: true,
    onSplit: (self) => {
      tween = gsap.from(self.words, {
        yPercent: 120,
        rotate: 6,
        transformOrigin: "0% 100%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.045,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      return tween;
    },
  });
  return () => {
    tween?.scrollTrigger?.kill();
    tween?.kill();
    split.revert();
  };
}

export default function TextReveal() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const records = new Map<Element, () => void>();

    const scan = () => {
      for (const [el, kill] of records) {
        if (!el.isConnected) {
          kill();
          records.delete(el);
        }
      }

      for (const el of document.querySelectorAll(`${TARGETS}:not([${MARK}])`)) {
        // hidden for now (closed accordion, mobile-only block): look again later
        if (el.getClientRects().length === 0) continue;
        el.setAttribute(MARK, "");
        if (!el.textContent?.trim() || el.closest(SKIP_INSIDE) || ownedWithin(el)) continue;

        if (el.tagName === "P") {
          if (!el.closest("a") && !ownedAbove(el)) records.set(el, revealBlock(el, 0.12));
        } else if (el.matches(GRADIENT_TEXT) || el.querySelector(GRADIENT_TEXT) || !isStaticText(el)) {
          records.set(el, revealBlock(el));
        } else {
          records.set(el, revealHeading(el));
        }
      }
    };

    // Runs as a microtask right after React commits, so text that arrives with
    // a navigation is hidden before its first paint rather than flashing.
    const observer = new MutationObserver(scan);
    const start = () => {
      scan();
      observer.observe(document.body, { childList: true, subtree: true });
    };

    const stopWaiting = afterPreloader(start);

    return () => {
      stopWaiting();
      observer.disconnect();
      for (const kill of records.values()) kill();
      for (const el of document.querySelectorAll(`[${MARK}]`)) el.removeAttribute(MARK);
    };
  }, [isAdmin]);

  return null;
}
