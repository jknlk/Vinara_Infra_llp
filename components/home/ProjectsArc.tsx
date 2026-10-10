"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import CardArc, { COMPACT_RING, t, u, type ArcGeometry } from "@/components/ui/CardArc";
import type { HomeData } from "@/data/content/homeAdmin";

// 16:9 cards on a wider ring than the services arc, so neighbours still clear.
const WIDE: ArcGeometry = {
  unit: { min: 13.5, vw: 1, max: 24 },
  radius: 110,
  camera: 148,
  step: 26,
  cardW: 46,
  cardH: 35,
  cardTop: 4,
  originY: 3,
  type: 1.1,
  visibleArc: 80,
  stageHeight: "min(calc(36 * var(--u)), calc(24 * var(--u) + 11vw))",
};

const COMPACT: ArcGeometry = {
  ...COMPACT_RING,
  type: 1.15,
  cardH: 25,
  cardTop: 5,
  originY: 2,
  stageHeight: "calc(15 * var(--u) + 24vw)",
};

export default function ProjectsArc({ projects }: { projects: HomeData[] }) {
  return (
    <CardArc count={projects.length} geometry={WIDE} compact={COMPACT}>
      {(i, duplicate) => {
        const p = projects[i];
        const done = p.status === "completed";
        const pct = Math.max(0, Math.min(100, Number(p.progress) || 0));
        return (
          <Link
            href={p.href || "/projects"}
            draggable={false}
            tabIndex={duplicate ? -1 : undefined}
            className="group relative flex h-full w-full flex-col overflow-hidden bg-ink outline-none ring-blue-500 focus-visible:ring-4"
            style={{ borderRadius: u(1.6) }}
          >
            <span className="relative block aspect-video w-full overflow-hidden">
              {p.image && (
                <Image
                  src={p.image}
                  alt={duplicate ? "" : p.name}
                  fill
                  draggable={false}
                  sizes="(min-width: 1350px) 24vw, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <span
                className={`absolute rounded-full font-semibold uppercase tracking-[0.06em] ${
                  done ? "bg-green-500 text-white" : "bg-sky-400 text-ink"
                }`}
                style={{ left: u(1.6), top: u(1.6), padding: `${t(0.4)} ${t(1.1)}`, fontSize: t(1.2) }}
              >
                {done ? "Completed" : "Ongoing"}
              </span>
            </span>

            <span
              className="flex flex-1 flex-col justify-center text-white"
              style={{ padding: `${u(1)} ${u(2)}`, gap: t(0.5) }}
            >
              <span className="flex items-center text-white/70" style={{ gap: t(0.5), fontSize: t(1.3) }}>
                <MapPin style={{ width: t(1.4), height: t(1.4) }} className="shrink-0" />
                <span className="truncate">{p.location}</span>
              </span>
              <span className="flex items-end justify-between" style={{ gap: t(1) }}>
                <span
                  className="min-w-0 truncate font-display font-extrabold"
                  style={{ fontSize: t(2.3), lineHeight: 1.15 }}
                >
                  {p.name}
                </span>
                <span className="tabular shrink-0 font-display font-bold" style={{ fontSize: t(1.9) }}>
                  {pct}%
                </span>
              </span>
              <span className="flex items-center justify-between text-white/80" style={{ gap: t(1), fontSize: t(1.3) }}>
                <span className="min-w-0 truncate">{p.client}</span>
                <span className="tabular shrink-0 font-medium text-white">{p.area}</span>
              </span>
              <span className="block w-full overflow-hidden rounded-full bg-white/20" style={{ height: t(0.4) }}>
                <span className="block h-full rounded-full bg-sky-400" style={{ width: `${pct}%` }} />
              </span>
            </span>
          </Link>
        );
      }}
    </CardArc>
  );
}
