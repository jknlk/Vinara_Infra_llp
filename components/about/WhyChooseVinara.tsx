"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import CardArc, { COMPACT_RING, t, u, type ArcGeometry } from "@/components/ui/CardArc";
import { WHY_CHOOSE_VINARA } from "@/data/content/whyChooseVinara";

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

export default function WhyChooseVinara() {
  return (
    <section className="relative overflow-hidden bg-white py-6">
      <Container>
        <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">Why Choose Vinara</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-md join-shine pb-[0.08em]">
          Six reasons clients build with us again.
        </h2>
      </Container>

      <div className="mt-10">
        <CardArc count={WHY_CHOOSE_VINARA.length} geometry={WIDE} compact={COMPACT}>
          {(i, duplicate) => {
            const reason = WHY_CHOOSE_VINARA[i];
            return (
              <article
                className="relative flex h-full w-full flex-col overflow-hidden bg-[#0f2b57]"
                style={{ borderRadius: u(1.6) }}
              >
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={reason.image}
                    alt={duplicate ? "" : reason.alt}
                    fill
                    draggable={false}
                    sizes="(min-width: 1350px) 24vw, 320px"
                    className="object-cover"
                  />
                </div>
                <div className="text-white" style={{ padding: u(2) }}>
                  <span
                    className="tabular font-display font-bold text-[#7fb6e8]"
                    style={{ fontSize: t(2.2), lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-display font-bold"
                    style={{ marginTop: t(0.8), fontSize: t(2.2), lineHeight: 1.15 }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="line-clamp-3 text-white/80"
                    style={{ marginTop: t(0.6), fontSize: t(1.5), lineHeight: 1.4 }}
                  >
                    {reason.body}
                  </p>
                </div>
              </article>
            );
          }}
        </CardArc>
      </div>
    </section>
  );
}
