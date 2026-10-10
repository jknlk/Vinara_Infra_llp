"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import CardArc, { COMPACT_RING, t, u, type ArcGeometry } from "@/components/ui/CardArc";
import type { HomeData } from "@/data/content/homeAdmin";

const IMAGE_H = 22.2; // a 4:3 photo across the card
const GEOMETRY: ArcGeometry = {
  ...COMPACT_RING,
  cardH: 31,
  cardTop: 10,
  originY: -4.6,
  stageHeight: "calc(11.5 * var(--u) + 28.4vw)",
};

// Bottom edge of the centre card below the stage top, as a CSS length. The
// neighbours hang lower than that, which leaves a hollow under the centre card.
const { unit, radius, camera, cardTop, cardH, originY } = GEOMETRY;
const CENTRE_BOTTOM = `calc(${originY + ((cardTop + cardH) * camera) / (camera + radius)} * clamp(${unit.min}px, ${unit.vw}vw, ${unit.max}px))`;

// The phone version of the "Our Work" row: the same cards, on a curve.
export default function WorkArc({ items }: { items: HomeData[] }) {
  const cards = items.filter((item) => item.image);

  return (
    <div className="relative">
      <CardArc count={cards.length} geometry={GEOMETRY}>
        {(i, duplicate) => {
          const item = cards[i];
          return (
            <div
              className="flex h-full w-full flex-col overflow-hidden bg-white"
              style={{ borderRadius: u(1.6) }}
            >
              <div className="relative w-full shrink-0" style={{ height: u(IMAGE_H) }}>
                <Image
                  src={item.image}
                  alt={duplicate ? "" : item.title}
                  fill
                  draggable={false}
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div
                className="flex min-h-0 flex-1 items-center justify-between"
                style={{ gap: u(1.2), padding: `0 ${u(2)}` }}
              >
                <p
                  className="line-clamp-2 font-semibold text-ink"
                  style={{ fontSize: t(1.75), lineHeight: 1.25 }}
                >
                  {item.title}
                </p>
                <span
                  className="grid shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600"
                  style={{ width: t(3.3), height: t(3.3) }}
                >
                  <ArrowUpRight style={{ width: t(1.6), height: t(1.6) }} />
                </span>
              </div>
            </div>
          );
        }}
      </CardArc>

      {/* the dots sit in the hollow rather than under the whole arc */}
      <div
        className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2"
        style={{ top: `calc(${CENTRE_BOTTOM} + 1rem)` }}
      >
        {cards.slice(0, 5).map((item, i) => (
          <span
            key={`${item.title}-${i}`}
            className={`h-1.5 rounded-full ${i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
