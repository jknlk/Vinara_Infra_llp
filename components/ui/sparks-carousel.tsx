"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SparkItem {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  count: number | string;
  countLabel: string;
}

// Horizontal scroll-snap carousel with prev/next buttons that hide at either end.
export function SparksCarousel({ items }: { items: readonly SparkItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 10);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    update();
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, items]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollTo({ left: el.scrollLeft + (dir === "left" ? -amount : amount), behavior: "smooth" });
  };

  const btn =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#0f2b57]/15 bg-white/90 p-2 text-[#0f2b57] shadow-md backdrop-blur-sm transition hover:bg-white";

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="group min-w-[260px] flex-1 basis-[260px] snap-start overflow-hidden rounded-2xl border border-[#0f2b57]/15 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 20vw, 280px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-body-l font-bold leading-tight text-[#0f2b57]">{item.title}</h3>
              <div className="mt-4">
                <p className="tabular font-display text-2xl font-bold text-[#3e86d0]">{item.count}</p>
                <p className="text-label uppercase tracking-[0.14em] text-[#5a6b84]">{item.countLabel}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!atStart && (
        <button onClick={() => scroll("left")} className={`${btn} left-2`} aria-label="Scroll left">
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {!atEnd && (
        <button onClick={() => scroll("right")} className={`${btn} right-2`} aria-label="Scroll right">
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default SparksCarousel;
