"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";

// Measured from navigation start, so a slow connection doesn't add to the wait.
const MIN_VISIBLE_MS = 3000;
const MAX_VISIBLE_MS = 7000;
// Keep in sync with the .preloader-curtain transition in globals.css.
const EXIT_MS = 1050;

// Where the square mark (vinara-mark.png) sits inside the navbar's full logo
// (vinara-logo-transparent.png), as fractions of that image's box — measured
// from the artwork. `clip` is how much of the left edge the mark occupies.
const SEAT = { left: -0.0132, top: 0.1003, size: 0.4684, clip: 0.406 };

const WORDMARK = "VINARA INFRA LLP";
const LOAD_BLOCKS = 12;

type Phase = "breathing" | "leaving" | "gone";

// One stroke of the site drawing. `at` is when it starts drawing (seconds),
// `faint` marks secondary linework (door slats, bracing, lattice).
function Stroke({ d, at, faint, dur = 0.9 }: { d: string; at: number; faint?: boolean; dur?: number }) {
  return (
    <path
      d={d}
      pathLength={1}
      className={faint ? "preloader-stroke preloader-stroke--faint" : "preloader-stroke"}
      style={{ animationDelay: `${at}s`, animationDuration: `${dur}s` }}
    />
  );
}

// Rendered by the root layout, so it is in the server HTML and paints before
// hydration; the layout persists across client navigations, which means it only
// replays on a hard load / refresh.
export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("breathing");
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const leave = () => setPhase((p) => (p === "breathing" ? "leaving" : p));

    const minTimer = window.setTimeout(() => {
      if (document.readyState === "complete") leave();
      else window.addEventListener("load", leave, { once: true });
    }, Math.max(0, MIN_VISIBLE_MS - performance.now()));
    const maxTimer = window.setTimeout(leave, Math.max(0, MAX_VISIBLE_MS - performance.now()));

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener("load", leave);
    };
  }, []);

  // Exit: the curtain lifts (CSS) while the logo flies to its seat in the navbar.
  // The navbar's own mark is clipped away until the flying one lands on it, so
  // the two never show at once.
  useEffect(() => {
    if (phase !== "leaving") return;
    const done = () => setPhase("gone");
    const logo = logoRef.current;
    const navLogo = document.querySelector<HTMLElement>("[data-nav-logo]");
    const seat = navLogo?.getBoundingClientRect();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!logo || !navLogo || !seat?.width || reduced) {
      if (logo) logo.style.opacity = "0";
      const id = window.setTimeout(done, EXIT_MS);
      return () => window.clearTimeout(id);
    }

    const centre = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    // Freeze the breath wherever it is and carry on from that exact pose.
    const pose = logo.getBoundingClientRect();
    logo.style.animation = "none";
    const rest = logo.getBoundingClientRect();
    const from = centre(pose);
    const origin = centre(rest);

    const size = seat.width * SEAT.size;
    const to = {
      x: seat.left + seat.width * SEAT.left + size / 2,
      y: seat.top + seat.height * SEAT.top + size / 2,
    };

    navLogo.style.clipPath = `inset(0 0 0 ${SEAT.clip * 100}%)`;
    // the breath squashes from the base; the flight maths is centre-based
    gsap.set(logo, {
      transformOrigin: "50% 50%",
      x: from.x - origin.x,
      y: from.y - origin.y,
      scaleX: pose.width / rest.width,
      scaleY: pose.height / rest.height,
    });

    // x and y ease differently, so the logo travels up along a curve
    const tl = gsap
      .timeline({ onComplete: done })
      .to(logo, { scaleX: 1.08, scaleY: 0.94, duration: 0.22, ease: "power2.out" }, 0)
      .to(logo, { x: to.x - origin.x, duration: 1, ease: "power3.inOut" }, ">")
      .to(logo, { y: to.y - origin.y, duration: 1, ease: "power4.inOut" }, "<")
      .to(logo, { scaleX: size / rest.width, scaleY: size / rest.height, duration: 1, ease: "power3.inOut" }, "<")
      .add(() => {
        navLogo.style.clipPath = "";
      })
      .to(logo, { opacity: 0, duration: 0.18, ease: "none" });

    return () => {
      tl.kill();
      navLogo.style.clipPath = "";
      gsap.set(logo, { clearProps: "transform,transformOrigin,opacity" });
    };
  }, [phase]);

  // Hold the page still underneath while the logo breathes. Not done with
  // overflow:hidden — the scrollbar vanishing would reflow the pinned sections.
  useEffect(() => {
    if (phase !== "breathing" || isAdmin) return;
    const el = rootRef.current;
    const block = (e: Event) => e.preventDefault();
    el?.addEventListener("wheel", block, { passive: false });
    el?.addEventListener("touchmove", block, { passive: false });
    lenis?.stop();

    return () => {
      el?.removeEventListener("wheel", block);
      el?.removeEventListener("touchmove", block);
      lenis?.start();
    };
  }, [phase, lenis, isAdmin]);

  if (isAdmin || phase === "gone") return null;

  return (
    <div
      ref={rootRef}
      className="preloader"
      data-leaving={phase === "leaving" || undefined}
      role="status"
      aria-label="Loading Vinara Infra LLP"
    >
      <div className="preloader-curtain">
        <span className="preloader-grid" />
      </div>

      <div className="preloader-inner">
        {/* drawing-sheet frame: corner marks, title labels and the load counter */}
        <div className="preloader-sheet" aria-hidden="true">
          <p className="left-0 top-0">Site Elevation</p>
          <p className="right-0 top-0 max-[359px]:hidden">Grade-A Warehousing</p>
          <p className="bottom-0 left-0">Bengaluru · India</p>
          <div className="preloader-count font-display">
            <span>%</span>
          </div>
        </div>

        <div className="preloader-stage">
          <span className="preloader-rays" />
          {/* Site elevation, drawn like a setting-out sheet: a finished warehouse
              on the left, a steel frame going up under a tower crane on the
              right, the logo's tower standing on the ground line between them. */}
          <svg
            className="preloader-scene"
            viewBox="0 0 1000 300"
            preserveAspectRatio="xMidYMax slice"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="preloader-wall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4d94ff" stopOpacity="0.3" />
                <stop offset="1" stopColor="#4d94ff" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* distant estate, drifting slowly for depth */}
            <path
              className="preloader-skyline"
              d="M0 250V214h46v-14h38v22h30v-34h52v26h40v-18h34v30h60v-40h44v24h36v-12h50v28h70v-36h40v20h48v-26h56v32h40v-20h44v14h50v-30h46v24h40H1000V250z"
            />

            <Stroke d="M500 250H60M500 250H940" at={0.15} dur={1} />

            <path className="preloader-fill" d="M90 250V172L225 138L360 172V250z" fill="url(#preloader-wall)" />
            <path
              className="preloader-fill preloader-fill--door"
              d="M112 250V204h44v46zM172 250V204h44v46zM232 250V204h44v46zM292 250V204h44v46z"
            />

            {/* finished warehouse */}
            <Stroke d="M90 250V172L225 138L360 172V250" at={0.55} dur={1.1} />
            <Stroke d="M90 172H360M207 143v-9h36v9" at={1.0} faint />
            <Stroke d="M112 250V204h44v46M172 250V204h44v46M232 250V204h44v46M292 250V204h44v46" at={1.15} />
            <Stroke
              d="M112 216h44M112 228h44M112 240h44M172 216h44M172 228h44M172 240h44M232 216h44M232 228h44M232 240h44M292 216h44M292 228h44M292 240h44"
              at={1.5}
              faint
            />

            {/* steel frame under construction */}
            <Stroke d="M650 250V172M715 250V172M780 250V172M845 250V172M910 250V172" at={0.7} />
            <Stroke d="M650 172L780 138L910 172" at={1.15} />
            <Stroke d="M650 172H910M650 250L715 172M715 250L650 172M845 250L910 172M910 250L845 172" at={1.5} faint />

            {/* tower crane */}
            <Stroke d="M604 250h32M614 250V58M626 250V58" at={0.85} dur={1} />
            <Stroke d="M614 250l12-24l-12-24l12-24l-12-24l12-24l-12-24l12-24l-12-24" at={1.2} dur={1} faint />
            <Stroke d="M588 58H800M614 58l6-24l6 24M620 34L800 58M620 34L588 58M588 58v12h20V58" at={1.45} dur={1} />
            {/* the load is lowered towards the frame and hoisted back, swinging slightly */}
            <g className="preloader-hook">
              <path className="preloader-cable" d="M745 58V112" />
              <g className="preloader-load-drop">
                <path d="M740 112h10v8h-10zM745 120l-20 16M745 120l20 16" />
                <path className="preloader-load-bar" d="M718 137H772" />
              </g>
            </g>

            {/* a truck running through the estate; it passes behind the logo */}
            <g className="preloader-truck">
              <path className="preloader-truck-body" d="M0 238V200h72v38zM76 238V212h13l11 12v14z" />
              <path className="preloader-hair" d="M18 200v38M36 200v38M54 200v38M80 216h8l7 8H80z" opacity={0.5} />
              <path d="M0 238H100" />
              {[14, 30, 88].map((cx) => (
                <g key={cx} className="preloader-wheel">
                  <circle className="preloader-truck-body" cx={cx} cy={243} r={7} />
                  <path className="preloader-hair preloader-spoke" d={`M${cx - 7} 243h14M${cx} 236v14`} />
                </g>
              ))}
            </g>

            {/* dimension line */}
            <g className="preloader-dim">
              <path className="preloader-dim-wide" d="M90 268v12M910 268v12M90 274H398M602 274H910" />
              <path className="preloader-dim-narrow" d="M90 266v16M910 266v16M90 274H306M694 274H910" />
              <text x="500" y="278" textAnchor="middle">
                3.13 MILLION SQ.FT
              </text>
            </g>
          </svg>

          <span className="preloader-halo" />
          <div ref={logoRef} className="preloader-logo">
            <Image src="/vinara-mark.png" alt="" width={512} height={512} sizes="200px" priority />
            <span className="preloader-shine" />
          </div>
        </div>

        <div className="preloader-caption">
          <p
            className="preloader-word font-display text-[0.95rem] font-extrabold tracking-[0.32em] text-blue-600 sm:text-[1.05rem]"
            aria-hidden="true"
          >
            {WORDMARK.split("").map((ch, i) => (
              <span key={i} style={{ animationDelay: `${(0.55 + i * 0.045).toFixed(3)}s` }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          {/* loads up block by block, like pallets going onto a rack */}
          <div className="preloader-load">
            {Array.from({ length: LOAD_BLOCKS }, (_, i) => (
              <span key={i} style={{ animationDelay: `${(0.4 + i * 0.19).toFixed(2)}s` }} />
            ))}
          </div>
          <p className="preloader-tag text-label uppercase text-grey-500">Grow Together</p>
        </div>
      </div>
    </div>
  );
}
