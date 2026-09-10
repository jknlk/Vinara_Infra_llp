"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "@/data/content/site";
import { useLenis } from "@/components/providers/SmoothScroll";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-navy-500 bg-ink/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Vinara Infra LLP home">
          <Image src="/Vinara Infra LLP logo.png" alt="Vinara Infra LLP" width={40} height={40} className="h-10 w-auto" priority />
          <span className="hidden text-body-l font-display font-bold tracking-tight text-white sm:block">
            VINARA
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-caption font-medium transition-colors hover:text-white ${
                pathname === link.href ? "text-white" : "text-grey-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full bg-white px-5 py-2.5 text-caption font-semibold text-ink transition-colors hover:bg-sky-200 sm:block"
          >
            Start a project
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-navy-500 text-white lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col justify-center bg-ink px-6"
        style={{ visibility: "hidden" }}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              data-mobile-link
              href={link.href}
              className="text-display-m font-display text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            data-mobile-link
            href="/contact"
            className="mt-6 inline-block w-fit rounded-full bg-white px-6 py-3 text-body font-semibold text-ink"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
