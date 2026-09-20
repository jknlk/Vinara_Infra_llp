"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "@/data/content/site";
import { useLenis } from "@/components/providers/SmoothScroll";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div className="relative z-50 flex w-full max-w-[1240px] items-center justify-between gap-4 rounded-full border border-black/5 bg-white/90 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Vinara Infra LLP home">
          <Image
            src="/vinara-logo-transparent.png"
            alt="Vinara Infra LLP"
            width={52}
            height={52}
            className="h-[52px] w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex xl:gap-1">
          {NAV_LINKS.map((link) => {
            const isActive: boolean = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[0.8rem] font-medium transition-colors xl:px-3.5 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "text-grey-500 hover:text-ink"
                }`}
              >
                {link.navLabel}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-caption font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:flex"
          >
            Get Quote
            <ArrowRight size={14} />
          </Link>
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
        <nav className="m-auto flex w-full flex-col gap-1.5 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              data-mobile-link
              href={link.href}
              className="text-display-m font-display text-ink"
            >
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
    </header>
  );
}
