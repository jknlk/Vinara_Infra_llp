"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CardArc, { COMPACT_RING, t, u, type ArcGeometry } from "@/components/ui/CardArc";

export type ServiceArcCard = {
  tag: string;
  title: string;
  body: string;
  href: string;
  image?: { src?: string; alt: string };
};

// Below the lower clamp the unit stops shrinking and the stage simply shows
// fewer cards, until the compact ring takes over on phones.
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

export default function ServicesArc({ cards }: { cards: ServiceArcCard[] }) {
  return (
    <CardArc count={cards.length} geometry={WIDE} compact={COMPACT}>
      {(i, duplicate) => {
        const s = cards[i];
        return (
          <Link
            href={s.href}
            draggable={false}
            tabIndex={duplicate ? -1 : undefined}
            className="group relative block h-full w-full overflow-hidden bg-ink outline-none ring-blue-500 focus-visible:ring-4"
            style={{ borderRadius: u(1.6) }}
          >
            {s.image?.src && (
              <Image
                src={s.image.src}
                alt={duplicate ? "" : s.image.alt}
                fill
                draggable={false}
                sizes="(min-width: 1350px) 24vw, 320px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

            <span
              className="tabular absolute grid place-items-center rounded-full bg-ink/70 font-semibold text-white backdrop-blur"
              style={{ left: u(1.8), top: u(1.8), width: t(3.6), height: t(3.6), fontSize: t(1.35) }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="absolute inset-x-0 bottom-0 flex flex-col" style={{ padding: u(2.2) }}>
              <span
                className="font-semibold uppercase tracking-[0.08em] text-white/75"
                style={{ fontSize: t(1.3) }}
              >
                {s.tag}
              </span>
              <span
                className="font-display font-bold text-white"
                style={{ marginTop: t(0.5), fontSize: t(2.5), lineHeight: 1.15 }}
              >
                {s.title}
              </span>
              <span
                className="line-clamp-2 text-white/75"
                style={{ marginTop: t(0.8), fontSize: t(1.5), lineHeight: 1.4 }}
              >
                {s.body}
              </span>
              <span
                className="inline-flex items-center font-semibold uppercase tracking-[0.08em] text-blue-300 group-hover:text-white"
                style={{ marginTop: t(1.4), gap: t(0.6), fontSize: t(1.3) }}
              >
                Learn more
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  style={{ width: t(1.5), height: t(1.5) }}
                />
              </span>
            </span>
          </Link>
        );
      }}
    </CardArc>
  );
}
