"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { GALLERY_ACTIVITIES } from "@/data/content/gallery";

export type GalleryDisplayItem = {
  id: string | number;
  src: string;
  alt: string;
  title: string;
  description: string;
  categories: string[];
};

const SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw";

// Stable pseudo-random mix of 16:9 and shorter 4:5 portrait cards (same on server and client).
const isPortrait = (i: number) => (Math.imul(i + 1, 2654435761) >>> 0) % 5 < 2;

export default function GalleryGrid({ items: all, projectNames }: { items: GalleryDisplayItem[]; projectNames: string[] }) {
  const [active, setActive] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lenis = useLenis();

  const categories = useMemo(
    () =>
      ["All", ...projectNames].map((name) => ({
        name,
        count: name === "All" ? all.length : all.filter((i) => i.categories.includes(name)).length,
      })),
    [projectNames, all]
  );

  // Finished warehouses first, then one section per activity, then anything untagged.
  const sections = useMemo(() => {
    const shown = all.filter((i) => active === "All" || i.categories.includes(active));
    const known: string[] = [...GALLERY_ACTIVITIES];
    return [
      ...known.map((name) => ({ name, list: shown.filter((i) => i.categories[1] === name) })),
      { name: "More from site", list: shown.filter((i) => !known.includes(i.categories[1] ?? "")) },
    ].filter((s) => s.list.length > 0);
  }, [active, all]);
  // the lightbox steps through photos in the order the sections show them
  const items = useMemo(() => sections.flatMap((s) => s.list), [sections]);

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
  const step = (d: number) => setLightboxIndex((i) => (i === null ? i : (i + d + items.length) % items.length));

  return (
    <div>
      {/* floating filter pill */}
      <div className="pointer-events-none sticky top-[76px] z-30 flex justify-center px-3 py-3 sm:top-[92px]">
        <div className="no-scrollbar pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-[#0f2b57]/10 bg-white/85 p-1.5 shadow-lg shadow-[#0f2b57]/10 backdrop-blur-xl">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActive(cat.name)}
              aria-pressed={active === cat.name}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-caption font-medium transition-colors ${
                active === cat.name ? "bg-[#0f2b57] text-white" : "text-[#0f2b57] hover:bg-[#0f2b57]/5"
              }`}
            >
              {cat.name}
              <span className={`tabular text-[11px] ${active === cat.name ? "text-white/60" : "text-[#5a6b84]"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {sections.map((section, si) => {
        const offset = sections.slice(0, si).reduce((n, s) => n + s.list.length, 0);
        const collage = si === 0 && section.name === GALLERY_ACTIVITIES[0];
        return (
          <section key={active + section.name} className="px-1.5 pb-8 md:px-2 md:pb-12">
            <div className="flex items-baseline gap-3 px-2.5 pb-3 pt-4 md:px-4">
              <h2 className="font-display text-2xl font-bold text-[#0f2b57] md:text-3xl">{section.name}</h2>
              <span className="tabular text-caption text-[#5a6b84]">{section.list.length} photos</span>
            </div>
            {collage ? (
              // finished warehouses: a collage with the first photo large
              <div className="grid auto-rows-[160px] grid-cols-2 gap-1.5 md:auto-rows-[220px] md:grid-cols-4 md:gap-2">
                {section.list.map((item, k) => {
                  const i = offset + k;
                  const span = k === 0 ? "col-span-2 row-span-2" : k % 5 === 3 ? "md:col-span-2" : "";
                  return (
                    <div key={item.id} className={span}>
                      <button
              key={item.id}
              onClick={() => setLightboxIndex(i)}
              style={{ animationDelay: `${Math.min(i, 11) * 50}ms` }}
              className={`gallery-tile group relative block h-full w-full overflow-hidden rounded-xl bg-[#dceaf9] text-left md:mb-2 md:rounded-2xl ${
                ""
              }`}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={SIZES}
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2247]/85 via-[#0b2247]/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="tabular absolute left-4 top-4 text-caption font-medium text-white/80 md:left-5 md:top-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-4 top-4 grid h-10 w-10 -translate-y-2 place-items-center rounded-full bg-white text-[#0f2b57] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:right-5 md:top-5">
                <ArrowUpRight size={17} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
                <p className="text-label uppercase tracking-[0.12em] text-[#7fb6e8]">{item.categories[0]}</p>
                <h3 className="mt-1 font-display text-body-l font-bold md:text-2xl">{item.title}</h3>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                  <p className="line-clamp-2 max-w-[52ch] overflow-hidden text-caption text-white/75">
                    <span className="block pt-2">{item.description}</span>
                  </p>
                </div>
              </div>
            </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="columns-2 gap-1.5 md:columns-3 md:gap-2 xl:columns-4">
                {section.list.map((item, k) => {
                  const i = offset + k;
                  return (
            <button
              key={item.id}
              onClick={() => setLightboxIndex(i)}
              style={{ animationDelay: `${Math.min(i, 11) * 50}ms` }}
              className={`gallery-tile group relative mb-1.5 block w-full break-inside-avoid overflow-hidden rounded-xl bg-[#dceaf9] text-left md:mb-2 md:rounded-2xl ${
                isPortrait(i) ? "aspect-[4/5]" : "aspect-video"
              }`}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={SIZES}
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2247]/85 via-[#0b2247]/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="tabular absolute left-4 top-4 text-caption font-medium text-white/80 md:left-5 md:top-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-4 top-4 grid h-10 w-10 -translate-y-2 place-items-center rounded-full bg-white text-[#0f2b57] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:right-5 md:top-5">
                <ArrowUpRight size={17} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
                <p className="text-label uppercase tracking-[0.12em] text-[#7fb6e8]">{item.categories[0]}</p>
                <h3 className="mt-1 font-display text-body-l font-bold md:text-2xl">{item.title}</h3>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                  <p className="line-clamp-2 max-w-[52ch] overflow-hidden text-caption text-white/75">
                    <span className="block pt-2">{item.description}</span>
                  </p>
                </div>
              </div>
            </button>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      {/* lightbox */}
      {current ? (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-[#071730]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <span className="tabular text-caption text-white/70">
              {String((lightboxIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            <button
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-[#071730]/50 text-white transition-colors hover:bg-white/10 md:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-[#071730]/50 text-white transition-colors hover:bg-white/10 md:right-6"
            >
              <ChevronRight size={20} />
            </button>
            {current.src ? (
              <div key={current.id} className="gallery-tile relative h-full w-full">
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
            ) : null}
          </div>

          <div className="px-5 pt-4 text-center md:px-8">
            <p className="font-display text-body-l font-bold text-white">{current.title}</p>
            <p className="mx-auto mt-1 max-w-[60ch] text-caption text-white/70">{current.description}</p>
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4 md:justify-center md:px-8">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setLightboxIndex(i)}
                aria-label={`View ${item.title}`}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-opacity ${
                  i === lightboxIndex ? "opacity-100 ring-2 ring-[#7fb6e8]" : "opacity-40 hover:opacity-80"
                }`}
              >
                {item.src ? <Image src={item.src} alt="" fill sizes="80px" className="object-cover" /> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
