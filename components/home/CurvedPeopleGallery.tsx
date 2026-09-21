"use client";

import { useId } from "react";

export type CurvedPersonSlot = {
  src: string;
  alt?: string;
  name?: string;
  role?: string;
};

const DEFAULT_IMAGES: CurvedPersonSlot[] = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/person-${i + 1}.jpg`,
  alt: `Team member ${i + 1}`,
}));

// Reference canvas the whole silhouette is authored against — the SVG scales
// this uniformly to any container width, so the curvature never flattens.
// Constants below are fit to pixel measurements taken off the reference
// screenshot (7-card layout): card heights ~374/264/204/188 edge-to-centre,
// and the top edge doing ~72% of the height falloff vs. ~28% for the bottom
// (the strip sits closer to a bottom baseline, it is not symmetric).
const VIEW_W = 1600;
const GAP = 12;
const MIN_H = 180; // centre card height
const MAX_H = 360; // outermost card height
const RADIUS = 18;
const MARGIN = 20; // top/bottom breathing room around the tallest cards
// Height falls off from the edges toward the centre as t^EASE, t in [0, 1].
const EASE = 2.2;
const TOP_SHARE = 0.72; // fraction of the height falloff carried by the top edge
const BOTTOM_SHARE = 1 - TOP_SHARE;
const VIEW_H = MAX_H + MARGIN * 2;
const TOP_TRAVEL = (MAX_H - MIN_H) * TOP_SHARE;
const BOTTOM_TRAVEL = (MAX_H - MIN_H) * BOTTOM_SHARE;
const TOP_CENTER = MARGIN + TOP_TRAVEL; // top-edge y of the centre card
const BOTTOM_CENTER = VIEW_H - MARGIN - BOTTOM_TRAVEL; // bottom-edge y of the centre card

/**
 * A panoramic strip of portrait images sliced into vertical panels and bent
 * into a shallow concave/bowl arc: cards are tallest and highest at the
 * edges, shortest and lowest at the centre. The top and bottom boundaries
 * both curve toward the centre, but asymmetrically — the top edge carries
 * most of the height falloff, the bottom edge only a little.
 *
 * Pure geometry component — swap `images` for real photos. Pass `name`/`role`
 * on each slot to show a caption under its card, column-aligned to it.
 */
export default function CurvedPeopleGallery({
  images = DEFAULT_IMAGES,
  className = "",
}: {
  images?: CurvedPersonSlot[];
  className?: string;
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const n = images.length;
  const center = (n - 1) / 2;
  const cardWidth = (VIEW_W - (n - 1) * GAP) / n;
  const showCaptions = images.some((img) => img.name || img.role);

  const cards = images.map((img, i) => {
    const t = center === 0 ? 0 : Math.abs(i - center) / center;
    const f = Math.pow(t, EASE);
    const y = TOP_CENTER - TOP_TRAVEL * f;
    const bottom = BOTTOM_CENTER + BOTTOM_TRAVEL * f;
    const height = bottom - y;
    const x = i * (cardWidth + GAP);
    return { ...img, x, y, width: cardWidth, height, clipId: `${uid}-clip-${i}` };
  });

  return (
    <div
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto md:overflow-hidden ${className}`}
    >
      {/* This inner wrapper's width/offset is shared by the SVG and the caption
          grid below so captions stay column-aligned with their card, including
          when the edge cards bleed off-screen. */}
      <div className="w-[900px] shrink-0 md:w-[112%] md:shrink md:-ml-[6%]">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Portraits of the team"
        >
          <defs>
            {cards.map((c) => (
              <clipPath key={c.clipId} id={c.clipId}>
                <rect x={c.x} y={c.y} width={c.width} height={c.height} rx={RADIUS} ry={RADIUS} />
              </clipPath>
            ))}
          </defs>
          {cards.map((c, i) => (
            <g key={i} className="group/card" style={{ filter: "drop-shadow(0 6px 14px rgba(11,42,91,0.14))" }}>
              <image
                href={c.src}
                x={c.x}
                y={c.y}
                width={c.width}
                height={c.height}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${c.clipId})`}
                aria-label={c.alt}
                className="transition-transform duration-[650ms] ease-out group-hover/card:scale-[1.03]"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            </g>
          ))}
        </svg>

        {showCaptions && (
          <div
            className="mt-4 grid"
            style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, columnGap: `${(GAP / VIEW_W) * 100}%` }}
          >
            {cards.map((c, i) => (
              <div key={i} className="min-w-0 text-center">
                {c.name && <p className="truncate text-caption font-semibold text-ink">{c.name}</p>}
                {c.role && <p className="truncate text-caption text-grey-500">{c.role}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
