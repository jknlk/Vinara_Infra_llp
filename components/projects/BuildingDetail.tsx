"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import type { Building } from "@/data/buildings";
import type { BuildingPhoto } from "@/lib/buildingPhotos";
import { STATUS } from "./BuildingCards";

const SQM_PER_SQFT = 0.092903;
const eyebrow = "text-label uppercase tracking-[0.14em]";

function num(v: number, d = 0) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

// Popup for one building: its photo first, then the site's gallery photos, beside its specs.
export default function BuildingDetail({
  building: b,
  projectName,
  share,
  photos,
  onClose,
}: {
  building: Building;
  projectName: string;
  share: number;
  photos: BuildingPhoto[];
  onClose: () => void;
}) {
  const [i, setI] = useState(0);
  const s = STATUS[b.status];
  const photo = photos[i];
  const step = (d: number) => setI((cur) => (cur + d + photos.length) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (photos.length > 1 && e.key === "ArrowRight") setI((cur) => (cur + 1) % photos.length);
      if (photos.length > 1 && e.key === "ArrowLeft") setI((cur) => (cur - 1 + photos.length) % photos.length);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, photos.length]);

  const specs = [
    { l: "Built-up area", v: `${num(b.builtUpSqft, 2)} sq.ft` },
    { l: "In square metres", v: `≈ ${num(b.builtUpSqft * SQM_PER_SQFT)} sq.m` },
    { l: "Share of site", v: `${num(share, 1)}%` },
    { l: "Status", v: b.statusLabel },
    { l: "Site", v: projectName },
  ];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${b.name}, ${projectName}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#071a3a]/75 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-5"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0f2b57] shadow hover:bg-white"
        >
          <X size={20} />
        </button>

        <div className="relative aspect-[4/3] bg-[#0f2b57] lg:col-span-3 lg:aspect-auto lg:min-h-[460px]">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- photos come from admin uploads of any size
            <img key={photo.src} src={photo.src} alt={photo.caption || b.name} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/60">
              <span className="flex flex-col items-center gap-2 text-caption">
                <ImageOff size={28} /> Photos coming soon
              </span>
            </div>
          )}
          {photo?.caption ? (
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-caption text-white">
              {photo.caption}
            </p>
          ) : null}
          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#0f2b57] hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#0f2b57] hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
              <span className="tabular absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-caption text-white">
                {i + 1} / {photos.length}
              </span>
            </>
          ) : null}
        </div>

        <div className="p-6 lg:col-span-2">
          <p className={`${eyebrow} text-[#3e86d0]`}>{projectName}</p>
          <h3 className="mt-2 font-display text-3xl font-bold text-[#0f2b57]">{b.name}</h3>
          <p
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption font-semibold"
            style={{ background: s.tint, color: s.hex }}
          >
            <s.Icon size={13} strokeWidth={3} />
            {s.group}
          </p>

          <dl className="mt-5 divide-y divide-[#0f2b57]/10 border-y border-[#0f2b57]/10">
            {specs.map((x) => (
              <div key={x.l} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-caption text-[#5a6b84]">{x.l}</dt>
                <dd className="tabular text-right font-semibold text-[#0f2b57]">{x.v}</dd>
              </div>
            ))}
          </dl>

          {photos.length > 1 ? (
            <div className="mt-5 grid grid-cols-4 gap-2">
              {photos.slice(0, 8).map((p, k) => (
                <button
                  type="button"
                  key={p.src + k}
                  onClick={() => setI(k)}
                  aria-label={`Show photo ${k + 1}`}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${k === i ? "border-[#3e86d0]" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
