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
      <div className="flex w-full max-w-[1240px] items-center justify-between gap-4 rounded-full border border-black/5 bg-white/90 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Vinara Infra LLP home">
          <Image
            src="/vinara-logo-transparent.png"
            alt="Vinara Infra LLP"
            width={36}
            height={36}
            className="h-9 w-auto"
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
