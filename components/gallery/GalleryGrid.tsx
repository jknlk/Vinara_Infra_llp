"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";

export type GalleryDisplayItem = {
  id: string | number;
  src: string;
  alt: string;
  title: string;
  description: string;
  categories: string[];
};

const ASPECTS = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]"];

export default function GalleryGrid({ items: all, projectNames }: { items: GalleryDisplayItem[]; projectNames: string[] }) {
  const [active, setActive] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lenis = useLenis();

  const categories = useMemo(() => ["All", ...projectNames], [projectNames]);

  const items = useMemo(
    () => all.filter((i) => active === "All" || i.categories.includes(active)),
    [active, all]
  );

  useEffect(() => {
    if (lightboxIndex !== null) lenis?.stop();
    else lenis?.start();
  }, [lightboxIndex, lenis]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [active]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, items.length]);

  const current = lightboxIndex !== null ? items[lightboxIndex] : null;
  const currentImage = current;
  const step = (d: number) => setLightboxIndex((i) => (i === null ? i : (i + d + items.length) % items.length));

  return (
    <div>
      {/* filter bar */}
      <div className="sticky top-[76px] z-30 border-y border-[#0f2b57]/10 bg-white/90 py-3 backdrop-blur-xl sm:top-[92px]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2 px-6 md:px-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-caption font-medium transition-colors ${
                active === cat
                  ? "border-[#0f2b57] bg-[#0f2b57] text-white"
                  : "border-[#0f2b57]/20 text-[#0f2b57] hover:border-[#0f2b57]"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="tabular ml-auto text-caption text-[#5a6b84]">
            {items.length} {items.length === 1 ? "photo" : "photos"}
          </span>
        </div>
      </div>

      {/* masonry */}
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-12">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((item, i) => {
            const img = item;
            return (
              <button
                key={item.id}
                onClick={() => setLightboxIndex(i)}
                className="group relative mb-5 block w-full overflow-hidden rounded-2xl bg-[#dceaf9] text-left"
              >
                <div className={`relative ${ASPECTS[i % ASPECTS.length]}`}>
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#0f2b57] opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-label uppercase tracking-[0.12em] text-[#7fb6e8]">{item.categories[0]}</p>
                    <h3 className="mt-1 font-display text-body-l font-bold">{item.title}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* lightbox */}
      {current && currentImage ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0b2247]/95 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <span className="tabular absolute left-6 top-6 text-caption text-white/70">
            {String((lightboxIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <X size={20} />
          </button>
          <button
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight size={20} />
          </button>
          <figure className="max-w-4xl">
            {currentImage.src ? (
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={1600}
                height={1200}
                className="max-h-[70vh] w-auto rounded-xl object-contain shadow-2xl shadow-black/50"
              />
            ) : null}
            <figcaption className="mt-4 text-center">
              <p className="font-display text-body-l font-bold text-white">{current.title}</p>
              <p className="mx-auto mt-1 max-w-[60ch] text-caption text-white/70">{current.description}</p>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
