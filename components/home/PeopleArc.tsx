"use client";

import CardArc, { COMPACT_RING, t, u, type ArcGeometry } from "@/components/ui/CardArc";
import type { CurvedPersonSlot } from "@/components/home/CurvedPeopleGallery";

// The vanishing point runs through the middle of the portraits, so their top
// and bottom edges curve symmetrically, as they do on the desktop ring. The
// unit is a little smaller than the other phone arcs to bring more of the
// neighbours into view, and the caption hangs below the card box.
const CARD_H = 42;
const CAPTION_H = 11; // name plus a two-line role
const GEOMETRY: ArcGeometry = {
  ...COMPACT_RING,
  unit: { min: 7, vw: 2.55, max: 14 },
  type: 1.5,
  cardH: CARD_H,
  cardTop: -CARD_H / 2,
  originY: 14.1,
  stageHeight: "calc(35.2 * var(--u))",
};

// The phone version of CurvedPeopleGallery: fewer, larger portraits on a
// tighter ring that can be dragged.
export default function PeopleArc({
  people,
  className = "",
}: {
  people: CurvedPersonSlot[];
  className?: string;
}) {
  const shown = people.filter((p) => p.src.trim().length > 0);

  return (
    <div className={className}>
      <CardArc
        count={shown.length}
        geometry={GEOMETRY}
        className="[mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]"
      >
        {(i, duplicate) => {
          const p = shown[i];
          return (
            <figure className="relative m-0 h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={duplicate ? "" : (p.alt ?? p.name ?? "")}
                draggable={false}
                className="block h-full w-full object-cover"
                style={{ borderRadius: u(3.5) }}
              />
              {(p.name || p.role) && (
                <figcaption
                  className="absolute inset-x-0 top-full overflow-hidden text-center"
                  style={{ marginTop: u(1.6), maxHeight: u(CAPTION_H - 1.6) }}
                >
                  {p.name && (
                    <p className="truncate font-semibold text-ink" style={{ fontSize: t(1.9), lineHeight: 1.25 }}>
                      {p.name}
                    </p>
                  )}
                  {p.role && (
                    <p className="text-grey-500" style={{ fontSize: t(1.5), lineHeight: 1.3 }}>
                      {p.role}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          );
        }}
      </CardArc>
    </div>
  );
}
