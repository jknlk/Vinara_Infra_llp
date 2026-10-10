"use client";

import Image from "next/image";
import CardArc, { COMPACT_RING, t, u, type ArcGeometry } from "@/components/ui/CardArc";
import { IMAGES } from "@/data/images";
import { PROGRESS_STEPS } from "@/data/content/planning";

// One photo per progress step, in the same order as PROGRESS_STEPS.
const STEP_IMAGES = [
  IMAGES.cycleExecute,
  IMAGES.cycleMeasure,
  IMAGES.planningSchedule,
  IMAGES.cyclePlan,
  IMAGES.cycleAnalyze,
  IMAGES.cycleAct,
];

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

export default function ProgressMarquee() {
  return (
    <div className="mt-10">
      <CardArc count={PROGRESS_STEPS.length} geometry={WIDE} compact={COMPACT}>
        {(i, duplicate) => {
          const img = STEP_IMAGES[i];
          return (
            <article
              className="relative h-full w-full overflow-hidden bg-[#0f2b57]"
              style={{ borderRadius: u(1.6) }}
            >
              <Image
                src={img.src ?? ""}
                alt={duplicate ? "" : img.alt}
                fill
                draggable={false}
                sizes="(min-width: 1350px) 24vw, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b57] via-[#0f2b57]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 text-white" style={{ padding: u(2) }}>
                <span
                  className="tabular font-display font-bold text-[#7fb4e8]"
                  style={{ fontSize: t(2.6), lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display font-bold" style={{ marginTop: t(0.6), fontSize: t(2), lineHeight: 1.15 }}>
                  {PROGRESS_STEPS[i]}
                </p>
              </div>
            </article>
          );
        }}
      </CardArc>
    </div>
  );
}
