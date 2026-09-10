"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryCategory } from "@/data/content/gallery";
import { IMAGES } from "@/data/images";
import { useLenis } from "@/components/providers/SmoothScroll";

export default function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lenis = useLenis();

  const items = useMemo(
    () => GALLERY_ITEMS.filter((i) => active === "All" || i.categories.includes(active)),
    [active]
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
  const currentImage = current ? IMAGES[current.imageKey] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-caption font-medium transition-colors ${
              active === cat
                ? "border-sky-400 bg-sky-400 text-ink"
                : "border-navy-500 bg-navy-900 text-grey-300 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {items.map((item, i) => {
          const img = IMAGES[item.imageKey];
          return (
            <button
              key={item.imageKey}
              onClick={() => setLightboxIndex(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-navy-500 text-left"
            >
              {img?.src ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={640}
                  height={480}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="grid-rule aspect-[4/3] w-full bg-navy-900" />
              )}
              {img?.caption ? (
                <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-ink/70 px-3 py-1 text-caption text-white backdrop-blur">
                  {img.caption}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {current && currentImage ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.caption ?? currentImage.alt}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-navy-500 text-white"
          >
            <X size={20} />
          </button>
          <button
            onClick={() => setLightboxIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-navy-500 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % items.length))}
            aria-label="Next image"
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-navy-500 text-white"
          >
            <ChevronRight size={20} />
          </button>
          <figure className="max-h-[80vh] max-w-4xl">
            {currentImage.src ? (
              <Image src={currentImage.src} alt={currentImage.alt} width={1600} height={1200} className="max-h-[70vh] w-auto rounded-xl object-contain" />
            ) : null}
            <figcaption className="mt-4 text-center text-body text-grey-300">
              {currentImage.caption ?? currentImage.alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
