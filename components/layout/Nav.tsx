"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "@/data/content/site";
import { useLenis } from "@/components/providers/SmoothScroll";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [hovered, setHovered] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [launching, setLaunching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  // compact once the page moves; slip away on the way down, return on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y < prev - 2) setHidden(false);
    else if (y > 320 && y > prev + 2 && !open) setHidden(true);
  });

  // cursor spotlight inside the bar
  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const burst = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setLaunching(true);
    setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== id)), 800);
    setTimeout(() => setLaunching(false), 700);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useGSAP(
    () => {
      if (!overlayRef.current) return;
      if (open) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
        gsap.from("[data-mobile-link]", { y: 24, opacity: 0, stagger: 0.06, delay: 0.1, duration: 0.5 });
      } else {
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-[transform,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 ${
          scrolled ? "pt-2" : "pt-4"
        } ${hidden ? "-translate-y-[130%]" : "translate-y-0"}`}
      >
        <div
          className={`nav-glow relative z-50 w-full rounded-full p-[1.5px] transition-[max-width,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "max-w-[1120px] shadow-[0_18px_50px_-12px_rgba(0,72,176,0.45)]"
              : "max-w-[1240px] shadow-[0_14px_40px_-14px_rgba(6,32,79,0.5)]"
          }`}
        >
          <div
            onPointerMove={spot}
            className={`nav-bar relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-full bg-white/85 px-4 backdrop-blur-2xl backdrop-saturate-150 transition-[padding] duration-500 sm:px-6 ${
              scrolled ? "py-1.5" : "py-2.5"
            }`}
          >
        <span className="nav-spot pointer-events-none absolute inset-0" aria-hidden="true" />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-6 right-6 h-[2.5px] origin-left rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-amber-400"
          style={{ scaleX: progress }}
        />
        <Link href="/" className="nav-logo-link relative flex shrink-0 items-center" aria-label="Vinara Infra LLP home">
          <Image
            src="/vinara-logo-transparent.png"
            alt="Vinara Infra LLP"
            width={52}
            height={52}
            className={`w-auto transition-[height] duration-500 ${scrolled ? "h-[44px]" : "h-[52px]"}`}
            priority
            data-nav-logo
          />
        </Link>

        <nav className="relative hidden items-center gap-0.5 xl:flex xl:gap-1" onMouseLeave={() => setHovered(null)}>
          {NAV_LINKS.map((link) => {
            const isActive: boolean = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className={`relative whitespace-nowrap rounded-full px-2.5 py-2 text-[0.8rem] font-medium transition-colors duration-300 xl:px-3.5 ${
                  isActive ? "text-white" : hovered === link.href ? "text-ink" : "text-grey-500"
                }`}
              >
                {hovered === link.href && !isActive && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-full bg-blue-600/10 ring-1 ring-blue-600/10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="nav-active absolute inset-0 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 shadow-[0_6px_18px_-4px_rgba(0,72,176,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.8 }}
                  />
                )}
                <motion.span
                  key={isActive ? "on" : "off"}
                  className="relative z-10 inline-block"
                  initial={isActive ? { y: 6, scale: 0.92 } : false}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.08 }}
                >
                  {link.navLabel}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.div className="hidden sm:block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
            <Link
              href="/contact"
              onClick={burst}
              className="nav-cta group relative flex items-center gap-2 overflow-hidden rounded-full py-2 pl-5 pr-2 text-caption font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,72,176,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] transition-shadow hover:shadow-[0_12px_34px_-6px_rgba(0,72,176,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />
              <AnimatePresence>
                {ripples.map((r) => (
                  <motion.span
                    key={r.id}
                    className="pointer-events-none absolute h-4 w-4 rounded-full bg-white/60"
                    style={{ left: r.x - 8, top: r.y - 8 }}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 18, opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                  />
                ))}
              </AnimatePresence>
              <span className="relative">Get Quote</span>
              <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white text-blue-600 transition-transform duration-500 group-hover:-rotate-45">
                <motion.span
                  className="absolute inset-0 grid place-items-center"
                  animate={launching ? { x: [0, 22, -22, 0] } : { x: 0 }}
                  transition={{ duration: 0.6, times: [0, 0.4, 0.41, 1], ease: "easeInOut" }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </span>
            </Link>
          </motion.div>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ink xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          </div>
        </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col overflow-y-auto bg-surface px-6 pb-10 pt-28"
        style={{ visibility: "hidden" }}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink xl:hidden"
        >
          <X size={20} />
        </button>
        <nav className="mx-auto flex w-full flex-col gap-1.5 py-4">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              data-mobile-link
              href={link.href}
              className={`flex items-baseline gap-3 border-b border-ink/10 py-1.5 font-display text-display-m transition-colors ${
                pathname === link.href ? "text-blue-600" : "text-ink hover:text-blue-600"
              }`}
            >
              <span className="text-label tabular text-grey-300">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
            </Link>
          ))}
          <Link
            data-mobile-link
            href="/contact"
            className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-body font-semibold text-white"
          >
            Get Quote
            <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </>
  );
}
