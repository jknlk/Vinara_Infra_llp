"use client";

import Image from "next/image";
import CardArc, { COMPACT_RING, t, u, type ArcGeometry } from "@/components/ui/CardArc";
import type { SparkItem } from "@/components/ui/sparks-carousel";

const WIDE: ArcGeometry = {
  unit: { min: 13.5, vw: 1, max: 24 },
  radius: 82,
  camera: 110.8,
  step: 22.5,
  cardW: 29.6,
  cardH: 39.4,
  cardTop: 8,
  originY: -3,
  type: 1,
  visibleArc: 80,
  stageHeight: "min(calc(34 * var(--u)), calc(22.5 * var(--u) + 14vw))",
};

const COMPACT: ArcGeometry = {
  ...COMPACT_RING,
  cardH: 46,
  cardTop: 10,
  originY: -4.6,
  stageHeight: "calc(17.2 * var(--u) + 38.8vw)",
};

export default function QcOrgArc({ items }: { items: readonly SparkItem[] }) {
  return (
    <CardArc count={items.length} geometry={WIDE} compact={COMPACT}>
      {(i, duplicate) => {
        const item = items[i];
        return (
          <article
            className="relative flex h-full w-full flex-col overflow-hidden bg-[#0f2b57]"
            style={{ borderRadius: u(1.6) }}
          >
            <div className="relative min-h-0 flex-1">
              <Image
                src={item.imageSrc}
                alt={duplicate ? "" : item.imageAlt}
                fill
                draggable={false}
                sizes="(min-width: 1350px) 24vw, 320px"
                className="object-cover"
              />
            </div>
            <div className="text-white" style={{ padding: u(2) }}>
              <h3 className="font-display font-bold" style={{ fontSize: t(2), lineHeight: 1.15 }}>
                {item.title}
              </h3>
              <p
                className="tabular font-display font-bold text-[#7fb6e8]"
                style={{ marginTop: t(0.8), fontSize: t(2.6), lineHeight: 1 }}
              >
                {item.count}
              </p>
              <p
                className="uppercase tracking-[0.14em] text-white/70"
                style={{ marginTop: t(0.4), fontSize: t(1.2) }}
              >
                {item.countLabel}
              </p>
            </div>
          </article>
        );
      }}
    </CardArc>
  );
}
